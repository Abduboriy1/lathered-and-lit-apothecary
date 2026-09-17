#!/usr/bin/env node
// Export store products to data/products.json, edit the file, then sync it back.
//
//   node scripts/shopify-products.mjs export             # store -> data/products.json
//   node scripts/shopify-products.mjs sync               # json -> store (create new, update existing)
//   node scripts/shopify-products.mjs sync --delete      # also delete store products missing from json
//   node scripts/shopify-products.mjs sync --dry-run     # show plan only
//
// JSON entry shape (see data/products.json). To ADD a product: append an object WITHOUT "id".
//   "images": list of  https URL | local file path | "generate"  (procedural brand art)
//   "stock": on-hand quantity at the primary location (site shows Out of Stock when 0)
// To REMOVE: delete the object and run sync --delete.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { renderImage } from './lib/art.mjs'
import { connect, fetchAllProducts, stageUpload, resolveImageSource, assertNoUserErrors, adminProductUrl, setStock } from './lib/shopify-admin.mjs'
import { createProduct } from './generate-products.mjs'

const FILE = join(process.cwd(), 'data', 'products.json')
const [cmd, ...rest] = process.argv.slice(2)
const flag = (n) => rest.includes(`--${n}`)

const toEntry = (p) => ({
  id: p.id,
  handle: p.handle,
  title: p.title,
  status: p.status,
  productType: p.productType ?? '',
  vendor: p.vendor ?? '',
  tags: p.tags ?? [],
  price: p.variants.nodes[0]?.price ?? null,
  stock: p.variants.nodes[0]?.inventoryQuantity ?? 0,
  descriptionHtml: p.descriptionHtml ?? '',
  images: p.media.nodes.map((m) => m.image?.url).filter(Boolean),
})

async function exportCmd() {
  const gql = await connect()
  const products = await fetchAllProducts(gql)
  mkdirSync(join(process.cwd(), 'data'), { recursive: true })
  writeFileSync(FILE, JSON.stringify({ products: products.map(toEntry) }, null, 2) + '\n')
  console.log(`exported ${products.length} products -> data/products.json`)
}

async function mediaSourcesFor(gql, entry, idx) {
  const out = []
  for (const [j, img] of (entry.images ?? []).entries()) {
    if (img === 'generate') {
      const png = renderImage(Date.now() ^ (idx * 7919) ^ (j * 104729))
      out.push(await stageUpload(gql, `${(entry.title ?? 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${j + 1}.png`, png))
    } else if (/^https?:\/\/cdn\.shopify\.com\//.test(img)) {
      continue // already on the product
    } else {
      out.push(await resolveImageSource(gql, img))
    }
  }
  return out
}

async function syncCmd() {
  const dry = flag('dry-run')
  const del = flag('delete')
  const file = JSON.parse(readFileSync(FILE, 'utf8'))
  const entries = file.products ?? []
  const gql = await connect()
  const remote = await fetchAllProducts(gql)
  const remoteById = new Map(remote.map((p) => [p.id, p]))
  const fileIds = new Set(entries.filter((e) => e.id).map((e) => e.id))

  const toCreate = entries.filter((e) => !e.id)
  const toUpdate = entries.filter((e) => e.id && remoteById.has(e.id))
  const orphans = entries.filter((e) => e.id && !remoteById.has(e.id))
  const toDelete = remote.filter((p) => !fileIds.has(p.id))

  console.log(`plan: create ${toCreate.length}, update ${toUpdate.length}, ${del ? 'delete' : 'skip-delete'} ${toDelete.length}` +
    (orphans.length ? `, ${orphans.length} entries have unknown ids (ignored)` : ''))
  if (dry) {
    toCreate.forEach((e) => console.log(`  + ${e.title}`))
    toUpdate.forEach((e) => console.log(`  ~ ${e.title}`))
    toDelete.forEach((p) => console.log(`  - ${p.title}${del ? '' : ' (pass --delete to remove)'}`))
    return
  }

  for (const [i, e] of toCreate.entries()) {
    const media = await mediaSourcesFor(gql, e, i)
    const product = await createProduct(gql, { ...e, tags: e.tags ?? [], price: e.price, stock: e.stock ?? 25 }, media, e.status ?? 'DRAFT')
    e.id = product.id
    e.handle = product.handle
    console.log(`created ${product.title}  ${adminProductUrl(product.id)}`)
  }

  for (const [i, e] of toUpdate.entries()) {
    const r = remoteById.get(e.id)
    const data = await gql(
      `mutation($product:ProductUpdateInput!){
        productUpdate(product:$product){ product{ id handle } userErrors{ field message } }
      }`,
      { product: { id: e.id, title: e.title, descriptionHtml: e.descriptionHtml, productType: e.productType, vendor: e.vendor, tags: e.tags ?? [], status: e.status } },
    )
    assertNoUserErrors(data.productUpdate, `productUpdate ${e.title}`)
    const variantId = r.variants.nodes[0]?.id
    if (variantId && e.price != null && String(e.price) !== String(r.variants.nodes[0].price)) {
      const v = await gql(
        `mutation($productId:ID!,$variants:[ProductVariantsBulkInput!]!){
          productVariantsBulkUpdate(productId:$productId, variants:$variants){ userErrors{ field message } }
        }`,
        { productId: e.id, variants: [{ id: variantId, price: String(e.price) }] },
      )
      assertNoUserErrors(v.productVariantsBulkUpdate, `price ${e.title}`)
    }
    const invItem = r.variants.nodes[0]?.inventoryItem
    if (invItem && e.stock != null && (Number(e.stock) !== r.variants.nodes[0].inventoryQuantity || !invItem.tracked)) {
      await setStock(gql, invItem.id, e.stock)
    }
    const media = await mediaSourcesFor(gql, e, 1000 + i)
    if (media.length) {
      const m = await gql(
        `mutation($productId:ID!,$media:[CreateMediaInput!]!){
          productCreateMedia(productId:$productId, media:$media){ mediaUserErrors{ field message } }
        }`,
        { productId: e.id, media: media.map((src) => ({ originalSource: src, alt: e.title, mediaContentType: 'IMAGE' })) },
      )
      if (m.productCreateMedia.mediaUserErrors.length) throw new Error(JSON.stringify(m.productCreateMedia.mediaUserErrors))
    }
    console.log(`updated ${e.title}`)
  }

  if (del) {
    for (const p of toDelete) {
      const d = await gql(`mutation($input:ProductDeleteInput!){ productDelete(input:$input){ deletedProductId userErrors{ field message } } }`, { input: { id: p.id } })
      assertNoUserErrors(d.productDelete, `delete ${p.title}`)
      console.log(`deleted ${p.title}`)
    }
  } else if (toDelete.length) {
    toDelete.forEach((p) => console.log(`  in store but not in json: ${p.title} (run with --delete to remove)`))
  }

  // Re-export so ids / handles / CDN image urls land back in the file.
  const fresh = await fetchAllProducts(gql)
  writeFileSync(FILE, JSON.stringify({ products: fresh.map(toEntry) }, null, 2) + '\n')
  console.log(`synced; data/products.json refreshed (${fresh.length} products)`)
}

const run = { export: exportCmd, sync: syncCmd }[cmd]
if (!run) {
  console.error('usage: node scripts/shopify-products.mjs <export|sync> [--dry-run] [--delete]')
  process.exit(1)
}
run().catch((err) => { console.error(err.message ?? err); process.exit(1) })

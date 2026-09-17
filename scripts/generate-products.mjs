#!/usr/bin/env node
// Create random products (with procedurally generated label art) in Shopify.
//
// Usage:
//   node scripts/generate-products.mjs --count 5            # create 5 DRAFT products
//   node scripts/generate-products.mjs --count 3 --active   # create as ACTIVE
//   node scripts/generate-products.mjs --dry-run            # only write PNGs to ./tmp/generated
//
// Env (.env): SHOPIFY_ADMIN_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { renderImage } from './lib/art.mjs'
import { connect, stageUpload, assertNoUserErrors, adminProductUrl, publishToOnlineStore, setStock } from './lib/shopify-admin.mjs'

const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : def
}

const COUNT = Number(opt('count', 5))
const STATUS = flag('active') ? 'ACTIVE' : 'DRAFT'
const DRY_RUN = flag('dry-run')
const OUT_DIR = join(process.cwd(), 'tmp', 'generated')

const SCENTS = [
  'Lavender', 'Cedar & Sage', 'Honey Oat', 'Sea Salt', 'Rose Clay', 'Activated Charcoal',
  'Eucalyptus Mint', 'Vanilla Bean', 'Lemongrass', 'Peppermint', 'Sandalwood', 'Bergamot',
  'Oat Milk', 'Fig & Amber', 'Wild Orange', 'Juniper', 'Chamomile', 'Black Tea',
]
const FORMS = [
  { name: 'Bar Soap', type: 'Soap', price: [8, 12], weight: 120 },
  { name: 'Soy Candle', type: 'Candle', price: [18, 32], weight: 300 },
  { name: 'Bath Bomb', type: 'Bath', price: [6, 9], weight: 150 },
  { name: 'Body Butter', type: 'Skincare', price: [14, 22], weight: 200 },
  { name: 'Shampoo Bar', type: 'Hair', price: [10, 15], weight: 90 },
  { name: 'Lip Balm', type: 'Skincare', price: [4, 7], weight: 15 },
]
const NOTES = [
  'hand-poured in small batches', 'made with cold-pressed olive oil', 'scented with pure essential oils',
  'free of parabens and synthetic dyes', 'cured for six weeks for a longer-lasting bar',
  'wrapped in recycled kraft paper', 'vegan and cruelty-free', 'infused with shea and cocoa butter',
]

const rand = (n) => Math.floor(Math.random() * n)
const pick = (arr) => arr[rand(arr.length)]
const between = ([a, b]) => (a + Math.random() * (b - a)).toFixed(2)

export function randomProduct(i = 0) {
  const scent = pick(SCENTS)
  const form = pick(FORMS)
  const title = `${scent} ${form.name}`
  const notes = [pick(NOTES), pick(NOTES)].filter((v, idx, a) => a.indexOf(v) === idx)
  return {
    title,
    descriptionHtml:
      `<p>${title} from Lathered &amp; Lit Apothecary, ${notes.join(' and ')}.</p>` +
      `<p>Approx. ${form.weight}g. Batch #${1000 + i + rand(9000)}.</p>`,
    productType: form.type,
    vendor: 'Lathered & Lit Apothecary',
    tags: [form.type.toLowerCase(), scent.split(/\s|&/)[0].toLowerCase(), 'generated'],
    price: between(form.price),
    stock: 10 + rand(40),
    seed: Date.now() ^ (i * 7919) ^ rand(1e9),
  }
}

export async function createProduct(gql, p, mediaSources, status = STATUS) {
  const data = await gql(
    `mutation($product:ProductCreateInput!,$media:[CreateMediaInput!]){
      productCreate(product:$product, media:$media){
        product{ id handle title variants(first:1){ nodes{ id inventoryItem{ id } } } }
        userErrors{ field message }
      }
    }`,
    {
      product: {
        title: p.title,
        descriptionHtml: p.descriptionHtml,
        productType: p.productType,
        vendor: p.vendor,
        tags: p.tags,
        status,
      },
      media: mediaSources.map((src) => ({ originalSource: src, alt: p.title, mediaContentType: 'IMAGE' })),
    },
  )
  assertNoUserErrors(data.productCreate, 'productCreate')
  const product = data.productCreate.product
  const variantId = product.variants.nodes[0]?.id
  if (variantId && p.price != null) {
    const v = await gql(
      `mutation($productId:ID!,$variants:[ProductVariantsBulkInput!]!){
        productVariantsBulkUpdate(productId:$productId, variants:$variants){ userErrors{ field message } }
      }`,
      { productId: product.id, variants: [{ id: variantId, price: String(p.price) }] },
    )
    assertNoUserErrors(v.productVariantsBulkUpdate, 'productVariantsBulkUpdate')
  }
  const inventoryItemId = product.variants.nodes[0]?.inventoryItem?.id
  if (inventoryItemId) await setStock(gql, inventoryItemId, p.stock ?? 25)
  await publishToOnlineStore(gql, [product.id])
  return product
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const products = Array.from({ length: COUNT }, (_, i) => randomProduct(i))
  const gql = DRY_RUN ? null : await connect()

  for (const [i, p] of products.entries()) {
    const png = renderImage(p.seed)
    const filename = `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}.png`
    writeFileSync(join(OUT_DIR, filename), png)
    if (DRY_RUN) {
      console.log(`[dry-run] ${p.title}  $${p.price}  -> tmp/generated/${filename}`)
      continue
    }
    const resourceUrl = await stageUpload(gql, filename, png)
    const product = await createProduct(gql, p, [resourceUrl])
    console.log(`created ${STATUS.toLowerCase()} product: ${product.title}  $${p.price}  ${adminProductUrl(product.id)}`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => { console.error(err.message ?? err); process.exit(1) })
}

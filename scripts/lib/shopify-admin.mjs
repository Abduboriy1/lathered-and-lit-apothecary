// Shared Admin API helpers (client-credentials token + GraphQL + staged image upload).
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'

process.loadEnvFile?.('.env')

export const API_VERSION = '2025-07'
export const SHOP = (process.env.SHOPIFY_ADMIN_STORE_DOMAIN ?? '').replace(/^https?:\/\//, '').replace(/\/+$/, '')
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID ?? ''
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET ?? ''

export const adminProductUrl = (gid) => `https://admin.shopify.com/store/${SHOP.split('.')[0]}/products/${gid.split('/').pop()}`

export async function connect() {
  if (!SHOP || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing SHOPIFY_ADMIN_STORE_DOMAIN / SHOPIFY_CLIENT_ID / SHOPIFY_CLIENT_SECRET in .env')
  }
  const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'client_credentials' }),
  })
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`)
  const { access_token } = await res.json()

  return async function gql(query, variables) {
    const r = await fetch(`https://${SHOP}/admin/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': access_token },
      body: JSON.stringify({ query, variables }),
    })
    const json = await r.json()
    if (!r.ok || json.errors) throw new Error(`GraphQL error: ${r.status} ${JSON.stringify(json.errors ?? json)}`)
    return json.data
  }
}

export function assertNoUserErrors(payload, label) {
  if (payload?.userErrors?.length) throw new Error(`${label}: ${JSON.stringify(payload.userErrors)}`)
}

/** Upload a PNG/JPG buffer via staged upload; returns resourceUrl usable as originalSource. */
export async function stageUpload(gql, filename, buf, mimeType = 'image/png') {
  const data = await gql(
    `mutation($input:[StagedUploadInput!]!){
      stagedUploadsCreate(input:$input){
        stagedTargets{ url resourceUrl parameters{ name value } }
        userErrors{ field message }
      }
    }`,
    { input: [{ resource: 'IMAGE', filename, mimeType, httpMethod: 'POST', fileSize: String(buf.length) }] },
  )
  assertNoUserErrors(data.stagedUploadsCreate, 'stagedUploadsCreate')
  const target = data.stagedUploadsCreate.stagedTargets[0]
  const form = new FormData()
  for (const p of target.parameters) form.append(p.name, p.value)
  form.append('file', new Blob([buf], { type: mimeType }), filename)
  const up = await fetch(target.url, { method: 'POST', body: form })
  if (!up.ok) throw new Error(`Staged upload failed: ${up.status} ${await up.text()}`)
  return target.resourceUrl
}

/** Resolve an image spec (http URL, local path) to an originalSource for CreateMediaInput. */
export async function resolveImageSource(gql, spec) {
  if (/^https?:\/\//.test(spec)) return spec
  const buf = readFileSync(spec)
  const mime = /\.jpe?g$/i.test(spec) ? 'image/jpeg' : 'image/png'
  return stageUpload(gql, basename(spec), buf, mime)
}

export async function fetchAllProducts(gql) {
  const out = []
  let cursor = null
  for (;;) {
    const data = await gql(
      `query($cursor:String){
        products(first:50, after:$cursor){
          pageInfo{ hasNextPage endCursor }
          nodes{
            id handle title status productType vendor tags descriptionHtml
            variants(first:1){ nodes{ id price inventoryQuantity inventoryItem{ id tracked } } }
            media(first:10){ nodes{ id ... on MediaImage { image{ url } } } }
          }
        }
      }`,
      { cursor },
    )
    out.push(...data.products.nodes)
    if (!data.products.pageInfo.hasNextPage) break
    cursor = data.products.pageInfo.endCursor
  }
  return out
}

/** Storefront API only returns ACTIVE products published to the Online Store channel. */
export async function onlineStorePublicationId(gql) {
  const d = await gql(`{ publications(first:20){ nodes{ id name } } }`)
  const pub = d.publications.nodes.find((p) => p.name === 'Online Store')
  if (!pub) throw new Error('Online Store publication not found')
  return pub.id
}

export async function publishToOnlineStore(gql, productIds) {
  const publicationId = await onlineStorePublicationId(gql)
  for (const id of productIds) {
    const r = await gql(
      `mutation($id:ID!,$input:[PublicationInput!]!){ publishablePublish(id:$id, input:$input){ userErrors{ field message } } }`,
      { id, input: [{ publicationId }] },
    )
    assertNoUserErrors(r.publishablePublish, `publish ${id}`)
  }
}

let _locationId = null
export async function primaryLocationId(gql) {
  if (_locationId) return _locationId
  const d = await gql(`{ locations(first:5, query:"active:true"){ nodes{ id name isPrimary } } }`)
  const loc = d.locations.nodes.find((l) => l.isPrimary) ?? d.locations.nodes[0]
  if (!loc) throw new Error('No active location found')
  _locationId = loc.id
  return loc.id
}

/** Enable tracking and set on-hand quantity for a variant's inventory item at the primary location. */
export async function setStock(gql, inventoryItemId, quantity) {
  const locationId = await primaryLocationId(gql)
  const t = await gql(
    `mutation($id:ID!,$input:InventoryItemInput!){ inventoryItemUpdate(id:$id, input:$input){ userErrors{ field message } } }`,
    { id: inventoryItemId, input: { tracked: true } },
  )
  assertNoUserErrors(t.inventoryItemUpdate, 'inventoryItemUpdate')
  const a = await gql(
    `mutation($id:ID!,$locationId:ID!){ inventoryActivate(inventoryItemId:$id, locationId:$locationId){ userErrors{ field message } } }`,
    { id: inventoryItemId, locationId },
  )
  assertNoUserErrors(a.inventoryActivate, 'inventoryActivate')
  const s = await gql(
    `mutation($input:InventorySetQuantitiesInput!){ inventorySetQuantities(input:$input){ userErrors{ field message } } }`,
    { input: { name: 'available', reason: 'correction', ignoreCompareQuantity: true, quantities: [{ inventoryItemId, locationId, quantity: Number(quantity) }] } },
  )
  assertNoUserErrors(s.inventorySetQuantities, 'inventorySetQuantities')
}

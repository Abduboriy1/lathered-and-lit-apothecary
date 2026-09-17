#!/usr/bin/env node
// Mint a public Storefront API token for the Product Generator app and publish all
// products to the Online Store channel so the Storefront API can see them (once ACTIVE).
//   node scripts/storefront-token.mjs
import { connect, fetchAllProducts, assertNoUserErrors, publishToOnlineStore } from './lib/shopify-admin.mjs'

const gql = await connect()

const existing = await gql(`{ shop{ name storefrontAccessTokens(first:10){ nodes{ id title accessToken } } } }`)
let token = existing.shop.storefrontAccessTokens.nodes.find((t) => t.title === 'lathered-lit-site')
if (!token) {
  const d = await gql(
    `mutation($input:StorefrontAccessTokenInput!){
      storefrontAccessTokenCreate(input:$input){ storefrontAccessToken{ id title accessToken } userErrors{ field message } }
    }`,
    { input: { title: 'lathered-lit-site' } },
  )
  assertNoUserErrors(d.storefrontAccessTokenCreate, 'storefrontAccessTokenCreate')
  token = d.storefrontAccessTokenCreate.storefrontAccessToken
}

const products = await fetchAllProducts(gql)
await publishToOnlineStore(gql, products.map((p) => p.id))
console.log(`published ${products.length} products to Online Store channel (Storefront API shows only ACTIVE ones)`)

console.log(`shop: ${existing.shop.name}`)
console.log(`STOREFRONT_TOKEN=${token.accessToken}`)

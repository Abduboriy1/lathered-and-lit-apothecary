#!/usr/bin/env node
// Create (or report) the first-order discount advertised in the site's announcement bar.
//
//   node scripts/welcome-discount.mjs            # create WELCOME10 if missing
//   node scripts/welcome-discount.mjs --dry-run  # show what would happen
//
// Rules enforced by Shopify at checkout:
//   - only customers in the "First-time customers" segment (number_of_orders = 0)
//   - one use per customer, does not combine with other discounts
//
// App scopes needed: write_discounts, read_customers, write_customers (for the segment).
// The code must match CODE in src/components/layout/AnnouncementBar.vue.

import { connect, assertNoUserErrors } from './lib/shopify-admin.mjs'

const CODE = 'WELCOME10'
const PERCENT = 0.1
const SEGMENT_NAME = 'First-time customers'
const SEGMENT_QUERY = 'number_of_orders = 0'
const dry = process.argv.includes('--dry-run')

async function firstTimeSegmentId(gql) {
  const d = await gql(`{ segments(first:100){ nodes{ id name query } } }`)
  const existing = d.segments.nodes.find((s) => s.query.replace(/\s+/g, ' ').trim() === SEGMENT_QUERY)
  if (existing) {
    console.log(`segment: using "${existing.name}"`)
    return existing.id
  }
  if (dry) {
    console.log(`segment: would create "${SEGMENT_NAME}" (${SEGMENT_QUERY})`)
    return null
  }
  const c = await gql(
    `mutation($name:String!,$query:String!){ segmentCreate(name:$name, query:$query){ segment{ id } userErrors{ field message } } }`,
    { name: SEGMENT_NAME, query: SEGMENT_QUERY },
  )
  assertNoUserErrors(c.segmentCreate, 'segmentCreate')
  console.log(`segment: created "${SEGMENT_NAME}"`)
  return c.segmentCreate.segment.id
}

async function main() {
  const gql = await connect()
  const found = await gql(
    `query($code:String!){ codeDiscountNodeByCode(code:$code){ id codeDiscount{ ... on DiscountCodeBasic { title status } } } }`,
    { code: CODE },
  )
  if (found.codeDiscountNodeByCode) {
    const d = found.codeDiscountNodeByCode.codeDiscount
    console.log(`${CODE} already exists: "${d.title}" (${d.status}). Edit it in Shopify admin > Discounts.`)
    return
  }

  const segmentId = await firstTimeSegmentId(gql)
  if (dry) {
    console.log(`would create ${CODE}: ${PERCENT * 100}% off order, first-time customers, once per customer, no combinations`)
    return
  }

  const r = await gql(
    `mutation($input:DiscountCodeBasicInput!){
      discountCodeBasicCreate(basicCodeDiscount:$input){ codeDiscountNode{ id } userErrors{ field message } }
    }`,
    {
      input: {
        title: `${PERCENT * 100}% off first order`,
        code: CODE,
        startsAt: new Date().toISOString(),
        context: { customerSegments: { add: [segmentId] } },
        customerGets: { value: { percentage: PERCENT }, items: { all: true } },
        appliesOncePerCustomer: true,
        combinesWith: { orderDiscounts: false, productDiscounts: false, shippingDiscounts: false },
      },
    },
  )
  assertNoUserErrors(r.discountCodeBasicCreate, 'discountCodeBasicCreate')
  console.log(`created ${CODE}: ${PERCENT * 100}% off first order, once per customer`)
}

main().catch((err) => { console.error(err.message ?? err); process.exit(1) })

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 2) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 1) {
    edges {
      node {
        id
        weight
        weightUnit
        quantityAvailable
      }
    }
  }
  shortDescription: metafield(namespace: "custom", key: "short_description") {
    value
  }
  burnTime: metafield(namespace: "custom", key: "burn_time") {
    value
  }
`

const CART_LINE_FIELDS = `
  id
  quantity
  cost {
    amountPerQuantity {
      amount
    }
  }
  merchandise {
    ... on ProductVariant {
      id
      product {
        handle
        title
        tags
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
`

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        ${CART_LINE_FIELDS}
      }
    }
  }
`

export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`

export const CART_CREATE = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`

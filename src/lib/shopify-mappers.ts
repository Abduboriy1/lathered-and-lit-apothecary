import type { Product, CartItem } from '@/types'

interface ShopifyImage {
  url: string
  altText?: string | null
}

interface ShopifyVariant {
  id: string
  title: string
  price: { amount: string }
  weight: number
  weightUnit: string
  quantityAvailable: number
}

interface ShopifyMetafield {
  value: string
}

export interface ShopifyProductNode {
  id: string
  handle: string
  title: string
  description: string
  productType: string
  tags: string[]
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ShopifyVariant }[] }
  shortDescription?: ShopifyMetafield | null
  burnTime?: ShopifyMetafield | null
}

interface ShopifyCartLineMerchandise {
  id: string
  title: string
  product: {
    handle: string
    title: string
    tags: string[]
    images: { edges: { node: { url: string } }[] }
  }
}

interface ShopifyCartLine {
  id: string
  quantity: number
  cost: { amountPerQuantity: { amount: string } }
  merchandise: ShopifyCartLineMerchandise
}

export interface ShopifyCartResponse {
  id: string
  checkoutUrl: string
  lines: { edges: { node: ShopifyCartLine }[] }
}

function mapCategory(productType: string): Product['category'] {
  const t = productType.toLowerCase()
  if (t === 'soap') return 'soap'
  if (t === 'body') return 'body'
  if (t === 'set') return 'set'
  return 'soap'
}

function mapBadges(tags: string[]): Product['badges'] {
  const valid = ['bestseller', 'new', 'limited'] as const
  const found = tags.filter((t): t is typeof valid[number] => (valid as readonly string[]).includes(t))
  return found.length ? found : undefined
}

function mapWeight(variant: ShopifyVariant | undefined): string {
  if (!variant || !variant.weight) return ''
  const unit = variant.weightUnit === 'OUNCES' ? 'oz' : variant.weightUnit.toLowerCase()
  return `${variant.weight} ${unit}`
}

export function mapProduct(node: ShopifyProductNode): Product {
  const firstVariant = node.variants.edges[0]?.node
  const variants = node.variants.edges.map(({ node: v }) => ({
    id: v.id,
    title: v.title,
    price: parseFloat(v.price.amount),
    stock: v.quantityAvailable,
  }))
  return {
    id: node.handle,
    name: node.title,
    price: parseFloat(firstVariant?.price.amount ?? node.priceRange.minVariantPrice.amount),
    category: mapCategory(node.productType),
    scent: node.tags.filter((t) => t.startsWith('scent:')).map((t) => t.replace('scent:', '')),
    description: node.description,
    shortDescription: node.shortDescription?.value ?? node.description.slice(0, 80),
    imageUrl: node.images.edges[0]?.node.url ?? '',
    hoverImageUrl: node.images.edges[1]?.node.url,
    burnTime: node.burnTime?.value,
    weight: mapWeight(firstVariant),
    featured: node.tags.includes('featured'),
    stock: firstVariant?.quantityAvailable ?? 0,
    badges: mapBadges(node.tags),
    variantId: firstVariant?.id,
    variants,
  }
}

export function mapCartLines(lines: ShopifyCartResponse['lines']): CartItem[] {
  return lines.edges.filter(({ node }) => node.quantity > 0).map(({ node }) => {
    const { product, id: variantId, title: variantTitle } = node.merchandise
    const normalizedTitle = variantTitle === 'Default Title' ? undefined : variantTitle
    return {
      lineId: node.id,
      quantity: node.quantity,
      variantTitle: normalizedTitle,
      product: {
        id: product.handle,
        name: product.title,
        price: parseFloat(node.cost.amountPerQuantity.amount),
        category: 'soap' as const,
        scent: product.tags.filter((t) => t.startsWith('scent:')).map((t) => t.replace('scent:', '')),
        description: '',
        shortDescription: '',
        imageUrl: product.images.edges[0]?.node.url ?? '',
        weight: '',
        featured: false,
        stock: 0,
        variantId,
      },
    }
  })
}

export function mapCartState(cart: ShopifyCartResponse) {
  return {
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    items: mapCartLines(cart.lines),
  }
}

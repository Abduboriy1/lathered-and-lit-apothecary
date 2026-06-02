export interface ProductVariant {
  id: string
  title: string
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  price: number
  category: 'candle' | 'soap' | 'set'
  scent: string[]
  description: string
  shortDescription: string
  imageUrl: string
  hoverImageUrl?: string
  burnTime?: string
  weight: string
  featured: boolean
  stock: number
  badges?: ('bestseller' | 'new' | 'limited')[]
  variantId?: string
  variants?: ProductVariant[]
}

export interface CartItem {
  product: Product
  quantity: number
  lineId?: string
}

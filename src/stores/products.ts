import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { shopifyClient } from '@/lib/shopify'
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries'
import { mapProduct, type ShopifyProductNode } from '@/lib/shopify-mappers'
import { track } from '@/lib/pixel'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    relatedProducts: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts(category?: string) {
      this.loading = true
      this.error = null
      try {
        const query = category ? `product_type:${category}` : undefined
        const { data, errors } = await shopifyClient.request(GET_PRODUCTS, {
          variables: { first: 50, query },
        })
        if (errors) throw new Error(String(errors))
        this.products = ((data as any)?.products?.edges ?? []).map(
          (e: { node: ShopifyProductNode }) => mapProduct(e.node),
        )
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load products'
      } finally {
        this.loading = false
      }
    },

    async fetchFeaturedProducts() {
      this.loading = true
      this.error = null
      try {
        const { data, errors } = await shopifyClient.request(GET_PRODUCTS, {
          variables: { first: 8, query: 'tag:featured' },
        })
        if (errors) throw new Error(String(errors))
        let featured: Product[] = ((data as any)?.products?.edges ?? []).map(
          (e: { node: ShopifyProductNode }) => mapProduct(e.node),
        )
        // No products tagged "featured" yet — show the newest ones instead of an empty section.
        if (!featured.length) {
          const fallback = await shopifyClient.request(GET_PRODUCTS, {
            variables: { first: 4, query: undefined },
          })
          featured = ((fallback.data as any)?.products?.edges ?? []).map(
            (e: { node: ShopifyProductNode }) => mapProduct(e.node),
          )
        }
        this.products = featured
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load featured products'
      } finally {
        this.loading = false
      }
    },

    async fetchProductByHandle(handle: string) {
      this.loading = true
      this.error = null
      this.currentProduct = null
      try {
        const { data, errors } = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, {
          variables: { handle },
        })
        if (errors) throw new Error(String(errors))
        const node = (data as any)?.product
        this.currentProduct = node ? mapProduct(node) : null
        if (this.currentProduct) {
          track('ViewContent', {
            content_ids: [this.currentProduct.id],
            content_name: this.currentProduct.name,
            content_type: 'product',
            content_category: this.currentProduct.category,
            value: this.currentProduct.price,
            currency: 'USD',
          })
          await this.fetchRelatedProducts(this.currentProduct)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load product'
      } finally {
        this.loading = false
      }
    },

    async fetchRelatedProducts(product: Product) {
      try {
        const { data } = await shopifyClient.request(GET_PRODUCTS, {
          variables: { first: 5, query: `product_type:${product.category}` },
        })
        this.relatedProducts = ((data as any)?.products?.edges ?? [])
          .map((e: { node: ShopifyProductNode }) => mapProduct(e.node))
          .filter((p: Product) => p.id !== product.id)
          .slice(0, 4)
      } catch {
        this.relatedProducts = []
      }
    },
  },
})

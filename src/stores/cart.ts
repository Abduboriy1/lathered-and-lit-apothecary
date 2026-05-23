import { defineStore } from 'pinia'
import type { CartItem, Product } from '@/types'
import { shopifyClient } from '@/lib/shopify'
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  GET_CART,
} from '@/lib/shopify-queries'
import { mapCartState, type ShopifyCartResponse } from '@/lib/shopify-mappers'

const CART_KEY = 'lathered_cart_id'

function loadStoredCart(): { cartId: string; checkoutUrl: string } | null {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStoredCart(cartId: string, checkoutUrl: string) {
  localStorage.setItem(CART_KEY, JSON.stringify({ cartId, checkoutUrl }))
}

function clearStoredCart() {
  localStorage.removeItem(CART_KEY)
}

function syncFromCart(store: ReturnType<typeof useCartStore>, cart: ShopifyCartResponse) {
  const mapped = mapCartState(cart)
  store.cartId = mapped.cartId
  store.checkoutUrl = mapped.checkoutUrl
  store.items = mapped.items
  saveStoredCart(mapped.cartId, mapped.checkoutUrl)
}

export const useCartStore = defineStore('cart', {
  state: (): {
    items: CartItem[]
    isDrawerOpen: boolean
    cartId: string | null
    checkoutUrl: string | null
    loading: boolean
    error: string | null
  } => ({
    items: [],
    isDrawerOpen: false,
    cartId: null,
    checkoutUrl: null,
    loading: false,
    error: null,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    async hydrateCart() {
      const stored = loadStoredCart()
      if (!stored) return
      try {
        const { data } = await shopifyClient.request(GET_CART, {
          variables: { cartId: stored.cartId },
        })
        const cart = (data as any)?.cart
        if (!cart) {
          clearStoredCart()
          return
        }
        syncFromCart(this, cart)
      } catch {
        // silently fail — cart stays empty
      }
    },

    async addItem(product: Product, quantity = 1) {
      if (!product.variantId) {
        console.warn('Product missing variantId — cannot add to Shopify cart:', product.id)
        return
      }

      // Optimistic update
      const existing = this.items.find((i) => i.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }

      this.loading = true
      this.error = null
      try {
        if (!this.cartId) {
          const { data, errors } = await shopifyClient.request(CART_CREATE, {
            variables: { input: { lines: [{ merchandiseId: product.variantId, quantity }] } },
          })
          if (errors) throw new Error(String(errors))
          const cart = (data as any)?.cartCreate?.cart
          if (cart) syncFromCart(this, cart)
        } else {
          const { data, errors } = await shopifyClient.request(CART_LINES_ADD, {
            variables: {
              cartId: this.cartId,
              lines: [{ merchandiseId: product.variantId, quantity }],
            },
          })
          if (errors) throw new Error(String(errors))
          const cart = (data as any)?.cartLinesAdd?.cart
          if (cart) syncFromCart(this, cart)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to add item'
        // rollback optimistic update
        if (existing) {
          existing.quantity -= quantity
        } else {
          this.items = this.items.filter((i) => i.product.id !== product.id)
        }
      } finally {
        this.loading = false
      }
    },

    async removeItem(productId: string) {
      const item = this.items.find((i) => i.product.id === productId)
      if (!item) return

      // Optimistic
      this.items = this.items.filter((i) => i.product.id !== productId)

      if (!this.cartId || !item.lineId) return

      this.loading = true
      try {
        const { data, errors } = await shopifyClient.request(CART_LINES_REMOVE, {
          variables: { cartId: this.cartId, lineIds: [item.lineId] },
        })
        if (errors) throw new Error(String(errors))
        const cart = (data as any)?.cartLinesRemove?.cart
        if (cart) syncFromCart(this, cart)
      } catch {
        this.items = [...this.items, item]
      } finally {
        this.loading = false
      }
    },

    async updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        await this.removeItem(productId)
        return
      }

      const item = this.items.find((i) => i.product.id === productId)
      if (!item) return

      const oldQty = item.quantity
      item.quantity = quantity // optimistic

      if (!this.cartId || !item.lineId) return

      this.loading = true
      try {
        const { data, errors } = await shopifyClient.request(CART_LINES_UPDATE, {
          variables: {
            cartId: this.cartId,
            lines: [{ id: item.lineId, quantity }],
          },
        })
        if (errors) throw new Error(String(errors))
        const cart = (data as any)?.cartLinesUpdate?.cart
        if (cart) syncFromCart(this, cart)
      } catch {
        item.quantity = oldQty
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      const lineIds = this.items.filter((i) => i.lineId).map((i) => i.lineId!)
      this.items = []
      this.cartId = null
      this.checkoutUrl = null
      clearStoredCart()

      if (lineIds.length && this.cartId) {
        try {
          await shopifyClient.request(CART_LINES_REMOVE, {
            variables: { cartId: this.cartId, lineIds },
          })
        } catch {
          // ignore
        }
      }
    },

    openDrawer() {
      this.isDrawerOpen = true
    },

    closeDrawer() {
      this.isDrawerOpen = false
    },

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },
  },
})

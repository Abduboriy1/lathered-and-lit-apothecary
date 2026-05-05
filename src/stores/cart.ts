import { defineStore } from 'pinia'
import type { CartItem, Product } from '@/types'

const CART_KEY = 'lathered_cart'
const CART_TTL = 24 * 60 * 60 * 1000 // 24 hours

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const { items, savedAt } = JSON.parse(raw)
    if (Date.now() - savedAt > CART_TTL) {
      localStorage.removeItem(CART_KEY)
      return []
    }
    return items
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify({ items, savedAt: Date.now() }))
}

export const useCartStore = defineStore('cart', {
  state: (): { items: CartItem[]; isDrawerOpen: boolean } => ({
    items: loadCart(),
    isDrawerOpen: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product: Product, quantity = 1) {
      const existing = this.items.find((i) => i.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      saveCart(this.items)
    },

    removeItem(productId: string) {
      this.items = this.items.filter((i) => i.product.id !== productId)
      saveCart(this.items)
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      const item = this.items.find((i) => i.product.id === productId)
      if (item) item.quantity = quantity
      saveCart(this.items)
    },

    clearCart() {
      this.items = []
      localStorage.removeItem(CART_KEY)
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

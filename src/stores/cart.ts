import { defineStore } from 'pinia'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', {
  state: (): { items: CartItem[]; isDrawerOpen: boolean } => ({
    items: [],
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
    },

    removeItem(productId: string) {
      this.items = this.items.filter((i) => i.product.id !== productId)
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      const item = this.items.find((i) => i.product.id === productId)
      if (item) item.quantity = quantity
    },

    clearCart() {
      this.items = []
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

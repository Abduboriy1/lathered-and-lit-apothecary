<script setup lang="ts">
import { ref, watch } from 'vue'
import { gsap } from 'gsap'
import { useCartStore } from '@/stores/cart'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'

const cart = useCartStore()
const drawerRef = ref<HTMLElement | null>(null)
const backdropRef = ref<HTMLElement | null>(null)

watch(
  () => cart.isDrawerOpen,
  (open) => {
    if (!drawerRef.value || !backdropRef.value) return
    if (open) {
      gsap.set(drawerRef.value, { x: '100%' })
      gsap.set(backdropRef.value, { opacity: 0, display: 'block' })
      gsap.to(drawerRef.value, { x: '0%', duration: 0.4, ease: 'power3.out' })
      gsap.to(backdropRef.value, { opacity: 1, duration: 0.3 })
    } else {
      gsap.to(drawerRef.value, { x: '100%', duration: 0.35, ease: 'power3.in' })
      gsap.to(backdropRef.value, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(backdropRef.value, { display: 'none' }),
      })
    }
  },
)

function handleCheckout() {
  cart.closeDrawer()
  if (cart.checkoutUrl) {
    window.location.href = cart.checkoutUrl
  }
}
</script>

<template>
  <!-- Backdrop -->
  <div
    ref="backdropRef"
    class="fixed inset-0 bg-black/20 backdrop-blur-xs hidden"
    style="display: none; z-index: 9998"
    @click="cart.closeDrawer()"
  />

  <!-- Drawer panel -->
  <div
    ref="drawerRef"
    class="fixed right-0 top-0 h-full w-80 sm:w-96 bg-ivory/98 backdrop-blur-xl flex flex-col shadow-2xl"
    style="transform: translateX(100%); z-index: 9999"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-blush/15">
      <div>
        <h3 class="font-display text-gray-800 text-lg">Your Bag</h3>
        <p class="text-xs text-gray-400 font-body mt-0.5">{{ cart.totalItems }} item{{ cart.totalItems !== 1 ? 's' : '' }}</p>
      </div>
      <button
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush/10 text-gray-400 hover:text-blush transition-colors cursor-pointer"
        @click="cart.closeDrawer()"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Error banner -->
    <div v-if="cart.error" class="mx-6 mt-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-body">
      {{ cart.error }}
    </div>

    <!-- Empty state -->
    <div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center text-center px-6">
      <svg class="w-16 h-16 text-blush/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="font-display text-gray-600 text-lg">Your bag is empty</p>
      <p class="text-sm text-gray-400 font-body mt-1 mb-6">Light it up — add something beautiful.</p>
      <button
        class="text-blush text-sm font-body underline underline-offset-4 cursor-pointer"
        @click="cart.closeDrawer()"
      >
        Browse the shop
      </button>
    </div>

    <!-- Cart items -->
    <div v-else class="flex-1 overflow-y-auto scrollbar-hide px-6">
      <CartItem v-for="item in cart.items" :key="item.product.variantId ?? item.product.id" :item="item" />
    </div>

    <!-- Summary -->
    <div v-if="!cart.isEmpty" class="px-6 pb-6 pt-2">
      <CartSummary @checkout="handleCheckout" />
    </div>
  </div>
</template>

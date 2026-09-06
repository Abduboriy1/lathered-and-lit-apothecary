<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'

const cart = useCartStore()
const router = useRouter()

function browseShop() {
  cart.closeDrawer()
  router.push('/shop')
}

function handleCheckout() {
  cart.closeDrawer()
  if (cart.checkoutUrl) {
    window.location.href = cart.checkoutUrl
  }
}
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-show="cart.isDrawerOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-xs"
      style="z-index: 9998"
      @click="cart.closeDrawer()"
    />
  </Transition>

  <!-- Drawer panel -->
  <div
    class="fixed right-0 top-0 h-full w-80 sm:w-96 bg-ivory/98 backdrop-blur-xl flex flex-col shadow-2xl border-l border-gold/30 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
    :class="cart.isDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
    :aria-hidden="!cart.isDrawerOpen"
    style="z-index: 9999"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-stone/40">
      <div>
        <h3 class="font-display text-ink text-xl">Your Bag</h3>
        <p class="text-xs text-ink-muted font-body mt-0.5">{{ cart.totalItems }} item{{ cart.totalItems !== 1 ? 's' : '' }}</p>
      </div>
      <button
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush/10 text-ink-muted hover:text-blush transition-colors cursor-pointer"
        @click="cart.closeDrawer()"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Error banner -->
    <div v-if="cart.error" class="mx-6 mt-4 px-4 py-2.5 bg-blush-light/60 border border-blush/40 rounded-xl text-xs text-blush-deep font-body">
      {{ cart.error }}
    </div>

    <!-- Empty state -->
    <div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center text-center px-6">
      <svg class="w-16 h-16 text-blush/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="font-display text-ink-soft text-lg">Your bag is empty</p>
      <p class="text-sm text-ink-muted font-body mt-1 mb-6">Light it up — add something beautiful.</p>
      <button
        class="text-blush text-sm font-body underline underline-offset-4 cursor-pointer"
        @click="browseShop()"
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

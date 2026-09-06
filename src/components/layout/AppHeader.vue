<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const cart = useCartStore()
</script>

<template>
  <header class="glass-nav enter-down fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 md:py-5 flex items-center justify-between gap-4">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center" aria-label="Lathered & Lit Apothecary home">
        <BrandLogo size="sm" />
      </RouterLink>

      <!-- Nav links -->
      <nav class="flex items-center gap-5 sm:gap-8 md:gap-10">
        <RouterLink
          to="/"
          class="soap-nav text-xs sm:text-sm uppercase tracking-[0.18em] font-body font-medium text-ink-soft hover:text-blush-deep transition-colors"
          active-class="is-active text-blush-deep"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/shop"
          class="soap-nav text-xs sm:text-sm uppercase tracking-[0.18em] font-body font-medium text-ink-soft hover:text-blush-deep transition-colors"
          active-class="is-active text-blush-deep"
        >
          Shop
        </RouterLink>
      </nav>

      <!-- Cart button -->
      <button
        class="group relative flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:border-blush/30 hover:bg-blush-light/40 transition-all cursor-pointer"
        aria-label="Open bag"
        @click="cart.openDrawer()"
      >
        <svg
          class="w-[22px] h-[22px] text-ink-soft group-hover:text-blush-deep transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <span
          v-if="cart.totalItems > 0"
          class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-rose-gradient text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow"
        >
          {{ cart.totalItems }}
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.soap-nav {
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}
.soap-nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1.5px;
  background: linear-gradient(90deg, #c9a96e, #c27080);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.soap-nav:hover::after,
.soap-nav.is-active::after {
  transform: scaleX(1);
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const headerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.fromTo(
    headerRef.value,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 },
  )
})
</script>

<template>
  <header ref="headerRef" class="glass-nav fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center">
        <img src="@/assets/logo.png" alt="Lathered & Lit" class="h-16 w-auto" />
      </RouterLink>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          to="/"
          class="soap-nav text-base font-body text-gray-600 hover:text-blush transition-colors"
          active-class="text-blush"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/shop"
          class="soap-nav text-base font-body text-gray-600 hover:text-blush transition-colors"
          active-class="text-blush"
        >
          Shop
        </RouterLink>
      </nav>

      <!-- Cart button -->
      <button
        class="relative flex items-center gap-2 cursor-pointer"
        @click="cart.openDrawer()"
      >
        <svg
          class="w-6 h-6 text-gray-600 hover:text-blush transition-colors"
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
          class="absolute -top-2 -right-2 w-5 h-5 bg-blush text-white text-[10px] font-bold rounded-full flex items-center justify-center"
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
}
.soap-nav::after {
  content: '';
  position: absolute;
  inset: -6px -12px;
  border: 1.5px solid #f6b7c1;
  border-radius: 45% 55% 52% 48% / 48% 52% 48% 52%;
  opacity: 0;
  transform: scale(0.85);
  transition: transform 0.2s ease, opacity 0.2s ease;
  pointer-events: none;
}
.soap-nav:hover::after {
  transform: scale(1);
  opacity: 1;
}
</style>

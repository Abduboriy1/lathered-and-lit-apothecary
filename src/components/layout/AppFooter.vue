<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
</script>

<template>
  <footer class="bg-ivory border-t border-blush/20 mt-24">
    <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
      <!-- Brand -->
      <div>
        <div class="mb-4">
          <div class="font-display font-bold uppercase tracking-wide leading-tight">
            <span class="text-teal block text-4xl">Lathered</span>
            <span class="text-blush text-3xl">&amp; Lit</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-1">
          <div class="flex items-center gap-2 text-xs text-gray-500 font-body">
            <svg class="w-3.5 h-3.5 text-mint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3C7 3 3 7.5 3 12c0 2 .8 3.8 2 5.2M12 3c5 0 9 4.5 9 9 0 2-.8 3.8-2 5.2M12 3v18"/></svg>
            Natural Ingredients
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500 font-body">
            <svg class="w-3.5 h-3.5 text-blush flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Made with Love
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500 font-body">
            <svg class="w-3.5 h-3.5 text-mint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Gentle &amp; Nourishing
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <h4 class="font-display text-gray-700 font-medium mb-4">Explore</h4>
        <ul class="space-y-2">
          <li>
            <RouterLink to="/" class="text-sm text-gray-500 hover:text-blush transition-colors">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/shop" class="text-sm text-gray-500 hover:text-blush transition-colors">Shop All</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart" class="text-sm text-gray-500 hover:text-blush transition-colors">Your Bag</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 class="font-display text-gray-700 font-medium mb-4">Stay in the lather</h4>
        <p class="text-sm text-gray-500 mb-4">New drops, rituals & exclusive offers.</p>
        <form class="flex gap-2" @submit.prevent>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="flex-1 px-4 py-2.5 text-sm rounded-full border border-blush/30 bg-white/80 focus:outline-none focus:border-blush transition-colors font-body"
          />
          <button
            type="submit"
            class="px-5 py-2.5 bg-blush text-white text-sm rounded-full font-body hover:bg-blush/90 transition-colors shadow-glow"
          >
            Join
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-blush/10 py-6 text-center text-xs text-gray-400 font-body">
      © {{ new Date().getFullYear() }} Lathered & Lit Soap Co., LLC — Handcrafted with care.
    </div>
  </footer>
</template>

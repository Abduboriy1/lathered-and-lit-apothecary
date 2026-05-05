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
        <div class="flex flex-col leading-none mb-4">
          <span class="font-display font-bold text-3xl uppercase tracking-widest">
            <span class="text-blush">Lathered</span>
            <span class="text-teal"> &amp; Lit</span>
          </span>
        </div>
        <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
          Handcrafted with love. Every candle and bar is made in small batches using clean, skin-loving ingredients.
        </p>
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
        <h4 class="font-display text-gray-700 font-medium mb-4">Stay in the glow</h4>
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
      © {{ new Date().getFullYear() }} Lathered & Lit — Made with care.
    </div>
  </footer>
</template>

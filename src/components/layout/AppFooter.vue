<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import LeafVine from '@/components/ui/LeafVine.vue'
import { useNewsletter } from '@/composables/useNewsletter'

const { email, status, message, subscribe } = useNewsletter()
</script>

<template>
  <footer class="relative bg-ivory">
    <!-- Leaf vine forms the footer's wavy top edge: the stem is the edge,
         everything under it is filled with the footer color. -->
    <div class="absolute inset-x-0 top-0 -translate-y-full z-10 pointer-events-none">
      <LeafVine :height="40" :opacity="1" fill="#FAF4EE" />
    </div>

    <div class="relative max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-20 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 md:gap-14 lg:gap-10 text-center lg:text-left">
      <!-- Brand -->
      <div class="col-span-2 lg:col-span-5">
        <div class="mb-6">
          <RouterLink to="/" class="inline-block" aria-label="Lathered & Lit Apothecary home">
            <BrandLogo size="md" />
          </RouterLink>
        </div>
        <p class="text-sm text-ink-soft font-body leading-relaxed max-w-sm mx-auto lg:mx-0">
          Small-batch soaps, body care, and candles handcrafted on our family farm with natural ingredients
          and a whole lot of heart.
        </p>
      </div>

      <!-- Navigation -->
      <div class="col-span-1 lg:col-span-2">
        <h4 class="font-display text-ink font-medium mb-4 md:mb-6 text-lg">Explore</h4>
        <ul class="space-y-3">
          <li>
            <RouterLink to="/" class="text-sm text-ink-soft hover:text-blush transition-colors">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/shop" class="text-sm text-ink-soft hover:text-blush transition-colors">Shop All</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart" class="text-sm text-ink-soft hover:text-blush transition-colors">Your Bag</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Connect -->
      <div class="col-span-1 lg:col-span-2">
        <h4 class="font-display text-ink font-medium mb-4 md:mb-6 text-lg">Connect</h4>
        <ul class="space-y-3">
          <li>
            <a
              href="https://www.facebook.com/people/Lathered-Lit-Apothecary/61591382468467/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-blush transition-colors"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/latheredandlit/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-blush transition-colors"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"/></svg>
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="col-span-2 lg:col-span-3">
        <h4 class="font-display text-ink font-medium mb-4 md:mb-6 text-lg">Stay in the lather</h4>
        <p class="text-sm text-ink-soft mb-5">New drops, rituals &amp; exclusive offers.</p>
        <form class="flex flex-col sm:flex-row gap-2" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            name="EMAIL"
            autocomplete="email"
            required
            placeholder="your@email.com"
            :disabled="status === 'loading'"
            class="flex-1 min-w-0 px-4 py-3 text-sm rounded-full border border-stone/70 bg-white/80 text-ink placeholder:text-ink-muted focus:outline-none focus:border-blush focus:shadow-glow transition-all font-body disabled:opacity-60"
          />
          <button
            type="submit"
            :disabled="status === 'loading'"
            class="btn-gloss px-6 py-3 bg-rose-gradient text-white text-sm rounded-full font-body font-medium shadow-btn-gloss hover:-translate-y-0.5 hover:shadow-luxe-hover transition-all disabled:opacity-70 cursor-pointer"
          >
            <span class="relative z-10">{{ status === 'loading' ? 'Joining…' : 'Join' }}</span>
          </button>
        </form>
        <p
          v-if="message"
          class="mt-3 text-xs font-body"
          :class="status === 'success' ? 'text-mint-dark' : 'text-blush-deep'"
          role="status"
        >
          {{ message }}
        </p>
      </div>
    </div>

    <!-- Trust bar -->
    <div class="relative max-w-7xl mx-auto px-5 sm:px-6 pb-8 md:pb-10 flex flex-wrap justify-center gap-x-3 sm:gap-x-8 gap-y-2">
      <div class="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-ink-soft font-body whitespace-nowrap">
        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-mint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3C7 3 3 7.5 3 12c0 2 .8 3.8 2 5.2M12 3c5 0 9 4.5 9 9 0 2-.8 3.8-2 5.2M12 3v18"/></svg>
        Natural Ingredients
      </div>
      <div class="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-ink-soft font-body whitespace-nowrap">
        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blush flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        Made with Love
      </div>
      <div class="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-ink-soft font-body whitespace-nowrap">
        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-mint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Gentle &amp; Nourishing
      </div>
    </div>

    <div class="relative border-t border-stone/40">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 text-xs text-ink-muted font-body text-center">
        <p>© {{ new Date().getFullYear() }} Lathered &amp; Lit Apothecary LLC. All rights reserved.</p>
        <p>Handcrafted with care on our family farm.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const cart = useCartStore()
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Your Bag' },
]

function closeMenu() {
  menuOpen.value = false
}

function openCart() {
  closeMenu()
  cart.openDrawer()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

// Close the menu on navigation and lock page scroll while it is open.
watch(() => route.fullPath, closeMenu)
watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="glass-nav enter-down fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-5 flex items-center justify-between gap-3 sm:gap-4">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center shrink-0 min-w-0" aria-label="Lathered & Lit Apothecary home" @click="closeMenu">
        <BrandLogo size="sm" />
      </RouterLink>

      <!-- Desktop nav links -->
      <nav class="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary">
        <RouterLink
          v-for="link in links.slice(0, 2)"
          :key="link.to"
          :to="link.to"
          class="soap-nav text-sm uppercase tracking-[0.18em] font-body font-medium text-ink-soft hover:text-blush-deep transition-colors"
          active-class="is-active text-blush-deep"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Actions: cart + mobile menu toggle -->
      <div class="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          class="group relative flex items-center justify-center w-11 h-11 rounded-full border border-transparent hover:border-blush/30 hover:bg-blush-light/40 transition-all cursor-pointer"
          aria-label="Open bag"
          @click="openCart"
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
            class="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-gradient text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow"
          >
            {{ cart.totalItems }}
          </span>
        </button>

        <button
          class="menu-toggle md:hidden relative flex items-center justify-center w-11 h-11 rounded-full border border-transparent hover:border-blush/30 hover:bg-blush-light/40 transition-all cursor-pointer"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-line" aria-hidden="true" />
          <span class="menu-line" aria-hidden="true" />
          <span class="menu-line" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu-fade">
      <div
        v-show="menuOpen"
        class="md:hidden absolute inset-x-0 top-full h-[100dvh] bg-ink/25"
        aria-hidden="true"
        @click="closeMenu"
      />
    </Transition>
    <Transition name="menu-slide">
      <nav
        v-show="menuOpen"
        id="mobile-menu"
        class="md:hidden absolute inset-x-0 top-full bg-[#FAF7F4] border-t border-gold/20 shadow-luxe max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
        aria-label="Mobile"
      >
        <ul class="px-6 pt-4 pb-6 flex flex-col">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="mobile-link flex items-center justify-between py-4 border-b border-stone/30 font-display text-2xl text-ink hover:text-blush-deep transition-colors"
              active-class="is-active text-blush-deep"
              @click="closeMenu"
            >
              <span>{{ link.label }}</span>
              <span
                v-if="link.to === '/cart' && cart.totalItems > 0"
                class="min-w-[24px] h-6 px-2 bg-rose-gradient text-white text-xs font-body font-bold rounded-full flex items-center justify-center shadow-glow"
              >
                {{ cart.totalItems }}
              </span>
              <svg v-else class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </li>
        </ul>
        <div class="px-6 pb-6 flex items-center justify-between gap-4">
          <p class="font-script italic text-gold text-lg leading-tight">Handcrafted on our family farm</p>
          <div class="flex items-center gap-2 shrink-0">
            <a
              href="https://www.facebook.com/people/Lathered-Lit-Apothecary/61591382468467/"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              class="w-10 h-10 rounded-full border border-stone/50 flex items-center justify-center text-ink-soft hover:text-blush-deep hover:border-blush/50 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/latheredandlit/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              class="w-10 h-10 rounded-full border border-stone/50 flex items-center justify-center text-ink-soft hover:text-blush-deep hover:border-blush/50 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>
      </nav>
    </Transition>
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

/* Hamburger -> X */
.menu-line {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 1.5px;
  margin-left: -10px;
  border-radius: 2px;
  background: currentColor;
  color: #6b5b55;
  transition: transform 0.3s ease, opacity 0.2s ease, top 0.3s ease;
}
.menu-line:nth-child(1) { top: calc(50% - 7px); }
.menu-line:nth-child(2) { top: calc(50% - 0.75px); }
.menu-line:nth-child(3) { top: calc(50% + 5.5px); }
.menu-toggle.is-open .menu-line { color: #a85868; }
.menu-toggle.is-open .menu-line:nth-child(1) { top: calc(50% - 0.75px); transform: rotate(45deg); }
.menu-toggle.is-open .menu-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
.menu-toggle.is-open .menu-line:nth-child(3) { top: calc(50% - 0.75px); transform: rotate(-45deg); }

.mobile-link.is-active span:first-child {
  background: linear-gradient(100deg, #a85868, #c27080 40%, #c9a96e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>

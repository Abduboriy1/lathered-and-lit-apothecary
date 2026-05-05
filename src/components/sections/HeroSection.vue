<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { RouterLink } from 'vue-router'
import CandleAnimation from '@/components/animation/CandleAnimation.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const heroRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.4 })
  tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .fromTo('.hero-candle', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.6')
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-20"
  >
    <!-- Decorative background orbs -->
    <div class="absolute top-20 right-10 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
      style="background: radial-gradient(circle, #f6b7c1, transparent 70%)" />
    <div class="absolute bottom-20 left-5 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
      style="background: radial-gradient(circle, #b7d8d0, transparent 70%)" />

    <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
      <!-- Text side -->
      <div class="flex flex-col items-start">
        <p class="hero-label font-script text-gold text-xl italic mb-2 opacity-0">
          Handcrafted with love
        </p>

        <h1 class="hero-title font-script text-5xl md:text-7xl leading-tight mb-4 opacity-0">
          <span class="text-blush block">Lathered</span>
          <span class="text-teal">&amp; Lit</span>
        </h1>

        <p class="hero-sub font-body text-gray-500 text-base md:text-lg leading-relaxed max-w-md mb-8 opacity-0">
          Small-batch artisan candles and soaps, made with clean ingredients and poured with intention.
          Light one up — you deserve the glow.
        </p>

        <div class="hero-ctas flex gap-4 flex-wrap opacity-0">
          <RouterLink to="/shop">
            <GlowButton size="lg">Shop Now</GlowButton>
          </RouterLink>
          <RouterLink to="/shop">
            <GlowButton variant="outline" size="lg">Our Story</GlowButton>
          </RouterLink>
        </div>

        <!-- Trust badges -->
        <div class="flex gap-6 mt-10 text-xs text-gray-400 font-body">
          <span>🕯️ Clean burning</span>
          <span>🌿 Skin-safe</span>
          <span>✨ Hand-poured</span>
        </div>
      </div>

      <!-- Candle side -->
      <div class="hero-candle hidden lg:flex justify-center items-end opacity-0 w-full">
        <CandleAnimation class="animate-float w-full max-w-xs lg:max-w-sm" />
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce">
      <span class="text-[10px] font-body uppercase tracking-widest">Scroll</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

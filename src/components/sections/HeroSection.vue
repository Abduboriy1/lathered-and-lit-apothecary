<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import {RouterLink} from 'vue-router'
import GlowButton from '@/components/ui/GlowButton.vue'
import woodTexture from '@/assets/textures/rustic-wood.webp'

const heroRef = ref<HTMLElement | null>(null)

function scrollToStory() {
  document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })
}

const badges = ['Small-batch', 'Skin-loving', 'Hand-crafted']
const badgeColors = ['text-gold', 'text-teal', 'text-blush']
const badgeIndex = ref(0)
const badgeVisible = ref(true)
let badgeTimer: ReturnType<typeof setInterval>

// Sparkles scattered around the product image (percent positions)
const sparkles = [
  { top: '6%', left: '12%', delay: '0s', scale: 1 },
  { top: '18%', left: '88%', delay: '0.9s', scale: 0.7 },
  { top: '42%', left: '4%', delay: '1.6s', scale: 0.8 },
  { top: '70%', left: '92%', delay: '0.4s', scale: 1.1 },
  { top: '88%', left: '20%', delay: '2.1s', scale: 0.6 },
  { top: '30%', left: '60%', delay: '1.2s', scale: 0.5 },
  { top: '80%', left: '70%', delay: '2.6s', scale: 0.9 },
]

onUnmounted(() => clearInterval(badgeTimer))

onMounted(() => {
    badgeTimer = setInterval(() => {
        badgeVisible.value = false
        setTimeout(() => {
            badgeIndex.value = (badgeIndex.value + 1) % badges.length
            badgeVisible.value = true
        }, 350)
    }, 2200)

})
</script>

<template>
    <section
        ref="heroRef"
        class="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-28 pb-16"
    >
        <!-- Wood texture overlay: kept whisper-soft so it reads as warmth, not noise.
             Mask lives on the wrapper and opacity on the child: Chrome ignores opacity
             when both sit on the same element with a composited mask. -->
        <div
            class="absolute inset-0 pointer-events-none"
            :style="{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }"
        >
            <div
                class="absolute inset-0"
                :style="{
                backgroundImage: `url(${woodTexture})`,
                backgroundRepeat: 'repeat',
                backgroundSize: '520px',
                opacity: 0.09,
              }"
            />
        </div>

        <!-- Decorative background orbs -->
        <div class="absolute -top-10 right-0 w-[34rem] h-[34rem] rounded-full opacity-40 blur-3xl pointer-events-none"
             style="background: radial-gradient(circle, #E7B3BD, transparent 65%)"/>
        <div class="absolute bottom-10 left-0 w-80 h-80 rounded-full opacity-25 blur-3xl pointer-events-none"
             style="background: radial-gradient(circle, #C9A96E, transparent 70%)"/>
        <div class="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
             style="background: radial-gradient(circle, #7A9470, transparent 70%)"/>

        <div class="max-w-7xl mx-auto px-6 w-full py-10 lg:py-14 flex flex-col items-center">
            <!-- Wordmark: centered above everything -->
            <p class="hero-label font-script text-gold text-2xl md:text-3xl font-semibold italic mb-3 enter-up flex items-center justify-center flex-wrap gap-x-2 text-center">
                <span>Handcrafted soaps,</span>
                <span class="relative inline-block min-w-[9rem] h-[1.2em] text-left">
                    <Transition name="badge-flip">
                        <span
                            v-if="badgeVisible"
                            :key="badgeIndex"
                            class="absolute left-0 top-0 font-bold italic whitespace-nowrap"
                            :class="badgeColors[badgeIndex]"
                        >{{ badges[badgeIndex] }}</span>
                    </Transition>
                </span>
            </p>

            <h1 class="hero-title font-display font-bold text-[clamp(2.4rem,7.2vw,7.5rem)] uppercase tracking-wide leading-[0.95] mb-10 lg:mb-12 enter-up inline-flex flex-col items-center max-w-full text-center">
                <span class="flex items-baseline gap-[0.28em] whitespace-nowrap drop-shadow-[0_2px_0_rgba(255,255,255,0.5)]">
                    <span class="text-teal">Lathered</span>
                    <span class="text-rosegold">&amp; Lit</span>
                </span>
                <span class="font-body font-medium text-teal text-sm md:text-xl tracking-[0.5em] flex items-center justify-center gap-3 md:gap-4 mt-4 pl-[0.5em]">
                    <span class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blush flex-shrink-0 shadow-glow" aria-hidden="true"/>
                    <span>Apothecary</span>
                    <span class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blush flex-shrink-0 shadow-glow" aria-hidden="true"/>
                </span>
            </h1>

            <!-- Message + product art -->
            <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                <div class="flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-6">
                    <h2 class="hero-sub font-display text-ink text-3xl md:text-4xl xl:text-[2.75rem] leading-[1.15] font-medium mb-5 enter-up max-w-xl">
                        Farm-fresh skincare,<br />
                        <span class="italic text-rosegold">poured with love.</span>
                    </h2>

                    <p class="hero-sub font-body text-ink-soft text-xl md:text-2xl leading-relaxed max-w-xl mb-4 enter-up">
                        Small-batch artisan soaps and body care, made with natural ingredients and crafted with care on our family farm.
                    </p>
                    <p class="hero-sub font-script italic text-blush-deep text-3xl md:text-4xl mb-9 enter-up">
                        Treat your skin — you deserve it.
                    </p>

                    <div class="hero-ctas flex gap-4 flex-wrap justify-center lg:justify-start enter-up">
                        <RouterLink to="/shop">
                            <GlowButton size="lg">
                                Shop Now
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"/></svg>
                            </GlowButton>
                        </RouterLink>
                        <GlowButton variant="outline" size="lg" @click="scrollToStory">Our Story</GlowButton>
                    </div>

                    <ul class="hero-trust enter-up mt-10 flex flex-wrap lg:flex-nowrap gap-y-2 items-center justify-center lg:justify-start gap-x-4 xl:gap-x-5 text-[10px] sm:text-[11px] xl:text-xs uppercase tracking-[0.1em] text-ink-soft font-body whitespace-nowrap max-w-full">
                        <li class="flex items-center gap-2">
                            <span class="w-2 h-2 rotate-45 bg-gradient-to-br from-gold-light to-gold shadow-glow-gold flex-shrink-0" aria-hidden="true"/>
                            Free shipping over $50
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="w-2 h-2 rotate-45 bg-gradient-to-br from-gold-light to-gold shadow-glow-gold flex-shrink-0" aria-hidden="true"/>
                            100% natural ingredients
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="w-2 h-2 rotate-45 bg-gradient-to-br from-gold-light to-gold shadow-glow-gold flex-shrink-0" aria-hidden="true"/>
                            Made on our family farm
                        </li>
                    </ul>
                </div>

                <!-- Hero image: product artwork with transparent background -->
                <div class="hero-image relative flex justify-center items-center enter-up w-full">
                    <div
                        class="absolute inset-[8%] rounded-full blur-3xl opacity-70 pointer-events-none"
                        style="background: radial-gradient(circle, rgba(242,216,220,0.95) 0%, rgba(231,179,189,0.55) 45%, transparent 72%)"
                    />
                    <div
                        class="absolute inset-[12%] rounded-full border border-gold/40 pointer-events-none"
                        aria-hidden="true"
                    />
                    <span
                        v-for="(s, i) in sparkles"
                        :key="i"
                        class="sparkle"
                        :style="{ top: s.top, left: s.left, animationDelay: s.delay, transform: `scale(${s.scale})` }"
                        aria-hidden="true"
                    />
                    <img
                        src="@/assets/hero-apothecary.webp"
                        alt="Lathered & Lit Apothecary handcrafted soaps, lotion bar, and body care"
                        width="960"
                        height="872"
                        fetchpriority="high"
                        decoding="async"
                        class="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg h-auto object-contain drop-shadow-[0_24px_36px_rgba(139,115,85,0.28)]"
                    />
                </div>
            </div>
        </div>

        <!-- Scroll hint -->
        <div
            class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-muted animate-bounce">
            <span class="text-[10px] font-body uppercase tracking-widest">Scroll</span>
            <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
            </svg>
        </div>
    </section>
</template>

<style scoped>
/* Entrance stagger (seconds) — image early so LCP is not gated on text. */
.hero-label { --enter-delay: 0.1s; }
.hero-title { --enter-delay: 0.18s; }
.hero-image { --enter-delay: 0.2s; }
.hero-sub { --enter-delay: 0.3s; }
.hero-ctas { --enter-delay: 0.42s; }
.hero-trust { --enter-delay: 0.5s; }

.badge-flip-enter-active,
.badge-flip-leave-active {
    transition: opacity 0.25s ease;
}

.badge-flip-enter-from,
.badge-flip-leave-to {
    opacity: 0;
}
</style>

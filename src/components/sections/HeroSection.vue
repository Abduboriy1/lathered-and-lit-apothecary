<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import {gsap} from 'gsap'
import {RouterLink} from 'vue-router'
import GlowButton from '@/components/ui/GlowButton.vue'
import woodTexture from '@/assets/textures/rustic-wood2.png'

const heroRef = ref<HTMLElement | null>(null)

const badges = ['Small-batch', 'Skin-loving', 'Hand-crafted']
const badgeColors = ['text-gold', 'text-teal', 'text-blush']
const badgeIndex = ref(0)
const badgeVisible = ref(true)
let badgeTimer: ReturnType<typeof setInterval>

onUnmounted(() => clearInterval(badgeTimer))

onMounted(() => {
    badgeTimer = setInterval(() => {
        badgeVisible.value = false
        setTimeout(() => {
            badgeIndex.value = (badgeIndex.value + 1) % badges.length
            badgeVisible.value = true
        }, 350)
    }, 2200)

    gsap.fromTo(
        ['.hero-label', '.hero-title', '.hero-sub', '.hero-tagline', '.hero-ctas', '.hero-image'],
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.4},
    )
})
</script>

<template>
    <section
        ref="heroRef"
        class="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-20"
    >
        <!-- Wood texture overlay -->
        <div
            class="absolute inset-0 pointer-events-none"
            :style="{
            backgroundImage: `url(${woodTexture}),url(${woodTexture})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px',
            backgroundBlendMode: 'multiply',
            opacity: 0.17,
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }"
        />

        <!-- Decorative background orbs -->
        <div class="absolute top-20 right-10 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
             style="background: radial-gradient(circle, #C27080, transparent 70%)"/>
        <div class="absolute bottom-20 left-5 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
             style="background: radial-gradient(circle, #7A9470, transparent 70%)"/>

        <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            <!-- Text side -->
            <div class="flex flex-col items-start">
                <p class="hero-label font-script text-gold text-3xl font-semibold italic mb-2 opacity-0 flex items-center flex-wrap gap-x-2">
                    <span>Handcrafted soaps,</span>
                    <span class="relative inline-block min-w-[10rem] h-[1.2em]">
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

                <h1 class="hero-title font-display font-bold text-6xl md:text-8xl uppercase tracking-wide leading-tight mb-4 opacity-0">
                    <span class="text-teal block">Lathered</span>
                    <span class="text-blush">&amp; Lit</span>
                </h1>

                <p class="hero-sub font-body text-gray-500 text-lg md:text-xl leading-relaxed max-w-md mb-8 opacity-0">
                    Small-batch artisan soaps and body care, made with natural ingredients and crafted with care.
                    Treat your skin — you deserve it.
                </p>

                <div class="hero-ctas flex gap-4 flex-wrap opacity-0">
                    <RouterLink to="/shop">
                        <GlowButton size="lg">Shop Now</GlowButton>
                    </RouterLink>
                    <RouterLink to="/shop">
                        <GlowButton variant="outline" size="lg">Our Story</GlowButton>
                    </RouterLink>
                </div>

            </div>

            <!-- Hero image (placeholder — swap src when ready) -->
            <div class="hero-image hidden lg:flex justify-center items-center opacity-0 w-full">
                <img
                    src="@/assets/HeroPic.png"
                    alt="Lathered & Lit hero"
                    class="w-full max-w-2xl object-contain"
                />
            </div>
        </div>

        <!-- Scroll hint -->
        <div
            class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce">
            <span class="text-[10px] font-body uppercase tracking-widest">Scroll</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
            </svg>
        </div>
    </section>
</template>

<style scoped>
.badge-flip-enter-active,
.badge-flip-leave-active {
    transition: opacity 0.25s ease;
}

.badge-flip-enter-from,
.badge-flip-leave-to {
    opacity: 0;
}
</style>

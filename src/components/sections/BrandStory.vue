<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useScrollReveal } from "@/composables/useGsap";
import GlowButton from "@/components/ui/GlowButton.vue";
import candle from "@/assets/LatheredAndLit.png";

const imgRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

useScrollReveal(() => imgRef.value, {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
    stagger: 0,
    start: "top 75%",
});

useScrollReveal(() => textRef.value, {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
    stagger: 0,
    start: "top 75%",
});
</script>

<template>
    <section class="py-24 bg-pearl-gradient overflow-hidden">
        <div
            class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
            <!-- Image -->
            <div ref="imgRef" class="relative" style="opacity: 0">
                <div
                    class="absolute -inset-4 rounded-3xl blur-2xl opacity-25 pointer-events-none"
                    style="
                        background: radial-gradient(
                            circle,
                            #C27080,
                            transparent 70%
                        );
                    "
                />
                <img
                    :src="candle"
                    alt="Artisan soaps"
                    class="w-full rounded-3xl object-cover aspect-[4/5] shadow-lg relative z-10"
                />
                <!-- Floating badge -->
                <div
                    class="absolute -bottom-4 -right-4 z-20 glass rounded-2xl px-5 py-3 text-center shadow-glow"
                >
                    <p class="font-script text-blush text-2xl">100%</p>
                    <p
                        class="text-[10px] uppercase tracking-widest text-gray-500 font-body"
                    >
                        Natural
                    </p>
                </div>
            </div>

            <!-- Text -->
            <div ref="textRef" style="opacity: 0">
                <p class="font-script text-gold text-xl italic mb-2">
                    our story
                </p>
                <h2
                    class="font-display text-3xl md:text-4xl text-gray-800 font-medium leading-tight mb-4"
                >
                    Born from a love of<br />the quiet rituals
                </h2>
                <div class="w-10 h-0.5 bg-gold-light rounded-full mb-6" />

                <p class="text-gray-500 font-body leading-relaxed mb-4">
                    Every bar we make starts with the same intention: to
                    create a moment of calm in a busy day. We cold-process each
                    batch in small quantities using natural oils, botanicals,
                    and clean fragrance — because what touches your skin
                    matters.
                </p>
                <p class="text-gray-500 font-body leading-relaxed mb-8">
                    Each bar is a little work of art, cured slowly and crafted
                    with care. We believe self-care should feel luxurious, not
                    guilty.
                </p>

                <RouterLink to="/shop">
                    <GlowButton variant="outline" size="lg"
                        >Explore the Collection</GlowButton
                    >
                </RouterLink>
            </div>
        </div>
    </section>
</template>

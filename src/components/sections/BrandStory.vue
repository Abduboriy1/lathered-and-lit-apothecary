<script setup lang="ts">
import {ref} from "vue";
import {RouterLink} from "vue-router";
import {useScrollReveal} from "@/composables/useReveal";
import GlowButton from "@/components/ui/GlowButton.vue";
import storyImage from "@/assets/our-story-cover.webp";

const imgRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

useScrollReveal(() => imgRef.value, {
    from: {opacity: 0, x: -60},
    stagger: 0,
    start: "top 75%",
});

useScrollReveal(() => textRef.value, {
    from: {opacity: 0, x: 60},
    stagger: 0,
    start: "top 75%",
});
</script>

<template>
    <section id="our-story" class="py-16 md:py-24 bg-pearl-gradient overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div
            class="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
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
                <!-- Rose-gold frame -->
                <div class="absolute -inset-2.5 rounded-[1.9rem] pointer-events-none z-0"
                     style="background: linear-gradient(135deg, #C9A96E, #F2D8DC 40%, #C27080 70%, #C9A96E); opacity: 0.85" />
                <div class="absolute -inset-1 rounded-[1.7rem] bg-ivory pointer-events-none z-0" />
                <img
                    :src="storyImage"
                    alt="Lathered & Lit Apothecary handcrafted soap bars"
                    width="1040"
                    height="774"
                    loading="lazy"
                    decoding="async"
                    class="w-full rounded-3xl object-cover object-center aspect-[4/3] shadow-luxe relative z-10"
                />
                <!-- Floating badge -->
                <div
                    class="absolute -bottom-5 right-2 md:-right-6 z-20 glass-card rounded-2xl px-5 py-3 md:px-6 md:py-3.5 text-center shadow-glow-gold"
                >
                    <p class="font-script italic text-rosegold text-3xl leading-none">100%</p>
                    <p
                        class="text-[10px] uppercase tracking-widest text-ink-soft font-body"
                    >
                        Natural
                    </p>
                </div>
            </div>

            <!-- Text -->
            <div ref="textRef" class="pt-2 lg:pt-0" style="opacity: 0">
                <p class="font-script text-gold text-2xl italic mb-2">
                    our story
                </p>
                <h2
                    class="font-display text-[1.85rem] sm:text-3xl md:text-[2.75rem] text-ink font-medium leading-[1.15] mb-5"
                >
                    The Heart Behind<br/><i><span class="text-teal">Lathered</span> <span class="text-rosegold">&amp; Lit</span> <span class="text-teal">Apothecary</span></i>
                </h2>
                <div class="gold-rule justify-start mb-7"><span /></div>

                <p class="text-ink-soft font-body leading-relaxed mb-4">
                    <b><i class="text-blush-deep">Lathered & Lit Apothecary</i></b> was born out of a love for handmade quality, family traditions, and the
                    peaceful hustle of farm life.
                </p>
                <p class="text-ink-soft font-body leading-relaxed mb-8">
                    Based on our family farm—where I’m lucky enough to live and work alongside my husband and our animal
                    menagerie—this business is a true labor of love.
                    <b>We are incredibly proud to be supported in this adventure by both sides of our family, with my
                        parents and my husband’s parents cheering us on and helping us grow.</b>
                </p>
                <p class="text-ink-soft font-body leading-relaxed mb-8">
                    I started making body care because I believe the products we use every day should do more than just
                    clean; they should make us feel good. Every batch we make is crafted with premium ingredients and a
                    genuine desire to put a smile on your face.
                </p>
                <p class="text-ink-soft font-body leading-relaxed mb-8">
                    When you buy from <b><i class="text-blush-deep">Lathered & Lit Apothecary</i></b>, you aren't just getting great soap. You're getting a
                    piece of our handmade, farm-fresh happiness.
                </p>


                <RouterLink to="/shop" class="flex sm:inline-flex">
                    <GlowButton variant="outline" size="lg" class="w-full sm:w-auto">Explore the Collection</GlowButton>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

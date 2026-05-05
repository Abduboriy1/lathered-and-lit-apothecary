<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useGsap'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const sectionRef = ref<HTMLElement | null>(null)

useScrollReveal(() => sectionRef.value?.querySelectorAll('.testimonial-card') ?? null, {
  stagger: 0.15,
  start: 'top 80%',
})

const testimonials = [
  {
    stars: 5,
    quote: 'The Velvet Rose & Amber is absolutely divine. My whole apartment smells like a luxury spa. I\'ve ordered three times already.',
    name: 'Sofia R.',
    location: 'New York',
  },
  {
    stars: 5,
    quote: 'Clean, beautiful, and the packaging is so lovely I could cry. These make the best gifts. My friends are obsessed.',
    name: 'Maya L.',
    location: 'Los Angeles',
  },
  {
    stars: 5,
    quote: 'I\'m a candle snob and these are genuinely the best I\'ve ever burned. Even burn, no tunneling. Worth every penny.',
    name: 'Chloe B.',
    location: 'Chicago',
  },
]
</script>

<template>
  <section class="py-24 px-6 bg-blush-light/30">
    <div class="max-w-7xl mx-auto">
      <SectionTitle label="love letters" title="What our customers say" />

      <div ref="sectionRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="testimonial-card"
          style="opacity: 0"
        >
          <GlassCard>
            <!-- Stars -->
            <div class="flex gap-0.5 mb-4">
              <svg
                v-for="s in t.stars"
                :key="s"
                class="w-4 h-4 text-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <p class="font-body text-gray-600 text-sm leading-relaxed italic mb-6">
              "{{ t.quote }}"
            </p>

            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-full bg-blush/20 flex items-center justify-center text-blush font-display font-medium text-sm"
              >
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-display text-gray-700">{{ t.name }}</p>
                <p class="text-xs text-gray-400 font-body">{{ t.location }}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

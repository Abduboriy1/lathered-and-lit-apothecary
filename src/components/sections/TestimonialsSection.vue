<script setup lang="ts">
import SectionTitle from '@/components/ui/SectionTitle.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const testimonials = [
  {
    stars: 5,
    quote: 'The Honey Oat bar is absolutely divine. My skin has never felt softer. I\'ve ordered three times already.',
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
    quote: 'I\'m a soap snob and these are genuinely the best bars I\'ve ever used. Rich lather, no drying out. Worth every penny.',
    name: 'Chloe B.',
    location: 'Chicago',
  },
  {
    stars: 5,
    quote: 'Switched my whole family over to these bars. No more plastic bottles in the shower and everyone smells amazing.',
    name: 'Priya N.',
    location: 'Austin',
  },
  {
    stars: 5,
    quote: 'The Lavender Dream scent lingers just enough. It\'s my little moment of calm every single morning.',
    name: 'Hannah K.',
    location: 'Seattle',
  },
  {
    stars: 5,
    quote: 'Sensitive skin here and zero irritation. Finally a bar that doesn\'t leave me itchy and tight afterward.',
    name: 'Daniel M.',
    location: 'Denver',
  },
  {
    stars: 5,
    quote: 'Lasts so much longer than the drugstore stuff. One bar got me through nearly two months of daily use.',
    name: 'Olivia T.',
    location: 'Portland',
  },
  {
    stars: 5,
    quote: 'Bought a set as a hostess gift and ended up keeping half for myself. No regrets. Reordering immediately.',
    name: 'Grace W.',
    location: 'Boston',
  },
  {
    stars: 5,
    quote: 'The Charcoal bar cleared up my back breakouts in two weeks. I genuinely did not expect it to work this well.',
    name: 'Marcus L.',
    location: 'Atlanta',
  },
  {
    stars: 5,
    quote: 'Everything about this brand feels intentional. The unboxing alone made my week. Such a treat.',
    name: 'Isabel C.',
    location: 'Miami',
  },
  {
    stars: 5,
    quote: 'My partner is picky about scents and even he asked me to reorder the Cedar bar. That never happens.',
    name: 'Renee P.',
    location: 'Nashville',
  },
  {
    stars: 5,
    quote: 'Rich, creamy lather that feels like a spa. I look forward to my showers now, which is a sentence I never thought I\'d write.',
    name: 'Aiko S.',
    location: 'San Francisco',
  },
  {
    stars: 5,
    quote: 'Travel-friendly, no leaks, no TSA drama. These bars come with me everywhere now.',
    name: 'Tomas G.',
    location: 'Phoenix',
  },
  {
    stars: 5,
    quote: 'The Rose Clay bar is gorgeous and gentle. My teenager actually uses it without being asked. Small miracle.',
    name: 'Bianca D.',
    location: 'Philadelphia',
  },
  {
    stars: 5,
    quote: 'Beautiful product, ethical brand, and it actually performs. Rare to get all three. Customer for life.',
    name: 'Elena V.',
    location: 'Minneapolis',
  },
]

// Duplicate the list so the marquee track can loop seamlessly.
const track = [...testimonials, ...testimonials]
</script>

<template>
  <section class="relative pt-24 pb-28 bg-blush-light/30 overflow-hidden">
    <div class="absolute inset-x-0 top-0 h-px bg-rosegold-line opacity-70" aria-hidden="true" />
    <div class="px-6 max-w-7xl mx-auto">
      <SectionTitle label="love letters" title="What Our Customers Say" />
    </div>

    <div class="marquee mt-4">
      <div class="marquee-track">
        <div
          v-for="(t, i) in track"
          :key="i"
          class="marquee-item w-[300px] sm:w-[340px]"
          aria-hidden="false"
        >
          <GlassCard class="h-full flex flex-col">
            <span class="absolute top-3 right-5 font-display text-6xl leading-none text-blush/15 select-none" aria-hidden="true">&rdquo;</span>
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

            <p class="font-body text-ink-soft text-sm leading-relaxed italic mb-6 flex-1">
              "{{ t.quote }}"
            </p>

            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-full bg-gradient-to-br from-blush-light via-blush-soft to-gold-light flex items-center justify-center text-blush-deep font-display font-semibold text-sm shrink-0 shadow-glow"
              >
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-display text-ink">{{ t.name }}</p>
                <p class="text-xs text-ink-muted font-body">{{ t.location }}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}

.marquee-track {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  width: max-content;
  padding-inline: 1.5rem;
  /* Track holds two copies; shifting by -50% lands on the start of the
     second copy, which is identical to the first -> seamless loop. */
  animation: marquee-scroll 70s linear infinite;
  will-change: transform;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-item {
  flex: 0 0 auto;
}

/* Start at the second copy and move toward the first -> visually L→R. */
@keyframes marquee-scroll {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    transform: translateX(-50%);
  }
}
</style>

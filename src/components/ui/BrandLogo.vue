<script setup lang="ts">
/**
 * Lathered & Lit Apothecary wordmark.
 * Mirrors the treatment used on the company's Facebook posts:
 * "LATHERED & LIT" with letter-spaced "APOTHECARY" flanked by two accent dots.
 *
 * layout="stacked" (default) puts APOTHECARY centered underneath.
 * layout="inline" puts everything on one line, vertically centered (header).
 */
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    layout?: 'stacked' | 'inline'
  }>(),
  { size: 'md', layout: 'stacked' },
)

const sizes = {
  sm: {
    name: 'text-2xl gap-1',
    sub: 'text-[0.55rem] tracking-[0.38em] gap-1.5',
    dot: 'w-1 h-1',
  },
  md: {
    name: 'text-4xl gap-2',
    sub: 'text-[0.7rem] tracking-[0.42em] gap-2',
    dot: 'w-1.5 h-1.5',
  },
  lg: {
    name: 'text-5xl gap-2',
    sub: 'text-xs tracking-[0.5em] gap-2.5',
    dot: 'w-1.5 h-1.5',
  },
} as const
</script>

<template>
  <div
    :class="[
      'select-none leading-none',
      layout === 'inline'
        ? 'inline-flex flex-row items-center gap-3'
        : 'inline-flex flex-col items-center',
    ]"
  >
    <div
      :class="[
        'font-display font-bold uppercase tracking-wide whitespace-nowrap flex items-baseline',
        sizes[size].name,
      ]"
    >
      <span class="text-teal">Lathered</span>
      <span class="text-rosegold">&amp; Lit</span>
    </div>
    <div
      v-if="layout === 'inline'"
      class="h-5 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
      aria-hidden="true"
    />
    <div
      :class="[
        'font-body font-medium uppercase text-teal whitespace-nowrap flex items-center',
        sizes[size].sub,
        layout === 'inline' ? '' : 'mt-1',
      ]"
      :style="layout === 'inline' ? undefined : { paddingLeft: '0.05em' }"
    >
      <span :class="['rounded-full bg-blush flex-shrink-0', sizes[size].dot]" aria-hidden="true" />
      <span>Apothecary</span>
      <span :class="['rounded-full bg-blush flex-shrink-0', sizes[size].dot]" aria-hidden="true" />
    </div>
  </div>
</template>

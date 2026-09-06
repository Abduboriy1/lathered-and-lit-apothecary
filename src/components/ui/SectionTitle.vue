<script setup lang="ts">
defineProps<{
  label?: string
  title?: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="['mb-12', align === 'left' ? 'text-left' : 'text-center']">
    <p v-if="label" class="font-script text-gold text-xl md:text-2xl italic mb-1 tracking-wide">
      {{ label }}
    </p>
    <h2
      v-if="title"
      class="font-display text-3xl md:text-[2.75rem] leading-[1.15] text-ink font-medium"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-3 text-ink-soft text-sm md:text-base font-body max-w-xl" :class="align === 'left' ? '' : 'mx-auto'">
      {{ subtitle }}
    </p>
    <div :class="['gold-rule mt-5', align === 'left' ? 'justify-start' : 'justify-center']">
      <span />
    </div>
  </div>
</template>

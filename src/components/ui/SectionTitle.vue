<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="['mb-10', align === 'left' ? 'text-left' : 'text-center']">
    <p v-if="label" class="font-script text-gold text-lg italic mb-1">{{ label }}</p>
    <h2 class="font-display text-3xl md:text-4xl text-gray-800 font-medium leading-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-2 text-gray-500 text-sm font-body">{{ subtitle }}</p>
    <div :class="['mt-3 h-0.5 bg-gold-light rounded-full', align === 'left' ? 'w-10' : 'w-10 mx-auto']" />
  </div>
</template>

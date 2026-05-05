<script setup lang="ts">
defineProps<{
  hover?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'glass-card p-6',
      hover && 'transition-all duration-300 hover:shadow-glow hover:scale-[1.02]',
    ]"
  >
    <slot />
  </div>
</template>

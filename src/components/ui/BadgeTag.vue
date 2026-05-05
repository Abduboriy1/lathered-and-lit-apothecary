<script setup lang="ts">
defineProps<{
  type: 'bestseller' | 'new' | 'limited'
}>()
</script>

<template>
  <span
    :class="[
      'inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 uppercase tracking-wide',
      type === 'bestseller' ? 'bg-blush/30 text-blush' : type === 'new' ? 'bg-mint/40 text-teal' : 'bg-gold-light/60 text-gold',
    ]"
  >
    {{ type === 'bestseller' ? 'Best Seller' : type === 'new' ? 'New' : 'Limited' }}
  </span>
</template>

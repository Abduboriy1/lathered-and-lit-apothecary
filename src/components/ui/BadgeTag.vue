<script setup lang="ts">
defineProps<{
  type: 'bestseller' | 'new' | 'limited'
}>()
</script>

<template>
  <span
    :class="[
      'inline-block text-[10px] font-semibold rounded-full px-2.5 py-1 uppercase tracking-[0.14em] shadow-sm backdrop-blur-sm',
      type === 'bestseller' ? 'bg-rose-gradient text-white' : type === 'new' ? 'bg-mint text-white' : 'bg-gradient-to-r from-gold to-gold-light text-ink',
    ]"
  >
    {{ type === 'bestseller' ? 'Best Seller' : type === 'new' ? 'New' : 'Limited' }}
  </span>
</template>

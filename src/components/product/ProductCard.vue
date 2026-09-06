<script setup lang="ts">
/**
 * Legacy alias kept for backwards compatibility; ShopItem is the canonical card.
 */
import type { Product } from '@/types'
import ShopItem from './ShopItem.vue'

defineProps<{ product: Product }>()
</script>

<template>
  <ShopItem :product="product" />
</template>

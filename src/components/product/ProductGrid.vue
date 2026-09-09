<script setup lang="ts">
import type { Product } from '@/types'
import ShopItem from './ShopItem.vue'

defineProps<{
  products: Product[]
  columns?: 2 | 4
}>()
</script>

<template>
  <div
    :class="[
      'grid gap-3 sm:gap-6',
      columns === 2
        ? 'grid-cols-2'
        : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    ]"
  >
    <ShopItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

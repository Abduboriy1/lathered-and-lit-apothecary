<script setup lang="ts">
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import type { Product } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'

type Category = 'all' | 'candle' | 'soap' | 'set'

const activeCategory = ref<Category>('all')

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'candle', label: 'Candles' },
  { key: 'soap', label: 'Soaps' },
  { key: 'set', label: 'Gift Sets' },
]

const filtered = computed<Product[]>(() =>
  activeCategory.value === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory.value),
)
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <SectionTitle
      label="the full collection"
      title="Shop All"
      subtitle="Every candle, soap, and set — handmade with love."
    />

    <!-- Filters -->
    <div class="flex gap-3 flex-wrap mb-10 justify-center">
      <button
        v-for="f in filters"
        :key="f.key"
        :class="[
          'px-5 py-2 rounded-full text-sm font-body transition-all duration-200 cursor-pointer',
          activeCategory === f.key
            ? 'bg-blush text-white shadow-glow'
            : 'border border-blush/30 text-gray-500 hover:border-blush hover:text-blush',
        ]"
        @click="activeCategory = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <ProductGrid :products="filtered" />

    <p v-if="filtered.length === 0" class="text-center text-gray-400 font-body mt-16">
      No products in this category yet — check back soon!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/products'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'

type Category = 'all' | 'candle' | 'soap' | 'set'

const productStore = useProductsStore()
const activeCategory = ref<Category>('all')

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'candle', label: 'Candles' },
  { key: 'soap', label: 'Soaps' },
  { key: 'set', label: 'Gift Sets' },
]

const filtered = computed<Product[]>(() =>
  activeCategory.value === 'all'
    ? productStore.products
    : productStore.products.filter((p) => p.category === activeCategory.value),
)

onMounted(() => productStore.fetchProducts())
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <SectionTitle
      label="the full collection"
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

    <!-- Loading skeleton -->
    <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="glass-card overflow-hidden animate-pulse">
        <div class="aspect-square bg-blush/10 rounded-t-2xl" />
        <div class="p-4 space-y-2">
          <div class="h-4 bg-blush/10 rounded w-3/4" />
          <div class="h-3 bg-blush/10 rounded w-1/2" />
          <div class="h-8 bg-blush/10 rounded-full w-1/3 mt-3" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <p v-else-if="productStore.error" class="text-center text-rose-400 font-body mt-16">
      {{ productStore.error }}
      <button class="block mx-auto mt-3 text-blush underline" @click="productStore.fetchProducts()">
        Try again
      </button>
    </p>

    <template v-else>
      <ProductGrid :products="filtered" />
      <p v-if="filtered.length === 0" class="text-center text-gray-400 font-body mt-16">
        No products in this category yet — check back soon!
      </p>
    </template>
  </div>
</template>

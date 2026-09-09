<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/products'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { trackCustom } from '@/lib/pixel'

type Category = 'all' | 'soap' | 'body' | 'set' | 'bath' | 'outdoor' | 'wax_melts' | 'pet'

const productStore = useProductsStore()
const activeCategory = ref<Category>('all')

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'soap', label: 'Bar Soaps' },
  { key: 'body', label: 'Body Care' },
  { key: 'set', label: 'Gift Sets' },
  { key: 'bath', label: 'Bath' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'wax_melts', label: 'Wax Melts' },
  { key: 'pet', label: 'Pet' },
]

watch(activeCategory, (category) => trackCustom('FilterCategory', { category }))

const filtered = computed<Product[]>(() =>
  activeCategory.value === 'all'
    ? productStore.products
    : productStore.products.filter((p) => p.category === activeCategory.value),
)

onMounted(() => productStore.fetchProducts())
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Soft rose glow at the top of the shop page -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] rounded-full opacity-40 blur-3xl pointer-events-none"
         style="background: radial-gradient(ellipse, #F2D8DC, transparent 70%)" />

    <div class="relative pt-24 md:pt-32 pb-16 md:pb-24 px-5 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <SectionTitle
        label="the full collection"
        title="Shop the Apothecary"
        subtitle="Every bar, body care, and set — handcrafted in small batches."
      />

      <!-- Filters -->
      <div class="flex gap-2 sm:gap-2.5 flex-wrap mb-8 md:mb-12 justify-center">
        <button
          v-for="f in filters"
          :key="f.key"
          :class="[
            'px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] font-body font-medium transition-all duration-300 cursor-pointer',
            activeCategory === f.key
              ? 'bg-rose-gradient text-white shadow-btn-gloss'
              : 'border border-stone/70 bg-white/40 text-ink-soft hover:border-blush hover:text-blush-deep hover:bg-white/80',
          ]"
          @click="activeCategory = f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="productStore.loading" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div v-for="n in 8" :key="n" class="glass-card overflow-hidden animate-pulse">
          <div class="aspect-square bg-blush/10" />
          <div class="p-4 space-y-2">
            <div class="h-4 bg-blush/10 rounded w-3/4 mx-auto" />
            <div class="h-3 bg-blush/10 rounded w-1/3 mx-auto" />
          </div>
        </div>
      </div>

      <!-- Error -->
      <p v-else-if="productStore.error" class="text-center text-blush-deep font-body mt-16">
        {{ productStore.error }}
        <button class="block mx-auto mt-3 text-blush-deep underline underline-offset-4 cursor-pointer" @click="productStore.fetchProducts()">
          Try again
        </button>
      </p>

      <template v-else>
        <ProductGrid :products="filtered" />
        <p v-if="filtered.length === 0" class="text-center text-ink-muted font-body mt-16">
          No products in this category yet — check back soon!
        </p>
      </template>
    </div>
  </div>
</template>

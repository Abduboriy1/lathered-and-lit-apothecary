<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { revealOnScroll } from '@/composables/useReveal'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ShopItem from '@/components/product/ShopItem.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const productStore = useProductsStore()
const sectionRef = ref<HTMLElement | null>(null)
let cleanupReveal: (() => void) | null = null

async function initScrollReveal() {
  await nextTick()
  cleanupReveal?.()
  cleanupReveal = revealOnScroll(sectionRef.value?.querySelectorAll('.product-card-wrapper'), {
    from: { opacity: 0, y: 40 },
    stagger: 0.08,
    start: 'top 85%',
  })
}

watch(
  () => productStore.products,
  async (products) => {
    if (products.length) await initScrollReveal()
  },
  { immediate: true },
)

onMounted(() => productStore.fetchFeaturedProducts())

onUnmounted(() => cleanupReveal?.())
</script>

<template>
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <SectionTitle label="our collection" title="Fan Favorites" subtitle="Crafted with intention, designed for everyday ritual." />

    <!-- Loading skeleton -->
    <div v-if="productStore.loading && !productStore.products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="glass-card overflow-hidden animate-pulse">
        <div class="aspect-square bg-blush/10" />
        <div class="p-4 space-y-2">
          <div class="h-4 bg-blush/10 rounded w-3/4 mx-auto" />
          <div class="h-3 bg-blush/10 rounded w-1/3 mx-auto" />
        </div>
      </div>
    </div>

    <div v-else ref="sectionRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="product-card-wrapper"
        style="opacity: 0"
      >
        <ShopItem :product="product" />
      </div>
    </div>

    <div class="text-center mt-14">
      <RouterLink to="/shop">
        <GlowButton variant="outline" size="lg">
          View All Products
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </GlowButton>
      </RouterLink>
    </div>
  </section>
</template>

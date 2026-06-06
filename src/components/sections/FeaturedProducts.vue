<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProductsStore } from '@/stores/products'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ShopItem from '@/components/product/ShopItem.vue'

const productStore = useProductsStore()
const sectionRef = ref<HTMLElement | null>(null)
let scrollTriggerInstance: ScrollTrigger | null = null

async function initScrollReveal() {
  await nextTick()
  const items = sectionRef.value?.querySelectorAll('.product-card-wrapper')
  if (!items?.length) return
  gsap.fromTo(
    items,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: items[0],
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const all = ScrollTrigger.getAll()
          scrollTriggerInstance = all[all.length - 1] ?? null
        },
      },
    },
  )
}

watch(
  () => productStore.products,
  async (products) => {
    if (products.length) await initScrollReveal()
  },
  { immediate: true },
)

onMounted(() => productStore.fetchFeaturedProducts())

onUnmounted(() => scrollTriggerInstance?.kill())
</script>

<template>
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <SectionTitle label="our collection" title="Featured Soaps" subtitle="Crafted with intention, designed for everyday ritual." />

    <!-- Loading skeleton -->
    <div v-if="productStore.loading && !productStore.products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="glass-card overflow-hidden animate-pulse">
        <div class="aspect-square bg-blush/10 rounded-t-2xl" />
        <div class="p-4 space-y-2">
          <div class="h-4 bg-blush/10 rounded w-3/4" />
          <div class="h-3 bg-blush/10 rounded w-1/2" />
          <div class="h-8 bg-blush/10 rounded-full w-1/3 mt-3" />
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

    <div class="text-center mt-10">
      <RouterLink
        to="/shop"
        class="inline-flex items-center gap-2 text-sm font-body text-gold hover:underline underline-offset-4 transition-all"
      >
        View All Products
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </section>
</template>

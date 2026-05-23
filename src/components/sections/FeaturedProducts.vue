<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const productStore = useProductsStore()
const cart = useCartStore()
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
      stagger: 0.1,
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

function addToCart(product: (typeof productStore.products)[0]) {
  cart.addItem(product)
  cart.openDrawer()
}
</script>

<template>
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <SectionTitle label="our collection" title="Featured Candles" subtitle="Poured with intention, designed for everyday ritual." />

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
        <div class="glass-card overflow-hidden group transition-all duration-300 hover:shadow-glow hover:scale-[1.02] flex flex-col h-full">
          <RouterLink :to="`/product/${product.id}`" class="block relative overflow-hidden aspect-square">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div v-if="product.badges?.length" class="absolute top-3 left-3 flex flex-wrap gap-1">
              <span
                v-for="badge in product.badges"
                :key="badge"
                :class="[
                  'inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 uppercase tracking-wide',
                  badge === 'bestseller' ? 'bg-blush/30 text-blush' : badge === 'new' ? 'bg-mint/40 text-teal' : 'bg-gold-light/60 text-gold',
                ]"
              >
                {{ badge === 'bestseller' ? 'Best Seller' : badge === 'new' ? 'New' : 'Limited' }}
              </span>
            </div>
          </RouterLink>

          <div class="p-4 flex flex-col flex-1">
            <RouterLink :to="`/product/${product.id}`">
              <h3 class="font-display text-gray-800 text-base leading-snug hover:text-blush transition-colors">
                {{ product.name }}
              </h3>
            </RouterLink>
            <div class="flex flex-wrap gap-1 mt-2 mb-3">
              <span
                v-for="scent in product.scent.slice(0, 2)"
                :key="scent"
                class="text-[10px] font-body text-gray-400 bg-blush/10 rounded-full px-2 py-0.5"
              >
                {{ scent }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-auto">
              <span class="font-display text-gray-800 text-lg">${{ product.price }}</span>
              <button
                class="inline-flex items-center justify-center rounded-full font-body font-medium transition-all duration-300 cursor-pointer px-5 py-2 text-sm bg-blush text-white shadow-glow hover:bg-blush/90"
                @click="addToCart(product)"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
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

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductDetail from '@/components/product/ProductDetail.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()
const productStore = useProductsStore()

async function load(handle: string) {
  await productStore.fetchProductByHandle(handle)
  if (!productStore.loading && !productStore.currentProduct) {
    router.replace({ name: 'shop' })
  }
}

onMounted(() => load(props.id))
watch(() => props.id, (id) => load(id))
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <!-- Loading skeleton -->
    <div v-if="productStore.loading" class="animate-pulse">
      <div class="flex gap-2 mb-10">
        <div class="h-3 w-10 bg-blush/10 rounded" />
        <div class="h-3 w-3 bg-blush/10 rounded" />
        <div class="h-3 w-10 bg-blush/10 rounded" />
        <div class="h-3 w-3 bg-blush/10 rounded" />
        <div class="h-3 w-24 bg-blush/10 rounded" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="aspect-square bg-blush/10 rounded-2xl" />
        <div class="space-y-4">
          <div class="h-8 bg-blush/10 rounded w-2/3" />
          <div class="h-5 bg-blush/10 rounded w-1/4" />
          <div class="h-24 bg-blush/10 rounded" />
          <div class="h-12 bg-blush/10 rounded-full w-40" />
        </div>
      </div>
    </div>

    <template v-else-if="productStore.currentProduct">
      <!-- Breadcrumb -->
      <nav class="flex gap-2 text-xs text-gray-400 font-body mb-10">
        <RouterLink to="/" class="hover:text-blush transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/shop" class="hover:text-blush transition-colors">Shop</RouterLink>
        <span>/</span>
        <span class="text-gray-600">{{ productStore.currentProduct.name }}</span>
      </nav>

      <ProductDetail :product="productStore.currentProduct" />

      <!-- Related products -->
      <div v-if="productStore.relatedProducts.length" class="mt-24">
        <SectionTitle label="you may also like" title="More to Love" align="left" />
        <ProductGrid :products="productStore.relatedProducts" />
      </div>
    </template>
  </div>
</template>

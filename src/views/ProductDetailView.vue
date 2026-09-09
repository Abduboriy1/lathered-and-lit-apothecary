<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
  <div class="min-h-screen flex flex-col px-5 sm:px-6">
    <!-- Loading skeleton -->
    <div v-if="productStore.loading" class="flex-1 flex items-center justify-center pt-24 md:pt-28 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
      <div class="animate-pulse w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div class="aspect-square bg-blush/10 rounded-2xl" />
          <div class="space-y-4">
            <div class="h-8 bg-blush/10 rounded w-2/3" />
            <div class="h-5 bg-blush/10 rounded w-1/4" />
            <div class="h-24 bg-blush/10 rounded" />
            <div class="h-12 bg-blush/10 rounded-full w-40" />
          </div>
        </div>
      </div>
    </div>

    <template v-else-if="productStore.currentProduct">
      <div class="flex-1 flex items-center justify-center pt-24 md:pt-28 pb-20 md:pb-16 max-w-7xl mx-auto w-full">
        <ProductDetail :product="productStore.currentProduct" class="w-full" />
      </div>

      <!-- Related products -->
      <div v-if="productStore.relatedProducts.length" class="pb-16 md:pb-24 max-w-7xl mx-auto w-full">
        <SectionTitle label="you may also like" title="More to Love" align="left" />
        <ProductGrid :products="productStore.relatedProducts" />
      </div>
    </template>
  </div>
</template>

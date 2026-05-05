<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { getProductById, getRelatedProducts } from '@/data/products'
import ProductDetail from '@/components/product/ProductDetail.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()

const product = computed(() => {
  const p = getProductById(props.id)
  if (!p) {
    router.replace({ name: 'shop' })
    return null
  }
  return p
})

const related = computed(() =>
  product.value ? getRelatedProducts(product.value, 4) : [],
)
</script>

<template>
  <div v-if="product" class="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
    <!-- Breadcrumb -->
    <nav class="flex gap-2 text-xs text-gray-400 font-body mb-10">
      <RouterLink to="/" class="hover:text-blush transition-colors">Home</RouterLink>
      <span>/</span>
      <RouterLink to="/shop" class="hover:text-blush transition-colors">Shop</RouterLink>
      <span>/</span>
      <span class="text-gray-600">{{ product.name }}</span>
    </nav>

    <ProductDetail :product="product" />

    <!-- Related products -->
    <div v-if="related.length" class="mt-24">
      <SectionTitle label="you may also like" title="More to Love" align="left" />
      <ProductGrid :products="related" />
    </div>
  </div>
</template>

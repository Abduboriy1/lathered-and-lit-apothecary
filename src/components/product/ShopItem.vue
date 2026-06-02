<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types'
import BadgeTag from '@/components/ui/BadgeTag.vue'

const props = defineProps<{ product: Product }>()

const hovered = ref(false)
const inStock = computed(() => props.product.stock > 0)
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="group flex flex-col bg-white"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-square bg-[#f5f0eb]">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        :class="hovered && product.hoverImageUrl ? 'opacity-0' : 'opacity-100'"
      />
      <img
        v-if="product.hoverImageUrl"
        :src="product.hoverImageUrl"
        :alt="product.name"
        class="absolute inset-0 w-full h-full object-contain transition-all duration-700"
        :class="hovered ? 'opacity-100' : 'opacity-0'"
      />

      <!-- Out of stock overlay -->
      <div
        v-if="!inStock"
        class="absolute inset-0 bg-white/60 flex items-center justify-center"
      >
        <span class="text-xs font-body font-semibold text-gray-400 uppercase tracking-widest">
          Out of Stock
        </span>
      </div>

      <!-- Badges -->
      <div v-if="product.badges?.length" class="absolute top-3 left-3 flex flex-wrap gap-1">
        <BadgeTag v-for="badge in product.badges" :key="badge" :type="badge" />
      </div>
    </div>

    <!-- Info -->
    <div class="pt-4 pb-5 text-center">
      <h3 class="font-display text-gray-800 text-sm tracking-widest uppercase leading-snug mb-2">
        {{ product.name }}
      </h3>
      <span class="font-body text-gray-400 text-sm tracking-wide">${{ product.price }}</span>
    </div>
  </RouterLink>
</template>

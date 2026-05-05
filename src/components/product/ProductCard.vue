<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cart'
import BadgeTag from '@/components/ui/BadgeTag.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const hovered = ref(false)
const added = ref(false)

function addToCart() {
  cart.addItem(props.product)
  cart.openDrawer()
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}
</script>

<template>
  <div
    class="glass-card overflow-hidden group transition-all duration-300 hover:shadow-glow hover:scale-[1.02] flex flex-col"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Image -->
    <RouterLink :to="`/product/${product.id}`" class="block relative overflow-hidden rounded-t-2xl aspect-square">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-cover transition-all duration-500"
        :class="hovered && product.hoverImageUrl ? 'opacity-0' : 'opacity-100'"
      />
      <img
        v-if="product.hoverImageUrl"
        :src="product.hoverImageUrl"
        :alt="product.name"
        class="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        :class="hovered ? 'opacity-100' : 'opacity-0'"
      />
      <!-- Badges -->
      <div v-if="product.badges?.length" class="absolute top-3 left-3 flex flex-wrap gap-1">
        <BadgeTag v-for="badge in product.badges" :key="badge" :type="badge" />
      </div>
    </RouterLink>

    <!-- Info -->
    <div class="p-4 flex flex-col flex-1">
      <RouterLink :to="`/product/${product.id}`">
        <h3 class="font-display text-gray-800 text-base leading-snug hover:text-blush transition-colors">
          {{ product.name }}
        </h3>
      </RouterLink>

      <div class="flex flex-wrap gap-1 mt-2 mb-3">
        <span
          v-for="scent in product.scent.slice(0, 3)"
          :key="scent"
          class="text-[10px] font-body text-gray-400 bg-blush/10 rounded-full px-2 py-0.5"
        >
          {{ scent }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <span class="font-display text-gray-800 text-lg">${{ product.price }}</span>
        <GlowButton size="sm" @click="addToCart">
          {{ added ? '✓ Added' : 'Add to Bag' }}
        </GlowButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types'
import { useCartStore } from '@/stores/cart'

defineProps<{ item: CartItem }>()

const cart = useCartStore()

function formatVariantTitle(title: string): string {
  return /^\d+(\.\d+)?$/.test(title.trim()) ? `${title.trim()} oz` : title
}
</script>

<template>
  <div class="flex gap-3 py-4 border-b border-blush/10 last:border-0">
    <!-- Thumbnail -->
    <img
      :src="item.product.imageUrl"
      :alt="item.product.name"
      class="w-16 h-16 rounded-xl object-cover flex-shrink-0"
    />

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <p class="font-display text-sm text-gray-800 truncate leading-tight">{{ item.product.name }}</p>
      <p class="text-xs text-gray-400 mt-0.5 font-body">
        <span v-if="item.variantTitle">{{ formatVariantTitle(item.variantTitle) }}</span>
        <span v-if="item.variantTitle && item.product.scent.length"> · </span>
        <span>{{ item.product.scent.slice(0, 2).join(', ') }}</span>
      </p>

      <!-- Qty controls -->
      <div class="flex items-center gap-2 mt-2">
        <button
          class="w-6 h-6 rounded-full border border-blush/40 text-blush text-sm flex items-center justify-center hover:bg-blush hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="cart.loading"
          @click="cart.updateQuantity(item.product.variantId!, item.quantity - 1)"
        >
          −
        </button>
        <span class="text-sm font-body text-gray-700 w-4 text-center">{{ item.quantity }}</span>
        <button
          class="w-6 h-6 rounded-full border border-blush/40 text-blush text-sm flex items-center justify-center hover:bg-blush hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="cart.loading"
          @click="cart.updateQuantity(item.product.variantId!, item.quantity + 1)"
        >
          +
        </button>
      </div>
    </div>

    <!-- Price + remove -->
    <div class="flex flex-col items-end gap-2 flex-shrink-0">
      <span class="text-sm font-display text-gray-800">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
      <button
        class="text-gray-300 hover:text-blush transition-colors cursor-pointer"
        @click="cart.removeItem(item.product.variantId!)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

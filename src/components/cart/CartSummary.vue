<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import GlowButton from '@/components/ui/GlowButton.vue'

const cart = useCartStore()

defineEmits<{ checkout: [] }>()
</script>

<template>
  <div class="pt-4 border-t border-blush/10">
    <div class="flex justify-between text-sm font-body text-ink-soft mb-2">
      <span>Subtotal</span>
      <span>${{ cart.subtotal.toFixed(2) }}</span>
    </div>
    <div class="flex justify-between text-sm font-body text-ink-soft mb-4">
      <span>Shipping</span>
      <span class="text-teal">{{ cart.subtotal >= 50 ? 'Free' : '$5.99' }}</span>
    </div>
    <div v-if="cart.subtotal < 50" class="mb-5">
      <p class="text-xs text-blush-deep font-body mb-2 text-center">
        Add <span class="font-semibold">${{ (50 - cart.subtotal).toFixed(2) }}</span> more for free shipping ✨
      </p>
      <div class="h-1.5 rounded-full bg-blush-light/70 overflow-hidden">
        <div
          class="h-full rounded-full bg-rose-gradient transition-all duration-500"
          :style="{ width: `${Math.min(100, (cart.subtotal / 50) * 100)}%` }"
        />
      </div>
    </div>
    <p v-else class="text-xs text-teal font-body mb-5 text-center font-medium">
      You've unlocked free shipping ✨
    </p>
    <div class="flex justify-between font-display text-ink text-lg mb-6">
      <span>Total</span>
      <span>${{ (cart.subtotal + (cart.subtotal >= 50 ? 0 : 5.99)).toFixed(2) }}</span>
    </div>

    <GlowButton size="lg" class="w-full" @click="$emit('checkout')">
      Checkout
    </GlowButton>

    <RouterLink
      to="/shop"
      class="block text-center text-xs text-ink-muted hover:text-blush font-body mt-3 transition-colors"
      @click="cart.closeDrawer()"
    >
      Continue Shopping
    </RouterLink>
  </div>
</template>

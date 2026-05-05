<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import GlowButton from '@/components/ui/GlowButton.vue'

const cart = useCartStore()

defineEmits<{ checkout: [] }>()
</script>

<template>
  <div class="pt-4 border-t border-blush/10">
    <div class="flex justify-between text-sm font-body text-gray-500 mb-2">
      <span>Subtotal</span>
      <span>${{ cart.subtotal.toFixed(2) }}</span>
    </div>
    <div class="flex justify-between text-sm font-body text-gray-500 mb-4">
      <span>Shipping</span>
      <span class="text-teal">{{ cart.subtotal >= 50 ? 'Free' : '$5.99' }}</span>
    </div>
    <p v-if="cart.subtotal < 50" class="text-xs text-gold font-body mb-4 text-center">
      Add ${{ (50 - cart.subtotal).toFixed(2) }} more for free shipping ✨
    </p>
    <div class="flex justify-between font-display text-gray-800 text-base mb-6">
      <span>Total</span>
      <span>${{ (cart.subtotal + (cart.subtotal >= 50 ? 0 : 5.99)).toFixed(2) }}</span>
    </div>

    <GlowButton size="lg" class="w-full" @click="$emit('checkout')">
      Checkout
    </GlowButton>

    <RouterLink
      to="/shop"
      class="block text-center text-xs text-gray-400 hover:text-blush font-body mt-3 transition-colors"
      @click="cart.closeDrawer()"
    >
      Continue Shopping
    </RouterLink>
  </div>
</template>

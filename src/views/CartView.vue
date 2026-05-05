<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import GlowButton from '@/components/ui/GlowButton.vue'

const cart = useCartStore()
const orderPlaced = ref(false)

function placeOrder() {
  cart.clearCart()
  orderPlaced.value = true
}
</script>

<template>
  <div class="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
    <h1 class="font-display text-3xl text-gray-800 mb-2">Your Bag</h1>
    <p class="text-sm text-gray-400 font-body mb-10">{{ cart.totalItems }} item{{ cart.totalItems !== 1 ? 's' : '' }}</p>

    <!-- Order success -->
    <div v-if="orderPlaced" class="text-center py-24">
      <div class="text-6xl mb-6">🕯️</div>
      <h2 class="font-display text-2xl text-gray-800 mb-2">Order Placed!</h2>
      <p class="text-gray-500 font-body mb-8">Thank you for your order. Your candles are on their way. ✨</p>
      <RouterLink to="/shop">
        <GlowButton size="lg">Continue Shopping</GlowButton>
      </RouterLink>
    </div>

    <!-- Empty cart -->
    <div v-else-if="cart.isEmpty" class="text-center py-24">
      <svg class="w-20 h-20 text-blush/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="font-display text-xl text-gray-600 mb-2">Your bag is empty</p>
      <p class="text-sm text-gray-400 font-body mb-8">Light it up — find something you love.</p>
      <RouterLink to="/shop">
        <GlowButton size="lg">Browse the Shop</GlowButton>
      </RouterLink>
    </div>

    <!-- Cart with items -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Items list -->
      <div class="lg:col-span-2">
        <div class="glass-card p-6">
          <CartItem v-for="item in cart.items" :key="item.product.id" :item="item" />
        </div>
      </div>

      <!-- Summary -->
      <div class="glass-card p-6 h-fit">
        <h3 class="font-display text-gray-800 text-lg mb-4">Order Summary</h3>
        <CartSummary @checkout="placeOrder" />
      </div>
    </div>
  </div>
</template>

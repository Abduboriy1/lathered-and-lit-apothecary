<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import FloatingBubbles from '@/components/animation/FloatingBubbles.vue'
import SparkleOverlay from '@/components/animation/SparkleOverlay.vue'
</script>

<template>
  <FloatingBubbles />
  <SparkleOverlay />
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
  <CartDrawer />
</template>

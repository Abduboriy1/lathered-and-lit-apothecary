<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import NewsletterPopup from '@/components/ui/NewsletterPopup.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
  <CartDrawer />
  <NewsletterPopup />
  <CookieBanner />
</template>

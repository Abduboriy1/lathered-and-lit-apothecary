<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types'
import BadgeTag from '@/components/ui/BadgeTag.vue'

const props = defineProps<{ product: Product }>()

const hovered = ref(false)
const imgFailed = ref(false)
const inStock = computed(() => props.product.stock > 0)
const showImage = computed(() => !!props.product.imageUrl && !imgFailed.value)
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="group flex flex-col rounded-2xl overflow-hidden bg-white/90 shadow-luxe transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe-hover"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-square bg-gradient-to-br from-pearl via-ivory to-blush-light/40">
      <template v-if="showImage">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          :class="hovered && product.hoverImageUrl ? 'opacity-0' : 'opacity-100'"
          @error="imgFailed = true"
        />
        <img
          v-if="product.hoverImageUrl"
          :src="product.hoverImageUrl"
          :alt="product.name"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-contain transition-all duration-700"
          :class="hovered ? 'opacity-100' : 'opacity-0'"
        />
      </template>

      <!-- Placeholder when Shopify has no image (or it failed to load) -->
      <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
        <svg class="w-12 h-12 text-blush/60" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
          <rect x="7" y="14" width="34" height="22" rx="8" />
          <path d="M14 22c2-3 6-3 8 0M26 26c2-3 6-3 8 0" stroke-linecap="round" />
          <circle cx="12" cy="10" r="2" /><circle cx="36" cy="8" r="1.5" /><circle cx="20" cy="7" r="1" />
        </svg>
        <span class="font-script italic text-gold text-lg leading-none">photo coming soon</span>
      </div>

      <!-- Shine sweep on hover -->
      <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style="background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)" />

      <!-- Out of stock overlay -->
      <div
        v-if="!inStock"
        class="absolute inset-0 bg-ivory/70 backdrop-blur-[1px] flex items-center justify-center"
      >
        <span class="text-xs font-body font-semibold text-ink-muted uppercase tracking-widest border border-stone/60 rounded-full px-4 py-1.5 bg-white/70">
          Out of Stock
        </span>
      </div>

      <!-- Badges -->
      <div v-if="product.badges?.length" class="absolute top-3 left-3 flex flex-wrap gap-1">
        <BadgeTag v-for="badge in product.badges" :key="badge" :type="badge" />
      </div>
    </div>

    <!-- Info -->
    <div class="px-4 pt-4 pb-5 text-center flex flex-col items-center gap-1.5">
      <h3 class="font-display text-ink text-sm tracking-[0.14em] uppercase leading-snug line-clamp-2 min-h-[2.6em] group-hover:text-blush-deep transition-colors">
        {{ product.name }}
      </h3>
      <span class="font-script italic text-gold text-2xl leading-none">${{ product.price }}</span>
      <span class="mt-1 text-[11px] font-body uppercase tracking-[0.2em] text-blush-deep opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        View details →
      </span>
    </div>
  </RouterLink>
</template>

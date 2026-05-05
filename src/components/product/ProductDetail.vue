<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cart'
import GlowButton from '@/components/ui/GlowButton.vue'
import BadgeTag from '@/components/ui/BadgeTag.vue'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const quantity = ref(1)
const added = ref(false)
const imageRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.fromTo(imageRef.value, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' })
  gsap.fromTo(infoRef.value, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 })
})

function addToCart() {
  cart.addItem(props.product, quantity.value)
  cart.openDrawer()
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
    <!-- Image -->
    <div ref="imageRef" class="relative">
      <div
        class="absolute inset-0 rounded-3xl blur-3xl opacity-30 -z-10"
        style="background: radial-gradient(circle at center, #f6b7c1, transparent 70%)"
      />
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full rounded-3xl object-cover aspect-square animate-float shadow-lg"
      />
    </div>

    <!-- Info -->
    <div ref="infoRef" class="py-4">
      <div class="flex flex-wrap gap-2 mb-4">
        <BadgeTag v-for="badge in product.badges" :key="badge" :type="badge" />
      </div>

      <h1 class="font-display text-3xl md:text-4xl text-gray-800 leading-tight mb-2">
        {{ product.name }}
      </h1>

      <p class="font-script text-gold text-xl italic mb-6">${{ product.price }}</p>

      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="scent in product.scent"
          :key="scent"
          class="text-xs font-body text-teal bg-mint/20 rounded-full px-3 py-1"
        >
          {{ scent }}
        </span>
      </div>

      <p class="text-gray-600 font-body leading-relaxed text-sm mb-6">{{ product.description }}</p>

      <div class="flex gap-6 text-sm text-gray-500 font-body mb-8 pb-6 border-b border-blush/15">
        <div v-if="product.burnTime">
          <span class="text-xs uppercase tracking-wide text-gray-400">Burn Time</span>
          <p class="text-gray-700 mt-0.5">{{ product.burnTime }}</p>
        </div>
        <div>
          <span class="text-xs uppercase tracking-wide text-gray-400">Weight</span>
          <p class="text-gray-700 mt-0.5">{{ product.weight }}</p>
        </div>
        <div>
          <span class="text-xs uppercase tracking-wide text-gray-400">In Stock</span>
          <p class="text-gray-700 mt-0.5">{{ product.stock }} left</p>
        </div>
      </div>

      <!-- Qty + CTA -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3 border border-blush/30 rounded-full px-4 py-2.5">
          <button
            class="text-blush hover:text-blush/70 transition-colors cursor-pointer"
            @click="quantity > 1 && quantity--"
          >
            −
          </button>
          <span class="font-body text-gray-800 w-4 text-center">{{ quantity }}</span>
          <button
            class="text-blush hover:text-blush/70 transition-colors cursor-pointer"
            @click="quantity++"
          >
            +
          </button>
        </div>

        <GlowButton size="lg" @click="addToCart">
          {{ added ? '✓ Added to Bag' : 'Add to Bag' }}
        </GlowButton>
      </div>
    </div>
  </div>
</template>

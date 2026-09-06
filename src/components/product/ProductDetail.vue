<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/stores/cart'
import GlowButton from '@/components/ui/GlowButton.vue'
import BadgeTag from '@/components/ui/BadgeTag.vue'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const added = ref(false)

const selectedVariant = ref<ProductVariant | null>(props.product.variants?.[0] ?? null)
const variantQuantities = ref<Record<string, number>>({})

const maxStock = computed(() => selectedVariant.value?.stock ?? props.product.stock)

const quantity = computed({
  get() {
    const id = selectedVariant.value?.id ?? '__default'
    return variantQuantities.value[id] ?? 1
  },
  set(val: number) {
    const id = selectedVariant.value?.id ?? '__default'
    variantQuantities.value[id] = Math.min(Math.max(1, val), maxStock.value)
  },
})

const displayPrice = computed(() =>
  selectedVariant.value ? selectedVariant.value.price : props.product.price
)

function addToCart() {
  const productToAdd = selectedVariant.value
    ? {
        ...props.product,
        variantId: selectedVariant.value.id,
        price: selectedVariant.value.price,
        stock: selectedVariant.value.stock,
      }
    : props.product
  cart.addItem(productToAdd, quantity.value)
  cart.openDrawer()
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
    <!-- Image -->
    <div class="relative rounded-3xl p-8 aspect-square flex items-center justify-center bg-gradient-to-br from-pearl via-ivory to-blush-light/40 shadow-luxe overflow-hidden">
      <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none" style="background: radial-gradient(circle, #E7B3BD, transparent 70%)" />
      <img
        :src="product.imageUrl"
        :alt="product.name"
        fetchpriority="high"
        decoding="async"
        class="relative w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(139,115,85,0.25)]"
      />
    </div>

    <!-- Info -->
    <div class="py-4">
      <div class="flex flex-wrap gap-2 mb-4">
        <BadgeTag v-for="badge in product.badges" :key="badge" :type="badge" />
      </div>

      <h1 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-2">
        {{ product.name }}
      </h1>

      <p class="font-script text-rosegold text-5xl italic mb-6 leading-none">${{ displayPrice.toFixed(2) }}</p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="scent in product.scent"
          :key="scent"
          class="text-xs font-body text-teal bg-mint/20 border border-mint/30 rounded-full px-3 py-1"
        >
          {{ scent }}
        </span>
      </div>

      <!-- Size selector -->
      <div v-if="product.variants && product.variants.length > 1" class="mb-6">
        <p class="text-xs uppercase tracking-wide text-ink-muted font-body mb-2">Size</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="variant in product.variants"
            :key="variant.id"
            class="px-4 py-1.5 rounded-full border font-body text-sm transition-colors cursor-pointer"
            :class="
              selectedVariant?.id === variant.id
                ? 'border-transparent bg-rose-gradient text-white shadow-btn-gloss'
                : 'border-blush/30 text-ink-soft hover:border-blush/60'
            "
            @click="selectedVariant = variant"
          >
            {{ variant.title }} OZ
          </button>
        </div>
      </div>

      <p class="text-ink-soft font-body leading-relaxed text-sm mb-6">{{ product.description }}</p>

      <div class="flex gap-6 text-sm text-ink-soft font-body mb-8 pb-6 border-b border-blush/15">
        <div v-if="product.burnTime">
          <span class="text-xs uppercase tracking-wide text-ink-muted">Burn Time</span>
          <p class="text-ink mt-0.5">{{ product.burnTime }}</p>
        </div>
        <div>
          <span class="text-xs uppercase tracking-wide text-ink-muted">In Stock</span>
          <p class="text-ink mt-0.5">{{ selectedVariant?.stock ?? product.stock }} left</p>
        </div>
      </div>

      <!-- Qty + CTA -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3 border border-blush/30 rounded-full px-4 py-2.5">
          <button
            class="transition-colors cursor-pointer"
            :class="quantity > 1 ? 'text-blush hover:text-blush/70' : 'text-blush/30 cursor-not-allowed'"
            :disabled="quantity <= 1"
            @click="quantity = quantity - 1"
          >
            −
          </button>
          <span class="font-body text-ink w-4 text-center">{{ quantity }}</span>
          <button
            class="transition-colors cursor-pointer"
            :class="quantity < maxStock ? 'text-blush hover:text-blush/70' : 'text-blush/30 cursor-not-allowed'"
            :disabled="quantity >= maxStock"
            @click="quantity = quantity + 1"
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

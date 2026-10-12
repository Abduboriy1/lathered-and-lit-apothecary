<script setup lang="ts">
import { ref } from 'vue'

// Must match the discount code set up in Shopify admin. Eligibility (first order only,
// one use per customer) is enforced by Shopify at checkout, not here.
const CODE = 'WELCOME10'

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  try {
    await navigator.clipboard.writeText(CODE)
  } catch {
    return
  }
  copied.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="bg-rose-gradient text-white">
    <p
      class="max-w-7xl mx-auto px-4 h-8 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-[0.08em] font-body"
      role="region"
      aria-label="Promotion"
    >
      <span><span class="font-semibold">10% off</span> your first order<span class="hidden sm:inline"> with code</span></span>
      <button
        type="button"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-white/50 hover:bg-white/15 font-semibold tracking-[0.14em] transition-colors cursor-pointer"
        :aria-label="copied ? 'Code copied' : `Copy code ${CODE}`"
        @click="copyCode"
      >
        {{ copied ? 'Copied!' : CODE }}
        <svg v-if="!copied" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useConsent } from '@/composables/useConsent'

const { isDecided, grant, deny } = useConsent()
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="!isDecided"
        role="region"
        aria-label="Cookie consent"
        class="fixed inset-x-0 bottom-0 p-3 sm:p-4"
        style="z-index: 9980"
      >
        <div
          class="max-w-3xl mx-auto bg-ivory/95 backdrop-blur border border-gold/30 shadow-luxe rounded-2xl px-5 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div class="flex-1 min-w-0">
            <p class="font-display text-ink text-base sm:text-lg leading-tight mb-1">We use cookies</p>
            <p class="text-xs sm:text-sm text-ink-soft font-body leading-relaxed">
              This site uses cookies to improve your browsing experience, analyze site traffic, and personalize
              content. By clicking Accept, you agree to our use of cookies.
            </p>
          </div>
          <div class="flex gap-2 sm:flex-col md:flex-row flex-shrink-0">
            <button
              type="button"
              class="flex-1 sm:flex-none px-5 py-2.5 text-sm rounded-full border border-stone/70 text-ink-soft hover:text-ink hover:border-ink-muted font-body transition-colors cursor-pointer"
              @click="deny"
            >
              Decline
            </button>
            <button
              type="button"
              class="btn-gloss flex-1 sm:flex-none px-6 py-2.5 bg-rose-gradient text-white text-sm rounded-full font-body font-medium shadow-btn-gloss hover:-translate-y-0.5 hover:shadow-luxe-hover transition-all cursor-pointer"
              @click="grant"
            >
              <span class="relative z-10">Accept</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(24px);
  opacity: 0;
}
</style>

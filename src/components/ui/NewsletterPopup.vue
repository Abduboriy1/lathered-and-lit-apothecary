<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { markPopupDismissed, shouldShowPopup, useNewsletter } from '@/composables/useNewsletter'
import { useConsent } from '@/composables/useConsent'

const SHOW_DELAY_MS = 4000

const open = ref(false)
const inputEl = ref<HTMLInputElement | null>(null)
const { email, status, message, subscribe } = useNewsletter()
const { isDecided } = useConsent()

let showTimer: ReturnType<typeof setTimeout> | undefined
let closeTimer: ReturnType<typeof setTimeout> | undefined

function close() {
  open.value = false
  markPopupDismissed()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

function scheduleShow() {
  showTimer = setTimeout(() => {
    open.value = true
  }, SHOW_DELAY_MS)
}

onMounted(() => {
  if (!shouldShowPopup()) return
  window.addEventListener('keydown', onKeydown)
  // Don't stack on top of the cookie banner: wait for that answer first.
  if (isDecided.value) scheduleShow()
  else {
    const stop = watch(isDecided, (decided) => {
      if (decided) {
        stop()
        scheduleShow()
      }
    })
  }
})

onBeforeUnmount(() => {
  clearTimeout(showTimer)
  clearTimeout(closeTimer)
  window.removeEventListener('keydown', onKeydown)
})

watch(open, (isOpen) => {
  if (isOpen) requestAnimationFrame(() => inputEl.value?.focus())
})

// Auto-close a beat after a successful signup so the thank-you is readable.
watch(status, (s) => {
  if (s === 'success') {
    closeTimer = setTimeout(() => {
      open.value = false
    }, 2500)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-ink/30 backdrop-blur-sm flex items-center justify-center p-4"
        style="z-index: 9990"
        @click.self="close"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-popup-title"
          class="popup-card relative w-full max-w-md bg-ivory rounded-3xl shadow-luxe-hover border border-gold/30 overflow-hidden"
        >
          <div class="absolute inset-x-0 top-0 h-1.5 bg-rosegold-line" />

          <button
            aria-label="Close"
            class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-ink-muted hover:text-blush hover:bg-blush/10 transition-colors cursor-pointer"
            @click="close"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="px-7 pt-10 pb-8 sm:px-9 text-center">
            <p class="font-script text-blush-deep text-2xl leading-none mb-2">welcome, friend</p>
            <h2 id="newsletter-popup-title" class="font-display text-ink text-2xl sm:text-3xl font-medium mb-3">
              Stay in the lather
            </h2>
            <p class="text-sm text-ink-soft font-body leading-relaxed mb-6">
              Join our list for new drops, seasonal rituals &amp; subscriber-only offers from the farm.
            </p>

            <form v-if="status !== 'success'" class="flex flex-col gap-2" @submit.prevent="subscribe">
              <input
                ref="inputEl"
                v-model="email"
                type="email"
                name="EMAIL"
                autocomplete="email"
                required
                placeholder="your@email.com"
                :disabled="status === 'loading'"
                class="w-full px-4 py-3 text-sm rounded-full border border-stone/70 bg-white/80 text-ink placeholder:text-ink-muted focus:outline-none focus:border-blush focus:shadow-glow transition-all font-body disabled:opacity-60"
              />
              <button
                type="submit"
                :disabled="status === 'loading'"
                class="btn-gloss w-full px-6 py-3 bg-rose-gradient text-white text-sm rounded-full font-body font-medium shadow-btn-gloss hover:-translate-y-0.5 hover:shadow-luxe-hover transition-all disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
              >
                <span class="relative z-10">{{ status === 'loading' ? 'Joining…' : 'Join the list' }}</span>
              </button>
            </form>

            <p
              v-if="message"
              class="mt-4 text-sm font-body"
              :class="status === 'success' ? 'text-mint-dark' : 'text-blush-deep'"
              role="status"
            >
              {{ message }}
            </p>

            <button
              v-if="status !== 'success'"
              type="button"
              class="mt-4 text-xs text-ink-muted hover:text-ink-soft underline underline-offset-4 font-body cursor-pointer"
              @click="close"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-card {
  animation: popup-in 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

import { computed, ref } from 'vue'

export type ConsentState = 'unknown' | 'granted' | 'denied'

const STORAGE_KEY = 'll_cookie_consent'

function readStored(): ConsentState {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : 'unknown'
  } catch {
    return 'unknown'
  }
}

const consent = ref<ConsentState>(readStored())

function set(value: Exclude<ConsentState, 'unknown'>) {
  consent.value = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage blocked: banner shows again next visit */
  }
}

/** Shared, app-wide cookie consent state. */
export function useConsent() {
  return {
    consent,
    isDecided: computed(() => consent.value !== 'unknown'),
    isGranted: computed(() => consent.value === 'granted'),
    grant: () => set('granted'),
    deny: () => set('denied'),
  }
}

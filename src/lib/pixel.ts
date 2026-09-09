/**
 * Meta (Facebook) Pixel — client-side only.
 *
 * The pixel script is injected only after the visitor grants cookie consent.
 * Events fired before that are queued and flushed on grant (or dropped on deny),
 * so page views / clicks that happen while the banner is showing are not lost.
 *
 * Standard event reference:
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
import { watch } from 'vue'
import { useConsent } from '@/composables/useConsent'

export type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Search'
  | 'Contact'
  | 'CompleteRegistration'

type Params = Record<string, unknown>

type Fbq = {
  (...args: unknown[]): void
  queue?: unknown[]
  callMethod?: (...args: unknown[]) => void
  loaded?: boolean
  version?: string
  push?: Fbq
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID ?? ''
export const isPixelConfigured = PIXEL_ID.length > 0

let loaded = false
const queue: Array<() => void> = []

/** Vendor bootstrap, transcribed from Meta's snippet, then init + first PageView. */
function injectPixel() {
  if (loaded || !isPixelConfigured || typeof window === 'undefined') return
  loaded = true

  const w = window
  if (!w.fbq) {
    const n: Fbq = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args)
      else n.queue!.push(args)
    }
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    w.fbq = n
    if (!w._fbq) w._fbq = n

    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
  }

  w.fbq!('init', PIXEL_ID)
  w.fbq!('track', 'PageView')
}

function run(fn: () => void) {
  const { consent } = useConsent()
  if (consent.value === 'denied' || !isPixelConfigured) return
  if (consent.value === 'granted' && loaded) {
    fn()
  } else {
    queue.push(fn)
  }
}

export function track(event: StandardEvent, params?: Params) {
  run(() => window.fbq?.('track', event, params))
}

export function trackCustom(event: string, params?: Params) {
  run(() => window.fbq?.('trackCustom', event, params))
}

/**
 * Wire consent → pixel lifecycle. Call once at app start.
 * Also attaches a document-level click tracker so every link/button
 * interaction is reported as a custom `Click` event.
 */
export function initPixel() {
  if (!isPixelConfigured) return

  const { consent } = useConsent()

  const onGranted = () => {
    injectPixel()
    // The very first PageView is sent by injectPixel; drop a duplicate if one was queued.
    const pending = queue.splice(0)
    pending.forEach((fn) => fn())
  }

  watch(
    consent,
    (value) => {
      if (value === 'granted') onGranted()
      if (value === 'denied') queue.length = 0
    },
    { immediate: true },
  )

  document.addEventListener(
    'click',
    (e) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button')
      if (!target) return
      const label =
        target.getAttribute('aria-label') ||
        target.textContent?.replace(/\s+/g, ' ').trim() ||
        ''
      trackCustom('Click', {
        label: label.slice(0, 80),
        href: target instanceof HTMLAnchorElement ? target.href : undefined,
        page: window.location.pathname,
      })
    },
    { capture: true, passive: true },
  )
}

/** Route-change PageView. The initial load's PageView comes from injectPixel. */
export function trackPageView() {
  if (loaded) {
    run(() => window.fbq?.('track', 'PageView'))
  }
  // Before load: injectPixel will send the first PageView itself, so no queueing.
}

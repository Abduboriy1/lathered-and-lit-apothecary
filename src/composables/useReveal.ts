import { onMounted, onUnmounted } from 'vue'

export interface RevealOptions {
  /** Starting offset/opacity, animated to opacity 1 / no transform. */
  from?: { opacity?: number; x?: number; y?: number }
  /** Seconds between items that enter the viewport together. */
  stagger?: number
  /** Seconds. */
  duration?: number
  /** GSAP-style "top 85%": reveal once the element's top crosses 85% of viewport height. */
  start?: string
  once?: boolean
}

type Targets = Element | Element[] | NodeListOf<Element> | null | undefined

const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

function toArray(targets: Targets): HTMLElement[] {
  if (!targets) return []
  if (targets instanceof Element) return [targets as HTMLElement]
  return Array.from(targets) as HTMLElement[]
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Fade/slide elements in when they scroll into view. Returns a cleanup function.
 * Pure CSS transitions + IntersectionObserver — no animation library needed.
 */
export function revealOnScroll(targets: Targets, options: RevealOptions = {}): () => void {
  const els = toArray(targets)
  if (!els.length) return () => {}

  const {
    from = { opacity: 0, y: 40 },
    stagger = 0.12,
    duration = 0.7,
    start = 'top 85%',
    once = true,
  } = options

  const show = (el: HTMLElement, index: number) => {
    el.style.transitionDelay = `${index * stagger}s`
    el.style.opacity = '1'
    el.style.transform = 'none'
  }
  const hide = (el: HTMLElement) => {
    el.style.transitionDelay = '0s'
    el.style.opacity = String(from.opacity ?? 0)
    el.style.transform = `translate(${from.x ?? 0}px, ${from.y ?? 0}px)`
  }

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return () => {}
  }

  els.forEach((el) => {
    hide(el)
    el.style.transition = `opacity ${duration}s ${EASE}, transform ${duration}s ${EASE}`
    el.style.willChange = 'opacity, transform'
  })

  // "top 85%" → element must cross the line 85% down the viewport → shrink bottom margin by 15%.
  const pct = Number(start.match(/(\d+)%/)?.[1] ?? 85)
  const rootMargin = `0px 0px -${100 - pct}% 0px`

  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries.filter((e) => e.isIntersecting)
      entering.forEach((e, i) => {
        const el = e.target as HTMLElement
        show(el, i)
        if (once) io.unobserve(el)
      })
      if (!once) entries.filter((e) => !e.isIntersecting).forEach((e) => hide(e.target as HTMLElement))
    },
    { rootMargin },
  )
  els.forEach((el) => io.observe(el))

  return () => io.disconnect()
}

/** Composable form: wires revealOnScroll to the component lifecycle. */
export function useScrollReveal(getTargets: () => Targets, options: RevealOptions = {}) {
  let cleanup: (() => void) | null = null
  onMounted(() => {
    cleanup = revealOnScroll(getTargets(), options)
  })
  onUnmounted(() => cleanup?.())
}

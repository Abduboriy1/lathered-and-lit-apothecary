import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  stagger?: number
  start?: string
  once?: boolean
}

export function useScrollReveal(
  getTargets: () => Element | Element[] | NodeListOf<Element> | null,
  options: ScrollRevealOptions = {},
) {
  let trigger: ScrollTrigger | null = null

  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    stagger = 0.12,
    start = 'top 85%',
    once = true,
  } = options

  onMounted(() => {
    const targets = getTargets()
    if (!targets) return

    gsap.fromTo(targets, from, {
      ...to,
      stagger,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: targets instanceof Element ? targets : (targets as Element[])[0],
        start,
        once,
        onEnter: () => {
          const all = ScrollTrigger.getAll()
          trigger = all[all.length - 1] ?? null
        },
      },
    })
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}

export function useFadeIn(
  getEl: () => Element | null,
  options: { delay?: number; duration?: number; y?: number } = {},
) {
  onMounted(() => {
    const el = getEl()
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 30 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.7,
        delay: options.delay ?? 0,
        ease: 'power2.out',
      },
    )
  })
}

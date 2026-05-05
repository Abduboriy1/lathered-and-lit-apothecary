<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Bubble {
  id: number
  left: string
  size: string
  delay: string
  duration: string
  opacity: number
  tint: string
}

const bubbles = ref<Bubble[]>([])

const tints = [
  'radial-gradient(circle at 30% 30%, rgba(255,220,230,0.55), rgba(246,183,193,0.2) 60%, transparent)',
  'radial-gradient(circle at 30% 30%, rgba(255,235,240,0.6),  rgba(246,183,193,0.25) 60%, transparent)',
  'radial-gradient(circle at 30% 30%, rgba(255,210,225,0.5),  rgba(240,170,190,0.2)  60%, transparent)',
]

onMounted(() => {
  bubbles.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 40 + 14}px`,
    delay: `${Math.random() * 12}s`,
    duration: `${Math.random() * 8 + 7}s`,
    opacity: Math.random() * 0.45 + 0.25,
    tint: tints[i % tints.length],
  }))
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div
      v-for="b in bubbles"
      :key="b.id"
      class="absolute rounded-full animate-bubble-rise"
      :style="{
        left: b.left,
        width: b.size,
        height: b.size,
        animationDelay: b.delay,
        animationDuration: b.duration,
        opacity: b.opacity,
        background: b.tint,
        border: '1.5px solid rgba(246,183,193,0.55)',
        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.7), 0 0 6px rgba(246,183,193,0.3)',
        backdropFilter: 'blur(3px)',
      }"
    />
  </div>
</template>

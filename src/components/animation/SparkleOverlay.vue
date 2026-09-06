<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Sparkle {
  id: number
  top: string
  left: string
  delay: string
  scale: number
  color: string
}

const sparkles = ref<Sparkle[]>([])
const colors = ['#E7B3BD', '#c9a96e', '#F2D8DC', '#E7B3BD', '#f0e0b8']

onMounted(() => {
  sparkles.value = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    scale: Math.random() * 0.8 + 0.5,
    color: colors[i % colors.length],
  }))
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-20 overflow-hidden">
    <span
      v-for="s in sparkles"
      :key="s.id"
      class="sparkle-star animate-sparkle"
      :style="{
        top: s.top,
        left: s.left,
        color: s.color,
        animationDelay: s.delay,
        transform: `scale(${s.scale})`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    :type="type ?? 'button'"
    :class="[
      'inline-flex items-center justify-center rounded-full font-body font-medium transition-all duration-300 cursor-pointer',
      size === 'sm' ? 'px-5 py-2 text-sm' : size === 'lg' ? 'px-9 py-4 text-base' : 'px-7 py-3 text-sm',
      variant === 'outline'
        ? 'border-2 border-blush text-blush hover:bg-blush hover:text-white hover:shadow-glow'
        : variant === 'ghost'
          ? 'text-gold underline-offset-4 hover:underline'
          : 'bg-blush text-white shadow-glow animate-glow-pulse hover:bg-blush/90 hover:shadow-glow-lg',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

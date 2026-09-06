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
      'inline-flex items-center justify-center rounded-full font-body font-medium tracking-wide transition-all duration-300 cursor-pointer',
      size === 'sm' ? 'px-5 py-2 text-sm' : size === 'lg' ? 'px-10 py-4 text-base' : 'px-7 py-3 text-sm',
      variant === 'outline'
        ? 'btn-gloss border-[1.5px] border-blush text-blush-deep bg-white/30 hover:bg-rose-gradient hover:border-transparent hover:text-white hover:shadow-btn-gloss hover:-translate-y-0.5'
        : variant === 'ghost'
          ? 'text-gold underline-offset-4 hover:underline'
          : 'btn-gloss bg-rose-gradient text-white shadow-btn-gloss hover:shadow-luxe-hover hover:-translate-y-0.5 hover:brightness-105',
    ]"
    @click="$emit('click')"
  >
    <span class="relative z-10 inline-flex items-center gap-2"><slot /></span>
  </button>
</template>

<script setup lang="ts">
/**
 * Repeating hand-drawn leaf vine, used as a decorative border line.
 * Colors are pulled straight from the brand palette (mint / teal leaves,
 * blush buds, bark stem, gold berries). Pure SVG so it stays crisp at any width.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Height of the vine strip in px */
    height?: number
    /** Overall opacity */
    opacity?: number
    /**
     * Optional fill color painted under the stem. Turns the vine into a
     * wavy top edge: everything below the stem takes this color, everything
     * above stays transparent.
     */
    fill?: string
    /** Which side of the stem gets the fill: 'below' (top edge of a block) or 'above' (bottom edge). */
    side?: 'below' | 'above'
  }>(),
  { height: 34, opacity: 0.9, fill: undefined, side: 'below' },
)

const uid = `vine-${Math.random().toString(36).slice(2, 8)}`
const fillId = `${uid}-fill`

// Same curve as the stem, closed downward so it can be filled.
const stemPath = 'M0 20 C 30 8, 60 32, 90 20 S 150 8, 180 20'
const fillPath = computed(() =>
  props.side === 'above' ? `${stemPath} L180 0 L0 0 Z` : `${stemPath} L180 40 L0 40 Z`,
)
</script>

<template>
  <svg
    class="block w-full"
    :style="{ height: `${height}px`, opacity }"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <pattern v-if="fill" :id="fillId" patternUnits="userSpaceOnUse" width="180" height="40" x="0" y="0">
        <path :d="fillPath" :fill="fill" />
      </pattern>
      <pattern :id="uid" patternUnits="userSpaceOnUse" width="180" height="40" x="0" y="0">
        <!-- stem -->
        <path
          :d="stemPath"
          fill="none"
          stroke="#8B7355"
          stroke-width="1.4"
          stroke-linecap="round"
        />
        <!-- leaves (alternating above / below the stem) -->
        <g fill="#7A9470" stroke="#3A5A36" stroke-width="0.6">
          <path d="M22 15 C 26 6, 36 4, 40 9 C 36 14, 28 17, 22 15 Z" />
          <path d="M58 26 C 62 34, 72 36, 76 31 C 72 26, 64 23, 58 26 Z" />
          <path d="M104 14 C 108 5, 118 3, 122 8 C 118 13, 110 16, 104 14 Z" />
          <path d="M140 26 C 144 34, 154 36, 158 31 C 154 26, 146 23, 140 26 Z" />
        </g>
        <!-- leaf veins -->
        <g fill="none" stroke="#3A5A36" stroke-width="0.5" stroke-linecap="round">
          <path d="M23 15 L 38 9" />
          <path d="M59 26 L 74 31" />
          <path d="M105 14 L 120 8" />
          <path d="M141 26 L 156 31" />
        </g>
        <!-- blush buds -->
        <g>
          <ellipse cx="46" cy="20" rx="3.2" ry="4" fill="#C27080" />
          <ellipse cx="45" cy="18.5" rx="1.4" ry="2" fill="#E7B3BD" />
          <ellipse cx="128" cy="20" rx="3.2" ry="4" fill="#C27080" />
          <ellipse cx="127" cy="18.5" rx="1.4" ry="2" fill="#E7B3BD" />
        </g>
        <!-- gold berries -->
        <g fill="#C9A96E">
          <circle cx="86" cy="15" r="1.6" />
          <circle cx="90" cy="12.5" r="1.3" />
          <circle cx="168" cy="15" r="1.6" />
          <circle cx="172" cy="12.5" r="1.3" />
          <circle cx="8" cy="25" r="1.4" />
        </g>
      </pattern>
    </defs>
    <rect v-if="fill" width="100%" height="100%" :fill="`url(#${fillId})`" />
    <rect width="100%" height="100%" :fill="`url(#${uid})`" />
  </svg>
</template>

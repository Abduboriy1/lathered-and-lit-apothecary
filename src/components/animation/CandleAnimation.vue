<script setup lang="ts">
// SVG candle — responsive via container height, flame pivots from base (50% 100%)
</script>

<template>
  <div
    class="relative flex items-end justify-center w-full"
    style="height: clamp(280px, 55vh, 520px)"
  >
    <!-- Ambient glow behind candle -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full opacity-50 blur-3xl pointer-events-none"
      style="
        width: clamp(160px, 35vh, 320px);
        height: clamp(160px, 35vh, 320px);
        background: radial-gradient(circle, #f6b7c1 0%, #e8d5b0 40%, transparent 70%);
      "
    />

    <svg
      viewBox="0 0 160 320"
      class="h-full w-auto relative z-10"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      preserveAspectRatio="xMidYMax meet"
      style="filter: drop-shadow(0 0 20px rgba(246,183,193,0.65))"
    >
      <defs>
        <linearGradient id="candleBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#f0ddc8" />
          <stop offset="25%"  stop-color="#faf7f4" />
          <stop offset="65%"  stop-color="#f0dcc8" />
          <stop offset="100%" stop-color="#e4c9a8" />
        </linearGradient>
        <linearGradient id="candleTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#faf7f4" />
          <stop offset="100%" stop-color="#ecdabf" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stop-color="#fffdf5" stop-opacity="0.98" />
          <stop offset="35%"  stop-color="#ffd9a0" />
          <stop offset="70%"  stop-color="#f6b7c1" />
          <stop offset="100%" stop-color="#c9a96e" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient id="flameCore" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stop-color="#ffffff" />
          <stop offset="100%" stop-color="#fff8e0" stop-opacity="0.7" />
        </linearGradient>
        <linearGradient id="waxDrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="#faf7f4" />
          <stop offset="100%" stop-color="#ecdabf" />
        </linearGradient>
        <radialGradient id="glowHalo" cx="50%" cy="80%" r="50%">
          <stop offset="0%"   stop-color="#f6b7c1" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#f6b7c1" stop-opacity="0" />
        </radialGradient>
        <filter id="flameSoft">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Candle body -->
      <rect x="35" y="120" width="90" height="185" rx="10" fill="url(#candleBody)" />

      <!-- Top ellipse -->
      <ellipse cx="80" cy="120" rx="45" ry="10" fill="url(#candleTop)" />

      <!-- Wax drips -->
      <path d="M 48 120 Q 41 146 45 162 Q 48 168 51 160 L 53 120 Z" fill="url(#waxDrip)" opacity="0.65" />
      <path d="M 107 120 Q 114 140 112 155 Q 109 161 107 153 L 106 120 Z" fill="url(#waxDrip)" opacity="0.55" />

      <!-- Wick -->
      <line x1="80" y1="120" x2="80" y2="102" stroke="#6b5040" stroke-width="1.8" stroke-linecap="round" />

      <!-- Glow halo at wick base -->
      <ellipse cx="80" cy="102" rx="22" ry="7" fill="url(#glowHalo)" />

      <!--
        Flame group.
        transform-box: fill-box  → origin coords are % of this element's bounding box
        transform-origin: 50% 100% → pivot at BOTTOM-CENTER (base of flame, where wick meets flame)
        This stops lateral drift — flame sways from its root, like a real candle.
      -->
      <g
        class="animate-flame-flicker"
        style="transform-box: fill-box; transform-origin: 50% 100%"
        filter="url(#flameSoft)"
      >
        <!-- Outer flame body -->
        <ellipse cx="80" cy="76" rx="11" ry="28" fill="url(#flameGrad)" />
        <!-- Warm mid layer -->
        <ellipse cx="80" cy="80" rx="7" ry="20" fill="#ffd9a0" opacity="0.55" />
        <!-- Bright core -->
        <ellipse cx="80" cy="85" rx="4" ry="14" fill="url(#flameCore)" opacity="0.95" />
        <!-- Hot tip -->
        <circle cx="80" cy="51" r="3.5" fill="#ffffff" opacity="0.75" />
      </g>

      <!-- Decorative label lines -->
      <rect x="50" y="182" width="60" height="1"  rx="0.5" fill="#e0c8a8" opacity="0.55" />
      <rect x="55" y="198" width="50" height="1"  rx="0.5" fill="#e0c8a8" opacity="0.4"  />
    </svg>
  </div>
</template>

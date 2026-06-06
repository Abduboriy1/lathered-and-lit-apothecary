/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#C27080',
        'blush-light': '#F2D8DC',
        mint: '#7A9470',
        'mint-dark': '#3A5A36',
        teal: '#3A5A36',
        ivory: '#FAF4EE',
        champagne: '#e8d5b0',
        gold: '#c9a96e',
        'gold-light': '#f0e0b8',
        pearl: '#f5f0eb',
        linen: '#F2EAE0',
        bark: '#8B7355',
        stone: '#C4B5A5',
        sage: '#7A9470',
      },
      fontFamily: {
        script: ['"Cormorant Garamond"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 18px 3px rgba(194,112,128,0.35)',
        'glow-lg': '0 0 32px 6px rgba(194,112,128,0.25)',
        'glow-mint': '0 0 18px 3px rgba(58,90,54,0.25)',
        'glow-gold': '0 0 16px 2px rgba(201,169,110,0.35)',
        farmhouse: '2px 4px 14px rgba(139,115,85,0.14)',
      },
      backgroundImage: {
        'pearl-gradient': 'linear-gradient(135deg, #FAF4EE 0%, #F2EAE0 40%, #E8EDE6 100%)',
        'hero-gradient': 'linear-gradient(160deg, #F2D8DC 0%, #FAF4EE 55%, #E8EDE6 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(250,244,238,0.9), rgba(194,112,128,0.06))',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
        'linen-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
        'flame-flicker': 'flameFlicker 2.4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'bubble-rise': 'bubbleRise 8s ease-in infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(45deg)' },
        },
        flameFlicker: {
          '0%':   { transform: 'rotate(-1.5deg) scaleX(1) scaleY(1)',    opacity: '0.9' },
          '20%':  { transform: 'rotate(1deg)   scaleX(0.93) scaleY(1.06)', opacity: '1' },
          '40%':  { transform: 'rotate(-0.5deg) scaleX(1.02) scaleY(0.97)', opacity: '0.88' },
          '65%':  { transform: 'rotate(1.8deg)  scaleX(0.9)  scaleY(1.08)', opacity: '1' },
          '80%':  { transform: 'rotate(-1deg)   scaleX(1.03) scaleY(0.95)', opacity: '0.92' },
          '100%': { transform: 'rotate(1.2deg)  scaleX(0.92) scaleY(1.05)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(194,112,128,0.15)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(194,112,128,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(100vh) scale(0.6)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-10vh) scale(1.1)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        60: '60',
        70: '70',
      },
    },
  },
  plugins: [],
}

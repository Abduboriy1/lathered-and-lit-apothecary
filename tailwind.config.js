/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f6b7c1',
        'blush-light': '#fde8ec',
        mint: '#b7d8d0',
        'mint-dark': '#8fb7bd',
        teal: '#8fb7bd',
        ivory: '#faf7f4',
        champagne: '#e8d5b0',
        gold: '#c9a96e',
        'gold-light': '#f0e0b8',
        pearl: '#f5f0eb',
      },
      fontFamily: {
        script: ['"Cormorant Garamond"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px 4px rgba(246,183,193,0.55)',
        'glow-lg': '0 0 40px 8px rgba(246,183,193,0.45)',
        'glow-mint': '0 0 24px 4px rgba(143,183,189,0.45)',
        'glow-gold': '0 0 20px 3px rgba(201,169,110,0.4)',
      },
      backgroundImage: {
        'pearl-gradient': 'linear-gradient(135deg, #faf7f4 0%, #fde8ec 40%, #e8f5f2 100%)',
        'hero-gradient': 'linear-gradient(160deg, #fde8ec 0%, #faf7f4 50%, #e0f0ed 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.7), rgba(246,183,193,0.1))',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
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
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(246,183,193,0.3)' },
          '50%': { boxShadow: '0 0 32px 8px rgba(246,183,193,0.65)' },
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
    },
  },
  plugins: [],
}

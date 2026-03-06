import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic background tokens
        'bg-base': '#FFFBF5',
        'bg-surface': '#FFFFFF',
        'bg-subtle': '#F7F0E8',
        'bg-overlay': 'rgba(74,44,94,0.04)',

        // Semantic text tokens
        'text-primary': '#2D2235',
        'text-secondary': '#6B5B73',
        'text-muted': '#A69AAE',
        'text-inverse': '#FFFBF5',

        // Accent tokens
        'accent-primary': '#D4839B',
        'accent-primary-soft': '#F2D4E0',
        'accent-secondary': '#B8A9D4',
        'accent-success': '#7BAF7B',
        'accent-warning': '#E8927C',
        'accent-info': '#7EBAB0',

        // Phase colors — enriched
        phase: {
          menstrual: '#C97B8B',
          'menstrual-soft': '#F5DDE3',
          follicular: '#5BA68A',
          'follicular-soft': '#D4EDE4',
          ovulatory: '#D4A847',
          'ovulatory-soft': '#F5EAC8',
          luteal: '#9B85C4',
          'luteal-soft': '#E4DCF0',
        },

        // Legacy aliases → new values
        'rose-soft': '#F2D4E0',
        'rose-deep': '#D4839B',
        lavender: '#B8A9D4',
        sage: '#7BAF7B',
        'sage-dark': '#5BA68A',
        cream: '#FFFBF5',
        'cream-dark': '#F7F0E8',
        'warm-gray': '#6B5B73',
        'warm-gray-light': '#A69AAE',
        'deep-plum': '#2D2235',
        'coral-warning': '#E8927C',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        display: ['1.875rem', { lineHeight: '1.15' }],  // 30px
        title: ['1.5rem', { lineHeight: '1.25' }],      // 24px
        heading: ['1.25rem', { lineHeight: '1.3' }],     // 20px
        subheading: ['1rem', { lineHeight: '1.4' }],     // 16px
        body: ['0.9375rem', { lineHeight: '1.65' }],     // 15px
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }], // 13px
        caption: ['0.75rem', { lineHeight: '1.4' }],     // 12px
        tiny: ['0.6875rem', { lineHeight: '1.4' }],      // 11px
        'data-lg': ['2.25rem', { lineHeight: '1.0' }],   // 36px
        'data-md': ['1.25rem', { lineHeight: '1.0' }],   // 20px
        'data-sm': ['0.875rem', { lineHeight: '1.2' }],  // 14px
        data: ['2rem', { lineHeight: '1.0' }],           // legacy
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rise: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bloom-pulse': {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.0)' },
        },
        'bloom-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        sparkle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0)', opacity: '0' },
        },
        'check-bounce': {
          '0%': { transform: 'scale(0) rotate(-15deg)' },
          '60%': { transform: 'scale(1.2) rotate(10deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'stroke-draw': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-scale-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        rise: 'rise 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'bloom-pulse': 'bloom-pulse 0.3s ease-in-out',
        'bloom-ring': 'bloom-ring 0.5s ease-out',
        sparkle: 'sparkle 0.6s ease-out forwards',
        'check-bounce': 'check-bounce 0.35s ease-out',
        'fade-scale-in': 'fade-scale-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;

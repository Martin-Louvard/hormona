import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose-soft': '#F2B5D4',
        'rose-deep': '#D4839B',
        lavender: '#C3B1E1',
        sage: '#A8C5A0',
        'sage-dark': '#7BA370',
        cream: '#FFF8F0',
        'cream-dark': '#F5EDE3',
        'warm-gray': '#6B5B73',
        'warm-gray-light': '#9B8BA3',
        'deep-plum': '#4A2C5E',
        'coral-warning': '#E8927C',
        phase: {
          menstrual: '#E88D9E',
          follicular: '#7EC8B8',
          ovulatory: '#FFD166',
          luteal: '#C3B1E1',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        display: ['1.75rem', { lineHeight: '1.2' }],
        title: ['1.375rem', { lineHeight: '1.3' }],
        heading: ['1.125rem', { lineHeight: '1.4' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        tiny: ['0.6875rem', { lineHeight: '1.4' }],
        data: ['2rem', { lineHeight: '1.0' }],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;

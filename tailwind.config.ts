import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ydg: {
          black:   '#0A0A0A',
          blue:    '#0057FF',
          'blue-light': '#E8F0FF',
          surface: '#F4F4F4',
          border:  '#E2E2E2',
          muted:   '#8C8C8C',
          white:   '#FFFFFF',
        },
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        inter:   ['var(--font-inter)',   'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'line-draw':  'lineDraw 1.2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineDraw: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'ydg-grid': `linear-gradient(var(--ydg-border) 1px, transparent 1px),
                     linear-gradient(90deg, var(--ydg-border) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-80': '80px 80px',
        'grid-40': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config

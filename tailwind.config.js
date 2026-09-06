/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        neutralWhite: "#FFFFFF",
        claySlate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        clayPurple: {
          light: "#DDD6FE",
          DEFAULT: "#A855F7",
          hover: "#9333EA",
          dark: "#7E22CE",
          bg: "#FAF5FF",
        },
        clayGreen: {
          light: "#A7F3D0",
          DEFAULT: "#34D399",
          hover: "#10B981",
          dark: "#059669",
          bg: "#F0FDF4",
        },
        clayOrange: {
          light: "#FED7AA",
          DEFAULT: "#FB923C",
          hover: "#F97316",
          dark: "#EA580C",
          bg: "#FFF7ED",
        },
        clayBlue: {
          light: "#BAE6FD",
          DEFAULT: "#38BDF8",
          hover: "#0EA5E9",
          dark: "#0284C7",
          bg: "#F0F9FF",
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'clay-card': '12px 16px 28px -4px rgba(148, 163, 184, 0.28), -8px -8px 24px 0px rgba(255, 255, 255, 0.95), inset 2px 2px 4px 0px rgba(255, 255, 255, 0.9), inset -2px -2px 6px 0px rgba(148, 163, 184, 0.12)',
        'clay-card-hover': '16px 22px 34px -4px rgba(148, 163, 184, 0.35), -10px -10px 28px 0px rgba(255, 255, 255, 1), inset 2px 2px 5px 0px rgba(255, 255, 255, 0.95), inset -2px -2px 6px 0px rgba(148, 163, 184, 0.15)',
        'clay-btn': '6px 8px 16px -2px rgba(148, 163, 184, 0.35), -4px -4px 12px 0px rgba(255, 255, 255, 0.9), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.08)',
        'clay-btn-active': '2px 3px 6px -1px rgba(148, 163, 184, 0.4), -1px -1px 4px 0px rgba(255, 255, 255, 0.8), inset 2px 2px 4px rgba(0, 0, 0, 0.12), inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.6)',
        'clay-input': 'inset 3px 3px 6px rgba(148, 163, 184, 0.22), inset -3px -3px 6px rgba(255, 255, 255, 0.95), 1px 1px 2px rgba(255, 255, 255, 0.5)',
        'clay-input-focus': 'inset 3px 3px 7px rgba(148, 163, 184, 0.28), inset -3px -3px 6px rgba(255, 255, 255, 0.95), 0 0 0 3px rgba(168, 85, 247, 0.2)',
        'clay-pill': '4px 6px 12px -2px rgba(148, 163, 184, 0.25), -3px -3px 8px 0px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.8)',
        'clay-purple': '8px 12px 24px -4px rgba(168, 85, 247, 0.3), -6px -6px 18px 0px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(126, 34, 206, 0.2)',
        'clay-green': '8px 12px 24px -4px rgba(52, 211, 153, 0.3), -6px -6px 18px 0px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(5, 150, 105, 0.2)',
        'clay-orange': '8px 12px 24px -4px rgba(251, 146, 60, 0.3), -6px -6px 18px 0px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(234, 88, 12, 0.2)',
        'clay-blue': '8px 12px 24px -4px rgba(56, 189, 248, 0.3), -6px -6px 18px 0px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(2, 132, 199, 0.2)',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-medium': 'float 3.5s ease-in-out infinite 0.5s',
        'float-fast': 'float 2.5s ease-in-out infinite 1s',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'squish': 'squish 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        squish: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95, 0.92)' },
          '100%': { transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}

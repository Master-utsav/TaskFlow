/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#3B82F6', // Trust-building blue (blue-500)
        'primary-50': '#EFF6FF', // Light blue (blue-50)
        'primary-100': '#DBEAFE', // Light blue (blue-100)
        'primary-500': '#3B82F6', // Medium blue (blue-500)
        'primary-600': '#2563EB', // Dark blue (blue-600)
        'primary-700': '#1D4ED8', // Darker blue (blue-700)
        
        // Secondary Colors
        'secondary': '#6366F1', // Complementary indigo (indigo-500)
        'secondary-50': '#EEF2FF', // Light indigo (indigo-50)
        'secondary-100': '#E0E7FF', // Light indigo (indigo-100)
        'secondary-500': '#6366F1', // Medium indigo (indigo-500)
        'secondary-600': '#4F46E5', // Dark indigo (indigo-600)
        
        // Accent Colors
        'accent': '#10B981', // Success-oriented emerald (emerald-500)
        'accent-50': '#ECFDF5', // Light emerald (emerald-50)
        'accent-100': '#D1FAE5', // Light emerald (emerald-100)
        'accent-500': '#10B981', // Medium emerald (emerald-500)
        'accent-600': '#059669', // Dark emerald (emerald-600)
        
        // Background Colors
        'background': '#0F172A', // Deep slate (slate-900)
        'surface': '#1E293B', // Elevated slate (slate-800)
        'surface-light': '#334155', // Lighter surface (slate-700)
        
        // Text Colors
        'text-primary': '#F8FAFC', // High-contrast slate (slate-50)
        'text-secondary': '#94A3B8', // Muted slate (slate-400)
        'text-tertiary': '#64748B', // Subtle slate (slate-500)
        
        // Status Colors
        'success': '#22C55E', // Vibrant green (green-500)
        'success-50': '#F0FDF4', // Light green (green-50)
        'success-100': '#DCFCE7', // Light green (green-100)
        'success-500': '#22C55E', // Medium green (green-500)
        
        'warning': '#F59E0B', // Attention-grabbing amber (amber-500)
        'warning-50': '#FFFBEB', // Light amber (amber-50)
        'warning-100': '#FEF3C7', // Light amber (amber-100)
        'warning-500': '#F59E0B', // Medium amber (amber-500)
        
        'error': '#EF4444', // Clear red (red-500)
        'error-50': '#FEF2F2', // Light red (red-50)
        'error-100': '#FEE2E2', // Light red (red-100)
        'error-500': '#EF4444', // Medium red (red-500)
        
        // Border Colors
        'border': '#334155', // Slate border (slate-700)
        'border-light': '#475569', // Lighter border (slate-600)
        'border-subtle': '#1E293B', // Subtle border (slate-800)
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '900': '900',
        '950': '950',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      scale: {
        '105': '1.05',
      },
      backdropBlur: {
        'sm': '4px',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-in-out',
        'slide-in': 'slideIn 300ms ease-in-out',
        'scale-in': 'scaleIn 150ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
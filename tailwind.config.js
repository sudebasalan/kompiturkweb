/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './cozumler/**/*.{html,js}',
    './dia-erp/**/*.{html,js}',
    './it-altyapi/**/*.{html,js}',
    './digercozum/**/*.{html,js}',
    './kurumsal/**/*.{html,js}',
    './iletisim/**/*.{html,js}',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#DC2626',
        brandRedDark: '#B91C1C',
        brandNavy: '#0F172A',
        brandNavyLight: '#1E3A8A',
        brandSlate: '#334155',
        brandIce: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

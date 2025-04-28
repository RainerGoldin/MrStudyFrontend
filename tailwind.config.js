/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2D374D',
        }
      },
      backgroundColor: {
        'dark-hover': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rust: {
          800: '#B7410E',
          900: '#8B4513',
        },
        ivory: {
          50: '#FFFEF7',
          100: '#FFFCF0',
        },
      },
    },
  },
  plugins: [],
};

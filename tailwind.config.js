/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1C3A2E', deep: '#0D2118' },
        orange:  { DEFAULT: '#FF914D', dark: '#E87A3A' },
        cream: '#F5F0E8',
        'pouf-blue': '#0046AD',
        'pouf-yellow': '#FFDE59',
        'pouf-purple': '#8C52FF',
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

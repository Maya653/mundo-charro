/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FAF4E6',
        secondary: '#A69A7B',
        'brand-text': '#261612',
        accent: '#5F3621',
        'accent-dark': '#38331C',
        dark: '#1a0f0a',
      },
      fontFamily: {
        display: ["'Playfair Display'", 'serif'],
        body: ["'Roboto'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
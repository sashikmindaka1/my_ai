/** @type {import('tailwindcss').Config} */
const themeVariants = require('tailwindcss-theme-variants');

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [themeVariants()],
  themeVariants: ['dark', 'light'],
};
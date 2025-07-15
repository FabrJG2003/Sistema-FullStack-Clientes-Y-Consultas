/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        CalSans: ['Cal Sans', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
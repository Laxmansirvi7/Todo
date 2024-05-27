/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#000000',
        customNavy: '#14213D',
        customOrange: '#FCA311',
        customGrey: '#E5E5E5',
        customWhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

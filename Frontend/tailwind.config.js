/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryBlue: 'rgb(0,46,99)',
        SecundaryGold: 'rgb(212,176,18)',
        white : 'rgb(255,255,255)'
      },
      fontFamily:{
        'sans': ['Helveltica Condensed', 'Arial', 'sistem-ui']
      },
    },
  },
  plugins: [],
}


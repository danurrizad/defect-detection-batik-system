/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1:"#212A3E",
        primary2:"#2D3952",
        primary3:"#394867",
        primary4:"#9BA4B5",
        primary5:"#F1F6F9",
        primary6:"#D7FAFF",
        primary7:"#62D9EA",
        primary8:"#9BA4B5",
      },
      fontFamily:{
        'heading': ['Poly', 'sans'],
      }
    },
  },
  plugins: [],
}


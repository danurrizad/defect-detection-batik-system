/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary0:"#EAEAEA",
        primary1:"#212A3E",
        primary2:"#2D3952",
        primary3:"#394867",
        primary4:"#9BA4B5",
        primary5:"#F1F6F9",
        primary6:"#D7FAFF",
        primary7:"#62D9EA",
        primary8:"#9BA4B5",
        heading1:"#A77035",
        heading2:"#CDA145",
        secondary0:"#1E365B",
        secondary1:"#1B4079",
        secondary2:"#D9D9D9",
        secondary3:"#EFEFEF",
      },
      fontFamily:{
        'heading': ['Poly', 'sans'],
        'headingTitle':['upakarti', 'sans'],
        'content': ['Inter', 'sans']
      }
    },
  },
  plugins: [],
}


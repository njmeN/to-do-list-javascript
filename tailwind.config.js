/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
       'poppin':['Poppins', 'sans-serif'],
       'source-sans':['Source Sans 3', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


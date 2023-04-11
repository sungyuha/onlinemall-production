/** @type {import('tailwindcss').Config} */
module.exports = {
  // content update
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F96162',
      },
      backgroundImage: {
        banner: `url('../src/images/banner.jpg')`,
      }
    },
  },
  plugins: [],
}

const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ['Poppins', ' sans-serif'],
      'sora': ['Sora', 'sans-serif'],
      'archivo': ['Archivo', 'sans-serif'],
      'murecho': ['Murecho', 'sans-serif']
    },
    variants: {
      extend: {},
      container: {
        center: true,
      },
    },
    plugins: [],
  },

  theme: {
    colors: {
      bluebutton: '#02679a',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    }
  }
}

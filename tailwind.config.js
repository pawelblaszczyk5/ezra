const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
};

// tailwind.config.js
//
//

const range = (length) => Array.from(Array(length).keys())

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
  },
  theme: {
    screens: {
      sm: { max: '600px' },
    },
    colors: {
      white: '#ffffff',
      black: '#1b1b1b',
      purple: '#855aff',
    },
    spacing: range(41).reduce(
      (acc, step) => ({
        ...acc,
        [step]: `${(step * 5) / 10}rem`,
      }),
      {}
    ),

    extend: {},
  },
  variants: {
    textColor: ['responsive', 'odd', 'hover'],
  },
  plugins: [],
}

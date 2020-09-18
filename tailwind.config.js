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
    content: ['./**/*.js'],
  },
  theme: {
    colors: {
      white: '#ffffff',
      black: '#1b1b1b',
      purple: '#855aff',
    },
    spacing: range(31).reduce(
      (acc, step) => ({
        ...acc,
        [step]: `${(step * 5) / 10}rem`,
      }),
      {}
    ),

    extend: {},
  },
  variants: {},
  plugins: [],
}

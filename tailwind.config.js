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
      black: '#000000',
      red: '#AC282A',
      grey: '#787878',
      altGrey: '#666666',
      lightGrey: '#C8C8C8',
      darkGrey: '#2C353D',
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

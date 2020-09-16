export const range = (length) => Array.from(Array(length).keys())
export const blank = (href) => ({
  href,
  target: '_blank',
  rel: 'noopener noreferrer',
})

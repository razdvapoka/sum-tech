import FontFaceObserver from 'fontfaceobserver'

export const range = (length) => Array.from(Array(length).keys())
export const blank = (href) => ({
  href,
  target: '_blank',
  rel: 'noopener noreferrer',
})

export const loadFont = (font) => new FontFaceObserver(font).load()

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

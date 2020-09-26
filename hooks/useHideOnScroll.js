import { useEffect, useState } from 'react'

const useHideOnScroll = (minHideDiff = 0) => {
  const [state, setState] = useState({
    isHidden: false,
    lastScrollY: null,
  })

  const handleScroll = () =>
    setState(({ isHidden, lastScrollY }) => {
      let nextIsHidden = isHidden
      if (
        window.scrollY - lastScrollY > minHideDiff &&
        !isHidden &&
        lastScrollY > 0
      ) {
        nextIsHidden = true
      }

      if (lastScrollY - window.scrollY > 0 && isHidden) {
        nextIsHidden = false
      }

      return { isHidden: nextIsHidden, lastScrollY: window.scrollY }
    })

  useEffect(() => {
    setState((oldState) => ({ ...oldState, lastScrollY: window.scrollY }))
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return state.isHidden
}

export default useHideOnScroll

import { useIntersection } from 'react-use'
import React, { useRef, useEffect } from 'react'

const Section = ({
  sectionIndex,
  setActiveSectionIndex,
  children,
  ...rest
}) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '-10px',
  })
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setActiveSectionIndex(sectionIndex)
    }
  }, [intersection, sectionIndex])
  return (
    <section ref={intersectionRef} {...rest}>
      {children}
    </section>
  )
}

export default Section

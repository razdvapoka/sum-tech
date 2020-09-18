import React, { useMemo, useRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { useIntersection } from 'react-use'

const Keywords = ({ keywords }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
  })
  const keywordsComponent = useMemo(
    () => (
      <div>
        {keywords.map((keyword, keywordIndex) => (
          <div className="hover:text-purple select-none" key={keywordIndex}>
            {keyword}
          </div>
        ))}
      </div>
    ),

    [keywords]
  )
  return (
    <div
      ref={intersectionRef}
      className={cn(
        'border border-white text-l1 text-center overflow-hidden',
        styles.keywords
      )}
    >
      <div
        className={cn(styles.keywordsInner, {
          [styles.keywordsInnerPaused]:
            !intersection || !intersection.isIntersecting,
        })}
      >
        {keywordsComponent}
        {keywordsComponent}
        {keywordsComponent}
      </div>
    </div>
  )
}

export default Keywords

import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

const Heading = ({ children, className, hidden }) => {
  return (
    <h2
      className={cn(
        'heading hidden sm:block text-s2 border-b border-white z-30 bg-black',
        hidden ? styles.headingHidden : styles.heading,
        className
      )}
    >
      {children}
    </h2>
  )
}

export default Heading

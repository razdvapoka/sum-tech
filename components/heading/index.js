import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

const Heading = ({ children }) => {
  return (
    <h2
      className={cn(
        'hidden sm:flex flex-col justify-end text-s2 pb-1 border-b border-white sticky z-30 bg-black top-0',
        styles.heading
      )}
    >
      {children}
    </h2>
  )
}

export default Heading

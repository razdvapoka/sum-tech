import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { loadFont, wait } from '../../utils'
import Intro from '../intro'
import styles from './styles.module.scss'

export function Page() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (!isVisible) {
      Promise.all([loadFont('Redaction'), wait(1000)]).then(() =>
        setIsVisible(true)
      )
    }
  }, [isVisible, setIsVisible])

  return (
    <div className={cn('min-h-screen flex flex-col px-2', styles.container)}>
      <Head>
        <title>Summa Technologiae</title>
        <link rel="icon" href="/favicon-259.png" />
        <script>
          {`
              if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
                  document.documentElement.className += ' touchevents';
                  window.hasTouchEvents = true;
              } else {
                  document.documentElement.className += ' no-touchevents';
              }
            `}
        </script>
      </Head>
      <Intro isVisible={isVisible} />
    </div>
  )
}

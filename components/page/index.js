import Head from 'next/head'
import React from 'react'
import cn from 'classnames'

import Header from '../header'
import Intro from '../intro'
import styles from './styles.module.scss'

export function Page({ headerText, seminarCount, children }) {
  return (
    <div className={cn('min-h-screen flex flex-col px-2', styles.container)}>
      <Head>
        <title>Summa Technologiae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={cn(
          'h-screen flex flex-col justify-between relative',
          styles.introBox
        )}
      >
        <Header text={headerText} seminarCount={seminarCount} />
        <Intro />
        <div className="absolute left-0 bottom-0 w-full text-center text-s2">
          scroll down
        </div>
      </div>
      <main>{children}</main>
      <footer />
    </div>
  )
}

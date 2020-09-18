import Head from 'next/head'
import React from 'react'
import cn from 'classnames'

import Header from '../header'
import Intro from '../intro'
import styles from './styles.module.scss'

export function Page({ children }) {
  return (
    <div className={cn('min-h-screen flex flex-col px-2', styles.container)}>
      <Head>
        <title>Summa Technologiae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={cn(
          'h-screen flex flex-col justify-between',
          styles.introBox
        )}
      >
        <Header />
        <Intro />
      </div>
      <main>{children}</main>
      <footer />
    </div>
  )
}

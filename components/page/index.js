import Head from 'next/head'
import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

export function Page({ children }) {
  return (
    <div className={cn('min-h-screen flex flex-col', styles.container)}>
      <Head>
        <title>Summa Technologiae</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header />
      <main className="flex-1 min-h-screen">{children}</main>
      <footer />
    </div>
  )
}

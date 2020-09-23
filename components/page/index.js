import { useIntersection } from 'react-use'
import Head from 'next/head'
import React, { useRef } from 'react'
import cn from 'classnames'

import Header from '../header'
import Intro from '../intro'
import Menu from '../menu'
import Seminar from '../seminar'
import styles from './styles.module.scss'

export function Page({
  activeSectionIndex,
  headerText,
  seminarCount,
  seminar,
  children,
}) {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '-10px',
  })
  const isMainVisible = intersection && intersection.isIntersecting

  const introIntersectionRef = useRef(null)
  const introIntersection = useIntersection(introIntersectionRef, {
    root: null,
    rootMargin: '0px',
  })
  const isIntroHidden =
    introIntersection != null && !introIntersection.isIntersecting

  return (
    <>
      <Seminar seminar={seminar} isOpen={!!seminar} />
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
          ref={introIntersectionRef}
        >
          <Header text={headerText} seminarCount={seminarCount} />
          <Intro />
          <div
            className={cn(
              'absolute left-0 bottom-0 w-full text-center text-s2 mb-2',
              { 'opacity-0': isMainVisible },
              styles.scrollDown
            )}
          >
            scroll down
          </div>
        </div>
        {isIntroHidden && <Menu activeSectionIndex={activeSectionIndex} />}
        <main ref={intersectionRef}>{children}</main>
      </div>
    </>
  )
}

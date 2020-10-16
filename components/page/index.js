import { FixedBottom } from 'react-fixed-bottom'
import { useIntersection } from 'react-use'
import Head from 'next/head'
import React, { useState, useRef } from 'react'
import cn from 'classnames'

import Cookies from '../cookies'
import Header from '../header'
import Intro from '../intro'
import Menu from '../menu'
import Privacy from '../privacy'
import Seminar from '../seminar'
import styles from './styles.module.scss'

export function Page({
  headerSectionIndex,
  applyUrl,
  activeSectionIndex,
  headerText,
  seminarCount,
  seminar,
  children,
  isPrivacyOpen,
  privacy,
  iam,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <Privacy isPrivacyOpen={isPrivacyOpen} privacy={privacy} iam={iam} />
      <Seminar seminar={seminar} isOpen={!!seminar} />
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
        <div
          className={cn(
            'h-screen sm:h-auto flex flex-col justify-between sm:justify-start relative',
            styles.introBox
          )}
          ref={introIntersectionRef}
        >
          <Header
            text={headerText}
            seminarCount={seminarCount}
            isOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            applyUrl={applyUrl}
            headerSectionIndex={headerSectionIndex}
          />
          <Intro />
          <div
            className={cn(
              'absolute left-0 bottom-0 w-full text-center text-s2 mb-2 sm:hidden',
              { 'opacity-0': isMainVisible },
              styles.scrollDown
            )}
          >
            scroll down
          </div>
        </div>
        <Menu
          activeSectionIndex={activeSectionIndex}
          isVisible={isIntroHidden}
          isOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <main className="" ref={intersectionRef}>
          {children}
        </main>
        <Cookies isVisible={isIntroHidden} />
      </div>
    </>
  )
}

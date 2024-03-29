import { useIntersection } from 'react-use'
import Head from 'next/head'
import React, { useEffect, useState, useRef } from 'react'
import cn from 'classnames'

import { loadFont, wait } from '../../utils'
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

  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (!isVisible) {
      Promise.all([loadFont('Redaction'), wait(1000)]).then(() =>
        setIsVisible(true)
      )
    }
  }, [isVisible, setIsVisible])

  return (
    <>
      <Privacy isPrivacyOpen={isPrivacyOpen} privacy={privacy} iam={iam} />
      <Seminar seminar={seminar} isOpen={!!seminar} />
      <div className={cn('min-h-screen flex flex-col px-2', styles.container)}>
        <Head>
          <title>Summa Technologiae</title>
          <link rel="icon" href="/favicon-259.png" />
          <meta property="og:title" content="Summa Technologiae" />
          <meta
            property="og:url"
            content="https://summatechnologiae.e-flux.com"
          />
          <meta
            property="og:image"
            content="https://summatechnologiae.e-flux.com/st-share.jpg"
          />
          <meta
            property="og:description"
            content="Summa Technologiae puts together three formats: the school, the conference, and the exhibition, in order to address three of the fields upon which the work of Stanisław Lem has been deeply influential: Literature, Philosophy, and Contemporary Art."
          />
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
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-73557491-11"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', 'UA-73557491-11');
             `,
            }}
          />
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
            isVisible={isVisible}
          />
          <Intro isVisible={isVisible} />
          <div
            className={cn(
              'absolute left-0 bottom-0 w-full text-center text-s2 mb-2 sm:hidden',
              { 'opacity-0': isMainVisible || !isVisible },
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
          applyUrl={applyUrl}
        />
        <main className="" ref={intersectionRef}>
          {children}
        </main>
        <Cookies isVisible={isIntroHidden} />
      </div>
    </>
  )
}

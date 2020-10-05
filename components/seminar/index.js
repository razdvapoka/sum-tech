import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useSwipeable } from 'react-swipeable'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import Typograf from '../typograph'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'

const Speaker = ({ speaker }) => {
  return (
    <div className="grid mt-4 sm:mt-2 mb-12 sm:mb-4 sm:flex-wrap">
      <div className="col-3-s sm:col-1-s" />
      <div className="col-3-s sm:col-5-s">
        <img src={speaker.fields.photo.fields.file.url} width="100%" />
      </div>
      <div
        className={cn(
          'col-11-s sm:col-11-s text-l2 sm:text-s1 sm:mt-2',
          styles.about
        )}
      >
        <Markdown>{speaker.fields.about}</Markdown>
      </div>
    </div>
  )
}

const renderers = {
  image: ({ src, alt }) => {
    return (
      <figure>
        <img src={src} alt={alt} />
        <figcaption>{alt}</figcaption>
      </figure>
    )
  },
  paragraph: ({ children }) => {
    const hasFigure = children && children[0].props.src
    const Component = hasFigure ? 'div' : 'p'
    return (
      <Component className={cn({ [styles.withFigure]: hasFigure })}>
        {children}
      </Component>
    )
  },
}

const SeminarContent = ({ className, children }) => {
  return (
    <Markdown className={className} renderers={renderers}>
      {children}
    </Markdown>
  )
}

const Seminar = ({ isOpen, seminar, setIsLoadingSeminar }) => {
  const [isClosing, setIsClosing] = useState(false)
  const router = useRouter()

  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      if (isOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isOpen, ref])

  const close = () => {
    setIsLoadingSeminar(false)
    setIsClosing(true)
    setTimeout(() => {
      router.push('/').then(() => {
        setIsClosing(false)
      })
    }, 400)
  }

  const handlers = useSwipeable({ onSwipedRight: close })

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen w-screen px-1',
        styles.seminar,
        {
          [styles.seminarOpen]: isOpen && !isClosing,
        }
      )}
    >
      <div className="grid h-full">
        <div
          className={cn('col-1 bg-transparent h-full', styles.seminarFiller)}
          onClick={close}
        />
        <div
          ref={ref}
          className={cn(
            'col-23 h-full bg-white text-black overflow-auto relative pt-2',
            styles.seminarContent
          )}
          {...handlers}
        >
          <button
            className={cn('block fixed z-50', styles.closeButton)}
            onClick={close}
          >
            <X />
          </button>
          {seminar && (
            <div key={seminar.sys.id} className="px-1">
              <div className="grid">
                <div className="col-20-s sm:col-11-s text-xxl sm:text-s4">
                  <Typograf className={cn('text-purple', styles.seminarName)}>
                    {seminar.fields.name}
                  </Typograf>
                  <div>{seminar.fields.leader.fields.name}</div>
                </div>
                <div className="col-3-s sm:hidden" />
              </div>
              <div className="grid">
                <div className="col-5-s sm:hidden" />
                <div className="col-16-s sm:col-10-s text-xxl sm:text-s4 text-purple text-right">
                  {format(new Date(seminar.fields.date), 'dd.MM.yyyy')}
                </div>
              </div>
              {seminar.fields.guestSpeakers && (
                <div className="grid mt-18 sm:mt-0">
                  <div className="col-19-s sm:col-11-s text-xl2 sm:text-s1">
                    <div className="text-purple">guest speakers: </div>
                    {seminar.fields.guestSpeakers.map((guest, guestIndex) => (
                      <div key={guestIndex}>
                        {`${guest.fields.name} (${guest.fields.country})`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-18 sm:mt-3 text-l2 sm:text-s1">
                <SeminarContent className={styles.wysiwyg}>
                  {seminar.fields.content}
                </SeminarContent>
              </div>
              <div className="mt-18 sm:mt-12 ml-6 sm:ml-0 text-xl2 sm:text-s1 text-purple">
                about the seminar leader
              </div>
              <Speaker speaker={seminar.fields.leader} />
              {seminar.fields.guestSpeakers && (
                <>
                  <div className="mt-18 sm:mt-12 ml-6 sm:ml-0 text-xl2 sm:text-s1 text-purple">
                    about invited speakers
                  </div>
                  {seminar.fields.guestSpeakers.map((speaker, speakerIndex) => (
                    <Speaker key={speakerIndex} speaker={speaker} />
                  ))}
                </>
              )}
              <div className="grid mt-18 sm:mt-12 sm:flex-wrap">
                {seminar.fields.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="col-7-s sm:col-11-s sm:mb-4"
                  >
                    <div className="text-s2 border-b border-black pb-1">
                      {session.fields.title || `session ${sessionIndex + 1}`}
                    </div>
                    <Markdown className="mt-3 sm:mt-2 text-s1 pr-6 sm:pr-0">
                      {session.fields.text}
                    </Markdown>
                  </div>
                ))}
              </div>
              <div className="mt-18 sm:mt-12 ml-6 sm:ml-0 text-xl2 sm:text-s1 text-purple">
                syllabus
              </div>
              <div className="grid mt-4 sm:mt-2">
                <div className="col-3-s sm:hidden" />
                <div className="col-14-s sm:col-11-s text-l2 sm:text-s1">
                  <Markdown>{seminar.fields.methodology}</Markdown>
                </div>
              </div>
              <div className="grid mt-18 sm:mt-12 mb-2 sm:mb-10">
                <div className="col-23-s sm:col-11-s">
                  <a
                    href={seminar.fields.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'block w-full border border-solid border-black py-13 sm:py-6 text-xxl sm:text-xl3 text-center hover:bg-purple',
                      styles.applyButton
                    )}
                  >
                    apply
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Seminar

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import Typograf from '../typograph'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'

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

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen w-screen z-40',
        styles.seminar,
        {
          [styles.seminarOpen]: isOpen && !isClosing,
        }
      )}
    >
      <div className="grid h-full">
        <div className="col-1 bg-transparent z-50 h-full" onClick={close} />
        <div
          ref={ref}
          className="col-23 h-full bg-white text-black overflow-auto relative pt-2"
        >
          <button
            className={cn('block fixed z-50', styles.closeButton)}
            onClick={close}
          >
            <X />
          </button>
          {seminar && (
            <div key={seminar.sys.id} className="px-1">
              <div className="grid-s">
                <div className="col-20-s text-xxl">
                  <Typograf className={cn('text-purple', styles.seminarName)}>
                    {seminar.fields.name}
                  </Typograf>
                  <div>{seminar.fields.leader.fields.name}</div>
                </div>
                <div className="col-3-s" />
              </div>
              <div className="grid-s">
                <div className="col-5-s" />
                <div className="col-16-s text-xxl text-purple text-right">
                  {format(new Date(seminar.fields.date), 'MM.dd.yyyy')}
                </div>
              </div>
              <div className="grid-s mt-18">
                <div className="col-19-s text-xl2">
                  <div className="text-purple">guest speaker: </div>
                  {seminar.fields.guestSpeakers.map((guest, guestIndex) => (
                    <div key={guestIndex}>
                      {`${guest.fields.name} (${guest.fields.country})`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-18 text-l2">
                <SeminarContent className={styles.wysiwyg}>
                  {seminar.fields.content}
                </SeminarContent>
              </div>
              <div className="mt-18 ml-6 text-xl2 text-purple">
                about speakers
              </div>
              <div className="grid-s mt-4">
                <div className="col-3-s" />
                <div className="col-14-s text-l2">
                  <Markdown>{seminar.fields.aboutSpeakers}</Markdown>
                </div>
              </div>
              <div className="grid-s mt-18">
                {seminar.fields.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="col-7-s">
                    <div className="text-s2 border-b border-black pb-1">
                      {session.fields.title || `session ${sessionIndex + 1}`}
                    </div>
                    <Markdown className="mt-3 text-s1 pr-6">
                      {session.fields.text}
                    </Markdown>
                  </div>
                ))}
              </div>
              <div className="mt-18 ml-6 text-xl2 text-purple">methodology</div>
              <div className="grid-s mt-4">
                <div className="col-3-s" />
                <div className="col-14-s text-l2">
                  <Markdown>{seminar.fields.methodology}</Markdown>
                </div>
              </div>
              <div className="grid-s mt-18 mb-2">
                <div className="col-23-s">
                  <a
                    href={seminar.fields.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'block w-full border border-solid border-black py-13 text-xxl text-center hover:bg-purple',
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

import React, { useRef, useEffect, useState } from 'react'
import { format } from 'date-fns'
import cn from 'classnames'
import styles from './styles.module.scss'
import X from '../../assets/icons/✕.svg'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useRouter } from 'next/router'
import Typograf from '../typograph'

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
    }, 1000)
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
            <div className="px-1">
              <div className="grid-s">
                <div className="col-20-s text-xxl">
                  <Typograf className={cn('text-purple', styles.seminarName)}>
                    {seminar.name}
                  </Typograf>
                  <div>{seminar.leader}</div>
                </div>
                <div className="col-3-s" />
              </div>
              <div className="grid-s">
                <div className="col-5-s" />
                <div className="col-16-s text-xxl text-purple text-right">
                  {format(new Date(seminar.date), 'mm.dd.yyyy')}
                </div>
              </div>
              <div className="grid-s mt-18">
                <div className="col-19-s text-xl2">
                  <div className="text-purple">guest speaker: </div>
                  {seminar.guests.map((guest, guestIndex) => (
                    <div key={guestIndex}>
                      {`${guest.name} (${guest.country})`}
                    </div>
                  ))}
                </div>
              </div>
              <div className={cn('grid-s mt-18 text-l2', styles.wysiwyg)}>
                <Typograf>{seminar.content}</Typograf>
              </div>
              <div className="grid-s justify-end mt-18">
                {seminar.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="col-7-s">
                    <div className="text-s2 border-b border-black pb-1">
                      {`session ${sessionIndex + 1}`}
                    </div>
                    <Typograf className="mt-3 text-s1 pr-6">{session}</Typograf>
                  </div>
                ))}
              </div>
              <div className="mt-18 ml-6 text-xl2 text-purple">methodology</div>
              <div className="grid-s mt-4">
                <div className="col-3-s" />
                <div className="col-14-s text-l2">
                  <Typograf>{seminar.methodology}</Typograf>
                </div>
              </div>
              <div className="grid-s mt-18 mb-4">
                <div className="col-23-s">
                  <a
                    href={seminar.applyUrl}
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

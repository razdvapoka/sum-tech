import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import X from '../../assets/icons/✕.svg'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useRouter } from 'next/router'

const Seminar = ({ isOpen }) => {
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
          className="col-23 h-full bg-white text-black overflow-auto relative"
        >
          <button
            className={cn('block fixed z-50', styles.closeButton)}
            onClick={close}
          >
            <X />
          </button>
          <div style={{ height: '200vh' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Seminar

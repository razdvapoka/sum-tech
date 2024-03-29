import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useRef, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Markdown from '../markdown'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'

const Privacy = ({ isPrivacyOpen, privacy, iam }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      if (isPrivacyOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isPrivacyOpen, ref])

  const router = useRouter()

  return (
    <div
      className={cn('fixed left-0 top-0 h-screen w-screen', styles.privacy, {
        [styles.privacyOpen]: isPrivacyOpen,
      })}
    >
      <div className="grid h-full">
        <div
          className={cn('col-1 bg-transparent h-full', styles.privacyFiller)}
          onClick={() => router.push('/')}
        />
        <div
          ref={ref}
          className={cn(
            'col-23 h-full bg-white text-black overflow-auto relative pt-2',
            styles.privacyBox
          )}
        >
          <button
            className={cn('block fixed z-50', styles.closeButton)}
            onClick={() => router.push('/')}
          >
            <X />
          </button>
          <div key="privacy" className="px-1 pb-2 sm:pb-12">
            <div className="grid sm:flex-wrap sm:pr-1">
              <div className="col-11-s sm:col-11-s">
                <div className="text-s2 pb-1 border-black border-b mb-4">
                  e-flux privacy policy
                </div>
                <Markdown className={cn('text-s1', styles.privacyContent)}>
                  {privacy}
                </Markdown>
              </div>
              <div className="col-11-s sm:col-11-s sm:mt-12">
                <div className="text-s2 pb-1 border-black border-b mb-4">
                  iam privacy policy
                </div>
                <Markdown className={cn('text-s1', styles.privacyContent)}>
                  {iam}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy

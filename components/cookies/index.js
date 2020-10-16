import React from 'react'
import { FixedBottom } from 'react-fixed-bottom'
import { useLocalStorage } from 'react-use'
import cn from 'classnames'
import styles from './styles.module.scss'
import X from '../../assets/icons/✕.svg'

const Cookies = ({ isVisible }) => {
  const [cookieWarningShown, setCookieWarningShown] = useLocalStorage(
    'cookieWarningShown'
  )
  const close = () => {
    setCookieWarningShown(true)
  }
  return (
    <FixedBottom>
      <div
        key="cookieWarning"
        className={cn(
          'fixed left-0 w-screen px-2 cursor-pointer opacity-0',
          styles.cookieWarning,
          { 'opacity-100': isVisible },
          { hidden: cookieWarningShown }
        )}
        onClick={close}
      >
        <div className="grid">
          <div className="col-4 sm:hidden" />
          <div className="col-20 sm:col-6">
            <div className="bg-black text-s1 uppercase flex justify-between items-center sm:items-start mb-2 py-2 px-4 sm:px-2 border border-white">
              <span className={styles.cookieWarningText}>
                By using this website you automatically agree to our use of
                cookies
              </span>
              <X className={styles.x} />
            </div>
          </div>
        </div>
      </div>
    </FixedBottom>
  )
}

export default Cookies

import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import styles from './styles.module.scss'
import useHideOnScroll from '../../hooks/useHideOnScroll'

const Header = ({
  applyUrl,
  text,
  seminarCount,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const isHidden = useHideOnScroll()
  return (
    <div
      className={cn('sm:fixed sm:top-0 sm:z-50', styles.headerBox, {
        [styles.headerBoxHidden]: isHidden,
      })}
    >
      <header className="grid pt-2">
        <div className="col-4 hover:text-purple sm:col-4">
          <Link href="/">
            <a className="block border-b border-inherit text-s2 pb-1">
              <span className="sm:hidden">Summa Technologiae</span>
              <span className="hidden sm:inline">ST</span>
            </a>
          </Link>
        </div>
        <div className="col-4 sm:hidden">
          <div className="border-b border-white text-s2 pb-1">School</div>
        </div>
        <div className="col-4 sm:hidden">
          <div className="border-b border-white text-s2 pb-1">{`${seminarCount} seminars`}</div>
        </div>
        <div className="col-6 sm:hidden">
          <Markdown className={cn('text-s1', styles.headerText)}>
            {text}
          </Markdown>
        </div>
        <div className="col-6 hover:text-purple sm:hidden">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'block border-b border-inherit text-s2 pb-1',
              styles.applyButton
            )}
          >
            Apply Now
          </a>
        </div>
        <div className="hidden sm:block sm:col-2">
          <button
            className={cn(
              'border-b border-white pb-1 text-s2 w-full text-left',
              styles.menuButton
            )}
            onClick={() => setIsMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header

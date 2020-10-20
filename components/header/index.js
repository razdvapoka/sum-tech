import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import styles from './styles.module.scss'

import Burger from '../../assets/icons/burger.svg'
import X from '../../assets/icons/✕.svg'

const SECTIONS = [
  'about',
  'seminars',
  'faculty',
  'guest speakers',
  'application',
  'contact & credits',
]

const Header = ({
  applyUrl,
  text,
  seminarCount,
  isMenuOpen,
  setIsMenuOpen,
  headerSectionIndex,
}) => {
  return (
    <div className={cn('sm:fixed sm:top-0 sm:bg-black', styles.headerBox)}>
      <header className="grid pt-2 sm:pt-0 sm:px-1">
        <div
          className={cn(
            `
            col-4 sm:col-6
            hover:text-purple
            sm:flex sm:justify-between
            sm:border-b sm:border-white
          `,
            styles.mobileHeaderCol
          )}
        >
          <Link href="/">
            <a
              className={cn(
                'block border-b border-inherit sm:border-none text-s2 pb-1 sm:pb-0 relative hover:purple',
                styles.menuButton,
                styles.colorTransition
              )}
            >
              <span className="hidden sm:block">
                {headerSectionIndex === null
                  ? 'Summa Technologiae'
                  : SECTIONS[headerSectionIndex]}
              </span>
              <span className="sm:hidden">Summa Technologiae</span>
            </a>
          </Link>
          <button
            className={cn(
              'hidden sm:flex sm:justify-end sm:flex-1',
              styles.menuButton
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={styles.x} />
            ) : (
              <Burger className={styles.burger} />
            )}
          </button>
        </div>
        <div className="col-4 sm:hidden">
          <div
            className={cn(
              'border-b border-inherit text-s2 pb-1 hover:text-purple',
              styles.colorTransition
            )}
          >
            <a href="#seminars">Seminars</a>
          </div>
        </div>
        <div className="col-4 sm:hidden">
          <div className="border-b border-white text-s2 pb-1">Exhibition</div>
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
              styles.colorTransition
            )}
          >
            Apply Now
          </a>
        </div>
      </header>
    </div>
  )
}

export default Header

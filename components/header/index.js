import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import Burger from '../../assets/icons/burger.svg'
import Markdown from '../markdown'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'

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
  isVisible,
}) => {
  return (
    <div className={cn('sm:fixed sm:top-0 sm:bg-black', styles.headerBox)}>
      <header
        className={cn(
          'grid pt-2 sm:pt-0 sm:px-1 sm:text-white',
          styles.header,
          'text-white',
          { [styles.headerVisible]: isVisible }
        )}
      >
        <div className="col-4 sm:hidden" />
        <div
          className={cn(
            `
            col-4 sm:col-6
            hover:text-purple
            sm:flex sm:justify-between
            sm:border-b sm:border-white
            fixed sm:static
            z-50 sm:z-auto
          `,
            styles.mobileHeaderCol
          )}
        >
          <Link href="/">
            <a
              className={cn(
                'block text-s2 pb-1 sm:pb-0 relative hover:purple',
                styles.menuButton,
                styles.menuUnderline
              )}
            >
              <span className="hidden sm:block">
                {headerSectionIndex === null
                  ? 'Summa Technologiae'
                  : SECTIONS[headerSectionIndex]}
              </span>
              <span
                className={cn('sm:hidden opacity-0', styles.opacityTransition, {
                  'opacity-100': isVisible,
                })}
              >
                Summa Technologiae
              </span>
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
              'text-s2 pb-1 hover:text-purple relative',
              styles.menuUnderline
            )}
          >
            <a
              className={cn('block opacity-0', styles.opacityTransition, {
                'opacity-100': isVisible,
              })}
              href="#seminars"
            >
              Seminars
            </a>
          </div>
        </div>
        <div className="col-4 sm:hidden">
          <div
            className={cn(
              'text-s2 pb-1 pointer-events-none relative',
              styles.menuUnderline
            )}
          >
            <span
              className={cn('opacity-0', styles.opacityTransition, {
                'opacity-100': isVisible,
              })}
            >
              Exhibition
            </span>
          </div>
        </div>
        <div className="col-6 sm:hidden">
          <Markdown
            className={cn(
              'text-s1',
              styles.headerText,
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            {text}
          </Markdown>
        </div>
        <div className="col-6 hover:text-purple sm:hidden">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('block text-s2 pb-1 relative', styles.menuUnderline)}
          >
            <span
              className={cn('opacity-0', styles.opacityTransition, {
                'opacity-100': isVisible,
              })}
            >
              Apply Now
            </span>
          </a>
        </div>
      </header>
    </div>
  )
}

export default Header

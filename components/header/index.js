import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import Typograf from '../typograph'
import styles from './styles.module.scss'

const Header = ({ text, seminarCount }) => {
  return (
    <header className="grid pt-2">
      <div className="col-4 hover:text-purple sm:col-4">
        <Link href="/">
          <a className="block border-b border-inherit text-s2 pb-1">
            <span className="sm:hidden">Summa Technologiae</span>
            <span className="hidden sm:inline">S T</span>
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
        <Typograf className={cn('text-s1', styles.headerText)}>{text}</Typograf>
      </div>
      <div className="col-6 hover:text-purple sm:hidden">
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block border-b border-inherit text-s2 pb-1"
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
        >
          Menu
        </button>
      </div>
    </header>
  )
}

export default Header

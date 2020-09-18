import React from 'react'
import Link from 'next/link'

import Typograf from '../typograph'

const Header = ({ text, seminarCount }) => {
  return (
    <header className="grid pt-2">
      <div className="col-4 hover:text-purple">
        <Link href="/">
          <a className="block border-b border-inherit text-s2 pb-1">
            Summa Technologiae
          </a>
        </Link>
      </div>
      <div className="col-4">
        <div className="border-b border-white text-s2 pb-1">School</div>
      </div>
      <div className="col-4">
        <div className="border-b border-white text-s2 pb-1">{`${seminarCount} seminars`}</div>
      </div>
      <div className="col-6">
        <Typograf className="text-s1">{text}</Typograf>
      </div>
      <div className="col-6 hover:text-purple">
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block border-b border-inherit text-s2 pb-1"
        >
          Apply Now
        </a>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import Typograf from '../typograph'
import cn from 'classnames'

import styles from './styles.module.scss'

const textMock = `
In September 1974, the American science-fiction writer Philipp K. Dick, wrote a letter to the FBI,
claiming that there was a communist conspiracy disguised as science-fiction literature. This
conspiracy was orchestrated by a communist committee, which — according to Philipp K. Dick —
operated under the name of “Stanislaw Lem”.<br/>
While of course he was neither a committee, nor a conspiracy; Stanislaw Lem was a writer that produced a body of work so vast and so far-reaching, that it is easy to understand Philipp K. Dick’s refusal to accept that it was the work of only one person.<br/><br/>
Summa Technologiae School is organized in cooperation between e-flux and Adam Mickeiwicz Institute and curated by Julieta Aranda.
`

const Header = ({ text }) => {
  return (
    <header className="grid pt-2">
      <div className="col-4">
        <div className="border-b border-white text-s2 pb-1">
          Summa Technologiae
        </div>
      </div>
      <div className="col-4">
        <div className="border-b border-white text-s2 pb-1">School</div>
      </div>
      <div className="col-4">
        <div className="border-b border-white text-s2 pb-1">6 seminars</div>
      </div>
      <div className="col-6">
        <Typograf className="text-s1">{textMock}</Typograf>
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

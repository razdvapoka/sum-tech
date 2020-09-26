import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Footer = ({ contact, follow, isPrivacyOpen, setIsPrivacyOpen }) => {
  return (
    <footer className={cn('relative', styles.footer)}>
      <div className={styles.anchorTarget} id="contact" />
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Contact us
          </div>
          <Markdown className={cn('text-s1', styles.columnText)}>
            {contact}
          </Markdown>
        </div>
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Follow us
          </div>
          <Markdown
            className={cn(
              'text-s1 flex flex-col items-start',
              styles.columnText,
              styles.follow
            )}
          >
            {follow}
          </Markdown>
        </div>
      </div>
      <div className="grid mt-12">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Privacy policy
          </div>
          <div className={cn('text-s1', styles.columnText)}>
            <button
              className={cn('hover:text-purple', styles.privacyButton)}
              onClick={() => setIsPrivacyOpen(true)}
            >
              E-flux and IAM privacy policy
            </button>
            <br />
            <br />
            ©2020
          </div>
        </div>
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">Credits</div>
          <div className={cn('text-s1', styles.columnText, styles.credits)}>
            <p>
              Design: Tanya Ermolaeva, Nat Kukina
              <br />
              Technical realization: Sergey Zakharov, Valentin Golev
            </p>
            <Typograf as="p">
              Summa Technologiae School is organized in cooperation between
              e-flux and Adam Mickeiwicz Institute and curated by Julieta
              Aranda.
            </Typograf>
            <div className={cn(styles.logos, 'mt-4')} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

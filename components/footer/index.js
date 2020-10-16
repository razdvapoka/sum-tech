import React from 'react'
import cn from 'classnames'
import Link from 'next/link'

import Markdown from '../markdown'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Footer = ({ contact, follow, isPrivacyOpen }) => {
  return (
    <footer className={cn('relative', styles.footer)}>
      <div className={styles.anchorTarget} id="contact" />
      <div className="grid mt-18 sm:mt-12 sm:flex-wrap sm:flex-col-reverse">
        <div className="col-4 sm:hidden" />
        <div className="col-10 sm:col-6 sm:hidden">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Contact us
          </div>
          <Markdown className={cn('text-s1', styles.columnText)}>
            {contact}
          </Markdown>
        </div>
        <div className="col-10 sm:col-6">
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
      <div className="grid mt-12 sm:mt-6 sm:flex-wrap sm:flex-col-reverse">
        <div className="col-4 sm:hidden" />
        <div className="col-10 sm:col-6 sm:mt-6">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Privacy policy
          </div>
          <div className={cn('text-s1', styles.columnText)}>
            <Link href="?privacy=true" scroll={false}>
              <a className={cn('hover:text-purple', styles.privacyButton)}>
                E-flux and IAM privacy policy
              </a>
            </Link>
            <br />
            <br />
            ©2020
          </div>
        </div>
        <div className="hidden sm:block sm:col-6 sm:mt-6">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Contact us
          </div>
          <Markdown className={cn('text-s1', styles.columnText)}>
            {contact}
          </Markdown>
        </div>
        <div className="col-10 sm:col-6">
          <div className="pb-1 mb-3 border-white border-b text-s2">Credits</div>
          <div className={cn('text-s1', styles.columnText, styles.credits)}>
            <p>
              Design: Tanya Ermolaeva, Nat Kukina
              <br />
              Technical realization: Sergey Zakharov, Valentin Golev
            </p>
            <Typograf as="p">
              Summa Technologiae seminars are organized by Julieta Aranda, as a
              cooperation between e-flux and Adam Mickiewicz Institute
            </Typograf>
            <div className={cn(styles.logos, 'mt-6 sm:mt-4')} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

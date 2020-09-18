import Link from 'next/link'
import React, { useMemo } from 'react'
import cn from 'classnames'

import { Page } from '../page'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Home = ({ headerText, seminarCount, description, keywords }) => {
  const keywordsComponent = useMemo(
    () => (
      <div>
        {keywords.map((keyword, keywordIndex) => (
          <div className="hover:text-purple" key={keywordIndex}>
            {keyword}
          </div>
        ))}
      </div>
    ),

    [keywords]
  )

  return (
    <Page headerText={headerText} seminarCount={seminarCount}>
      <div className="grid mt-36">
        <div className="col-8" />
        <div className="col-14">
          <Typograf className="text-l2">{description}</Typograf>
        </div>
      </div>
      <div className="grid mt-36">
        <div className="col-4" />
        <div
          className={cn(
            'col-20 border border-white text-l1 text-center overflow-hidden',
            styles.keywords
          )}
        >
          <div className={styles.keywordsInner}>
            {keywordsComponent}
            {keywordsComponent}
            {keywordsComponent}
          </div>
        </div>
      </div>
      <Link href="/?seminar=1" scroll={false}>
        <a>with sem</a>
      </Link>
    </Page>
  )
}

export default Home

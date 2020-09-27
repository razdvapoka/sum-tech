import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Lem = ({ photo, bio }) => {
  return (
    <section>
      <div className="grid mt-18 sm:mt-12">
        <div className="col-4 sm:hidden" />
        <div className="col-8 sm:col-6">
          <Typograf className="text-s2 sm:border-b sm:border-white sm:pb-1">
            Stanislaw Lem — Biography
          </Typograf>
        </div>
      </div>
      <div className="grid mt-4 sm:mt-2">
        <div className="col-5 sm:hidden" />
        <div className="col-5 sm:col-5">
          <img width="100%" src={photo} />
        </div>
      </div>
      <div className="grid mt-4 sm:mt-2">
        <div className="col-5 sm:col-1" />
        <div className="col-15 sm:col-5">
          <Markdown className={cn('text-l2 sm:text-s1', styles.lemBio)}>
            {bio}
          </Markdown>
        </div>
      </div>
    </section>
  )
}

export default Lem

import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Lem = ({ photo, bio }) => {
  return (
    <section>
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-8">
          <Typograf className="text-s2">Stanislaw Lem — Biography</Typograf>
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-5">
          <img width="100%" src={photo} />
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-15">
          <Markdown className={cn('text-l2', styles.lemBio)}>{bio}</Markdown>
        </div>
      </div>
    </section>
  )
}

export default Lem

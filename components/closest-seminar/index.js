import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const ClosestSeminar = ({ slug, name, date }) => {
  return (
    <div className="grid mt-18 sm:mt-4">
      <div className="col-4 sm:hidden" />
      <Link href={`?seminar=${slug}`} scroll={false}>
        <a className="block col-20 sm:col-6 text-xxl sm:text-l3">
          <div>next seminar</div>
          <div
            lang="en"
            className={cn('text-purple', styles.name)}
            dangerouslySetInnerHTML={{ __html: `‘${name}’` }}
          />
          <div>starts on</div>
          <div>{format(new Date(date), 'MMMM dd, yyyy')}</div>
        </a>
      </Link>
    </div>
  )
}

export default ClosestSeminar

import React from 'react'
import cn from 'classnames'

import Markdown from '../markdown'
import styles from './styles.module.scss'

const Application = ({ who, how, requirements }) => {
  return (
    <div className="mt-18 sm:mt-12 grid sm:flex-wrap">
      <div className="col-4 sm:hidden" />
      <div className="col-7 sm:col-6">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          Who can apply
        </div>
        <Markdown className={cn('text-s1', styles.columnText)}>{who}</Markdown>
      </div>
      <div className="col-7 sm:col-6 sm:mt-6">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          How to apply
        </div>
        <Markdown className={cn('text-s1', styles.columnText)}>{how}</Markdown>
      </div>
      <div className="col-6 sm:col-6 sm:mt-6">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          Language requirements
        </div>
        <Markdown className={cn('text-s1', styles.columnText)}>
          {requirements}
        </Markdown>
      </div>
    </div>
  )
}

export default Application

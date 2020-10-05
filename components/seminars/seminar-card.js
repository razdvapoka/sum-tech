import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import Typograf from '../typograph'
import styles from './styles.module.scss'

const SeminarCard = ({ seminar, setIsLoadingSeminar, seminarIndex }) => {
  return (
    <div className="col-10 sm:col-6 mb-4">
      <div className="text-s2 mb-1">{`seminar ${seminarIndex + 1}`}</div>
      <Link href={`?seminar=${seminar.fields.slug}`} scroll={false}>
        <a
          className={cn(
            'block border border-white hover:bg-purple',
            styles.seminarBox,
            { 'pointer-events-none': seminar.fields.isComingSoon }
          )}
          style={{
            backgroundImage: `url(${seminar.fields.diagram.fields.file.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          onClick={() => setIsLoadingSeminar(true)}
        >
          <div className="absolute left-0 top-0 w-full h-full text-center pt-4 sm:pt-2 px-12 sm:px-6 text-xl sm:text-m">
            <div>
              {seminar.fields.isComingSoon
                ? '00.00'
                : format(new Date(seminar.fields.date), 'dd.MM')}
            </div>
            <Typograf>
              {seminar.fields.isComingSoon
                ? 'coming soon'
                : seminar.fields.name}
            </Typograf>
            {!seminar.fields.isComingSoon && (
              <div className="mt-10 sm:mt-5">
                {seminar.fields.leader.fields.name}
              </div>
            )}
            <div
              className={cn(
                'absolute text-s2 uppercase text-center sm:hidden',
                styles.learnMore
              )}
            >
              learn more
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SeminarCard

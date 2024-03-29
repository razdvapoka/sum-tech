import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

const SeminarCard = ({ seminar }) => {
  return (
    <div className="col-10 sm:col-6 mb-4">
      <div className="text-s2 mb-1">{`seminar ${seminar.fields.number}`}</div>
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
        >
          <div
            className={`
              absolute left-0 top-0 w-full h-full
              py-4 sm:py-2 px-4 sm:px-2
              text-l4 sm:text-m uppercase
              text-center
              flex flex-col justify-between
            `}
          >
            <div>
              <div>
                {seminar.fields.dateString ||
                  (seminar.fields.isComingSoon
                    ? '00.00'
                    : format(new Date(seminar.fields.date), 'dd.MM'))}
              </div>
              <h3
                dangerouslySetInnerHTML={{
                  __html: seminar.fields.isComingSoon
                    ? 'coming soon'
                    : seminar.fields.name,
                }}
              />
            </div>
            <div>
              {!seminar.fields.isComingSoon && (
                <div className="mt-10 sm:mt-5">
                  {seminar.fields.leaders.map((speaker, speakerIndex) => (
                    <div key={speakerIndex}>{speaker.fields.name}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SeminarCard

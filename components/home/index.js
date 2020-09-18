import Link from 'next/link'
import React, { useMemo } from 'react'
import cn from 'classnames'
import { format } from 'date-fns'

import { Page } from '../page'
import Keywords from '../keywords'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Home = ({
  headerText,
  seminarCount,
  description,
  keywords,
  objective,
  lemPhoto,
  lemBio,
  seminars,
  seminarsDescription,
}) => {
  const closestSeminar = useMemo(() => {
    const closestSeminars = seminars
      .map((s) => ({ ...s, date: new Date(s.date) }))
      .sort((s1, s2) => s1.date > s2.date)
      .filter((s) => s.date >= new Date())
    return closestSeminars.length > 0 ? closestSeminars[0] : null
  }, [seminars])
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
        <div className="col-20">
          <Keywords keywords={keywords} />
        </div>
      </div>
      <div className="grid mt-36">
        <div className="col-8" />
        <div className="col-14">
          <Typograf className="text-l2">{objective}</Typograf>
        </div>
      </div>
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-8">
          <Typograf className="text-s3">Stanislaw Lem — Biography</Typograf>
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-5">
          <img width="100%" src={lemPhoto} />
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-15">
          <Typograf className={cn('text-l2', styles.lemBio)}>{lemBio}</Typograf>
        </div>
      </div>
      {closestSeminar && (
        <div className="grid mt-18">
          <div className="col-4" />
          <div className="col-20 text-xxl">
            <div>next seminar</div>
            <div className="text-purple">{`‘${closestSeminar.name}’`}</div>
            <div>starts on</div>
            <div>{format(closestSeminar.date, 'MMMM dd, yyyy')}</div>
          </div>
        </div>
      )}
      <div className="grid mt-30">
        <div className="col-4" />
        <div className="col-14">
          <Typograf className="text-l2">{seminarsDescription}</Typograf>
        </div>
      </div>
      <div className="grid mt-36 justify-end flex-wrap">
        {seminars.map((seminar, seminarIndex) => (
          <div key={seminarIndex} className="col-10 mb-4">
            <div className="text-s2 mb-1">{`seminar ${seminarIndex + 1}`}</div>
            <Link href={`?seminar=${seminar.slug}`} scroll={false}>
              <a
                className={cn(
                  'block border border-white hover:bg-purple',
                  styles.seminarBox
                )}
                style={{
                  backgroundImage: `url(${seminar.diagram})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute left-0 top-0 w-full h-full text-center pt-4 px-12 text-xl">
                  <div>{format(new Date(seminar.date), 'dd.MM')}</div>
                  <Typograf>{seminar.name}</Typograf>
                  <div className="mt-10">{seminar.leader}</div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default Home

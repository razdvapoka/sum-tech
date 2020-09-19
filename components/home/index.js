import Link from 'next/link'
import React, { useMemo } from 'react'
import cn from 'classnames'
import { format } from 'date-fns'

import { Page } from '../page'
import Keywords from '../keywords'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const ClosestSeminar = ({ slug, name, date }) => {
  return (
    <div className="grid mt-18">
      <div className="col-4" />
      <Link href={`?seminar=${slug}`} scroll={false}>
        <a className="block col-20 text-xxl">
          <div>next seminar</div>
          <div className="text-purple">{`‘${name}’`}</div>
          <div>starts on</div>
          <div>{format(date, 'MMMM dd, yyyy')}</div>
        </a>
      </Link>
    </div>
  )
}

const Lem = ({ photo, bio }) => {
  return (
    <section>
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-8">
          <Typograf className="text-s3">Stanislaw Lem — Biography</Typograf>
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
          <Typograf className={cn('text-l2', styles.lemBio)}>{bio}</Typograf>
        </div>
      </div>
    </section>
  )
}

const Seminars = ({ description, items }) => {
  return (
    <section>
      <div className="grid mt-30">
        <div className="col-4" />
        <div className="col-14">
          <Typograf className="text-l2">{description}</Typograf>
        </div>
      </div>
      <div className="grid mt-36 justify-end flex-wrap">
        {items.map((seminar, seminarIndex) => (
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
    </section>
  )
}

const Outcomes = ({ text, items }) => {
  return (
    <div className="grid mt-18">
      <div className="col-4" />
      <div className="col-19 text-xxl">
        <div>{text}</div>
        <ul className="text-right">
          {items.map((item, itemIndex) => (
            <li className="odd:text-purple" key={itemIndex}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Speakers = ({ speakers, className }) => {
  return (
    <div className={cn('grid', className)}>
      <div className="col-4" />
      <div className="grid flex-wrap col-20">
        {speakers.map((speaker, speakerIndex) => (
          <div
            key={speakerIndex}
            className={cn(
              'col-5 relative hover:text-purple mb-4',
              styles.leader
            )}
          >
            <div
              className={cn('relative h-0', styles.leaderPhoto)}
              style={{
                paddingTop: '100%',
                backgroundImage: `url(${speaker.photo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div
                className={cn(
                  'absolute left-0 top-0 w-full h-full',
                  styles.leaderPhotoOverlay
                )}
              />
            </div>
            <div className="text-s2 text-inherit mt-2">{speaker.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Home = ({
  headerText,
  description,
  keywords,
  objective,
  lem,
  seminars,
  outcomes,
  speakers,
  secondPhase,
}) => {
  const closestSeminar = useMemo(() => {
    const closestSeminars = seminars.items
      .map((s) => ({ ...s, date: new Date(s.date) }))
      .sort((s1, s2) => s1.date > s2.date)
      .filter((s) => s.date >= new Date())
    return closestSeminars.length > 0 ? closestSeminars[0] : null
  }, [seminars])

  const [leaders, others] = useMemo(() => {
    return speakers.reduce(
      (agg, speaker) =>
        speaker.isLeader
          ? [[...agg[0], speaker], agg[1]]
          : [agg[0], [...agg[1], speaker]],
      [[], []]
    )
  }, [speakers])

  return (
    <Page headerText={headerText} seminarCount={seminars.items.count}>
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
      <Lem {...lem} />
      {closestSeminar && <ClosestSeminar {...closestSeminar} />}
      <Seminars {...seminars} />
      <Outcomes {...outcomes} />
      <Speakers speakers={leaders} className="mt-18" />
      <div className="grid mt-40">
        <div className="col-4" />
        <div className={cn('col-19 text-xxl', styles.secondPhase)}>
          <div dangerouslySetInnerHTML={{ __html: secondPhase }} />
        </div>
      </div>
      <Speakers speakers={others} className="mt-36" />
    </Page>
  )
}

export default Home

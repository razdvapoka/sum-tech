import { format } from 'date-fns'
import { useIntersection } from 'react-use'
import Link from 'next/link'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import { Page } from '../page'
import Keywords from '../keywords'
import Speaker from '../speaker'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Footer = ({ contact, follow }) => {
  return (
    <footer className={cn('relative', styles.footer)}>
      <div className={styles.anchorTarget} id="contact" />
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Contact us
          </div>
          <Typograf className={cn('text-s1', styles.columnText)}>
            {contact}
          </Typograf>
        </div>
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Follow us
          </div>
          <Typograf
            className={cn(
              'text-s1 flex flex-col items-start',
              styles.columnText
            )}
          >
            {follow}
          </Typograf>
        </div>
      </div>
      <div className="grid mt-12">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Privacy policy
          </div>
          <div className={cn('text-s1', styles.columnText)}>
            E-flux and IAM privacy policy
            <br />
            <br />
            ©2020
          </div>
        </div>
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">Credits</div>
          <div className={cn('text-s1', styles.columnText, styles.credits)}>
            <p>
              Design: Tanya Ermolaeva, Nat Kukina
              <br />
              Technical realization: Sergey Zakharov, Valentin Golev
            </p>
            <Typograf as="p">
              Summa Technologiae School is organized in cooperation between
              e-flux and Adam Mickeiwicz Institute and curated by Julieta
              Aranda.
            </Typograf>
            <div className={cn(styles.logos, 'mt-4')} />
          </div>
        </div>
      </div>
    </footer>
  )
}

const Application = ({ who, how, requirements }) => {
  return (
    <div className="mt-18 grid">
      <div className="col-4" />
      <div className="col-7">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          Who can apply
        </div>
        <Typograf className={cn('text-s1', styles.columnText)}>{who}</Typograf>
      </div>
      <div className="col-7">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          How to apply
        </div>
        <Typograf className={cn('text-s1', styles.columnText)}>{how}</Typograf>
      </div>
      <div className="col-6">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          Language requirements
        </div>
        <Typograf className={cn('text-s1', styles.columnText)}>
          {requirements}
        </Typograf>
      </div>
    </div>
  )
}

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
          <Typograf className={cn('text-l2', styles.lemBio)}>{bio}</Typograf>
        </div>
      </div>
    </section>
  )
}

const Seminars = ({ description, items, setIsLoadingSeminar }) => {
  return (
    <section>
      <div className="grid mt-30">
        <div className="col-5" />
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
                onClick={() => setIsLoadingSeminar(true)}
              >
                <div className="absolute left-0 top-0 w-full h-full text-center pt-4 px-12 text-xl">
                  <div>{format(new Date(seminar.date), 'dd.MM')}</div>
                  <Typograf>{seminar.name}</Typograf>
                  <div className="mt-10">{seminar.leader}</div>
                  <div
                    className={cn(
                      'absolute text-s2 uppercase text-center',
                      styles.learnMore
                    )}
                  >
                    learn more
                  </div>
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
  const [openBioIndex, setOpenBioIndex] = useState(null)
  return (
    <div className={cn('grid', className)}>
      <div className="col-4" />
      <div className="col-20 grid flex-wrap">
        {speakers.map((speaker, speakerIndex) => (
          <Speaker
            key={speakerIndex}
            index={speakerIndex}
            openBioIndex={openBioIndex}
            setOpenBioIndex={setOpenBioIndex}
            {...speaker}
          />
        ))}
      </div>
    </div>
  )
}

const Section = ({
  sectionIndex,
  setActiveSectionIndex,
  children,
  ...rest
}) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '-10px',
  })
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setActiveSectionIndex(sectionIndex)
    }
  }, [intersection, sectionIndex])
  return (
    <section ref={intersectionRef} {...rest}>
      {children}
    </section>
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
  application,
  contact,
  follow,
  seminar,
}) => {
  const [isLoadingSeminar, setIsLoadingSeminar] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(null)

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
    <Page
      headerText={headerText}
      seminarCount={seminars.items.length}
      seminar={seminar}
      activeSectionIndex={activeSectionIndex}
      setIsLoadingSeminar={setIsLoadingSeminar}
      isLoadingSeminar={isLoadingSeminar}
    >
      <Section
        sectionIndex={0}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="about" />
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
      </Section>
      <Section
        sectionIndex={1}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="seminars" />
        {closestSeminar && <ClosestSeminar {...closestSeminar} />}
        <Seminars {...seminars} setIsLoadingSeminar={setIsLoadingSeminar} />
        <Outcomes {...outcomes} />
      </Section>
      <Section
        sectionIndex={2}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="leaders" />
        <Speakers speakers={leaders} className="mt-18" />
        <div className={cn('grid mt-36', styles.secondPhase)}>
          <div className="col-4" />
          <div className={cn('col-19 text-xxl', styles.secondPhase)}>
            <div dangerouslySetInnerHTML={{ __html: secondPhase }} />
          </div>
        </div>
      </Section>
      <Section
        sectionIndex={3}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="speakers" />
        <Speakers speakers={others} className="mt-36" />
        <div className="grid mt-36">
          <div className="col-4" />
          <div className="col-20">
            <Keywords keywords={keywords} />
          </div>
        </div>
      </Section>
      <Section
        sectionIndex={4}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="apply" />
        <Application {...application} />
        <div className="grid mt-18">
          <div className="col-4" />
          <div className="col-20">
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                'block border border-white py-13 text-xxl text-center hover:bg-purple',
                styles.applyButton
              )}
            >
              apply
            </a>
          </div>
        </div>
      </Section>
      <Section sectionIndex={5} setActiveSectionIndex={setActiveSectionIndex}>
        <Footer follow={follow} contact={contact} />
      </Section>
    </Page>
  )
}

export default Home

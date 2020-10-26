import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { Page } from '../page'
import Application from '../application'
import ClosestSeminar from '../closest-seminar'
import Footer from '../footer'
import Heading from '../heading'
import Keywords from '../keywords'
import Lem from '../lem'
import Markdown from '../markdown'
import Outcomes from '../outcomes'
import Section from '../section'
import Seminars from '../seminars'
import Speakers from '../speakers'
import styles from './styles.module.scss'
import { addYears } from 'date-fns'
import Graph68 from '../graph-68'
import Graph68M from '../graph-68-m'

const Home = ({ page }) => {
  const router = useRouter()
  const seminarSlug = router.query.seminar
  const seminar =
    seminarSlug &&
    page.fields.seminars.find((s) => s.fields.slug === seminarSlug)
  const [activeSectionIndex, setActiveSectionIndex] = useState(null)
  const [headerSectionIndex, setHeaderSectionIndex] = useState(null)

  const isPrivacyOpen = !!router.query.privacy

  const sortedSeminars = useMemo(
    () =>
      page.fields.seminars
        .map((s) => ({
          ...s,
          fields: {
            ...s.fields,
            date: s.fields.isComingSoon
              ? addYears(new Date(s.fields.date), 1)
              : new Date(s.fields.date),
          },
        }))
        .sort((s1, s2) =>
          new Date(s1.fields.date) > new Date(s2.fields.date) ? 1 : -1
        ),
    [page.fields.seminars]
  )

  const closestSeminars = sortedSeminars.filter(
    (s) => new Date(s.fields.date) >= new Date()
  )

  const closestSeminar = closestSeminars.length > 0 ? closestSeminars[0] : null

  const leaders = page.fields.seminars.reduce(
    (l, s) => [...l, ...s.fields.leaders],
    []
  )
  const speakers = page.fields.seminars.reduce(
    (agg, s) => [...agg, ...(s.fields.guestSpeakers || [])],
    []
  )

  const handleScroll = () => {
    const headings = document.querySelectorAll('.heading')
    const positions = Array.from(headings)
      .map((h, hi) => {
        return {
          index: hi,
          top: h.getBoundingClientRect().top,
        }
      })
      .filter((h) => h.top < 40)
    setHeaderSectionIndex(
      positions.length > 0 ? positions[positions.length - 1].index : null
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Page
      headerText={page.fields.headerText}
      headerSectionIndex={headerSectionIndex}
      seminarCount={page.fields.seminars.length}
      seminar={seminar}
      activeSectionIndex={activeSectionIndex}
      isPrivacyOpen={isPrivacyOpen}
      privacy={page.fields.privacy}
      iam={page.fields.iam}
      applyUrl={page.fields.applyUrl}
    >
      <div className="grid">
        <div className="hidden sm:block sm:col-6 text-s1">
          <Markdown>{page.fields.headerText}</Markdown>
        </div>
      </div>
      <Section
        sectionIndex={0}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative sm:mt-12"
      >
        <div className={styles.anchorTarget} id="about" />
        <Heading>About</Heading>
        <div className="grid mt-36 sm:mt-4">
          <div className="col-8 sm:col-1" />
          <div className="col-14 sm:col-5">
            <Markdown className={cn('text-l2 sm:text-s1', styles.description)}>
              {page.fields.description}
            </Markdown>
          </div>
        </div>
        <div className="grid mt-36 sm:mt-12">
          <div className="col-4 sm:hidden" />
          <div className="col-20 sm:col-6">
            <Keywords keywords={page.fields.keywords} />
          </div>
        </div>
        <div className="grid mt-36 sm:mt-12">
          <div className="col-8 sm:hidden" />
          <div className="col-14 sm:col-6">
            <Markdown className={cn('text-l2 sm:text-s1', styles.description)}>
              {page.fields.objective}
            </Markdown>
          </div>
        </div>
        <Lem
          photo={page.fields.lemPhoto.fields.file.url}
          bio={page.fields.lemBio}
        />
      </Section>
      <Section
        sectionIndex={1}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative sm:mt-12"
      >
        <div className={styles.anchorTarget} id="seminars" />
        <Heading>Seminars</Heading>
        {closestSeminar && <ClosestSeminar {...closestSeminar.fields} />}
        <Seminars
          items={page.fields.seminars}
          description={page.fields.seminarsDescription}
        />
        <Outcomes
          text={page.fields.seminarsOutcomesText}
          items={page.fields.seminarsOutcomesList}
        />
      </Section>
      <Section
        sectionIndex={2}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative sm:mt-12"
      >
        <div className={styles.anchorTarget} id="faculty" />
        <Heading>Faculty</Heading>
        <Speakers
          speakers={leaders}
          className="mt-18 sm:mt-4"
          heading="faculty"
        />
        <div className="grid mt-36 sm:mt-12">
          <div className="col-4 sm:hidden" />
          <div
            className={cn(
              'col-19 sm:col-6 text-xxl sm:text-l3',
              styles.secondPhase
            )}
          >
            <Markdown>{page.fields.secondPhase}</Markdown>
          </div>
        </div>
      </Section>
      <Section
        sectionIndex={3}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative sm:mt-12"
      >
        <div className={styles.anchorTarget} id="speakers" />
        <Heading>guest speakers</Heading>
        <Speakers
          speakers={speakers}
          className="mt-36 sm:mt-4"
          heading="guest speakers"
        />
      </Section>
      <div className={cn('grid mt-40 sm:mt-6', styles.program)}>
        <div className="col-4 sm:hidden" />
        <div className="col-20 sm:col-6">
          <div className="text-s2 mb-1">Summa Technologiae Program</div>
          <Graph68 />
          <Graph68M />
        </div>
      </div>
      <Section
        sectionIndex={4}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative mt-32 sm:mt-0"
      >
        <div className={styles.anchorTarget} id="apply" />
        <Heading hidden>Application</Heading>
        <Application
          who={page.fields.applicationWho}
          how={page.fields.applicationHow}
          requirements={page.fields.applicationRequirements}
        />
        <div className="grid mt-18 sm:mt-6">
          <div className="col-4 sm:hidden" />
          <div className="col-20 sm:col-6">
            <a
              href={page.fields.applyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                'block border border-white py-13 sm:py-10 text-xxl sm:text-xl4 text-center hover:bg-purple',
                styles.applyButton
              )}
            >
              apply
            </a>
          </div>
        </div>
      </Section>
      <Section sectionIndex={5} setActiveSectionIndex={setActiveSectionIndex}>
        <Heading hidden>Contacts</Heading>
        <Footer
          follow={page.fields.social}
          contact={page.fields.contact}
          isPrivacyOpen={isPrivacyOpen}
        />
      </Section>
    </Page>
  )
}

export default Home

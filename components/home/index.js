import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import cn from 'classnames'

import { Page } from '../page'
import Application from '../application'
import ClosestSeminar from '../closest-seminar'
import Footer from '../footer'
import Keywords from '../keywords'
import Lem from '../lem'
import Markdown from '../markdown'
import Outcomes from '../outcomes'
import Section from '../section'
import Seminars from '../seminars'
import Speakers from '../speakers'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Home = ({ page }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const router = useRouter()
  const seminarSlug = router.query.seminar
  const seminar =
    seminarSlug &&
    page.fields.seminars.find((s) => s.fields.slug === seminarSlug)
  const [isLoadingSeminar, setIsLoadingSeminar] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(null)

  const sortedSeminars = useMemo(
    () =>
      page.fields.seminars.sort((s1, s2) =>
        new Date(s1.fields.date) > new Date(s2.fields.date) ? 1 : -1
      ),
    [page.fields.seminars]
  )

  const closestSeminars = sortedSeminars.filter(
    (s) => new Date(s.fields.date) >= new Date()
  )

  const closestSeminar = closestSeminars.length > 0 ? closestSeminars[0] : null

  const leaders = page.fields.seminars.map((s) => s.fields.leader)
  const speakers = page.fields.seminars.reduce(
    (agg, s) => [...agg, ...s.fields.guestSpeakers],
    []
  )

  return (
    <Page
      headerText={page.fields.headerText}
      seminarCount={page.fields.seminars.length}
      seminar={seminar}
      activeSectionIndex={activeSectionIndex}
      setIsLoadingSeminar={setIsLoadingSeminar}
      isLoadingSeminar={isLoadingSeminar}
      isPrivacyOpen={isPrivacyOpen}
      setIsPrivacyOpen={setIsPrivacyOpen}
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
        className="relative"
      >
        <div className={styles.anchorTarget} id="about" />
        <div className="grid mt-36">
          <div className="col-8" />
          <div className="col-14">
            <Markdown className="text-l2">{page.fields.description}</Markdown>
          </div>
        </div>
        <div className="grid mt-36">
          <div className="col-4" />
          <div className="col-20">
            <Keywords keywords={page.fields.keywords} />
          </div>
        </div>
        <div className="grid mt-36">
          <div className="col-8" />
          <div className="col-14">
            <Typograf className="text-l2">{page.fields.objective}</Typograf>
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
        className="relative"
      >
        <div className={styles.anchorTarget} id="seminars" />
        {closestSeminar && <ClosestSeminar {...closestSeminar.fields} />}
        <Seminars
          items={page.fields.seminars}
          description={page.fields.seminarsDescription}
          setIsLoadingSeminar={setIsLoadingSeminar}
        />
        <Outcomes
          text={page.fields.seminarsOutcomesText}
          items={page.fields.seminarsOutcomesList}
        />
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
            <Markdown>{page.fields.secondPhase}</Markdown>
          </div>
        </div>
      </Section>
      <Section
        sectionIndex={3}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="speakers" />
        <Speakers speakers={speakers} className="mt-36" />
        <div className="grid mt-36">
          <div className="col-4" />
          <div className="col-20">
            <Keywords keywords={page.fields.keywords} />
          </div>
        </div>
      </Section>
      <Section
        sectionIndex={4}
        setActiveSectionIndex={setActiveSectionIndex}
        className="relative"
      >
        <div className={styles.anchorTarget} id="apply" />
        <Application
          who={page.fields.applicationWho}
          how={page.fields.applicationHow}
          requirements={page.fields.applicationRequirements}
        />
        <div className="grid mt-18">
          <div className="col-4" />
          <div className="col-20">
            <a
              href={page.fields.applyUrl}
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
        <Footer
          follow={page.fields.social}
          contact={page.fields.contact}
          isPrivacyOpen={isPrivacyOpen}
          setIsPrivacyOpen={setIsPrivacyOpen}
        />
      </Section>
    </Page>
  )
}

export default Home

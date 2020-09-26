import { format } from 'date-fns'
import { useIntersection } from 'react-use'
import Link from 'next/link'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import { Page } from '../page'
import Keywords from '../keywords'
import Markdown from '../markdown'
import Speaker from '../speaker'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Footer = ({ contact, follow, isPrivacyOpen, setIsPrivacyOpen }) => {
  return (
    <footer className={cn('relative', styles.footer)}>
      <div className={styles.anchorTarget} id="contact" />
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Contact us
          </div>
          <Markdown className={cn('text-s1', styles.columnText)}>
            {contact}
          </Markdown>
        </div>
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Follow us
          </div>
          <Markdown
            className={cn(
              'text-s1 flex flex-col items-start',
              styles.columnText,
              styles.follow
            )}
          >
            {follow}
          </Markdown>
        </div>
      </div>
      <div className="grid mt-12">
        <div className="col-4" />
        <div className="col-10">
          <div className="pb-1 mb-3 border-white border-b text-s2">
            Privacy policy
          </div>
          <div className={cn('text-s1', styles.columnText)}>
            <button
              className={cn('hover:text-purple', styles.privacyButton)}
              onClick={() => setIsPrivacyOpen(true)}
            >
              E-flux and IAM privacy policy
            </button>
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
        <Markdown className={cn('text-s1', styles.columnText)}>{who}</Markdown>
      </div>
      <div className="col-7">
        <div className="pb-1 mb-3 border-white border-b text-s2">
          How to apply
        </div>
        <Markdown className={cn('text-s1', styles.columnText)}>{how}</Markdown>
      </div>
      <div className="col-6">
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

const ClosestSeminar = ({ slug, name, date }) => {
  return (
    <div className="grid mt-18">
      <div className="col-4" />
      <Link href={`?seminar=${slug}`} scroll={false}>
        <a className="block col-20 text-xxl">
          <div>next seminar</div>
          <div className="text-purple">{`‘${name}’`}</div>
          <div>starts on</div>
          <div>{format(new Date(date), 'MMMM dd, yyyy')}</div>
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
          <Markdown className={cn('text-l2', styles.lemBio)}>{bio}</Markdown>
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
          <Markdown className="text-l2">{description}</Markdown>
        </div>
      </div>
      <div className="grid mt-36 justify-end flex-wrap">
        {items.map((seminar, seminarIndex) => (
          <div key={seminarIndex} className="col-10 mb-4">
            <div className="text-s2 mb-1">{`seminar ${seminarIndex + 1}`}</div>
            <Link href={`?seminar=${seminar.fields.slug}`} scroll={false}>
              <a
                className={cn(
                  'block border border-white hover:bg-purple',
                  styles.seminarBox
                )}
                style={{
                  backgroundImage: `url(${seminar.fields.diagram.fields.file.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                onClick={() => setIsLoadingSeminar(true)}
              >
                <div className="absolute left-0 top-0 w-full h-full text-center pt-4 px-12 text-xl">
                  <div>{format(new Date(seminar.fields.date), 'dd.MM')}</div>
                  <Typograf>{seminar.fields.name}</Typograf>
                  <div className="mt-10">
                    {seminar.fields.leader.fields.name}
                  </div>
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
        <Markdown>{text}</Markdown>
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
            {...speaker.fields}
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

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useClickAway } from 'react-use'
import React, { useRef, useEffect } from 'react'
import cn from 'classnames'

import Typograf from '../typograph'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'
import useBreakpoint from '../../hooks/useBreakpoint'

const Bio = ({ isSpeakerBioOpen, setOpenBioIndex, name, bio, url }) => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'MOBILE'

  const ref = useRef(null)
  useClickAway(ref, (e) => {
    if (isSpeakerBioOpen) {
      setOpenBioIndex(null)
    }
  })

  useEffect(() => {
    const el = ref.current
    if (el && isMobile) {
      if (isSpeakerBioOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isSpeakerBioOpen, ref, isMobile])

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none fixed bg-black text-white z-40 border border-white opacity-0 p-2',
        'sm:px-2 sm:pt-3 sm:pb-8 sm:flex sm:flex-col sm:justify-between sm:border-none',
        'sm:height-screen overflow-auto',
        styles.leaderBio,
        { 'opacity-100 pointer-events-auto': isSpeakerBioOpen }
      )}
    >
      <div className="flex justify-between sm:absolute sm:left-0 sm:top-0 sm:w-full sm:px-2 sm:pt-3">
        <div className="text-s2 sm:hidden">{`${name} — Biography`}</div>
        <div className="text-s2 hidden sm:block">
          <div>{name}</div>
          <div>Biography</div>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => {
            setOpenBioIndex(null)
          }}
        >
          <X />
        </button>
      </div>
      <Typograf
        className={cn(
          'text-m sm:text-s1 mt-6 sm:mt-10 px-10 sm:px-0',
          styles.leaderBioText
        )}
      >
        {bio}
      </Typograf>
      <div className="px-10 sm:px-0 mt-8 sm:mt-12 mb-4 sm:mb-0">
        <a
          className={cn(
            'text-s2 hover:text-purple border-b border-inherit',
            styles.leaderBioMore
          )}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          more about the speaker
        </a>
      </div>
    </div>
  )
}

const Speaker = ({
  index,
  photo,
  name,
  bio,
  url,
  openBioIndex,
  setOpenBioIndex,
}) => {
  const isSpeakerBioOpen = index === openBioIndex
  const isBioOpen = openBioIndex !== null

  return (
    <>
      <Bio
        isSpeakerBioOpen={isSpeakerBioOpen}
        setOpenBioIndex={setOpenBioIndex}
        name={name}
        bio={bio}
        url={url}
      />
      <div
        className={cn(
          'col-5-l sm:col-6 relative mb-4 cursor-pointer',
          styles.leader,
          { [styles.overlay]: !isSpeakerBioOpen },
          isBioOpen ? 'pointer-events-none' : ''
        )}
        onClick={() => !isSpeakerBioOpen && setOpenBioIndex(index)}
      >
        <div
          className={cn('relative h-0', styles.leaderPhoto)}
          style={{
            paddingTop: '100%',
            backgroundImage: `url(${photo.fields.file.url})`,
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
        <div className="text-s2 text-inherit mt-2">{name}</div>
      </div>
    </>
  )
}

export default Speaker

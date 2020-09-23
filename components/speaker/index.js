import React, { useRef } from 'react'
import cn from 'classnames'
import { useClickAway } from 'react-use'

import Typograf from '../typograph'
import X from '../../assets/icons/✕.svg'
import styles from './styles.module.scss'

const Speaker = ({
  index,
  photo,
  name,
  bio,
  url,
  openBioIndex,
  setOpenBioIndex,
}) => {
  const ref = useRef(null)
  const isSpeakerBioOpen = index === openBioIndex
  const isBioOpen = openBioIndex !== null
  useClickAway(ref, (e) => {
    if (isSpeakerBioOpen) {
      setOpenBioIndex(null)
    }
  })

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'pointer-events-none fixed top-0 right-0 bg-black text-white z-40 border border-white opacity-0 p-2',
          styles.leaderBio,
          { 'opacity-100 pointer-events-auto': isSpeakerBioOpen }
        )}
      >
        <div className="flex justify-between">
          <div className="text-s2">{`${name} — Biography`}</div>
          <button
            className={styles.closeButton}
            onClick={() => {
              setOpenBioIndex(null)
            }}
          >
            <X />
          </button>
        </div>
        <Typograf className={cn('text-m mt-6 px-10', styles.leaderBioText)}>
          {bio}
        </Typograf>
        <div className="px-10 mt-8">
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
      <div
        className={cn(
          'col-5-l relative mb-4 cursor-pointer',
          styles.leader,
          { [styles.overlay]: !isSpeakerBioOpen },
          isBioOpen ? 'pointer-events-none' : 'hover:text-purple'
        )}
        onClick={() => !isSpeakerBioOpen && setOpenBioIndex(index)}
      >
        <div
          className={cn('relative h-0', styles.leaderPhoto)}
          style={{
            paddingTop: '100%',
            backgroundImage: `url(${photo})`,
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

import React, { useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

import Speaker from '../speaker'

const Speakers = ({ speakers, heading, className }) => {
  const [openBioIndex, setOpenBioIndex] = useState(null)
  return (
    <div className={className}>
      <div className={cn('grid mb-2', styles.heading)}>
        <div className="col-4" />
        <div className="col-20">
          <h2 className="text-s1 uppercase pb-1 border-b border-white">
            {heading}
          </h2>
        </div>
      </div>
      <div className="grid">
        <div className="col-4 sm:hidden" />
        <div className="col-20 sm:col-6 ">
          <div className="grid flex-wrap">
            {speakers.filter(Boolean).map((speaker, speakerIndex) => (
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
      </div>
    </div>
  )
}

export default Speakers

import React, { useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

import Speaker from '../speaker'

const getLastName = (name) => {
  const split = name.split(/\s/g).filter((s) => s.length > 0)
  return split[split.length - 1]
}

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
            {speakers
              .filter(Boolean)
              .sort((s1, s2) => {
                return getLastName(s1.fields.name) > getLastName(s2.fields.name)
                  ? 1
                  : -1
              })
              .map((speaker, speakerIndex) => (
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

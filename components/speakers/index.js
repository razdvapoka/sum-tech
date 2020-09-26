import React, { useState } from 'react'
import cn from 'classnames'

import Speaker from '../speaker'

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

export default Speakers

import React from 'react'

import Markdown from '../markdown'
import SeminarCard from './seminar-card'

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
          <SeminarCard
            key={seminarIndex}
            seminar={seminar}
            seminarIndex={seminarIndex}
            setIsLoadingSeminar={setIsLoadingSeminar}
          />
        ))}
      </div>
    </section>
  )
}

export default Seminars

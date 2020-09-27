import React from 'react'

import Markdown from '../markdown'
import SeminarCard from './seminar-card'

const Seminars = ({ description, items, setIsLoadingSeminar }) => {
  return (
    <section>
      <div className="grid mt-30 sm:mt-6">
        <div className="col-5 sm:hidden" />
        <div className="col-14 sm:col-6">
          <Markdown className="text-l2 sm:text-s1">{description}</Markdown>
        </div>
      </div>
      <div className="grid mt-36 sm:mt-6 justify-end flex-wrap">
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

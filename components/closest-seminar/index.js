import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

const ClosestSeminar = ({ slug, name, date }) => {
  return (
    <div className="grid mt-18 sm:mt-4">
      <div className="col-4 sm:hidden" />
      <Link href={`?seminar=${slug}`} scroll={false}>
        <a className="block col-20 sm:col-6 text-xxl sm:text-l3">
          <div>next seminar</div>
          <div className="text-purple">{`‘${name}’`}</div>
          <div>starts on</div>
          <div>{format(new Date(date), 'MMMM dd, yyyy')}</div>
        </a>
      </Link>
    </div>
  )
}

export default ClosestSeminar

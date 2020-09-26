import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

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

export default ClosestSeminar

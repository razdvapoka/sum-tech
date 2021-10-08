import { useMemo } from 'react'

import Markdown from '../markdown'
import SeminarCard from './seminar-card'
import { compareAsc } from 'date-fns'

const groupByYear = (items) => {
  const groups = items.reduce((agg, item) => {
    const year = new Date(item.fields.date).getFullYear()
    return {
      ...agg,
      [year]: [...(agg[year] || []), item],
    }
  }, {})
  return Object.keys(groups)
    .sort((y1, y2) => (y1 - y2 > 0 ? -1 : 1))
    .map((year) => {
      return [
        year,
        groups[year].sort((item1, item2) =>
          compareAsc(new Date(item1.fields.date), new Date(item2.fields.date))
        ),
      ]
    })
}

const Seminars = ({ description, items }) => {
  const groupedByYear = useMemo(() => groupByYear(items), [items])

  return (
    <section>
      <div className="grid mt-30 sm:mt-12">
        <div className="col-5 sm:hidden" />
        <div className="col-14 sm:col-6">
          <Markdown className="text-l2 sm:text-s1">{description}</Markdown>
        </div>
      </div>
      <div className="space-y-20">
        {groupedByYear.map(([year, seminars]) => (
          <div key={year}>
            <div className="grid mb-20">
              <div className="col-4" />
              <div className="col-20">
                <h2 className="text-s1 uppercase pb-1 border-b border-white">
                  {year}
                </h2>
              </div>
            </div>
            <div className="grid sm:mt-12 justify-end flex-wrap">
              {seminars.map((seminar) => (
                <SeminarCard key={seminar.sys.id} seminar={seminar} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Seminars

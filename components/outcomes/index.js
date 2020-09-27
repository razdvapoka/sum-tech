import React from 'react'

import Markdown from '../markdown'

const Outcomes = ({ text, items }) => {
  return (
    <div className="grid mt-18 sm:mt-12">
      <div className="col-4 sm:hidden" />
      <div className="col-19 sm:col-6 text-xxl sm:text-l3">
        <Markdown>{text}</Markdown>
        <ul className="text-right">
          {items.map((item, itemIndex) => (
            <li className="odd:text-purple" key={itemIndex}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Outcomes

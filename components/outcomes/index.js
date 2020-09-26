import React from 'react'

import Markdown from '../markdown'

const Outcomes = ({ text, items }) => {
  return (
    <div className="grid mt-18">
      <div className="col-4" />
      <div className="col-19 text-xxl">
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

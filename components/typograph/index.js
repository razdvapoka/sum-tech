import React from 'react'
import tp from '../../typograph'

const Typograf = ({ as: Component = 'div', children, ...rest }) => (
  <Component
    {...rest}
    dangerouslySetInnerHTML={{ __html: tp.execute(children) }}
  />
)

export default Typograf

import React from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

const MENU_ITEMS = [
  { name: 'about', hash: 'about' },
  { name: 'seminars', hash: 'seminars' },

  { name: 'seminar leaders', hash: 'leaders' },

  { name: 'invited speakers', hash: 'speakers' },

  { name: 'how to apply', hash: 'apply' },

  { name: 'contact & credits', hash: 'contact' },
]

const Menu = () => {
  return (
    <nav
      className={cn(
        'fixed h-screen flex flex-col justify-between py-4 z-50',
        styles.menu
      )}
    >
      <ul>
        {MENU_ITEMS.map((item) => (
          <li
            key={item.hash}
            className="pb-1 mb-1 border-b border-white text-s2"
          >
            <a href={`#${item.hash}`}>{item.name}</a>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          'text-l1 w-full py-20 border border-white border-solid hover:bg-purple',
          styles.applyButton
        )}
      >
        apply
      </button>
    </nav>
  )
}

export default Menu

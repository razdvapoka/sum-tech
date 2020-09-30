import React, { useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { FixedBottom } from 'react-fixed-bottom'

const MENU_ITEMS = [
  { name: 'about', hash: 'about' },
  { name: 'seminars', hash: 'seminars' },
  { name: 'seminar leaders', hash: 'leaders' },
  { name: 'invited speakers', hash: 'speakers' },
  { name: 'how to apply', hash: 'apply' },
  { name: 'contact & credits', hash: 'contact' },
]

const Menu = ({
  activeSectionIndex,
  isVisible,
  isOpen,
  setIsMenuOpen,
  applyUrl = 'https://example.com',
}) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      if (isOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isOpen, ref])

  return (
    <nav
      ref={ref}
      className={cn(
        `
        fixed h-screen
        flex flex-col justify-between
        py-2
        opacity-0 sm:opacity-100
        z-50
        sm:top-0
        sm:pt-8
        sm:px-2
        sm:bg-black
        sm:pb-20
        sm:overflow-auto
        `,
        styles.menu,
        { [styles.menuOpen]: isOpen },
        { 'opacity-100': isVisible }
      )}
    >
      <ul>
        {MENU_ITEMS.map((item, itemIndex) => {
          const isActive = itemIndex === activeSectionIndex
          return (
            <li
              key={item.hash}
              className={cn(
                'hover:text-purple mb-1 sm:mb-0 text-s2 border-b',
                styles.menuItem,
                {
                  'text-purple pointer-events-none': isActive,
                }
              )}
            >
              <a href={`#${item.hash}`} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </a>
            </li>
          )
        })}
      </ul>
      <FixedBottom>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'fixed hidden sm:block sm:text-xl3 sm:py-9 border border-white border-solid text-center',
            styles.applyButton
          )}
        >
          apply
        </a>
      </FixedBottom>
      <a
        href={applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'text-center block text-l1 w-full py-20 border border-white border-solid hover:bg-purple sm:hidden',
          styles.applyButton
        )}
      >
        apply
      </a>
    </nav>
  )
}

export default Menu

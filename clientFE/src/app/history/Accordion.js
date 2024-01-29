'use client'

import React from 'react'

const Accordion = ({
  showAccordion,
  children,
  title,
  handleOnClick=() => {}
}) => {
  return (
    <div
      className='border border-blue-700 rounded-lg overflow-clip'
    >
      <div
        onClick={handleOnClick}
        className='cursor-pointer p-4 bg-blue-500 text-white'
      >
        <span className='text-sm md:text-3xl'>{title}</span>
        <span className='text-3xl float-end'>{showAccordion ? '\u2212': '\u002B'}</span>

      </div>
      {
        showAccordion &&
        <div
          className=''
        >
          {children}
        </div>
      }
    </div>
  )
}

export default Accordion
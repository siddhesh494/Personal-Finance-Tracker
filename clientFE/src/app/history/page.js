'use client'

import Accordion from '@/app/history/Accordion'
import React, {useEffect, useState} from 'react'

const page = () => {
  

  const getHistory = async () => {
    try {
      const data = await fetch("http://localhost:7000/getTransactionHistory")
      const json = await data.json()

      console.log(json)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

  }, [])


  return (
    <div
      className='p-4'
    >
      
      <Accordion
        title={"2024 November"}
        handleOnClick={() => {

        }}
        showAccordion={true}
      >
        <div className='p-4'>
          
          <div 
            className='border border-slate-700 rounded-md'
          >
            {/* head */}
            <div
              className='border-b border-slate-400 flex justify-between px-4 py-1'
            >
              <p>Date</p>
              <p>Total RS</p>
            </div>

            {/* data */}
            <div className='flex justify-between px-4 py-1 '>
              <div
                className='flex justify-between'
              >
                <span className='text-xs mr-4'>Category</span>
                <span>Description</span>
              </div>
              <div>
                <p>RS</p>
              </div>
            </div>
            

          </div>

        </div>
      </Accordion>
    </div>
  )
}

export default page
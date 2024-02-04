'use client'

import Accordion from '@/app/Accordion'
import { map, forEach } from 'lodash'
import React, {useEffect, useState} from 'react'
import AddTransactionModal from '../AddTransactionModal'
import { ShimmerThumbnail } from 'react-shimmer-effects'

export default function Page() {
  
  const [history, setHistory] = useState({})
  const [showAccordion, setShowAccordion] = useState([])
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const getHistory = async () => {
    setIsLoading(true)
    try {
      const data = await fetch("http://localhost:7000/getTransactionHistory")
      const json = await data.json()

      if(json.success && json.data) {
        setHistory(json.data)
        const temp = []

        forEach(Object.keys(json.data), (v, i) => {
          if(i === 0) 
            temp.push(true)
          else  
            temp.push(false)
        })

        setShowAccordion(temp)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getHistory()
  }, [])


  return (
    <>
    <AddTransactionModal
      isOpen={showAddTransactionModal}
      setIsOpen={setShowAddTransactionModal}
      successCallBack={() => {
        getHistory()
      }}
    />
      
    <div
      className='p-4 page-container'
    >
      <div className='flex my-5 justify-end'>
        <button 
          className='shadow-lg px-4 py-3 border-none bg-blue-500 text-white font-normal md:font-medium rounded-lg active:bg-blue-600'
          onClick={() => {
            setShowAddTransactionModal(true)
          }}
        >
          Add New Expense
        </button>
      </div>
      {isLoading ? (
        <div className=''>
          <ShimmerThumbnail height={400} rounded />
        </div>
      ) : (
        map(Object.keys(history), (yearKey, index) => {
          return (
              <Accordion
                key={yearKey}
                title={yearKey}
                handleOnClick={() => {
                  showAccordion[index] = !showAccordion[index]
                  setShowAccordion([...showAccordion])
                }}
                showAccordion={showAccordion[index]}
              >
                <div className='p-4'>
                  {
                    map(history[yearKey], (dateValue, dateIndex) => {
                      return (
                        <div 
                          key={dateValue.date}
                          className='border border-slate-700 rounded-md mt-1'
                        >
                          {/* head */}
                          <div
                            className='border-b border-slate-400 flex justify-between px-4 py-1'
                          >
                            <p>{dateValue.date}</p>
                            <p>{dateValue.totalRS}</p>
                          </div>

                          {/* data */}
                          {map(dateValue.details, (item, i) => {
                            return (
                              <div 
                                key={i}
                                className='flex justify-between px-4 py-1 border-b border-slate-200'>
                                <div
                                  className='grid grid-cols-2	gap-4'
                                > 
                                  <div className='w-20 md:w-28'>
                                    <span className='text-[10px] md:text-xs'>{item.category}</span>
                                  </div>
                                  <div>
                                    <span>{item.description}</span>
                                  </div>
                                </div>
                                <div>
                                  <p>{item.amount}</p>
                                </div>
                              </div>
                            )
                          })}
                          

                        </div>
                      )
                    })
                  }
                  
                </div>
              </Accordion>
          )
        })
      )}
      
      
    </div>
    </>
  )
}

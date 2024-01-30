'use client'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import React, {useEffect, useState} from 'react'

import Image from "next/image";
import AddTransactionModal from "./AddTransactionModal";
import BarChart from './chart/BarChart';
import { isEmpty } from 'lodash';
import PieChart from './chart/PieChart';

export default function Home() {
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)

  const [monthWiseExpensesForYear, setMonthWiseExpensesForYear] = useState({})
  const [categoryWiseExpensesForYear, setCategoryWiseExpensesForYear] = useState({})
  const [totalYearlySpend, setTotalYearlySpend] = useState(0)

  const [monthWiseExpensesForMonthYear, setMonthWiseExpensesForMonthYear] = useState({})
  const [categoryWiseExpensesForMonthYear, setCategoryWiseExpensesForMonthYear] = useState({})
  const [totalMonthlySpend, setTotalMonthlySpend] = useState(0)

  const [thisMonthExpenses, setThisMonthExpenses] = useState(0)
  const [thisDateExpenses, setThisDateExpenses] = useState(0)

  const [selectedYear, setSelectedYear] = useState(new Date())
  const [selectedMonthYear, setSelectedMonthYear] = useState(new Date())
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

  useEffect(() => {
    getExpensesDetailsByYear(selectedYear.getFullYear())
  }, [selectedYear])

  useEffect(() => {
    getExpensesDetailsByMonthAndYear(monthList[selectedMonthYear.getMonth()],
    selectedMonthYear.getFullYear())
  }, [selectedMonthYear])

  useEffect(() => {
    getPresentData()
  }, [])

  async function getExpensesDetailsByYear(year) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: year
        })
      }
      const data = await fetch('http://localhost:7000/getExpensesByYear', options)
      const json = await data.json()
      if(json.success && json.data) {
        console.log(json)
        if(json.data.monthWiseExpenses) {
          setMonthWiseExpensesForYear({
            labels: json.data.monthWiseExpenses.map(i => i.name),
            datasets: [{
              label: "Expenses",
              data: json.data.monthWiseExpenses.map(i => i.total)
            }]
          })
        }

        if(json.data.categoryWiseExpenses) {
          setCategoryWiseExpensesForYear({
            labels: json.data.categoryWiseExpenses.map(i => i.name),
            datasets: [{
              label: "Expenses",
              data: json.data.categoryWiseExpenses.map(i => i.total)
            }]
          })
        }

        if(json.data.total) setTotalYearlySpend(json.data.total)

      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getExpensesDetailsByMonthAndYear(month, year) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: year,
          month: month
        })
      }
      const data = await fetch('http://localhost:7000/getExpensesByMonth', options)
      const json = await data.json()
      if(json.success && json.data) {
        if(json.data.dateWiseExpenses) {
          setMonthWiseExpensesForMonthYear({
            labels: json.data.dateWiseExpenses.map(i => i.name),
            datasets: [{
              label: "Expenses",
              data: json.data.dateWiseExpenses.map(i => i.total)
            }]
          })
        }

        if(json.data.categoryWiseExpenses) {
          setCategoryWiseExpensesForMonthYear({
            labels: json.data.categoryWiseExpenses.map(i => i.name),
            datasets: [{
              label: "Expenses",
              data: json.data.categoryWiseExpenses.map(i => i.total)
            }]
          })
        }

        if(json.data.total) setTotalMonthlySpend(json.data.total)

      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getPresentData() {
    try {
      const data = await fetch('http://localhost:7000/getPresentExpenses')
      const json = await data.json()
      if(json.success && json.data) {
        console.log(json)
        if(json?.data?.month?.totalAmount) setThisMonthExpenses(json?.data?.month?.totalAmount) 

        if(json?.data?.date?.totalAmount) setThisDateExpenses(json?.data?.date?.totalAmount) 

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>

      <AddTransactionModal
        isOpen={showAddTransactionModal}
        setIsOpen={setShowAddTransactionModal}
        successCallBack={() => {
          // getHistory()
          getExpensesDetailsByYear(selectedYear.getFullYear())
          getExpensesDetailsByMonthAndYear(monthList[selectedMonthYear.getMonth()],
          selectedMonthYear.getFullYear())
          getPresentData()
        }}
      />
      <div className='px-10'>
        
        {/* Add transaction button */}
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

        {/* dashborad page starts */}
        <div>

          {/* first section */}
          <div className='flex justify-between flex-col md:flex-row'>
            <div className='rounded-2xl text-white font-bold text-center p-4 bg-blue-400 md:w-[60%] shadow-xl'>
              <p>Total Expenses of this Month</p>
              <p>{thisMonthExpenses} RS</p>
            </div>
            <div className='rounded-2xl text-white font-bold text-center p-4 bg-green-400 mt-5 md:mt-0 md:w-[35%] shadow-xl'>
              <p>Today Expenses</p>
              <p>{thisDateExpenses} RS</p>
            </div>
          </div>

          {/* year section */}
          <div className='my-10 p-10 rounded-2xl border border-blue-700 shadow-xl'>
            {/* title */}
            <div className='text-center'>
              <span className="text-xl font-semibold">Yearly Spending of </span>
              <DatePicker
                id="year-picker"
                className='text-center w-14 px-1 py-2 border border-black rounded-lg'
                selected={selectedYear} 
                onChange={(date) => setSelectedYear(date)} 
                showYearPicker
                dateFormat='yyyy'
              />
            </div>
            
            <div className="text-center mt-1">
              <span>Total Yearly Spend: {totalYearlySpend} RS</span>
            </div>

            {/* graph */}
            <div className='flex justify-around flex-col md:flex-row mt-5'>
              <div className='w-full md:w-[50%]'>
                {!isEmpty(monthWiseExpensesForYear) && <BarChart 
                  chartData={monthWiseExpensesForYear}
                />}
              </div>

              <div className='mt-10 md:w-[24%] md:mt-0' >
                {!isEmpty(categoryWiseExpensesForYear) && <PieChart 
                  chartData={categoryWiseExpensesForYear}
                />}
              </div>
            </div>
          </div>
          
          {/* month section */}
          <div className='my-10 p-10 rounded-2xl border border-blue-700 shadow-xl'>
            {/* title */}
            <div className='text-center'>
              <span className="text-xl font-semibold">Montly Spending of </span>
              <DatePicker
                id="year-picker"
                className='text-center px-1 py-2 border border-black rounded-lg'
                selected={selectedMonthYear} 
                onChange={(date) => setSelectedMonthYear(date)} 
                showMonthYearPicker
                dateFormat="MMMM yyyy"
              />
            </div>
            <div className="text-center mt-1">
              <span className="">Total Montly Spend: {totalMonthlySpend} RS</span>
            </div>
            
            {/* graph */}
            <div className='flex justify-around flex-col md:flex-row mt-5'>
              <div className='w-full md:w-[50%]'>
                {!isEmpty(monthWiseExpensesForMonthYear) && <BarChart 
                  chartData={monthWiseExpensesForMonthYear}
                />}
              </div>

              <div className='mt-10 md:w-[24%] md:mt-0' >
                {!isEmpty(categoryWiseExpensesForMonthYear) && <PieChart 
                  chartData={categoryWiseExpensesForMonthYear}
                />}
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}

import './Modal.css';
import { useEffect, useState } from 'react';
import { map } from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import { find } from 'lodash';

const AddTransactionModal = ({ isOpen, setIsOpen, successCallBack}) => {

  const [categoryDropdown, setCategoryDropdown] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(null)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  
  const getCategoriesDropdown = async () => {
    try {
      const data = await fetch('http://localhost:7000/getFinanceCategory')
      const json = await data.json()
      if(json.success && json.data) {
        setCategory(json.data[0].categoryName)
        setCategoryDropdown([...json.data])
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isDisabled = false
    if(!startDate) isDisabled = true
    if(!amount) isDisabled = true
    if(!category) isDisabled = true
    if(!description) isDisabled = true

    setIsSaveDisabled(isDisabled)
  }, [startDate, amount, category, description])
  useEffect(() => {
    getCategoriesDropdown()
  }, [])

  const handleAddTransaction = async () => {

    try {
      
      const t = format(startDate, "yyyy-MM-dd HH:mm:ss")

      const categObj = find(categoryDropdown, {categoryName: category})
      const insertObj = {
        transactionDate: t,
        amount: amount,
        categoryID: categObj.financeCategoryID,
        description: description
      }
      console.log(insertObj)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertObj)
      }
      const data = await fetch("http://localhost:7000/addTransection", options)

      const json = await data.json()
      if(json.success) {
        successCallBack()
      }
      handleOnClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnClose = () => {
    setIsOpen(false)
    setStartDate(new Date())
    setAmount(null)
    // setCategory('')
    setDescription('')
  }
  
  const modalHTML = (
    <div className='m-4'>
      
      <div className='my-5 flex flex-row items-center'>
        <div className='w-32'>
          <span className='mr-2 w-36'>Date</span>
        </div>
        <div >
          <DatePicker 
            className='w-72 px-1 py-2 border border-black rounded-lg'
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            onSelect={(date) => {
              console.log(date)
            }}
          />
        </div>
      </div>

      <div className='my-5 flex flex-row items-center'>
        <div className='w-32'>
          <span className='mr-2 w-36'>Amount</span>
        </div>
        <div >
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            className='w-72 px-1 py-2 border border-black rounded-lg'
            type="number"
          />
        </div>
      </div>

      <div className='my-5 flex flex-row items-center'>
        <div className='w-32'>
          <span className='mr-2'>Category</span>
        </div>
        <div >
          <select 
            className='w-72 px-1 py-2 border border-black rounded-lg'
            name="category" 
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          >
            {map(categoryDropdown, (item) => <option key={item.financeCategoryID} value={item.categoryName}>{item.categoryName}</option>)}
          
          </select>
        </div>
      </div>

      <div className='my-5 flex flex-row items-center'>
        <div className='w-32'>
          <span className='mr-2 w-36'>Description</span>
        </div>
        <div >
          <input
            className='w-72 px-1 py-2 border border-black rounded-lg'
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </div>
      </div>
      
      <div className='flex my-5 justify-center'>
        <button
          className={`px-4 py-3 border-none bg-blue-500 text-white font-medium rounded-lg active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#c5c4c4] `}
          
          onClick={() => {
            handleAddTransaction()
          }}
          disabled ={isSaveDisabled}
        >
          Add Transaction
        </button>
      </div>
    </div>
  )
  return (
    <>
    {isOpen && (
      <div className="modal-overlay" onClick={handleOnClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={handleOnClose}>&times;</span>
          {modalHTML}
        </div>
      </div>
    )}
  </>
  )
}

export default AddTransactionModal
const moment = require('moment/moment')

const { safePromise } = require('../utils/require-helper')
const { getTransactionDal } = require('../dal/transection')
const { map, filter, find, forEach, groupBy } = require('lodash')

module.exports = class Expenses {
  
  async getPresentExpenses() {
    try {

      const currentYear = +moment().format('YYYY')
      const currentMonth = moment().format('MMMM')
      const currentDate = +moment().format('DD')

      const [
        [yearExpensesErr, yearExpenseRes],
        [monthExpensesErr, monthExpenseRes],
        [dateExpensesErr, dateExpenseRes]
      ] = await Promise.all([
        safePromise(this.getExpensesByGivenYear(currentYear)),
        safePromise(this.getExpenseByGivenMonth(currentMonth, currentYear)),
        safePromise(this.getExpenseByGivenDate(currentDate, currentMonth, currentYear))
      ])

      if(yearExpensesErr || monthExpensesErr || dateExpensesErr) {
        return Promise.reject(yearExpensesErr || monthExpensesErr || dateExpensesErr)
      }

      const finalObj = {
        year: {
          name: currentYear,
          totalAmount: yearExpenseRes.total
        },
        month: {
          name:currentMonth,
          totalAmount: monthExpenseRes.total
        },
        date: {
          name: currentDate,
          totalAmount: dateExpenseRes.total
        }
      }


      return finalObj
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpensesDetailsByYear(data) {
    try {
      
      const givenYear = data.year
      const [yearExpanseErr, yearExpenseRes] = await safePromise(this.getExpensesByGivenYear(givenYear))
      if(yearExpanseErr) {
        return Promise.reject(yearExpanseErr)
      }

      // months will be sorted
      const listOfAllMonth = moment.months()
      const monthWiseExpenses = []
      forEach(listOfAllMonth, (month) => {
        const f = find(yearExpenseRes.details, {name: month})
        if(f) {
          monthWiseExpenses.push(f)
        } else {
          monthWiseExpenses.push({
            name: month,
            total: 0
          })
        }
      })

      const finalObj = {
        name: givenYear,
        total: yearExpenseRes.total,
        monthWiseExpenses: monthWiseExpenses,
        categoryWiseExpenses: yearExpenseRes.categoryDetails
      }
      return finalObj

    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpensesDetailsByMonth(data) {
    try {
      
      const givenYear = data.year
      const givenMonth = data.month

      const [monthExpanseErr, monthExpenseRes] = await safePromise(this.getExpenseByGivenMonth(givenMonth, givenYear))
      if(monthExpanseErr) {
        return Promise.reject(monthExpanseErr)
      }

      // months will be sorted
      const numberOfDay = moment(`${givenYear}-${givenMonth}`, "YYYY-MMMM").daysInMonth() 
      const listOfAllDays = Array.from(Array(numberOfDay), (_, index) => index + 1)
      
      const dateWiseExpenses = []
      forEach(listOfAllDays, (day) => {
        const f = find(monthExpenseRes.details, {name: ''+day})
        if(f) {
          dateWiseExpenses.push(f)
        } else {
          dateWiseExpenses.push({
            name: day,
            total: 0
          })
        }
      })
      
      const finalObj = {
        name: `${givenMonth}-${givenYear}`,
        total: monthExpenseRes.total,
        dateWiseExpenses: dateWiseExpenses,
        categoryWiseExpenses: monthExpenseRes.categoryDetails
      }
      return finalObj
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpensesByDateMonthYear() {
    try {
      const [error, result] = await safePromise(getTransactionDal())
      if(error) {
        console.log(error)
        return Promise.reject(error)
      }
      // console.log(result)

      const finalArray = map(result, (item) => {
        return {
          amount: item.amount,
          description: item.description,
          category: item.categoryName,
          year: +moment(item.transactionDate).format('YYYY'),
          month: moment(item.transactionDate).format('MMMM'),
          date: +moment(item.transactionDate).format('DD')
        }
      })


      return finalArray
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpensesByGivenYear(year) {
    try {
      
      const [totalErr, totalRes] = await safePromise(this.getExpensesByDateMonthYear())
      if(totalErr) {
        console.log(totalErr)
        return Promise.reject(totalErr)
      }
      const yearList = filter(totalRes, {year: year})

      let totalYearAmount = 0
      forEach(yearList, (item) => {
        totalYearAmount += +item.amount
      })

      // ,month wise 
      const groupByMonth = groupBy(yearList, 'month') 
      const tempDetails = []
      forEach(groupByMonth, (value, key) => {
        const obj = {
          name: key,
          total: 0
        }
        forEach(value, (item) => {
          obj.total += +item.amount
        })
        tempDetails.push(obj)
      })

      // category wise expanse
      const groupByCat = groupBy(yearList, 'category') 
      const tempCatDetails = []
      forEach(groupByCat, (value, key) => {
        const obj = {
          name: key,
          total: 0
        }
        forEach(value, (item) => {
          obj.total += +item.amount
        })
        tempCatDetails.push(obj)
      }) 

      

      const finalObj = {
        name: year,
        total: totalYearAmount,
        details: tempDetails,
        categoryDetails: tempCatDetails
      }

      return finalObj
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpenseByGivenMonth(month, year) {
    try {
      
      const [totalErr, totalRes] = await safePromise(this.getExpensesByDateMonthYear())
      if(totalErr) {
        console.log(totalErr)
        return Promise.reject(totalErr)
      }
      const monthList = filter(totalRes, {year: year, month: month})

      let totalAmount = 0
      forEach(monthList, (item) => {
        totalAmount += +item.amount
      })

      // ,month wise 
      const groupByMonth = groupBy(monthList, 'date') 
      const tempDetails = []
      forEach(groupByMonth, (value, key) => {
        const obj = {
          name: key,
          total: 0
        }
        forEach(value, (item) => {
          obj.total += +item.amount
        })
        tempDetails.push(obj)
      })

      // category Wise
      const groupByCat = groupBy(monthList, 'category') 
      const tempCatDetails = []
      forEach(groupByCat, (value, key) => {
        const obj = {
          name: key,
          total: 0
        }
        forEach(value, (item) => {
          obj.total += +item.amount
        })
        tempCatDetails.push(obj)
      }) 

      const finalObj = {
        name: `${month}-${year}`,
        total: totalAmount,
        details: tempDetails,
        categoryDetails: tempCatDetails
      }
      

      return finalObj
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExpenseByGivenDate(date, month, year) {
    try {
      
      const [totalErr, totalRes] = await safePromise(this.getExpensesByDateMonthYear())
      if(totalErr) {
        console.log(totalErr)
        return Promise.reject(totalErr)
      }
      const monthList = filter(totalRes, {year: year, month: month, date: date})

      let totalAmount = 0
      forEach(monthList, (item) => {
        totalAmount += +item.amount
      })

      const finalObj = {
        name: `${date}-${month}-${year}`,
        total: totalAmount
      }
      

      return finalObj
    } catch (error) {
      return Promise.reject(error)
    }
  }
}



/*
      data: {
        name: 2023,
        total: 3233
        details: [
          {
            name: jan,
            amount: 21
          },
          {
            name: feb,
            amount: 21
          }
        ]
      }
      */
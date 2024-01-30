const moment = require('moment/moment')
const { addTransactionDal, getTransactionDal } = require('../dal/transection')
const { safePromise } = require('../utils/require-helper')
const { uniqBy, forEach, findIndex } = require('lodash')

module.exports = class Transection {
  
  async addTransaction(data) {
    try {
      const insertObj = {
        ...data,
      }
      const [error, result] = await safePromise(addTransactionDal(insertObj))
      if(error) {
        console.log(error)
        return Promise.reject(error)
      }

      return 
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getTransactionHistory() {
    try {
      
      const [error, result] = await safePromise(getTransactionDal())
      if(error) {
        console.log(error)
        return Promise.reject(error)
      }
      const obj = {}
      const sortedObj = {}

      if(result.length > 0) {
        // year and month
        result.forEach((item) => {
          const yearMonth = moment(item.transactionDate).format('YYYY MMMM')
          obj[yearMonth] = []
        })

        result.forEach((item) => {
          const yearMonth = moment(item.transactionDate).format('YYYY MMMM')
          const date = moment(item.transactionDate).format('Do')

          const d = findIndex(obj[yearMonth], {date: date})
          if(d === -1) {
            obj[yearMonth].push({
              date: date,
              totalRS: +item.amount,
              details: [{
                category: item.categoryName,
                description: item.description,
                amount: +item.amount
              }]
            })
          } else {
            obj[yearMonth][d].totalRS += +item.amount
            obj[yearMonth][d].details.push({
              category: item.categoryName,
              description: item.description,
              amount: +item.amount
            })
          }
          
        })

      }

      return obj
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

}
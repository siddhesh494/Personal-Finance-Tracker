const moment = require('moment/moment')
const { addTransactionDal, getTransactionDal } = require('../dal/transection')
const { safePromise } = require('../utils/require-helper')

module.exports = class Transection {
  
  async addTransaction(data) {
    try {
      const insertObj = {
        ...data,
        transactionDate: moment().utc().format('YYYY-MM-DD HH:mm:ss')
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

      if(result.length > 0) {
        // year and month
        result.forEach((item) => {
          const yearMonth = moment(item.transactionDate).format('YYYY MMMM')
          const date = moment(item.transactionDate).format('DD')
          obj[yearMonth] = {}

        })

        // date
        result.forEach((item) => {
          const yearMonth = moment(item.transactionDate).format('YYYY MMMM')
          const date = moment(item.transactionDate).format('DD')
          obj[yearMonth][date] = []
        })

        result.forEach((item)=> {
          const yearMonth = moment(item.transactionDate).format('YYYY MMMM')
          const date = moment(item.transactionDate).format('DD')
          
          obj[yearMonth][date] && obj[yearMonth][date].push({
            amount: item.amount,
            description: item.description,
            categoryName: item.categoryName,
            categoryID: item.financeCategoryID
          })
        })
      }

      return obj
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

}
const moment = require('moment/moment')
const { addTransactionDal } = require('../dal/transection')
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

}
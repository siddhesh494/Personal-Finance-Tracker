const { getFinanceCategoryDal } = require('../dal/finance_category')
const { safePromise } = require('../utils/require-helper')

module.exports = class FinanceCategory {
  
  async getFinanceCategory() {
    try {
      const [error, result] = await safePromise(getFinanceCategoryDal()) 

      if(error) {
        return Promise.reject(error) 
      }

      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
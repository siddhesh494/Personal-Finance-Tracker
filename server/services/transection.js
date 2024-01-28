const { addTransectionDal } = require('../dal/transection')
const { safePromise } = require('../utils/require-helper')

module.exports = class Transection {
  
  async addTransection(data) {
    try {
      console.log(data)
      const [error, result] = await safePromise(addTransectionDal(data))
      if(error) {
        return Promise.reject(error)
      }

      return 
    } catch (error) {
      return Promise.reject(error)
    }
  }

}
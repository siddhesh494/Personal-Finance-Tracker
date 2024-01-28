const connection = require('../database')

async function getFinanceCategoryDal() {
  try {
    const [result] = await connection.query("select FinanceCategoryID as financeCategoryID, CategoryName as categoryName from finance_category")
    
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  getFinanceCategoryDal
}

const connection = require('../database')

async function addTransectionDal(data) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO transaction (Amount, Description, FinanceCategoryID) VALUES (?, ?, ?)",
      [data.amount, data.description, data.categoryID]
    )
    
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  addTransectionDal
}

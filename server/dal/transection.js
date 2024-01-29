const connection = require('../database')

async function addTransactionDal(data) {
  try {
    const [result] = await connection.execute(
      "INSERT INTO transaction (Amount, Description, FinanceCategoryID, TransactionDate) VALUES (?, ?, ?, ?)",
      [data.amount, data.description, data.categoryID, data.transactionDate]
    )
    
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  addTransactionDal
}

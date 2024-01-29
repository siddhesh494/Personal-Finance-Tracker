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

async function getTransactionDal() {
  try {
    const [result] = await connection.query(
      `SELECT 
        t.Amount as amount, 
        t.Description as description,
        t.TransactionDate as transactionDate,
        fc.FinanceCategoryID as financeCategoryID,
        fc.CategoryName as categoryName
      FROM transaction as t
      INNER JOIN finance_category as fc
        ON t.FinanceCategoryID = fc.FinanceCategoryID
      WHERE 
        fc.isActive=1 and
        t.IsActive=1
      ORDER BY t.TransactionDate DESC
        `,
    )
    
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  addTransactionDal,
  getTransactionDal
}

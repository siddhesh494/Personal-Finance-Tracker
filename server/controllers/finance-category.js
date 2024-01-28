const FinanceCategory = require('../services/finance-category')
const { safePromise } = require('../utils/require-helper')

const financeCategory = new FinanceCategory()


async function getFinanceCategory(req, res) {
  try {

    const [error, result] = await safePromise(financeCategory.getFinanceCategory()) 

    if(error) {
      res.status(500).json({
        success: false,
        status: 500,
        msg: "Something went wrong"
      })
    }
    
    res.json({
      success: true,
      status: 200,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      status: 500,
      msg: "Something went wrong!"
    })
  }
}

module.exports = {
  getFinanceCategory
}
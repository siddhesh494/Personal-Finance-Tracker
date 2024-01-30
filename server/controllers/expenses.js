const Expenses = require('../services/expenses')
const { safePromise } = require('../utils/require-helper')
const { getExpensesByMonthValidation, getExpensesByYearValidation } = require('../controllers/validate/expenses')

const expensesService = new Expenses()


async function getPresentExpenses(req, res) {
  try {
    
    const [error, result] = await safePromise(expensesService.getPresentExpenses())
    if(error) {
      console.log(error)
      res.status(500).json({
        success: true,
        status: 500,
        msg: "Something went wrong!"
      })
    }

    return res.json({
      success: true,
      status: 200,
      data: result
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      status: 500,
      msg: "Something went wrong!"
    })
  }
}

async function getExpensesByYear(req, res) {
  try {

    // validate 
    const [validationError, ] = await safePromise(getExpensesByYearValidation(req.body))
    if(validationError) {
      return res.status(422).json({
        success: false,
        status: 422,
        data: validationError.details
      })
    }

    const [error, result] = await safePromise(expensesService.getExpensesDetailsByYear(req.body))
    if(error) {
      console.log(error)
      res.status(500).json({
        success: true,
        status: 500,
        msg: "Something went wrong!"
      })
    }

    return res.json({
      success: true,
      status: 200,
      data: result
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      status: 500,
      msg: "Something went wrong!"
    })
  }
}

async function getExpensesByMonth(req, res) {
  try {
    
    // validate 
    const [validationError, ] = await safePromise(getExpensesByMonthValidation(req.body))
    if(validationError) {
      return res.status(422).json({
        success: false,
        status: 422,
        data: validationError.details
      })
    }

    const [error, result] = await safePromise(expensesService.getExpensesDetailsByMonth(req.body))
    if(error) {
      console.log(error)
      res.status(500).json({
        success: true,
        status: 500,
        msg: "Something went wrong!"
      })
    }
    
    return res.json({
      success: true,
      status: 200,
      data: result
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      status: 500,
      msg: "Something went wrong!"
    })
  }
}


module.exports = {
  getPresentExpenses,
  getExpensesByYear,
  getExpensesByMonth
}
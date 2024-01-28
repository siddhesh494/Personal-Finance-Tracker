const { addTransectionValidation } = require('../controllers/validate/transection')
const { safePromise } = require('../utils/require-helper')
const Transection = require('../services/transection')

const transectionService = new Transection()

async function addTransection(req, res) {
  try {
    
    // validate 
    const [validationError, ] = await safePromise(addTransectionValidation(req.body))
    if(validationError) {
      return res.status(422).json({
        success: false,
        status: 422,
        data: validationError.details
      })
    }

    // 
    const [error, result] = await safePromise(transectionService.addTransection(req.body))
    if(error) {
      return res.status(422).json({
        success: false,
        status: 422,
        msg: "Something went wrong."
      })
    }

    return res.json({
      success: true,
      status: 200,
      msg: "Added successfully"
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
  addTransection
}
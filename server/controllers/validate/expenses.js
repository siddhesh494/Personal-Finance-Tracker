const Joi = require('joi')

async function getExpensesByYearValidation(body) {
  
  const schema = Joi.object({
    year: Joi.number().required(),
  })

  try {
    const value = await schema.validate(body)
    if(value.error) {
      return Promise.reject(value.error)
    }
  } catch (error) {
    return Promise.reject(error)
  }

}


async function getExpensesByMonthValidation(body) {
  
  const schema = Joi.object({
    year: Joi.number().required(),
    month: Joi.string().required()
  })

  try {
    const value = await schema.validate(body)
    if(value.error) {
      return Promise.reject(value.error)
    }
  } catch (error) {
    return Promise.reject(error)
  }

}

module.exports = {
  getExpensesByYearValidation,
  getExpensesByMonthValidation
}
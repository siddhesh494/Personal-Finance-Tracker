const Joi = require('joi')

async function addTransectionValidation(body) {
  
  const schema = Joi.object({
    amount: Joi.number().required(),
    categoryID: Joi.number().required(),
    description: Joi.string().required()
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
  addTransectionValidation
}
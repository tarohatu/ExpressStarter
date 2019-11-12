const Joi = require('joi');

module.exports = {
  // POST /users
  create: {
    body: {
      name: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

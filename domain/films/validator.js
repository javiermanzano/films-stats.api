const Joi = require('@hapi/joi');

const createSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

const createValidator = (user) => Joi.validate(user, createSchema);

const updateSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  password: Joi.string().optional(),
});

const updateValidator = (user) => Joi.validate(user, updateSchema);

module.exports = {
  createValidator,
  updateValidator,
};

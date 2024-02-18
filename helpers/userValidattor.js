const Joi = require("joi");

const reqisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "missing required email field",
  }),
});

const schemas = {
  reqisterSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};

module.exports = schemas;

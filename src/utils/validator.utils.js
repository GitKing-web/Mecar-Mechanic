const Joi = require("joi");

const LoginValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const SignUpValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  phone: Joi.number().min(11).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  LoginValidator,
  SignUpValidator,
};

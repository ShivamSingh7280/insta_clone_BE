const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
	email: Joi.string()
		.required()
		.email({ tlds: { allow: false } }),

	fullName: Joi.string().default("").max(50),
	username: Joi.string().required().max(25),
	password: Joi.string().required(),
});

const loginBodyValidationSchema = Joi.object().keys({
	email: Joi.string()
		.required()
		.email({ tlds: { allow: false } }),

	password: Joi.string().required(),
});

module.exports = { userValidationSchema, loginBodyValidationSchema };

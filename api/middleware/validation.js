const Joi = require("joi");

//
//
// REGISTER
module.exports.registerValidation = (data) => {
	const schema = {
		username: Joi.string().min(6).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(8).required(),
	};

	return Joi.validate(data, schema);
};

//
//
// LOGIN
module.exports.loginValidation = (data) => {
	const schema = {
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(8).required(),
	};

	return Joi.validate(data, schema);
};

//
//
// EMAIL
module.exports.emailValidation = (data) => {
	const schema = {
		email: Joi.string().min(6).email(),
	};

	return Joi.validate(data, schema);
};

//
//
// delete account
module.exports.deleteAccountValidation = (data) => {
	const schema = {
		email: Joi.string().min(6).email(),
		password: Joi.string().min(8).required(),
	};

	return Joi.validate(data, schema);
};

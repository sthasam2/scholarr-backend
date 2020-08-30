const Joi = require("joi");
const { schema } = require("../models/User");

//
//
// REGISTER
module.exports.registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(5).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

//
//
// LOGIN
module.exports.loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

//
//
// EMAIL
module.exports.emailValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).email(),
	});

	return schema.validate(data);
};

//
//
// delete account
module.exports.deleteAccountValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).email(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

//
//
// UPDATE user
module.exports.updateUserValidation = (data) => {
	const schema = Joi.object({
		_id: Joi.string().required(),
		firstName: Joi.string().max(100),
		middleName: Joi.string().max(100),
		lastName: Joi.string().max(100),
		bio: Joi.string().max(1000),
		password: Joi.string().min(8).required(),
		dateOfBirth: Joi.date(),
	});

	return schema.validate(data);
};

//
//
// CREATE classroom
module.exports.createClassroomValidation = (data) => {
	const schema = Joi.object({
		className: Joi.string().required(),
		classDescription: Joi.string(),
		classSubject: Joi.string(),
		affiliatedInstitution: Joi.string(),
	});
	return schema.validate(data);
};

//
//
// Update classroom validation
module.exports.updateClassroomValidation = (data) => {
	const schema = Joi.object({
		_classId: Joi.string(),
		className: Joi.string().required(),
		classDescription: Joi.string(),
		classSubject: Joi.string(),
		affiliatedInstitution: Joi.string(),
	});

	return schema.validate(data);
};

//
module.exports.inviteUserValidate = (data) => {
	const schema = Joi.array().items(
		Joi.object({
			userId: Joi.string(),
			username: Joi.string(),
			email: Joi.string(),
		})
	);
	return schema.validate(data);
};

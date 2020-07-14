const Joi = require("joi");

// REGISTER
const registerValidation = (data) => {
    const schema = {
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(8).required(),
    };

    return Joi.validate(data, schema);
};

// LOGIN
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).email(),
        password: Joi.string().min(8).required(),
    };

    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

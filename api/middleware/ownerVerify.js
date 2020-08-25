const User = require("../models/User");
const { nonExistenceError } = require("../utils/errorMessages");

/**
 *  ### NOTE: Strictly use this middleware after _loggedInVerify_ middleware
 * Middleware for verifying logged in user is the owner of the req.params.userId account
 *
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {function} next the next middleware function
 */
module.exports.accountOwnerVerify = async (req, res, next) => {
	try {
		// check logged in
		if (!req.user._id)
			throw {
				error: {
					status: 400,
					type: "Request body error",
					message:
						"Request does not contain a 'req.user'. \n Possible solutions: \t 1. include a 'req.user._id' \n\t 2. [backend] Use this middleware after 'loggedInVerify' middleware",
				},
			};

		// check if userid parameter available in url endpoints
		if (!req.params.userId)
			throw {
				error: {
					status: 400,
					type: "Request End-point error",
					message:
						"Request does not contain a 'req.params.userId' in the url end-point. \n Possible solutions: \t 1. Check the url end point to make sure it is correct",
				},
			};

		const userFound = await User.findOne({ _id: req.params.userId });
		if (!userFound) throw nonExistenceError("user");

		//check logged in user is the requested user
		if (req.user._id != userFound._id)
			throw {
				error: {
					status: 401,
					type: "Access Denied!",
					message: "You do not have permission for access! Only owners may get access.",
				},
			};

		// go to next middleware
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

module.exports.classroomOwnerVerify = (req, res, next) => {};

module.exports.classMemberVerify = (req, res, next) => {};

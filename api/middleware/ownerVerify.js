// errors
const {
	nonExistenceError,
	endPointError,
	reqUserError,
	memberAccessDenailError,
	ownerAccessDenailError,
} = require("../utils/errorMessages");

// models
const User = require("../models/User");
const Classroom = require("../models/Classroom");
const { Classwork } = require("../models/Classwork");

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
		if (!req.user._id) throw reqUserError;
		// check if userId parameter available in url endpoints
		if (!req.params.userId) throw endPointError;

		const paramUserFound = await User.findById(req.params.userId);
		if (!paramUserFound) throw nonExistenceError("user");

		//check logged in user is the requested user
		if (req.user._id.toString() != paramUserFound._id.toString()) throw ownerAccessDenailError;

		req.user = paramUserFound;

		next();
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

/**
 *  ### NOTE: Strictly use this middleware after _loggedInVerify_ middleware
 * Middleware for verifying logged in user is the owner of the req.params.classroomId classroom
 *
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {function} next the next middleware function
 */
module.exports.classroomOwnerVerify = async (req, res, next) => {
	try {
		// check logged in
		if (!req.user._id) throw reqUserError;

		// check if classroomId parameter available in url endpoints
		if (!req.params.classroomId) throw endPointError;

		const classroomFound = await Classroom.findOne({ _id: req.params.classroomId });
		if (!classroomFound) throw nonExistenceError("classroom");

		const userFound = await User.findById(req.user._id);
		if (!userFound) throw nonExistenceError("user");

		//check logged in user is the owner of classroom
		if (req.user._id != classroomFound._creatorId) throw ownerAccessDenailError;

		req.user = userFound;
		req.customField.classroom = classroomFound;

		// go to next middleware
		next();
	} catch (err) {
		console.error(err);
		res.status(400).send(err);
	}
};

/**
 *  ### NOTE: Strictly use this middleware after _loggedInVerify_ middleware
 * Middleware for verifying logged in user is the owner or member of the req.params.classroomId classroom
 *
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {function} next the next middleware function
 */
module.exports.classMemberVerify = async (req, res, next) => {
	try {
		// check logged in
		if (!req.user._id) throw reqUserError;

		// check if classroomId parameter available in url endpoints
		if (!req.params.classroomId) throw endPointError;

		const classroomFound = await Classroom.findOne({ _id: req.params.classroomId });
		if (!classroomFound) throw nonExistenceError("classroom");

		//check logged in user is the owner or member of classroom
		if (
			req.user._id != classroomFound._creatorId &&
			classroomFound.classMembers.enrolledMembers.some((doc) => doc === req.user._id)
		)
			throw memberAccessDenailError;

		req.customField.classroom = classroomFound;

		next();
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

/**
 *  ### NOTE: Strictly use this middleware after _loggedInVerify_ middleware
 * Middleware for verifying logged in user is the owner or member of the req.params.classroomId classroom
 *
 * @param {object} req the request object
 * @param {object} res the response object
 * @param {function} next the next middleware function
 */
module.exports.classworkExistVerify = async (req, res, next) => {
	try {
		// check logged in
		if (!req.user._id) throw reqUserError;

		// check if classroomId parameter available in url endpoints
		if (!req.params.classroomId) throw endPointError;
		if (!req.params.classworkId) throw endPointError;

		const classroomFound = null;
		if (req.customField.classroom) {
			classroomFound = req.customField.classroom;
		} else {
			classroomFound = await Classroom.findOne({ _id: req.params.classroomId });
			if (!classroomFound) throw nonExistenceError("classroom");
		}

		//check logged in user is the owner or member of classroom
		let classworkExists = classroomFound.classworks.some(
			(doc) => doc === req.params.classworkId
		);
		if (!classworkExists)
			throw {
				error: {
					status: 400,
					type: "Bad Request!",
					message:
						"Requested classwork does not exist in requested Classroom. Please check to see if endpoint params are correct.",
				},
			};

		req.customField.classwork = await Classwork.findById(req.params.classworkId);

		next();
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

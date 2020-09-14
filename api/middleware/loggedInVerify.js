const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { nonExistenceError } = require("../utils/errorMessages");

// middleware token check function
module.exports.loggedInVerify = async (req, res, next) => {
	try {
		const token = req.header("auth-token");
		if (!token) throw { error: { status: 401, message: "Access Denied!" } };

		const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verifiedUser;

		const userFound = await User.findById(req.user._id);
		if (!userFound) throw nonExistenceError("login user account");

		req.user = userFound;
		console.log(req.user._id);

		next();
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

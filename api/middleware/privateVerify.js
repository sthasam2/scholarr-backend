const jwt = require("jsonwebtoken");

// middleware token check function
module.exports.privateVerify = (req, res, next) => {
	try {
		const token = req.header("auth-token");
		if (!token) throw { error: { status: 401, message: "Access Denied!" } };

		const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verifiedUser;
		// console.log(verified);
		next();
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

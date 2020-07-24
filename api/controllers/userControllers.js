require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");
const Token = require("../models/Token");

// middleware
const {
	registerValidation,
	loginValidation,
	emailValidation,
} = require("../middleware/validation");
const { confirmEmailSender, resetPasswordEmailSender } = require("../middleware/emailSender");

// modules

// exports

// user GET
module.exports.user_get = (req, res) => {
	res.send("User page");
};

//
//
// register GET ------------------------------------------------------------------
/** Controls register GET requests. */
module.exports.register_get = (req, res) => {
	res.send(
		`<h1>Register Page</h1> 
        <br>
        <strong>POST</strong> request JSON format: <br>
		{
			<div style="margin-left: 35px">
			<br>"username": "[your username]",
			<br>"email": "sample@example.com",
			<br>"password": "[pw here]"<br>
		</div>
		}`
	);
};

//
//
// register POST -----------------------------------------------------------------
/** Controls register POST requests.
 *
 * POST request structure
 * {
 * 		username,
 * 		email,
 * 		password,
 * }
 */
module.exports.register_post = async (req, res) => {
	try {
		// First validate req.body data
		const { error } = registerValidation(req.body);
		if (error)
			throw {
				error: {
					message: error.details[0].message,
				},
			};

		// Check unique email
		const userEmailFound = await User.findOne({ email: req.body.email });
		if (userEmailFound)
			throw {
				type: "already exists",
				message: `Email: '${req.body.email}' is already associated with another account.`,
			};

		// check unique username
		const usernameFound = await User.findOne({ username: req.body.username });
		if (usernameFound)
			throw {
				type: "already exists",
				message: `Username: '${req.body.username}' is already taken.`,
			};

		// Password hasing using bcrypt
		const salt = await bcrypt.genSalt(10);
		// console.log("\nSalt:" + salt);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// User creation in database (create a new user using the credentials provided and hashed and our schema)
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// save the user in the databse
		const savedUser = await user.save();
		// console.log("\nsavedUser: " + savedUser);

		// token generator
		const tokenKey =
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
		const token = new Token({
			_userId: savedUser.id,
			token: tokenKey,
			usage: "Email confirmation",
		});
		const savedToken = await token.save();
		// console.log("\nsavedToken:" + savedToken);

		// send email
		const messageResponse = await confirmEmailSender(req, res, user, token);
		if (messageResponse) throw messageResponse;

		res.status(201).json({
			message: "Account succesfully created!",
			userId: user.id,
			token: savedToken,
		});
	} catch (error) {
		if (error) res.status(400).json({ error });
	}
};

//
//
// login GET ------------------------------------------------------------------
/** Controls login GET requests. */
module.exports.login_get = (req, res) => {
	res.send(
		`<div>
        <h1>Login Page</h1> 
        <br>
        <strong>POST</strong> request JSON format: 
        <br>
        {
            <br>
            <div style="margin-left: 35px">
            "email": "sample@example.com",<br>
            "password": "[pw here]"
            <br>
            </div>
            <br>
        }
        </div>`
	);
};

//
//
// login POST -------------------------------------------------------------------
/** Controls login POST requests.
 *
 * POST Request structure
 * {
 * 		email,
 * 		password,
 * }
 */
module.exports.login_post = async (req, res) => {
	try {
		//Validate login req.body data
		const { error } = loginValidation(req.body);
		if (error)
			throw {
				error: {
					message: error.details[0].message,
				},
			};

		//check email exists
		const userFound = await User.findOne({ email: req.body.email });
		if (!userFound)
			throw {
				error: { type: "Non-existence", message: "Email not found!" },
			};

		// check email verified
		if (!userFound.isEmailVerified)
			throw {
				error: { type: "Access denied", message: "Email is not verified!" },
			};

		// Check password
		const validPass = await bcrypt.compare(req.body.password, userFound.password);
		if (!validPass)
			throw {
				error: { type: "Authentication failure", message: "Wrong Password." },
			};

		// assign web token
		const token = jwt.sign({ _id: userFound._id }, process.env.TOKEN_SECRET);
		res.header(`auth-token`, token).status(202).send({
			status: "Success",
			message: "Login Successful",
			token: token,
		});
	} catch (error) {
		res.status(400).send(error);
	}
};

//
//
/** confirmation handler GET */
module.exports.email_confirmation_handler_get = async (req, res) => {
	try {
		const urlToken = req.params.token; //retrieve token from url
		const tokenFound = await Token.findOne({ token: urlToken });
		if (!tokenFound)
			throw {
				type: "Non-existence",
				message: "Unable to find a valid token or Token already expired",
			};

		// check if the user exists
		const userExists = await User.findOne({
			_id: tokenFound._userId,
		});
		if (!userExists)
			throw {
				type: "Non-existence",
				message: "The user associated to token does not exist.",
			};

		// check user associated with token for if it is already verified
		if (userExists.isEmailVerified)
			throw {
				type: "already verified",
				message: "The associated user has already been verified",
			};

		// Verify the user
		await User.updateOne({ _id: userExists._id }, { $set: { isEmailVerified: true } });

		res.status(200).send({
			message: `Your email: ${updatedUser.email} has been verified. Now you can use this to login`,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

//
//
// Resend Confirmation POST -------------------------------------------------------------------
/** Sends the email confirmation again
 *
 * POST request structure
 * {
 * 		email ,
 * }
 */
module.exports.resend_email_confirmation_post = async (req, res) => {
	// First validate req.body data
	try {
		const { error } = emailValidation(req.body);
		if (error) throw error;

		// Check if user with that email exists
		const userFound = await User.findOne({ email: req.body.email });

		if (!userFound)
			throw {
				type: "Non-existence",
				message: `Email: '${req.body.email}' is not associated with any accounts.`,
			};

		// token generator
		const tokenKey =
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);

		// token save to database
		const token = new Token({
			_userId: userFound.id,
			token: tokenKey,
			usage: "Email confirmation",
		});

		const newToken = await token.save((error) => {
			throw error;
		});

		// send email
		const mailResponse = await confirmEmailSender(req, res, userFound, newToken);
		if (mailResponse) throw mailResponse;

		return res.status(200).send({
			success: {
				type: "Request successful",
				message: "Email confirmation resent",
			},
		});
	} catch (error) {
		res.status(400).send(error);
	}
};

//
//
// Password reset email POST --------------------------------------------------
/** Sends email for password reset
 *
 * POST Request Structure
 * {
 * 		email,
 * }
 */
module.exports.password_reset_email_post = async (req, res) => {
	// First validate req.body data
	try {
		const { error } = emailValidation(req.body);
		// console.log(error);
		if (error) throw error;
		// Check if user with that email exists
		const userFound = await User.findOne({ email: req.body.email });
		// console.log(userFound);
		if (!userFound)
			throw {
				type: "Non-existence",
				message: `Email: '${req.body.email}' is not associated with any accounts.`,
			};
		// token generator
		const tokenKey =
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
		// token save to database
		const token = new Token({
			_userId: userFound.id,
			token: tokenKey,
			usage: "Password reset",
		});
		const newToken = await token.save();
		// send email
		const mailResponse = await resetPasswordEmailSender(req, res, userFound, newToken);
		if (mailResponse) throw mailResponse;

		// after everything done successfully
		return res.status(200).send({
			success: {
				type: "Request successful",
				message: "Reset Email confirmation resent",
			},
		});
	} catch (error) {
		res.status(400).send(error);
	}
};

//
//
// Password resetter GET --------------------------------------------------
/** A form for resetting password. Acts as a middleware
 *
 * @returns Token object
 */
module.exports.password_reset_get = async (req, res) => {
	try {
		const urlToken = req.params.token;
		console.log(urlToken);
		const tokenFound = await Token.findOne({ token: urlToken });
		console.log("\n------------- " + tokenFound);
		if (!tokenFound) {
			throw {
				error: {
					type: "Non-existence",
					message: "Unable to find a valid token or Token already expired",
				},
			};
		}

		// check user associated with found token
		const userFound = await User.findOne({ _id: tokenFound._userId });
		console.log("\n------------- " + userFound);
		if (!userFound) {
			throw {
				error: {
					type: "Non-existence",
					message: "Unable to find a user associated with token",
				},
			};
		}

		return res.status(200).send({
			success: {
				token: tokenFound,
				user: userFound,
			},
		});

		// Note: in the front end you can determine whether to display form
		// for password reset or not depending on the response. if you get a
		// token display the form, if not display error
	} catch (error) {
		res.status(400).send(error);
	}
};

//
//
// Password resetter POST --------------------------------------------------
/** Resets password
 *
 * POST request structure
 * {
 * 		_userId: ,
 * 		token: ,
 * 		password: ,
 * }
 */
module.exports.password_reset_handler_post = async (req, res) => {
	// return res.send("in progress");
	try {
		const userFound = await User.findOne({ _id: req.body._userId });
		if (!userFound) {
			throw {
				error: {
					type: "Non-existence",
					message: "Unable to find a user associated with token",
				},
			};
		}

		const tokenFound = await Token.findOne({ token: req.body.token });
		if (!tokenFound) {
			throw {
				error: {
					type: "Non-existence",
					message: "Unable to find a valid token or Token already expired",
				},
			};
		}

		// NOTE: implement check ifEmailVerified or not?

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		await User.updateOne({
			_id: userFound._id,
			$set: {
				password: hashedPassword,
			},
		});

		res.status(200).json({
			success: {
				type: "Request successful",
				message: `Password successfully reset for ${userFound.email}`,
			},
		});
	} catch (error) {
		return res.stat(400).json(error);
	}
};

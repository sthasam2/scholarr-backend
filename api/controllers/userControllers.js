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
const { confirmEmailSender } = require("../middleware/emailSender");

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
/** Controls register POST requests. */
module.exports.register_post = async (req, res) => {
  try {
    // First validate req.body data
    const { error } = registerValidation(req.body);
    if (error) throw error;

    // Check unique email
    const userEmailFound = await User.findOne({ email: req.body.email });
    if (userEmailFound)
      throw {
        type: "already exists",
        message: `Email: '${req.body.email}' is already associated with another account.`,
      };

    // check unique username
    const userNameFound = await User.findOne({ username: req.body.username });
    if (userNameFound)
      throw {
        type: "already exists",
        message: `Username: '${req.body.username}' is already taken.`,
      };

    // Password hasing using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // User creation in database (create a new user using the credentials provided and hashed and our schema)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save the user in the databse
    const savedUser = await user.save();

    // token generator
    const tokenKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const token = new Token({
      _userId: savedUser.id,
      token: tokenKey,
    });
    const savedToken = await token.save();

    // send email
    await confirmEmailSender(req, res, user, token);

    res.status(201).json({
      message: "Account succesfully created!",
      userId: user.id,
      token: savedToken,
    });
  } catch (error) {
    res.status(400).json({ error });
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
/** Controls login POST requests. */
module.exports.login_post = async (req, res) => {
  //Validate login req.body data
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //check email exists
  await User.findOne({ email: req.body.email }, async (error, queried_user) => {
    if (error) return res.status(400).send(error);

    if (!queried_user)
      return res.status(400).send({
        error: { type: "Non-existence", message: "Email not found!" },
      });

    // email verificatoin
    if (!queried_user.isVerified)
      return res.status(401).send({
        error: { type: "Access denied", message: "Email is not verified!" },
      });

    // Check password
    const validPass = await bcrypt.compare(
      req.body.password,
      queried_user.password
    );
    if (!validPass)
      res.status(400).send({
        error: { type: "Authentication failure", message: "Wrong Password." },
      });

    // web token
    const token = jwt.sign({ _id: queried_user._id }, process.env.TOKEN_SECRET);
    res.header(`auth-token`, token).status(202).send({
      status: "Success",
      message: "Login Successful",
      token: token,
    });
  });
};

//
//
/** confirmation handler GET */
module.exports.email_confirmation_handler = async (req, res) => {
  try {
    // const email = req.body.email;
    const token = req.params.token; //retrieve token from url
    // const tokenExists =
    const tokenFound = await Token.findOne({ token: token });
    if (!tokenFound)
      throw {
        type: "not verified",
        message: "Unable to find a valid token or Token already expired",
      };

    //does the user Exist
    const userExists = await User.findOne({
      _id: tokenFound._userId,
    });

    // if the user does not exist throw an error
    if (!userExists)
      throw {
        type: "user non-existent",
        message: "The user associated to token does not exist.",
      };

    // check user associated with token for if it is already verified
    if (userExists.isVerified)
      throw {
        type: "already verified",
        message: "The associated user has already been verified",
      };

    // Verify the user
    const updatedUser = await User.updateOne(
      { _id: userExists._id },
      { $set: { isVerified: true } }
    );
    res.status(200).send({
      message: `Your email: ${req.body.email} has been verified. Now you can use this to login`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//
//
// Resend Confirmation POST -------------------------------------------------------------------
/** Sends the email confirmation again */
module.exports.resend_email_confirmation = async (req, res) => {
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
    });

    const newToken = await token.save();

    // send email
    await confirmEmailSender(req, res, userFound, newToken);

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
/** Sends email for password reset */
module.exports.password_reset_email = (req, res) => {
  return res.send("in progress");
};

//
//
// Password resetter POST --------------------------------------------------
/** Resets password */
module.exports.password_reset_handler = (req, res) => {
  return res.send("in progress");
};

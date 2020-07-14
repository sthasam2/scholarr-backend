/** `api/user` router */
const userRouter = require("express").Router();

// middlewares
// const privateVerify = require("../middleware/privateVerify");

// controllers
const userController = require("../controllers/userControllers");

// USER

userRouter.get("/", userController.user_get);

// REGISTER

userRouter.get("/register", userController.register_get);
userRouter.post("/register", userController.register_post);

// EMAIL CONFIRMATION

userRouter.get("/confirmation/:token", userController.email_confirmation_handler);
// userRouter.get("/resend_token", userController.resend_verification_token);

//LOGIN

userRouter.get("/login", userController.login_get);
userRouter.post("/login", userController.login_post);

// PASSWORD RESETS

module.exports = userRouter;

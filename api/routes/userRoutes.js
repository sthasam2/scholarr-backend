/** `api/user` router */
const userRouter = require("express").Router();

// middlewares
// const privateVerify = require("../middleware/privateVerify");

// controllers
const userController = require("../controllers/userControllers");

//
//
// USER
userRouter.get("/", userController.user_get);

//
//
// REGISTER
userRouter.get("/register", userController.register_get);
userRouter.post("/register", userController.register_post);

//
//
// EMAIL CONFIRMATION
userRouter.get("/confirmation/:token", userController.email_confirmation_handler);
userRouter.post("/resend_confirmation", userController.resend_email_confirmation);

//
//
// LOGIN
userRouter.get("/login", userController.login_get);
userRouter.post("/login", userController.login_post);

//
//
// PASSWORD RESETS
userRouter.post("/reset_password_email", userController.password_reset_email);
userRouter.post("/reset_password", userController.password_reset_handler);

//
//
// exports
module.exports = userRouter;

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
userRouter.get("/confirmation/:token", userController.email_confirmation_handler_get);
userRouter.post("/resend_confirmation", userController.resend_email_confirmation_post);

//
//
// LOGIN
userRouter.get("/login", userController.login_get);
userRouter.post("/login", userController.login_post);

//
//
// PASSWORD RESETS
userRouter.post("/reset_password_email", userController.password_reset_email_post);
userRouter.get("/reset_password/:token", userController.password_reset_get);
userRouter.post("/reset_password/confirm/:username", userController.password_reset_handler_post);

//
//
// exports
module.exports = userRouter;

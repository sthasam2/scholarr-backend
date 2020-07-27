/**
 * User Authentication routes
 *
 * contailns all routes extended by the userRouter
 * root url: `{host_url}/api/user`
 */

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
userRouter.post("/reset_password_email", userController.reset_password_email_post);
userRouter.get("/reset_password/:token", userController.reset_password_get);
userRouter.patch("/reset_password/confirm/:username", userController.reset_password_handler_patch);

//
//
// DELETE ACCOUNT
userRouter.post("/delete_account_email", userController.delete_account_email_post);
userRouter.get("/delete_account/:token", userController.delete_account_get);
userRouter.delete(
	"/delete_account/confirm/:username",
	userController.delete_account_handler_delete
);

//
//
// exports
module.exports = userRouter;

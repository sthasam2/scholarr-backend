const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const { loggedInVerify } = require("../middleware/verification");
const { imagesUpload } = require("../middleware/fileUpload");
const { paramAccountOwnerVerify } = require("../middleware/verification");

////////////////////////////////////////////////////////////////////////////////////////////////////
////////                               ! USER ROUTES                                    ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? READ                                   ////////////
//////////////////////////////////////////////////////////////////////////////////////////

userRouter.route("/").get(loggedInVerify, userController.users_get); //!

userRouter.route("/:userId").get(loggedInVerify, userController.user_detail_get); //!

userRouter
	.route("/:userId/private")
	.get(loggedInVerify, paramAccountOwnerVerify, userController.user_detail_private_get); //!

userRouter.route("/group_users").post(userController.group_users_post); //!

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? UPDATE                                 ////////////
//////////////////////////////////////////////////////////////////////////////////////////

userRouter
	.route("/:userId/profile/edit")
	.patch(loggedInVerify, paramAccountOwnerVerify, imagesUpload, userController.update_user_patch); //!

module.exports = userRouter;

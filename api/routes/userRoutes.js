const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const { loggedInVerify } = require("../middleware/loggedInVerify");
const { imagesUpload } = require("../middleware/fileUpload");
const { accountOwnerVerify } = require("../middleware/ownerVerify");
//
//
// userRouter request methods
userRouter.get("/", loggedInVerify, userController.users_get); //!
userRouter.get("/:userId", loggedInVerify, userController.user_detail_get); //!
userRouter.get(
	"/:userId/private",
	loggedInVerify,
	accountOwnerVerify,
	userController.user_detail_private_get
); //!
userRouter.post("/group_users", userController.group_users_post); //!

userRouter.patch(
	"/:userId/profile/edit",
	loggedInVerify,
	accountOwnerVerify,
	userController.update_user_patch
);
userRouter.patch(
	"/:userId/image/upload",
	loggedInVerify,
	imagesUpload,
	userController.upload_user_images_patch
);

module.exports = userRouter;

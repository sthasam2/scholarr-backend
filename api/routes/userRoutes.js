const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const { loggedInVerify } = require("../middleware/loggedInVerify");
const { imagesUpload } = require("../middleware/fileUpload");
//
//
// userRouter request methods
userRouter.get("/", userController.users_get);
userRouter.get("/:userId", userController.user_detail_get);
userRouter.post("/userGroup", userController.group_users_post);

userRouter.patch("/:userId/profile/edit", loggedInVerify, userController.update_user_patch);
userRouter.patch(
	"/:userId/image/upload",
	loggedInVerify,
	imagesUpload,
	userController.upload_user_images_patch
);

module.exports = userRouter;

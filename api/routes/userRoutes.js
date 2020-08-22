const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const { privateVerify } = require("../middleware/privateVerify");

//
//
// userRouter request methods
userRouter.get("/", userController.users_get);
userRouter.get("/:username", userController.user_detail_get);
userRouter.patch("/:username/profile/edit", privateVerify, userController.update_user_patch);

module.exports = userRouter;

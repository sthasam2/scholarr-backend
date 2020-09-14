/**
 * ### Classroom Router
 * Express Router for handling classroom routes.
 * @endpoint `api/classrooms`
 */
const classroomRouter = require("express").Router();

/**
 * ### Classroom Controller
 *  Middleware for handling different methods of Classroom
 *
 * #### Available Methods
 * - **Classroom CRUD**
 * 1. classes_get
 * 2. user_classes_get
 * 3. create_class_post
 * 4. class_detail_get
 * 5. update_class_patch
 * 6. class_delete
 *
 * - **Classroom member handling**
 */
const classroomController = require("../controllers/classroomControllers");

const { loggedInVerify } = require("../middleware/loggedInVerify");
const { classroomOwnerVerify, classMemberVerify } = require("../middleware/ownerVerify");
// const { imagesUpload, fileUpload } = require("../middleware/fileUpload");

//
//
// classroomRouter request methods
// TODO make a possible middleware to implement roles like teacher student so teacher gets more info

//*-
classroomRouter.get(
	"/",
	loggedInVerify,
	classroomController.classes_get
); /** get all classes available  @method GET @endpoint `api/classrooms` */

//*-
classroomRouter.get(
	"/user/:userId",
	loggedInVerify,
	classroomController.user_classes_get
); /** get all classes available for certain user @method GET @endpoint `api/classrooms/:userId`*/

// CRUD classroom
//*-
classroomRouter.get(
	"/:classroomId",
	loggedInVerify,
	classroomController.class_detail_get
); /** get certain classroom detail @method GET @endpoint `api/classrooms/:classroomId`*/

//*-
classroomRouter.post(
	"/create",
	loggedInVerify,
	classroomController.create_class_post
); /** CREATE classroom @method POST @endpoint `api/classrooms/create`*/

//*-
classroomRouter.patch(
	"/update/:classroomId",
	loggedInVerify,
	classroomController.update_class_patch
); /** UPDATE classroom @method PATCH @endpoint `api/classrooms/update/:classroomId`*/

//*-
classroomRouter.delete(
	"/delete/:classroomId",
	loggedInVerify,
	classroomController.class_delete
); /** delete classroom @method DELETE @endpoint `api/classrooms/delete/:classroomId`*/

//
//
// CLASSROOM MEMBER METHODS
// todo classroom invite, accept, request{via code}

//
//
//INVITE

//*
classroomRouter
	.route("/invite/:classroomId")
	.post(
		loggedInVerify,
		classroomOwnerVerify
	); /** invite users to classroom @method POST @endpoint `api/classrooms/invite/:classroomId/`*/

//
//
//REQUEST
//*
classroomRouter
	.route("/request")
	.post(
		loggedInVerify,
		classroomController.classroom_request_post
	); /** request to become users for classroom @method POST @endpoint `api/classrooms/request`*/

//
//
//ACCEPT
//*
classroomRouter
	.route("/:classroomId/accept_request/:userId")
	.get(
		loggedInVerify,
		classroomOwnerVerify,
		classroomController.accept_request_get
	); /** accept requesting members for classroom @method POST @endpoint `api/classrooms/:classroomId/accept_request/:userId`*/

//*
classroomRouter
	.route("/:classroomId/accept_invite/:userId")
	.get(
		classroomController.accept_invite_get
	); /** accept invited users to classroom @method POST @endpoint `api/classrooms/:classroomId/accept_invite/:userId`*/

//
//
// LEAVE/DELETE
classroomRouter
	.route("/:classroomId/remove_invite/:userId")
	.get(
		classroomController.remove_invitation_get
	); /** remove invitation classroom @method POST @endpoint `api/classrooms/:classroomId/remove_invite/:userId`*/

classroomRouter
	.route("/:classroomId/remove_request/:userId")
	.get(
		classroomController.remove_request_get
	); /** remove request for classroom @method POST @endpoint `api/classrooms/:classroomId/remove_request/:userId`*/

classroomRouter
	.route("/:classroomId/remove_enrolled/:userId")
	.get(
		classroomController.remove_enrollment_get
	); /** remove enrollment from classroom @method POST @endpoint `api/classrooms/:classroomId/remove_enrollment/:userId`*/

//
//
// GET LIST OF MEMBERS
//*
classroomRouter
	.route("/:classroomId/invited_members")
	.get(
		loggedInVerify,
		classroomOwnerVerify,
		classroomController.invited_members_get
	); /** get list of invited users for classroom @method GET @endpoint `api/classrooms/:classroomId/invited_members`*/

//*
classroomRouter
	.route("/:classroomId/requesting_members")
	.get(
		loggedInVerify,
		classroomOwnerVerify,
		classroomController.member_request_get
	); /**get list of all requesting users for classroom @method GET @endpoint `api/classrooms/:classroomId/requesting_members`*/

//*
classroomRouter
	.route("/:classroomId/enrolled_members")
	.get(
		loggedInVerify,
		classroomController.enrolled_members_get
	); /** list of all enrolled users for classroom @method GET @endpoint `api/classrooms/:classroomId/enrolled_members`*/

module.exports = classroomRouter;

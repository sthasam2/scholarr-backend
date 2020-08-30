/**
 * classes_get
 * class_detail_get
 * user_classes_get
 * create_class_post
 * update_class_patch
 * classworks_get
 * classwork_detail_get
 * create_classwork_post
 * update_classwork_patch
 * submit_classwork_post
 * update_classwork_submissioin_patch
 */

const classroomRouter = require("express").Router();
const classroomController = require("../controllers/classroomControllers");
const { loggedInVerify } = require("../middleware/loggedInVerify");
// const { imagesUpload, fileUpload } = require("../middleware/fileUpload");

//
//
// classroomRouter request methods
//*  TODO make a possible middleware to implement roles like teacher student so teacher gets more info

classroomRouter.get(
	"/",
	loggedInVerify,
	classroomController.classes_get
); /** get all classes available  @method GET @endpoint `api/classrooms` */

classroomRouter.get(
	"/user/:userId",
	loggedInVerify,
	classroomController.user_classes_get
); /** get all classes available for certain user @method GET @endpoint `api/classrooms/:userId`*/

// CRUD classroom
classroomRouter.post(
	"/create",
	loggedInVerify,
	classroomController.create_class_post
); /** CREATE classroom @method POST @endpoint `api/classrooms/:classroomId/update`*/

classroomRouter.get(
	"/:classroomId",
	loggedInVerify,
	classroomController.class_detail_get
); /** get certain classroom detail @method GET @endpoint `api/classrooms/:classroomId`*/

classroomRouter.patch(
	"/:classroomId/update",
	loggedInVerify,
	classroomController.update_class_patch
); /** UPDATE classroom @method PATCH @endpoint `api/classrooms/:classroomId/update`*/

classroomRouter.delete(
	"/:classroomId/delete",
	loggedInVerify,
	classroomController.class_delete
); /** delete classroom @method DELETE @endpoint `api/classrooms/:classroomId/delete`*/

//
//
// todo classroom invite, accept, request{via code}

//
//
// CLASSWORK methods

classroomRouter.get(
	"/:classroomId/classworks",
	loggedInVerify,
	classroomController.classworks_get
); /** get classroom classworks @method GET @endpoint `api/classrooms/:classroomId/classworks`*/

// classwork CRUD

classroomRouter.post(
	"/:classroomId/classworks/create",
	loggedInVerify,
	classroomController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.get(
	"/:classroomId/classworks/:classworkId",
	loggedInVerify,
	classroomController.classwork_detail_get
); /** get certain classrooms classwork @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId`*/

classroomRouter.patch(
	"/:classroomId/classworks/:classworkId/update",
	loggedInVerify,
	classroomController.update_classwork_patch
); /** update classwork @method PATCH @endpoint `api/classrooms/:classroomId/classworks/:classworkId/update`*/

// classroomRouter.delete(
// 	"/:classroomId/classworks/:classworkId/delete",
// 	loggedInVerify,
// 	classroomController.classwork_delete
// ); /** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/:classworkId/delete`*/

//
//
// STUDENT SUBMITS

classroomRouter.post(
	"/:classroomId/classworks/:classworkId/submit",
	loggedInVerify,
	classroomController.submit_classwork_post
); /** submit classwork @method GET @endpoint `api/classrooms/:classroomId/classworks/:classroomId/submit`*/

classroomRouter.patch(
	"/:classroomId/classworks/:classworkId/:submissionId/update",
	loggedInVerify,
	classroomController.update_classwork_submissioin_patch
); /** update classwork @method PATCH @endpoint `api/classrooms/:classroomId/classworks/:classroomId/:submissionId/update`*/

module.exports = classroomRouter;

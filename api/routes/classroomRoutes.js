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
const { privateVerify } = require("../middleware/privateVerify");
// const { imagesUpload, fileUpload } = require("../middleware/fileUpload");

//
//
// classroomRouter request methods
//*  TODO make a possible middleware to implement roles like teacher student so teacher gets more info

classroomRouter.get(
	"/",
	privateVerify,
	classroomController.classes_get
); /** get all classes available  @method GET @endpoint `api/classrooms` */

classroomRouter.get(
	"/user/:userId",
	privateVerify,
	classroomController.user_classes_get
); /** get all classes available for certain user @method GET @endpoint `api/classroom/:userId`*/

// CRUD classroom
classroomRouter.post(
	"/create",
	privateVerify,
	classroomController.create_class_post
); /** CREATE classroom @method POST @endpoint `api/classroom/:classId/update`*/

classroomRouter.get(
	"/:classId",
	privateVerify,
	classroomController.class_detail_get
); /** get certain classroom detail @method GET @endpoint `api/classroom/:classId`*/

classroomRouter.patch(
	"/:classId/update",
	privateVerify,
	classroomController.update_class_patch
); /** UPDATE classroom @method PATCH @endpoint `api/classroom/:classId/update`*/

// classroomRouter.delete(
// 	"/:classId/delete",
// 	privateVerify,
// 	classroomController.classroom_delete
// ); /** delete classroom @method DELETE @endpoint `api/classroom/:classId/delete`*/

//
//
// CLASSWORK methods

classroomRouter.get(
	"/:classId/classworks",
	privateVerify,
	classroomController.classworks_get
); /** get classroom classworks @method GET @endpoint `api/classroom/:classId/classworks`*/

// classwork CRUD

classroomRouter.post(
	"/:classId/classworks/create",
	privateVerify,
	classroomController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classroom/:classId/classworks/create`*/

classroomRouter.get(
	"/:classId/classworks/:classworkId",
	privateVerify,
	classroomController.classwork_detail_get
); /** get certain classrooms classwork @method GET @endpoint `api/classroom/:classId/classworks/:classworkId`*/

classroomRouter.patch(
	"/:classId/classworks/:classworkId/update",
	privateVerify,
	classroomController.update_classwork_patch
); /** update classwork @method PATCH @endpoint `api/classroom/:classId/classworks/:classworkId/update`*/

// classroomRouter.delete(
// 	"/:classId/classworks/:classworkId/delete",
// 	privateVerify,
// 	classroomController.classwork_delete
// ); /** delete classwork @method DELETE @endpoint `api/classroom/:classId/classworks/:classworkId/delete`*/

//
//
// STUDENT SUBMITS

classroomRouter.post(
	"/:classId/classworks/:classworkId/submit",
	privateVerify,
	classroomController.submit_classwork_post
); /** submit classwork @method GET @endpoint `api/classroom/:classId/classworks/:classId/submit`*/

classroomRouter.patch(
	"/:classId/classworks/:classworkId/:submissionId/update",
	privateVerify,
	classroomController.update_classwork_submissioin_patch
); /** update classwork @method PATCH @endpoint `api/classroom/:classId/classworks/:classId/:submissionId/update`*/

module.exports = classroomRouter;

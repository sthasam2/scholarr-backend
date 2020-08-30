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
 *
 * - **Classwork CRUD**
 * 1. classworks_get
 * 2. classwork_detail_get
 * 3. create_classwork_post
 * 4. update_classwork_patch
 * 5. classwork_delete
 *
 * - **Classwork Student Submissions**
 * 1. submit_classwork_post
 * 2. update_classwork_submissioin_patch
 * 3. classwork_submission_delete
 */
const classroomController = require("../controllers/classroomControllers");

const { loggedInVerify } = require("../middleware/loggedInVerify");
const { classroomOwnerVerify } = require("../middleware/ownerVerify");
// const { imagesUpload, fileUpload } = require("../middleware/fileUpload");

//
//
// classroomRouter request methods
// TODO make a possible middleware to implement roles like teacher student so teacher gets more info

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
// CLASSROOM MEMBER METHODS
// todo classroom invite, accept, request{via code}

//INVITE
classroomRouter
	.route("/:classroomId/invite")
	.post(
		loggedInVerify,
		classroomOwnerVerify
	); /** invite users to classroom @method POST @endpoint `api/classrooms/:classroomId/invite`*/

classroomRouter
	.route("/:classroomId/invited_members")
	.get(
		loggedInVerify
	); /** get list of invited users for classroom @method GET @endpoint `api/classrooms/:classroomId/invited_members`*/

//REQUEST
classroomRouter
	.route("/:classroomId/request")
	.post(
		loggedInVerify
	); /** request to become users for classroom @method POST @endpoint `api/classrooms/:classroomId/request`*/

classroomRouter
	.route("/:classroomId/requesting_members")
	.get(
		loggedInVerify
	); /**get list of all requesting users for classroom @method GET @endpoint `api/classrooms/:classroomId/requesting_members`*/

//ACCEPT
classroomRouter
	.route("/:classroomId/accept")
	.post(
		loggedInVerify
	); /** accept requesting members for classroom @method POST @endpoint `api/classrooms/:classroomId/accept`*/
classroomRouter
	.route("/:classroomId/accepted_members")
	.get(
		loggedInVerify
	); /** list of all accepted users for classroom @method GET @endpoint `api/classrooms/:classroomId/accepted_members`*/

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

// classroomRouter.delete(
// 	"/:classroomId/classworks/:classworkId/:submissionId/delete",
// 	loggedInVerify,
// 	classroomController.update_classwork_submissioin_patch
// ); /** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/:classroomId/:submissionId/delete`*/

module.exports = classroomRouter;

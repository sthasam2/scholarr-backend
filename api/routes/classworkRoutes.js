/**
 * ### Classroom Router
 * Express Router for handling classroom routes.
 * @endpoint `api/classrooms`
 */
const { classroomRouter } = require("./classroomRoutes");

/**
 * ### Classwork Controller
 *  Middleware for handling different methods of Classroom
 *
 * #### Available Methods
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
const classworkController = require("../controllers/classworkControllers");
const submissionController = require("../controllers/submissionControllers");
const { loggedInVerify } = require("../middleware/verification");
const {
	classroomOwnerVerify,
	classMemberVerify,
	classworkExistVerify,
} = require("../middleware/verification");
//
//
// ! CLASSWORK routes

classroomRouter.get(
	"/:classroomId/classworks",
	loggedInVerify,
	classMemberVerify,
	classworkController.classworks_get
); /** get classroom classworks @method GET @endpoint `api/classrooms/:classroomId/classworks`*/

// classwork CRUD

classroomRouter.post(
	"/:classroomId/classworks/create_assignment",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.post(
	"/:classroomId/classworks/create_test",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.post(
	"/:classroomId/classworks/create_question",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.post(
	"/:classroomId/classworks/create_material",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.post(
	"/:classroomId/classworks/create_general",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_classwork_post
); /** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create`*/

classroomRouter.get(
	"/:classroomId/classworks/:classworkId",
	loggedInVerify,
	classMemberVerify,
	classworkController.classwork_detail_get
); /** get certain classrooms classwork @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId`*/

classroomRouter.patch(
	"/:classroomId/classworks/update/:classworkId",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.update_classwork_patch
); /** update classwork @method PATCH @endpoint `api/classrooms/:classroomId/classworks/update/:classworkId`*/

classroomRouter.delete(
	"/:classroomId/classworks/delete/:classworkId",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.delete_classwork_delete
); /** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/delete/:classworkId/`*/

//
//
// ! Submission routes

classroomRouter.post(
	"/:classroomId/classworks/:classworkId/submit",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionController.submit_classwork_post
); /** submit classwork @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId/submit`*/

classroomRouter.patch(
	"/:classroomId/classworks/:classworkId/update_submission/:submissionId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionController.update_classwork_submissioin_patch
); /** update classwork @method PATCH @endpoint `api/classrooms//:classroomId/classworks/:classworkId/update_submission/:submissionId`*/

classroomRouter.delete(
	"/:classroomId/classworks/:classworkId/delete_submission/:submissionId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionController.delete_classwork_submissioin_delete
); /** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/:classworkId/delete_submission/:submissionId`*/

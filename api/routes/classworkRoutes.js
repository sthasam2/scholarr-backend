/**
 * ### Classroom Router
 * Express Router for handling classroom routes.
 * @endpoint `api/classrooms/cw/`
 */
const classworkRouter = require("express").Router();

const classworkController = require("../controllers/classworkControllers");
const submissionController = require("../controllers/submissionControllers");
const { attachmentsUpload, submissionUpload } = require("../middleware/fileUpload");
const { loggedInVerify, paramAccountOwnerVerify } = require("../middleware/verification");
const {
	classroomOwnerVerify,
	classMemberVerify,
	classworkExistVerify,
} = require("../middleware/verification");

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                 ! CLASSWORK routes                               ///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? READ                               ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** get classroom classworks @method GET @endpoint `api/classrooms/:classroomId/classworks`*/
classworkRouter.get(
	"/:classroomId/classworks",
	loggedInVerify,
	classMemberVerify,
	classworkController.classworks_get
); //!

/** get classroom assignments @method GET @endpoint `api/classrooms/:classroomId/classworks/assignment`*/
classworkRouter.get(
	"/:classroomId/classworks/assignment",
	loggedInVerify,
	classMemberVerify,
	classworkController.assignment_classworks_get
); //!

/** get classroom tests @method GET @endpoint `api/classrooms/:classroomId/classworks/test`*/
classworkRouter.get(
	"/:classroomId/classworks/test",
	loggedInVerify,
	classMemberVerify,
	classworkController.test_classworks_get
); //!

/** get classroom questions @method GET @endpoint `api/classrooms/:classroomId/classworks/question`*/
classworkRouter.get(
	"/:classroomId/classworks/question",
	loggedInVerify,
	classMemberVerify,
	classworkController.question_classworks_get
); //!

/** get classroom materials @method GET @endpoint `api/classrooms/:classroomId/classworks/material`*/
classworkRouter.get(
	"/:classroomId/classworks/material",
	loggedInVerify,
	classMemberVerify,
	classworkController.material_classworks_get
); //!

/** get classroom general @method GET @endpoint `api/classrooms/:classroomId/classworks/general`*/
classworkRouter.get(
	"/:classroomId/classworks/general",
	loggedInVerify,
	classMemberVerify,
	classworkController.general_classworks_get
); //!

/** get certain classrooms classwork detail @method GET @endpoint `api/classrooms/:classroomId/classworks/detail/:classworkId`*/
classworkRouter.get(
	"/:classroomId/classworks/detail/:classworkId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	classworkController.classwork_detail_get
); //!

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? CREATE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** create assignment @method POST @endpoint `api/classrooms/:classroomId/classworks/create_assignment`*/
classworkRouter.post(
	"/:classroomId/classworks/create_assignment",
	loggedInVerify,
	classroomOwnerVerify,
	attachmentsUpload,
	classworkController.create_assignment_post
); //!

/** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create_test`*/
classworkRouter.post(
	"/:classroomId/classworks/create_test",
	loggedInVerify,
	classroomOwnerVerify,
	attachmentsUpload,
	classworkController.create_test_post
); //!

/** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create_question`*/
classworkRouter.post(
	"/:classroomId/classworks/create_question",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_question_post
); //!

/** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create_material`*/
classworkRouter.post(
	"/:classroomId/classworks/create_material",
	loggedInVerify,
	classroomOwnerVerify,
	attachmentsUpload,
	classworkController.create_material_post
); //!

/** create classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/create_general`*/
classworkRouter.post(
	"/:classroomId/classworks/create_general",
	loggedInVerify,
	classroomOwnerVerify,
	classworkController.create_general_post
); //!

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? UPDATE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** update classwork @method PATCH @endpoint `api/classrooms/:classroomId/classworks/update/:classworkId`*/
classworkRouter.patch(
	"/:classroomId/classworks/update/:classworkId",
	loggedInVerify,
	classroomOwnerVerify,
	classworkExistVerify,
	attachmentsUpload,
	classworkController.update_classwork_patch
); //!

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? DELETE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/delete/:classworkId`*/
classworkRouter.delete(
	"/:classroomId/classworks/delete/:classworkId",
	loggedInVerify,
	classroomOwnerVerify,
	classworkExistVerify,
	classworkController.delete_classwork_delete
); //!

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                 ! SUBMISSION routes                              ///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? READ                               ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** get submissions @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId/submissions`*/
classworkRouter.get(
	"/:classroomId/classworks/:classworkId/submissions",
	loggedInVerify,
	classroomOwnerVerify,
	classworkExistVerify,
	submissionController.submissions_get
); //!

/** get user submissions @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId/submission/user/:userIds`*/
classworkRouter.get(
	"/classworks/submissions/user/:userId",
	loggedInVerify,
	paramAccountOwnerVerify,
	submissionController.user_submissions_get
);

/** get submission detail @method GET @endpoint `api/classrooms/:classroomId/classworks/:classworkId/submissions/detail/:submissionId`*/
classworkRouter.get(
	"/:classroomId/classworks/:classworkId/submissions/detail/:submissionId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionController.submission_detail_get
); //!

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? CREATE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** submit classwork @method POST @endpoint `api/classrooms/:classroomId/classworks/:classworkId/submit`*/
classworkRouter.post(
	"/:classroomId/classworks/:classworkId/submit",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionUpload,
	submissionController.submit_classwork_post
); //!

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? UPDATE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** update submission @method PATCH @endpoint `api/classrooms//:classroomId/classworks/:classworkId/update_submission/:submissionId`*/
classworkRouter.patch(
	"/:classroomId/classworks/:classworkId/update_submission/:submissionId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionUpload,
	submissionController.update_classwork_submission_patch
); //!

/** update submission GRADE @method PATCH @endpoint `api/classrooms//:classroomId/classworks/:classworkId/grade_submission/:submissionId`*/
classworkRouter.patch(
	"/:classroomId/classworks/:classworkId/grade_submission/:submissionId",
	loggedInVerify,
	classroomOwnerVerify,
	classworkExistVerify,
	submissionController.update_grade_submission_patch
);

///////////////////////////////////////////////////////////////////////////////////////
//////////                             ? DELETE                             ///////////
///////////////////////////////////////////////////////////////////////////////////////

/** delete classwork @method DELETE @endpoint `api/classrooms/:classroomId/classworks/:classworkId/delete_submission/:submissionId`*/
classworkRouter.delete(
	"/:classroomId/classworks/:classworkId/delete_submission/:submissionId",
	loggedInVerify,
	classMemberVerify,
	classworkExistVerify,
	submissionController.delete_classwork_submission_delete
); //!

module.exports = classworkRouter;

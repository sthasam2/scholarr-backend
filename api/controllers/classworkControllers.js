/**
 * classworks_get
 * classwork_detail_get
 * create_classwork_post
 * update_classwork_patch
 * submit_classwork_post
 * update_classwork_submissioin_patch
 */

// models
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const { Classwork, ClassworkComment } = require("../models/Classwork");

// utility functions
const {
	errorMessage,
	nonExistenceError,
	validationError,
	reqBodyError,
} = require("../utils/errorMessages");

// middleware
const {
	classworkValidate,
	assignmentCWValidate,
	testCWValidate,
	questionCWValidate,
	generalCWValidate,
	materialCWValidate,
} = require("../middleware/validation");

//CUSTOM ENUM
const classworkType = {
	ALL: "All",
	ASSIGNMENT: "Asssigment",
	TEST: "Test",
	QUESTION: "Question",
	MATERIAL: "Material",
	GENERAL: "Generic",
};

//
//
// Classwork methods

//
//
// ! GET METHODS

/**
 * Get a list of all the classworks of given type
 * @param {object} req
 * @param {object} res
 * @param {string} reqClassworkType
 */
const getClassworkList = async (req, res, reqClassworkType) => {
	try {
		const paramsClassroomFound = await Classroom.findOne({ _id: req.params.classroomId });
		if (!paramsClassroomFound) throw nonExistenceError("classroom");

		const reqClassworks = [];
		if (reqClassworkType != classworkType.ALL)
			reqClassworks = paramsClassroomFound.classworks.filter(
				(doc) => doc.classworkType === reqClassworkType
			);
		else reqClassworks = paramsClassroomFound.classworks;

		const errorClassworkArray = [];
		const classworkDocArray = [];

		for (let doc of reqClassworks) {
			let classworkFound = await ClassworkComment.findById(doc._classroomId);
			if (!classworkFound) errorClassworkArray.push(doc._classroomId);
			else classworkDocArray.push(classworkFound);
		}

		// if (reqClassworkType === classworkType.ASSIGNMENT)
		// 	classworkArray = queryClassroomFound.classworks.;
		// else if (reqClassworkType === classworkType.TEST)
		// 	classworkArray = queryClassroomFound.classworks.tests;
		// else if (reqClassworkType === classworkType.QUESTION)
		// 	classworkArray = queryClassroomFound.classworks.questions;
		// else if (reqClassworkType === classworkType.MATERIAL)
		// 	classworkArray = queryClassroomFound.classworks.materials;
		// else if (reqClassworkType === classworkType.GENERAL)
		// 	classworkArray = queryClassroomFound.classworks.general;
		// else if (reqClassworkType === classworkType.ALL)
		// 	returnDocs = queryClassroomFound.classworks;

		// if (returnDocs != null) {
		// 	for (let doc of classworkArray) {
		// 		const classworkFound = await Classwork.findById(doc);

		// 		if (!classworkFound) errorClassworks.push(doc);
		// 		else classworks.push(doc);
		// 	}

		// 	returnDocs = classrooms;
		// }

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful",
				message: `${reqClassworkType} from ${classroomFound.className}(_id:${classroomFound._id} obtained`,
				classworkType: reqClassworkType,
				classworks: classworkDocArray,
				errorClassworks: errorClassworkArray,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

/** list view of classworks
 * @method GET
 */
module.exports.classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.ALL);
};

/** list of assignments
 * @method GET
 */
module.exports.assignment_classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.ASSIGNMENT);
};

/** list of TEST
 * @method GET
 */
module.exports.test_classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.TEST);
};

/** list of questions
 * @method GET
 */
module.exports.question_classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.QUESTION);
};

/** list of materials
 * @method GET
 */
module.exports.material_classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.MATERIAL);
};

/** list of general
 * @method GET
 */
module.exports.general_classworks_get = async (req, res) => {
	await getClassworkList(req, res, classworkType.GENERAL);
};

/** Read Detail view of a classwork
 *
 * **NOTE: must use classworkExistVerify, classMemberVerify middlewares before this**
 * @method GET
 */
module.exports.classwork_detail_get = async (req, res) => {
	try {
		//classwork first check classwork belongs to classroom, then check classmember
		// NOTE: must use classworkExistVerify, classMemberVerify middlewares before this
		let paramClasswork = req.customField.classwork;

		res.status(200).send({
			success: { status: 200, type: "Request Successful", classwork: paramClasswork },
		});
	} catch (err) {}
};

//
//
// ! CREATE methods
const createClasswork = async (req, res, reqClassworkType) => {
	try {
		const classroomFound = req.customField.classroom;
		const classworkAttributes = {};
		classworkAttributes["_classroomId"] = classroomFound._id;
		classworkAttributes["classworkType"] = reqClassworkType;

		// Validation depending on cases
		switch (reqClassworkType) {
			case classworkType.ASSIGNMENT:
				const { error } = await assignmentCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.TEST:
				const { error } = await testCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.QUESTION:
				const { error } = await questionCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.MATERIAL:
				const { error } = await materialCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.GENERAL:
				const { error } = await generalCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			default:
				throw reqBodyError;
				break;
		}

		for (key in req.body) classworkAttributes[key] = req.body[key];
		const savedClasswork = await new Classwork(classworkAttributes).save();

		//update classroom
		let classworkInfo = {
			classworkType: savedClasswork.classworkType,
			_classworkId: savedClasswork._id,
		};
		await Classroom.updateOne(
			{ _id: classroomFound._id },
			{ $push: { classwork: classworkInfo } }
		);

		//update user
		let userClassworkInfo = {
			classroom: classroomFound._id,
			classwork: savedClasswork._id,
		};
		let memberIds = [];
		for (doc of classroomFound.classMembers.enrolledMembers) memberIds.push(doc._memberId);
		await User.updateMany(
			{ _id: { $in: memberIds } },
			{ $push: { classworks: userClassworkInfo } }
		);

		return res.status(200).send({
			success: {
				status: 201,
				type: "Request Successful!",
				message: "Classwork Successfully Created.",
				classworkType: reqClassworkType,
				classworkDetails: savedClasswork,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

/** CREATE assignment
 * @method POST @type form/multipart
 * body: {*title: ,description: ,*totalGrade: ,*deadlineDate: , attachments: `files`}
 */
module.exports.create_assignment_post = async (req, res) => {
	await createClasswork(req, res, classworkType.ASSIGNMENT);
};

/** CREATE TEST
 * @method POST @type form/multipart
 * body: {*title: ,description: ,*totalGrade: ,*deadlineDate: ,attachments: `files`}
 */
module.exports.create_test_post = async (req, res) => {
	await createClasswork(req, res, classworkType.TEST);
};

/** CREATE material
 * @method POST @type form/multipart
 * body: {*title: ,description: , attachments: `files`}
 */
module.exports.create_material_post = async (req, res) => {
	await createClasswork(req, res, classworkType.MATERIAL);
};

/** CREATE question
 * @method POST
 * body: {*title: ,description: ,*deadlineDate: ,}
 */
module.exports.create_question_post = async (req, res) => {
	await createClasswork(req, res, classworkType.QUESTION);
};

/** CREATE general
 * @method POST
 * body: {*title: ,description: ,}
 */
module.exports.create_general_post = async (req, res) => {
	await createClasswork(req, res, classworkType.GENERAL);
};

// ! UPDATE methods

/** UPDATE classwork
 * @method PATCH @type form/multipart
 * body: `REFER TO CORRESPONDING CLASSWORK CREATE BODY WHERE NO FIELD IS REQUIRED`
 */
module.exports.update_classwork_patch = async (req, res) => {
	try {
		//first check classroom owner, clssworkExists, then update
		const classworkFound = req.customField.classwork;
		const reqClassworkType = classworkFound.classworkType;

		// verify req body
		switch (reqClassworkType) {
			case classworkType.ASSIGNMENT:
				const { error } = await updateAssignmentCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.GENERAL:
				const { error } = await updateGeneralCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.MATERIAL:
				const { error } = await updateMaterialCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.QUESTION:
				const { error } = await updateQuestionCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			case classworkType.TEST:
				const { error } = await updateTestCWValidate(req.body);
				if (error) throw validationError(error);

				break;
			default:
				throw reqBodyError;
				break;
		}

		//classwork update
		const updateQuery = { $set: {} };

		for (let key in req.body) {
			if (classworkFound[key] && classworkFound[key] != req.body[key])
				updateQuery.$set[key] = req.body[key];
		}

		await Classwork.updateOne({ _id: classworkFound._id }, updateQuery);

		return res.status(200).send({
			success: {
				status: 201,
				type: "Request Successful!",
				message: "Classwork Successfully Updated.",
				classworkType: reqClassworkType,
				classworkDetails: savedClasswork,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

// ! DELETE methods

/** DELETE Classwork
 * @method DELETE
 */
module.exports.delete_classwork_delete = async (req, res) => {
	try {
		//check loggedIn,classroomOwner, classworkExist
		const reqClassroom = req.customField.classroom;
		const reqClasswork = req.customField.classwork;

		//delete
		await Classwork.deleteOne({ _id: reqClasswork._id });

		//update classroom
		await Classroom.updateOne(
			{ _id: reqClassroom._id },
			{ $pull: { classworks: { _classworkId: reqClasswork._id } } }
		);

		//update user
		let memberIds = [];
		for (doc of reqClassroom.classMembers.enrolledMembers) memberIds.push(doc._memberId);
		await User.updateMany(
			{ _id: { $in: memberIds } },
			{ $pull: { "classworks.classwork": reqClasswork._id } }
		);
		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Accepted!",
				message: "Classwork Successfully Deleted",
				classwork: reqClasswork,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

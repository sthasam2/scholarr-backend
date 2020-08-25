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

// models
const Classroom = require("../models/Classroom");
const User = require("../models/User");

// middleware
const {
	createClassroomValidation,
	updateClassroomValidation,
} = require("../middleware/validation");

// utility functions
const { uniqueClassCode } = require("../utils/codeTokensGenerator");
const { errorMessage, nonExistenceError } = require("../utils/errorMessages");

//
//
// Classroom methods

module.exports.classes_get = async (req, res) => {
	try {
		const classrooms = [];
		// looping through each classroom doc
		for await (const doc of Classroom.find()) {
			classrooms.push({
				//ids
				_creatorId: doc._creatorId,
				_classId: doc._id,
				//classroom info
				classCode: doc.classCode,
				className: doc.className,
				classDescription: doc.classDescription,
				// members
				classMembers: doc.classMembers,
				classWorks: doc.classWorks,
				// dates
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt,
			});
		}

		return res.status(200).send(classrooms);
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

module.exports.class_detail_get = async (req, res) => {
	try {
		const classroomFound = await Classroom.findOne({ _id: req.params.classId });
		console.log(classroomFound);
		if (!classroomFound) throw nonExistenceError("classroom");

		// check creator
		const isCreator = req.user._id === classroomFound._creatorId;
		// check member
		const isMember = classroomFound.classMembers.acceptedMembers.some(
			(doc) => doc._memberId === req.user._id
		);

		if (!(isCreator || isMember))
			throw errorMessage(
				401,
				"Access-denied",
				"To access this classroom you must either be a member or the creator"
			);

		const classroom = {
			_id: classroomFound._id,
			createdAt: classroomFound.createdAt,
			updated: classroomFound.updated,
			updatedAt: classroomFound.updatedAt,
			className: classroomFound.classroomName,
			classDescription: classroomFound.classroomDescription,
			classCode: classroomFound.classroomCode,
			classMembers: classroomFound.classroomMembers.acceptedMembers,
			classWorks: classroomFound.classWorks,
		};

		return res.status(200).send(classroom);
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

module.exports.user_classes_get = async (req, res) => {
	try {
		const userFound = await User.findById(req.params.userId);
		if (!userFound)
			throw {
				error: {
					status: 400,
					type: "Non-existence",
					message: "Requested user does not exist",
				},
			};

		const classesAttendingFound = await Classroom.find({
			_id: { $in: userFound.classesAtending },
		});
		const classesTeachingFound = await Classroom.find({
			_id: { $in: userFound.classesTeaching },
		});

		const attending = [];
		const teaching = [];

		for (let doc of classesAttendingFound) {
			attending.push({
				_creatorId: doc._creatorId,
				_classId: doc._id,
				classCode: doc.classCode,
				className: doc.className,
				classDescription: doc.classDescription,
				classMembers: doc.classMembers,
				classWorks: doc.classWorks,
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt,
			});
		}

		// more info for teaching classes
		for (let doc of classesTeachingFound) {
			teaching.push(doc);
		}

		return res.status(200).send({
			classesAttending: attending,
			classesTeaching: teaching,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
};

/**
 * CREATE classroom
 * POST body = {className*: , classDescription: , classSubject: , affiliatedInstitution: ,}
 */
module.exports.create_class_post = async (req, res) => {
	try {
		// validate post body
		const { error } = createClassroomValidation(req.body);
		if (error)
			throw {
				error: {
					type: "Req.body Validation error",
					message: error.details[0].message,
				},
			};

		// check if req.user exists
		const userFound = await User.findById(req.user._id);
		if (!userFound) {
			throw {
				error: {
					status: 404,
					type: "Non-existence",
					message: "Requesting user not found",
				},
			};
		}

		// check uniqueness of class code
		let unique = false;
		while (unique === false) {
			let code = uniqueClassCode();
			let classFound = await Classroom.findOne({ classCode: code });
			if (classFound) unique = false;
			else unique = true;
		}

		let classAttributes = {};
		// required fields created in backend
		classAttributes["_creatorId"] = req.user._id;
		classAttributes["classCode"] = uniqueClassCode();

		// since all fields are not required, only those requested are added
		for (let key in req.body) {
			classAttributes[key] = req.body[key];
		}

		const classroom = new Classroom(classAttributes);
		const savedClassroom = await classroom.save();
		console.log(savedClassroom);

		const updateUserInfo = await User.updateOne(
			{ _id: req.user._id },
			{
				$push: { classesTeaching: savedClassroom._id },
			}
		);

		return res.status(200).send({
			success: {
				status: 200,
				message: "Classroom created",
				classroomInfo: {
					_id: savedClassroom._id,
					className: savedClassroom.className,
					classCode: savedClassroom.classCode,
					creator: savedClassroom._creatorId,
				},
			},
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

/**
 * Update class details
 * PATCH body: {_classId: className*: ,classDescription: ,classSubject: ,affiliatedInstitution: ,}
 */
module.exports.update_class_patch = async (req, res) => {
	try {
		const { error } = updateClassroomValidation(req.body);
		if (error)
			throw {
				error: {
					type: "Req.body Validation error",
					message: error.details[0].message,
				},
			};

		const classroomFound = await Classroom.findOne({ _id: req.params.classId });
		if (!classroomFound) throw nonExistenceError("classroom");

		const query = { $set: {} };
		query.$set["updated"] = true;
		query.$set["updatedAt"] = Date.now();

		for (let key in req.body) {
			if (classroomFound[key] && classroomFound[key] != req.body[key])
				query.$set[key] = req.body[key];
		}

		await Classroom.updateOne({ _id: classroomFound._id }, query);

		return res.status(200).send({
			Success: {
				status: 200,
				message: "Classroom successfully updated",
				classroomInfo: {
					classId: classroomFound._id,
					creator: classroomFound._creatorId,
				},
			},
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send(err);
	}
};

//
//
// Classwork methods

/** list view of classworks
 * @method GET
 */
module.exports.classworks_get = async (req, res) => {
	console.log("classwork_get");
};

/** CREATE classwork
 * @method POST
 */
module.exports.create_classwork_post = async (req, res) => {
	console.log("create_classwork_post");
};

/** Read Detail view of a classroom
 * @method GET
 */
module.exports.classwork_detail_get = async (req, res) => {
	console.log("classwork_detail_get");
};

/** UPDATE classwork
 * @method PATCH
 */
module.exports.update_classwork_patch = async (req, res) => {
	console.log("update_classwork_patch");
};

/** DELETE classwork
 * @method DELETE
 */
module.exports.classwork_delete = async (req, res) => {
	console.log("update_classwork_patch");
};

//
//
// Classwork submisssions
module.exports.submit_classwork_post = async (req, res) => {
	console.log("submit_classwork_post");
};

module.exports.update_classwork_submissioin_patch = async (req, res) => {
	console.log("update_classwork_submissioin_patch");
};

const { Classwork } = require("../models/Classwork");
const User = require("../models/User");
const Submission = require("../models/Submission");
const { createSubmissionValidation } = require("../middleware/validation");
const {
	validationError,
	nonExistenceError,
	ownerAccessDenailError,
} = require("../utils/errorMessages");

//////////////////////////////////////////////////////////////////////////////////////////////////////
////////                               ! SUBMISSION methods                                ////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? READ                                     ////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * ## Classwork Submission
 * @method POST @body {description: , attachements: `files`}
 */
module.exports.submissions_get = async (req, res) => {
	try {
		// before this check LoggedIn, ClassroomMember, ClassworkExist
		const reqClasswork = req.locals.classwork;
		let submissions = [];

		for (let doc of reqClasswork.submissions) submissions.push(doc.submission.toString());

		const submissionsFound = await Submission.find({ _id: { $in: submissions } });

		// delete reqClasswork.submissions;
		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful!",
				message: "Submission recieved for classwork",
				classwork: reqClasswork,
				submissions: submissionsFound,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

module.exports.submission_detail_get = async (req, res) => {
	try {
		// before this check LoggedIn, ClassroomMember, ClassworkExist
		// const reqClasswork = req.locals.classwork;
		const reqClassroom = req.locals.classroom;
		const reqUser = req.user;

		//check submission
		const paramsSubmission = await Submission.findById(req.params.submissionId);
		if (!paramsSubmission) throw nonExistenceError("Submission");

		let isOwner = paramsSubmission._userId.toString() === reqUser._id.toString();
		let isClassroomOwner = reqClassroom._creatorId.toString() === reqUser._id.toString();
		if (!isOwner && !isClassroomOwner) throw ownerAccessDenailError;

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful!",
				message: "Submission details obtained.",
				submission: paramsSubmission,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

module.exports.user_submissions_get = async (req, res) => {
	try {
		const reqUser = req.user;
		const submissions = reqUser.submissions;

		let errorDocs = [];
		let submissionDocs = [];

		for (let doc of submissions) {
			let classworkFound = await Classwork.findById(doc.classwork);
			let submissionFound = await Submission.findById(doc.submission);
			if (!classworkFound && !submissionFound) errorDocs.push(doc);
			else {
				submissionDocs.push({
					classwork: classworkFound,
					submission: submissionFound,
				});
			}
		}

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful!",
				message: "Submission obtained.",
				submission: submissionDocs,
			},
		});
		//
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? CREATE                                   ////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * ## Classwork Submission
 * @method POST @body {description: , attachements: `files`}
 */
module.exports.submit_classwork_post = async (req, res) => {
	try {
		// before this check LoggedIn, ClassroomMember, ClassworkExist
		const reqClasswork = req.locals.classwork;
		const reqUser = req.user;

		// Validate req.body
		const { error } = createSubmissionValidation(req.body);
		if (error) throw validationError(error);

		// Create
		let submissionAttributes = {};
		submissionAttributes["_userId"] = req.user._id;
		submissionAttributes["_classworkId"] = reqClasswork._id;

		for (let key in req.body) {
			submissionAttributes[key] = req.body[key];
		}

		let attachments = [];
		if (req.files) {
			for (key in req.files)
				attachments.push({
					name: req.files[key].filename,
					mimeType: req.files[key].mimetype,
					location: req.files[key].path,
				});
		}
		submissionAttributes["attachments"] = attachments;

		const savedSubmission = await new Submission(submissionAttributes).save();

		// Update Users, Classwork
		await Classwork.updateOne(
			{ _id: reqClasswork._id },
			{ $set: { submissions: { user: reqUser._id, submission: savedSubmission._id } } }
		);

		await User.updateOne(
			{ _id: reqUser._id },
			{
				$set: {
					submissions: { classwork: reqClasswork._id, submission: savedSubmission._id },
				},
			}
		);

		return res.status(201).send({
			success: {
				status: 201,
				type: "Request Successful!",
				message: "Submission created",
				submission: savedSubmission,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? UPDATE                                   ////////////
//////////////////////////////////////////////////////////////////////////////////////////

module.exports.update_classwork_submission_patch = async (req, res) => {
	try {
		// before this check LoggedIn, ClassroomMember, ClassworkExist
		const reqUser = req.user;

		//check submission
		const paramsSubmission = await Submission.findById(req.params.submissionId);
		if (!paramsSubmission) throw nonExistenceError("Submission");

		let isOwner = paramsSubmission._userId.toString() === reqUser._id.toString();
		let isClassroomOwner = reqClassroom._creatorId.toString() === reqUser._id.toString();
		if (!isOwner && !isClassroomOwner) throw ownerAccessDenailError;

		// Validate req.body
		const { error } = createSubmissionValidation(req.body);
		if (error) throw validationError(error);

		// UPDATE data
		let updateQuery = { $set: {} };
		for (let key in req.body) {
			if (paramsSubmission[key] && paramsSubmission[key] != req.body[key])
				updateQuery.$set[key] = req.body[key];
		}

		let attachments = [];
		if (req.files) {
			for (key in req.files)
				attachments.push({
					name: req.files[key].filename,
					mimeType: req.files[key].mimetype,
					location: req.files[key].path,
				});
		}

		updateQuery.$set["attachments"] = attachments;

		// Update Users, Classwork
		await Submission.updateOne({ _id: paramsSubmission._id }, updateQuery);

		//delete previous files
		await attachmentsDelete(paramsSubmission.attachments);

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful!",
				message: "Submission updated",
				submissionId: paramsSubmission._id,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                             ? DELETE                                   ////////////
//////////////////////////////////////////////////////////////////////////////////////////

module.exports.delete_classwork_submission_delete = async (req, res) => {
	try {
		// before this check LoggedIn, ClassroomMember, ClassworkExist
		const reqClasswork = req.locals.classwork;
		const reqClassroom = req.locals.classroom;
		const reqUser = req.user;

		//check submission
		const paramsSubmission = await Submission.findById(req.params.submissionId);
		if (!paramsSubmission) throw nonExistenceError("Submission");

		let isOwner = paramsSubmission._userId.toString() === reqUser._id.toString();
		let isClassroomOwner = reqClassroom._creatorId.toString() === reqUser._id.toString();
		if (!isOwner && !isClassroomOwner) throw ownerAccessDenailError;

		//Delete
		await Submission.deleteOne({ _id: paramsSubmission._id });

		// Update Users, Classwork
		await Classwork.updateOne(
			{ _id: reqClasswork._id },
			{ $pull: { submissions: { submission: paramsSubmission._id } } }
		);

		await User.updateOne(
			{ _id: reqUser._id },
			{
				$pull: {
					submissions: { submission: paramsSubmission._id },
				},
			}
		);

		//delete previous files
		await attachmentsDelete(paramsSubmission.attachments);

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Successful!",
				message: "Submission Deleted",
				submission: paramsSubmission,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		return res.status(400).send(err);
	}
};

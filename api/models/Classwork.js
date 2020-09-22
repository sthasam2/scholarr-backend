const mongoose = require("mongoose");
const Classroom = require("./Classroom");
const Submission = require("./Submission");
const User = require("./User");

//classwork
const classworkSchema = mongoose.Schema(
	{
		_classroomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Classroom",
		},
		classworkType: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			maxlength: 200,
			default: null,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			maxlength: 600,
			default: null,
			trim: true,
		},
		attachments: [
			{
				name: String,
				mimeType: String,
				location: String,
			},
		],
		totalGrade: {
			type: Number,
			default: null,
		},
		deadlineDate: {
			type: Date,
			default: null,
		},
		submissions: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
			},
		],
	},
	{ timestamps: true }
);

//class comments
const classworkCommentSchema = mongoose.Schema(
	{
		comment: {
			type: String,
			maxlength: 500,
			required: true,
			trim: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		classwork: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Classwork",
		},
	},
	{ timestamps: true }
);

module.exports.Classwork = mongoose.model("Classwork", classworkSchema);
module.exports.ClassworkComment = mongoose.model("ClassworkComment", classworkCommentSchema);

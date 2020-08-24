const mongoose = require("mongoose");
const User = require("./User");

const classroomSchema = mongoose.Schema({
	// class info
	classCode: {
		type: String,
		required: true,
		maxlength: 16,
		default: null,
	},
	className: {
		type: String,
		required: true,
		maxlength: 256,
		default: null,
	},
	classDescription: {
		type: String,
		maxlength: 2000,
		default: null,
	},
	classSubject: {
		type: String,
		maxlength: 256,
		default: null,
	},
	affiliatedInstitution: {
		type: String,
		maxlength: 256,
		default: null,
	},
	coverPhoto: {
		type: String,
		default: null,
	},
	updated: {
		type: Boolean,
		required: true,
		default: false,
	},
	// users
	_creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	classMembers: {
		acceptedMembers: [{ _memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
		invitedMembers: [{ _memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
		memberRequest: [{ _memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
	},
	// classworks
	labels: [
		{
			type: String,
		},
	],
	classWorks: {
		general: [{ _generalId: mongoose.Schema.Types.ObjectId }],
		assignment: [{ _assignmentId: mongoose.Schema.Types.ObjectId }],
		questions: [{ _generalId: mongoose.Schema.Types.ObjectId }],
		materials: [{ _generalId: mongoose.Schema.Types.ObjectId }],
	},
	//dates
	createdAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	lastUpdated: {
		type: Date,
		default: null,
	},
});

module.exports = mongoose.model("Classroom", classroomSchema);

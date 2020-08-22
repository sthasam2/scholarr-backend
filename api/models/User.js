const mongoose = require("mongoose");

//
//
// USER SCHEMA
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		minlength: 8,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	firstName: {
		type: String,
		maxlength: 100,
		default: null,
		required: false,
	},
	middleName: {
		type: String,
		maxlength: 100,
		default: null,
		required: false,
	},
	lastName: {
		type: String,
		maxlength: 100,
		default: null,
		required: false,
	},
	bio: {
		type: String,
		maxlength: 1000,
		default: null,
		required: false,
	},
	dateOfBirth: {
		type: Date,
		// default: Date.now,
		default: null,
		max: Date.now,
		required: false,
	},
	avatarImage: {
		data: { type: String, default: null },
		contentType: { type: String, default: null },
		required: false,
	},
	coverImage: {
		data: { type: String, default: null },
		contentType: { type: String, default: null },
		required: false,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema); // creates a new model based on userSchema named as User

const mongoose = require("mongoose");
const { boolean } = require("joi");

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
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema); // creates a new model based on userSchema named as User

module.exports = User; // exporting the User model

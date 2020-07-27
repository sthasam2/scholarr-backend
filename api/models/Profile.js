const User = require("./User");
const mongoose = require("mongoose");

const Profile = mongoose.Schema({
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: User,
	},
	firstName: {
		type: String,
		required: true,
		maxlength: 100,
	},
	middleName: {
		type: String,
		required: false,
		maxlength: 100,
	},
	lastName: {
		type: String,
		required: true,
		maxlength: 100,
	},
	bio: {
		type: String,
		maxlength: 1000,
		required: false,
	},
	dateOfBirth: {
		type: Date,
	},
});

module.exports = model("Profile", Profile);

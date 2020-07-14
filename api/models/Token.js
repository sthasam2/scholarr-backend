const mongoose = require("mongoose");
const User = require("./User");
const { string } = require("joi");

const tokenSchema = mongoose.Schema({
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: User,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 3600,
	},
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;

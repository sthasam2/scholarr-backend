const mongoose = require("mongoose");
const User = require("./User");

const todoSchema = mongoose.Schema({
	_userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	deadlineDate: {
		type: Date,
		default: null,
	},
	responsible: {
		type: String,
	},
	priority: {
		type: String,
	},
	completed: {
		type: Boolean,
	},
});

module.exports = mongoose.model("Todo", todoSchema);

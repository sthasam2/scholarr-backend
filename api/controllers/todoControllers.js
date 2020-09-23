const { createTodoValidation, updateTodoValidation } = require("../middleware/validation");

const Todo = require("../models/Todo");
const User = require("../models/User");

const { nonExistenceError, validationError } = require("../utils/errorMessages");

////////////////////////////////////////////////////////////////////////////////////////////////////
////////                         			! TODO methods			                              ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
////////                         		? READ 			                              ////////////
//////////////////////////////////////////////////////////////////////////////////////////

module.exports.get_todos_get = async (req, res) => {
	try {
		//check user
		const reqUser = req.user;

		let todoList = [];
		for (let doc of reqUser.todos) {
			let a = doc.toString();
			todoList.push(doc.toString());
		}

		let todos = await Todo.find({ _id: { $in: todoList } });
		if (!todos) throw nonExistenceError("todo");

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Accepted!",
				message: "Requested Todo Document Found!",
				todo: todos,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		res.status(400).send(err);
	}
};

module.exports.get_todo_detail_get = async (req, res) => {
	try {
		//check user
		const reqUser = req.user;

		const todoFound = (await Todo.findOne({ _id: req.params.todoId })).toJSON();
		if (!todoFound) throw nonExistenceError("todo");

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Accepted!",
				message: "Requested Todo Document Found!",
				todo: todoFound,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                         		? CREATE		                              ////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * @method POST @body {"description*": ,"deadlineDate": ,"responsible": ,"priority": "conpleted": 
}
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create_todo_post = async (req, res) => {
	try {
		const { error } = await createTodoValidation(req.body);
		if (error) throw validationError(error);

		const reqUser = req.user;

		const todo = new Todo(req.body);
		const savedTodo = await todo.save();

		//update user
		await User.updateOne({ _id: reqUser._id }, { $push: { todos: savedTodo._id } });

		return res.status(201).send({
			success: {
				status: 201,
				type: "Request Accepted!",
				message: "Todo Document Created!",
				todo: savedTodo,
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                         		? UPDATE		                              ////////////
//////////////////////////////////////////////////////////////////////////////////////////

module.exports.update_todo_patch = async (req, res) => {
	try {
		//check req.body
		const { error } = await updateTodoValidation(req.body);
		if (error) throw validationError(error);

		//check user
		const reqUser = req.user;

		// find todo
		const todoToUpdate = (await Todo.findOne({ _id: req.params.todoId })).toJSON();
		if (!todoToUpdate) throw nonExistenceError("todo");

		let updateQuery = { $set: {} };

		for (let key in req.body) {
			if (todoToUpdate[key] === null) updateQuery.$set[key] = req.body[key];
			else if (todoToUpdate[key] && todoToUpdate[key] !== req.body[key])
				updateQuery.$set[key] = req.body[key];
		}

		await Todo.updateOne({ _id: todoToUpdate._id }, updateQuery);

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Accepted!",
				message: "Todo Document Updated Successfully!",
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		res.status(400).send(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
////////                         		? DELETE		                              ////////////
//////////////////////////////////////////////////////////////////////////////////////////

module.exports.delete_todo_delete = async (req, res) => {
	try {
		//check user
		const reqUser = req.user;

		// find todo
		const todoToDelete = await Todo.findOne({ _id: req.params.todoId });
		if (!todoToDelete) throw nonExistenceError("todo");

		await Todo.deleteOne({ _id: todoToDelete._id });

		//update user
		await User.updateOne({ _id: reqUser._id }, { $pull: { todos: todoToDelete._id } });

		return res.status(200).send({
			success: {
				status: 200,
				type: "Request Accepted!",
				message: "Todo Document Deleted Successfully!",
			},
		});
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.error(err);
		res.status(400).send(err);
	}
};

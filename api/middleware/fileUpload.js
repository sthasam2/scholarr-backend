const multer = require("multer");
const path = require("path");
const fs = require("fs");

//////////////////////////////////////////////////////////////////////////////////////////////////
////////                            ! USER PROFILE                                     ////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ### User Storage
 *
 * Destination: `./public/upload/users/${userId}`
 */
const userStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		let userId = req.user._id.toString();
		let directory = `./public/upload/users/${userId}`;

		let checkDirectory = `${process.cwd()}/public/upload/users/${userId}`;
		if (!fs.existsSync(checkDirectory)) {
			fs.mkdirSync(checkDirectory, { recursive: true });
		}
		cb(null, directory);
	},
	filename: function (req, file, cb) {
		let name = req.user.username + "-" + file.fieldname + "-" + Date.now();
		let extension = path.extname(file.originalname);

		cb(null, name + extension);
	},
});

/**
 * ### File Filtering for User Profile Images
 */
const fileFilter = function fileFilter(req, file, cb) {
	try {
		const ext = path.extname(file.originalname);
		if (ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".gif") {
			throw {
				error: {
					status: 400,
					type: "mimetype error",
					message: "Only images are allowed",
				},
			};
		}
		// return no error if image
		return cb(null, true);
	} catch (err) {
		if (process.env.NODE_ENV === "dev") console.log(err);
		return cb(null, false);
	}
};

/**
 * ### Multer Middleware for Profile Images Upload
 *
 * Destination: `public/upload/users/userId`
 */
module.exports.imagesUpload = multer({
	storage: userStorage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
}).fields([
	{ name: "avatar", maxCount: 1 },
	{ name: "cover", maxCount: 1 },
]);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////                          ! ATTACHMENTS                                     ////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * classorkStorage
 */
const classworkStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		let classroomId = req.locals.classroom._id.toString();
		let directory = `./public/upload/classrooms/${classroomId}/classworks`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}
		cb(null, directory);
	},
	filename: function (req, file, cb) {
		let extension = path.extname(file.originalname);
		let originalName = path.basename(file.originalname, extension);

		let name = file.fieldname + "-" + originalName + "-" + Date.now();
		cb(null, name + extension);
	},
});

/** ### Multer Middleware for Submisson Attachments
 *
 * Destination: `./public/upload/classrooms/${classroomId}/classwork`
 *
 * Limits: {
 *     filesize: 20MB,
 *     filequantity: 6
 * }
 *
 * NOTE: Use after either classroomOwnerVerify or classMemberVerify middlewares
 */
module.exports.attachmentsUpload = multer({
	storage: classworkStorage,
	limits: {
		fileSize: 1024 * 1024 * 20,
	},
}).array("attachments", 6);

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////                          ! SUBMISSION                                     ////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * submissionStorage
 */
const submissionStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		let classroomId = req.locals.classroom._id.toString();
		let directory = `./public/upload/classrooms/${classroomId}/submissions`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}
		cb(null, directory);
	},
	filename: function (req, file, cb) {
		let extension = path.extname(file.originalname);
		let originalName = path.basename(file.originalname, extension);

		let name = file.fieldname + "-" + originalName + "-" + Date.now();
		cb(null, name + extension);
	},
});

/**
 * ### Multer Middleware for Attachments
 *
 * Destination: `./public/upload/classrooms/${classroomId}/classwork`
 *
 * Limits: {
 *     filesize: 20MB,
 *     filequantity: 3
 * }
 *
 * **NOTE: Use after either classroomOwnerVerify or classMemberVerify middlewares**
 */
module.exports.submissionUpload = multer({
	storage: submissionStorage,
	limits: {
		fileSize: 1024 * 1024 * 20,
	},
}).array("submissions", 3);

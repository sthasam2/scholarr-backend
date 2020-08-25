/**
 * Error template for all general errors
 *
 * @param {number} status
 * @param {string} type
 * @param {string} message
 * @returns {object}
 * ```javascript
 * {
 * 	error: { status: status, type: "type", message: "message" }
 * }
 * ```
 */
module.exports.errorMessage = (status, type, message) => {
	return {
		error: {
			status: status,
			type: type,
			message: message,
		},
	};
};

/**
 * Error template for Non-existence
 *
 * @param {string} entity reference entity which is to be defined
 * @returns {object}
 * ```javascript
 * {
 * 	error: { status:404, type:"Non-existence", message:"Requested `entity` does not exist." }
 * }
 * ```
 */
module.exports.nonExistenceError = (entity) => {
	return {
		error: {
			status: 404,
			type: "Non-existence",
			message: `Requested ${entity} does not exist.`,
		},
	};
};

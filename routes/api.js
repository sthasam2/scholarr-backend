const apiRouter = require("express").Router();

/** Auth router */
const authRouter = require("express").Router();
apiRouter.use("/auth", authRouter); // authRouter url: {url}/api/auth

module.exports = apiRouter; // default module for "api.js" file

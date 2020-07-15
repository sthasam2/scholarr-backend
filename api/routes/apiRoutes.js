/** API router. path: {url}/api */
const apiRouter = require("express").Router();
const userRouter = require("./userRoutes");

const apiController = require("../controllers/apiControllers");

apiRouter.get("/", apiController.api_get);

apiRouter.use("/user", userRouter);

module.exports = apiRouter; // exported module for "api.js" file

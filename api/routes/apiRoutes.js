/** API router. path: `/api` */
const apiRouter = require("express").Router();
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const classroomRouter = require("./classroomRoutes");

const apiController = require("../controllers/apiControllers");

//
//
// Router request methods
apiRouter.get("/", apiController.api_get);

//
//
// apiRouter extension routes
apiRouter.use("/auth", authRouter); // extends to `api/auth`
apiRouter.use("/users", userRouter); // extends to `api/users`
apiRouter.use("/classrooms", classroomRouter); // extends to `api/classrooms`

module.exports = apiRouter; // exported module for "apiRoute.js" file

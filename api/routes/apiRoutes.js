/** API router. path: `/api/` */
const apiRouter = require("express").Router();
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const classroomRouter = require("./classroomRoutes");

const apiController = require("../controllers/apiControllers");
const classworkRouter = require("./classworkRoutes");
const todoRouter = require("./todoRoutes");

////////////////////////////////////////////////////////////////////////////////////////////////////
////////                         			! API ROUTES				                              ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
////////                         		? READ 			                              ////////////
//////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
////////                  		* API                       	    ////////////
////////////////////////////////////////////////////////////////////////////

apiRouter.get("/", apiController.api_get);

////////////////////////////////////////////////////////////////////////////////////////////////////
////////                         		! API ROUTES extensions                              ////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

apiRouter.use("/auth", authRouter); // extends to `api/auth`
apiRouter.use("/users", userRouter); // extends to `api/users`
apiRouter.use("/classrooms", classroomRouter); // extends to `api/classrooms`
apiRouter.use("/classrooms/cw", classworkRouter); //extends to `api/classrooms/cw/`
apiRouter.use("/users/todo", todoRouter); //extends to `api/users/:userId`
module.exports = apiRouter; // exported module for "apiRoute.js" file

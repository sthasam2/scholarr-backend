// MODULE IMPORTS --------------------------------------------------------------------------------------------------------------------

/** Express framework module.*/
const express = require("express");
/** Mongoose module for integrating MongoDB. */
const mongoose = require("mongoose");
/** Dotenv module for managing environment variable. */
const dotenv = require("dotenv");
/** Morgan module for logging API request objects. */
const morgan = require("morgan");
/** CORS module for cross origin resource sharing i.e. between different ports in same ip. */
const cors = require("cors");

// MODULE IMPLEMENTATIONS --------------------------------------------------------------------------------------------------------------------

/** Enabling dotenv module confugurations. It loads all the .env files into process.env configuration. */
dotenv.config();

/** MongoDB connenction using mongoose*/
mongoose.connect(
  process.env.DB_CONNECT, // database connect key
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, // options
  () => console.log("Connected to MongoDB") // callback
);

/** App instance created using express. */
const app = express();
app.use(express.json()); // Middleware for parsing requests into JSON format and store in req.body
app.use(morgan("dev")); // Logger for requests
app.use(cors()); // Cross origin enabler

/** Module for API route handling. */
const apiRouter = require("./api/routes/apiRoutes");
app.use("/api", apiRouter); // (@param1: route, @param2 handler)

// SERVER IMPLEMENTATIONS --------------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || process.argv[2] || 4000;
// Value is either 1. from env variable, 2. from runserver script i.e. nodemon[0] index.js[1] 8888[2] or, 3.hardcoded 4000

/** Server listener */
app.listen(PORT, () => console.log(`Server running at ${PORT}.`));

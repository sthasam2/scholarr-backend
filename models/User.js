const mongoose = require("mongoose");

// USER SCHEMA --------------------------------------------------------------------------------------------------------------------

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        trim: true,
    },
    email: { type: String, required: true, minlength: 6 },
    password: { type: String, required: true, max: 1024, minlength: 6 },
    date: { type: Date, default: Date.now },
});
/*
  The code above creates a new instance of Schema as userSchema.
  This schema has the attributes of the user collection and their types along with other properties.
*/

// USER CREATION IN DATABASE --------------------------------------------------------------------------------------------------------------------
const User = mongoose.model("User", userSchema); // creates a new model based on userSchema named as User

module.exports = User; // exporting the User model

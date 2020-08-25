const mongoose = require("mongoose");
const dotenv = require("dotenv");

/** MongoDB connenction using mongoose*/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_CONNECT, // Mongodb uri connection key
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      } // options since some features were deprecated
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;

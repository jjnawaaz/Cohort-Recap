const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
const connectDB = () =>
  mongoose
    .connect(mongoURI, {
      dbName: "TestDB",
    })
    .then(() => console.log("MongoDB Connected"));

module.exports = connectDB;

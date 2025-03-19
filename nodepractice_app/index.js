const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const connectDB = require("./db/util");
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;

//connect db
connectDB();
// Get
app.get("/", (req, res) => {
  res.send("Hi There");
});

// App Started
app.listen(PORT, () => {
  console.log("Server Started");
});

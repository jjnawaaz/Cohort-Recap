const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, requried: true },
});

const USERS = mongoose.model("User", userSchema);
module.exports = USERS;

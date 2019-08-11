const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Name: String,
  PermanentAddress: String,
  EmailAddress: String,
  MailingAddress: String,
  YourDateOfBirth: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// console.log(process.env.MONGO_URL); // Access the MongoDB URI

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};

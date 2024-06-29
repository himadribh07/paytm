const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:fXrcBXsIvkGNKpe6@cluster0.cwamcfx.mongodb.net/paytm"
  )
  .then(() => console.log("Connected!"));

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

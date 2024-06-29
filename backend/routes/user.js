const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("..config");
const { User } = require("../db");
const user = express.Router();

//Signup
const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
user.post("/signup", async (req, res) => {
  const success = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser._id) {
    return res.status(411).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

//SignIn
const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

user.post("/signin", async (req, res) => {
  const success = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
});

const userAlreadyExists = await User.findOne({
  username: req.body.username,
  password: req.body.password,
});
if (userAlreadyExists) {
  const token = jwt.sign(
    {
      userId: userAlreadyExists._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "Login Successfull",
    token: token,
  });
  return;
}
res.status(411).json({
  message: "Error while logging in",
});

module.exports = user;

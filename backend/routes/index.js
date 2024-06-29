const express = require("express");
const userRouter = require("./user");
const router = express.Router();

router.get("/user", userRouter, (req, res, next) => {
  console.log("Router workking");
  res.end();
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");

router.post(
  "/signup",
  [
    check("username", "Please enter a valid username").notEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.signup
);

router.post(
  "/signin",
  [
    check("username", "Please enter a valid username").notEmpty(),
    check("password", "Password is required").exists(),
  ],
  userController.signin
);

module.exports = router;

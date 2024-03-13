const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const CatchError = require("../Middlewares/CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const User = require("../Models/user");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

router.route("/signup").post(
  CatchError(async (req, res, next) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      passwordChangedAt,
      admin,
    } = req.body;

    const user = new User({
      username,
      email,
      password,
      confirmPassword,
      admin,
      passwordChangedAt,
    });

    const newUser = await User.create(user);
    console.log(newUser);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: newUser,
    });
  })
);

router.route("/login").post(
  CatchError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    // To check if email and password is exist
    if (!email || !password) {
      throw new ErrorHandler("Please provide email and Passowrd", 404);
    }

    // To check if the email and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ErrorHandler("Incorrect email", 401);
    }
    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      throw new ErrorHandler("Incorrect passowrd", 401);
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,
      admin: user?.admin,
    });
  })
);

router.route("/").get(
  CatchError(async (req, res, next) => {
    const users = await User.find();

    if (!users) {
      throw new ErrorHandler("User is not exist", 404);
    }

    res.status(200).json({
      status: "success",
      data: users,
    });
  })
);

module.exports = router;

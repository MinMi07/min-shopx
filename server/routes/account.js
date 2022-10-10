const argon2 = require("argon2");
const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const User = require("../models/Users");

// @route GET api/admin/account
// @desc get account
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      message: "Get acounts successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/admin/acount
// @desc create acount
// @access Private

router.post("/add", verifyToken, async (req, res) => {
  const { username, password, level, fullName, phoneNumber, address } =
    req.body;

  // Simple validation
  if (!username)
    return res.status(400).json({ success: false, message: "Id is username" });
  if (
    username == "" ||
    password == "" ||
    fullName == "" ||
    phoneNumber == "" ||
    address == ""
  ) {
    return res
      .status(500)
      .json({ success: false, message: "Các trường không được bỏ trống" });
  }

  try {
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already" });
    // All good
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      level,
      fullName,
      phoneNumber,
      address,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Add successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/user
// @desc update user
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const {
    username,
    password,
    confirmPassword,
    level,
    fullName,
    phoneNumber,
    address,
  } = req.body;

  // Simple validation
  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "username is require" });
  if (
    username == "" ||
    password == "" ||
    fullName == "" ||
    phoneNumber == "" ||
    address == ""
  ) {
    return res
      .status(500)
      .json({ success: false, message: "Các trường không được bỏ trống" });
  }

  try {
    const hashedPassword = await argon2.hash(password);

    let updateUser = {
      username,
      password: hashedPassword,
      level,
      fullName,
      phoneNumber,
      address,
    };

    const userUpdateCondition = { _id: req.params.id, user: req.userId };

    updateUser = await User.findByIdAndUpdate(userUpdateCondition, updateUser, {
      new: true,
    });

    if (!updateUser)
      return res.status(401).json({
        success: false,
        message: "User not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update user successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/user
// @desc delete user
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id };
    const deleteUser = await User.findByIdAndDelete(userDeleteCondition);
    console.log("deleteUser", deleteUser);

    if (!deleteUser)
      return res.status(401).json({
        success: false,
        message: "User not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Excellent progress",
      user: deleteUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

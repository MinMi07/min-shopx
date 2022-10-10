const argon2 = require("argon2");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const verifyToken = require("../middleware/auth");
// @route GET api/auth
// @desc check if user is logged in
// @access Public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public

router.post("/register", async (req, res) => {
  // const regex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;
  const {
    username,
    password,
    fullName = null,
    phoneNumber = null,
    address = null,
  } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "Missing password length greater than six letters",
    });

  try {
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      level: null,
      fullName,
      phoneNumber,
      address,
    });
    console.log(newUser);
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Register user
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    // All good
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorect username or password" });

    // All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      level: user.level || null,
      message: "User log in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

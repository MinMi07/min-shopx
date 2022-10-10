const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");

const Post = require("../models/Post");

// @route GET api/posts
// @desc get post
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const post = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);

    res
      .status(200)
      .json({ success: true, message: "Get posts successfully", post: post });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .jsonjson({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc create post
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { title, decription, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    const newPost = new Post({
      title,
      decription,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();
    res
      .status(200)
      .json({ success: true, message: "Posted successfully", post: newPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .jsonjson({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc update post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, decription, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    let updatePost = {
      title,
      decription: decription || "",
      url: (url.startsWith("http://") ? url : `http://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatePost = await Post.findByIdAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    if (!updatePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update post successfully",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .jsonjson({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc delete post
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findByIdAndDelete(postDeleteCondition);

    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Excellent progress",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .jsonjson({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

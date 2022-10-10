const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Blog = require("../models/Blog");

// @route GET api/admin/blog
// @desc get blog
// @access Private

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res
      .status(200)
      .json({ success: true, message: "Get blogs successfully", blog: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route Blog api/admin/blog
// @desc create blog
// @access Private

router.post("/add", upload.single("image"), async (req, res) => {
  const { id, title, description, image } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result", result);
    const newBlog = new Blog({
      id,
      title,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      description,
      user: req.userId,
    });

    await newBlog.save();
    res.status(200).json({
      success: true,
      message: "Blog post successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/blog
// @desc update blog
// @access Private

router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  const { id, title, description, image } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    let blog = await Blog.findById(req.params.id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    let updateBlog = {
      id,
      title,
      image: result?.secure_url || blog.image,
      cloudinary_id: result?.public_id || blog.cloudinary_id,
      description: description || "",
    };

    console.log(updateBlog);

    const blogUpdateCondition = { _id: req.params.id, user: req.userId };
    updateBlog = await Blog.findByIdAndUpdate(blogUpdateCondition, updateBlog, {
      new: true,
    });

    if (!updateBlog)
      return res.status(401).json({
        success: false,
        message: "Blog not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update blog successfully",
      blog: updateBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/blog
// @desc delete blog
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // Find blog by id
    let blog = await Blog.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(blog.cloudinary_id);

    // Delete user from db
    const blogDeleteCondition = { _id: req.params.id, user: req.userId };
    const deleteBlog = await Blog.findByIdAndDelete(blogDeleteCondition);

    if (!deleteBlog)
      return res.status(401).json({
        success: false,
        message: "Blog not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Excellent progress",
      post: deleteBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

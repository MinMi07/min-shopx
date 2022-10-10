const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const Category = require("../models/Category");

// @route GET api/admin/category
// @desc get category
// @access Private

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      success: true,
      message: "Get category successfully",
      category: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/admin/category
// @desc create category
// @access Private

router.post("/add", verifyToken, async (req, res) => {
  const { id, title } = req.body;

  console.log(id, title);

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    const newCategory = new Category({
      id,
      title,
      user: req.userId,
    });
    await newCategory.save();
    res.status(200).json({
      success: true,
      message: "Add successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/category
// @desc update category
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { id, title } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is require" });

  try {
    let updateCategory = {
      id,
      title,
    };

    const categoryUpdateCondition = { _id: req.params.id, user: req.userId };

    updateCategory = await Category.findByIdAndUpdate(
      categoryUpdateCondition,
      updateCategory,
      {
        new: true,
      }
    );

    if (!updateCategory)
      return res.status(401).json({
        success: false,
        message: "Category not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update category successfully",
      category: updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/category
// @desc delete category
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const categoryDeleteCondition = { _id: req.params.id, user: req.userId };
    const deleteCategory = await Category.findByIdAndDelete(
      categoryDeleteCondition
    );
    console.log(deleteCategory);

    if (!deleteCategory)
      return res.status(401).json({
        success: false,
        message: "Category not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Excellent progress",
      category: deleteCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

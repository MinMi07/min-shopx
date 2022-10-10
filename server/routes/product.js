const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Product = require("../models/Product");

// @route GET api/admin/product
// @desc get product
// @access Private

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      message: "Get products successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route product api/admin/product
// @desc create product
// @access Private

router.post("/add", upload.single("image"), async (req, res) => {
  const { id, name, image, priceOld, price, description, categorySelect } =
    req.body;

  // Simple validation
  if (!id)
    return res.status(400).json({ success: false, message: "Id is require" });

  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result", result);
    const newProduct = new Product({
      id,
      name,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      priceOld,
      price,
      description,
      category: categorySelect,
      user: req.userId,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product post successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/product
// @desc update product
// @access Private

router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  const { id, name, image, priceOld, price, description, categorySelect } =
    req.body;

  // Simple validation
  if (!id)
    return res.status(400).json({ success: false, message: "id is require" });

  try {
    let product = await Product.findById(req.params.id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    let updateProduct = {
      id,
      name,
      image: result?.secure_url || product.image,
      cloudinary_id: result?.public_id || product.cloudinary_id,
      priceOld,
      price,
      description: description || "",
      category: categorySelect,
      user: req.userId,
    };

    console.log(updateProduct);

    const productUpdateCondition = { _id: req.params.id, user: req.userId };
    updateProduct = await Product.findByIdAndUpdate(
      productUpdateCondition,
      updateProduct,
      {
        new: true,
      }
    );

    if (!updateProduct)
      return res.status(401).json({
        success: false,
        message: "Product not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update Product successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/product
// @desc delete product
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // Find product by id
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);

    // Delete user from db
    const productDeleteCondition = { _id: req.params.id, user: req.userId };
    const deleteProduct = await Product.findByIdAndDelete(
      productDeleteCondition
    );

    if (!deleteProduct)
      return res.status(401).json({
        success: false,
        message: "Product not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Excellent progress",
      post: deleteProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

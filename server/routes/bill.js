const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const Bill = require("../models/Bill");

// @route GET api/admin/bill
// @desc get bill
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const bill = await Bill.find();

    res.status(200).json({
      success: true,
      message: "Get bills successfully",
      bill: bill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/admin/bill
// @desc create bill
// @access Private

router.post("/add", verifyToken, async (req, res) => {
  const {
    id,
    phoneUser,
    nameProduct,
    amount,
    priceBuy,
    totalPrice,
    addressShip,
    stateBill,
  } = req.body;

  // Simple validation
  if (!id)
    return res.status(400).json({ success: false, message: "Id is require" });
  if (
    id == "" ||
    phoneUser == "" ||
    nameProduct == "" ||
    amount == "" ||
    priceBuy == "" ||
    addressShip == "" ||
    stateBill == ""
  ) {
    return res
      .status(500)
      .json({ success: false, message: "Các trường không được bỏ trống" });
  }

  try {
    const newBill = new Bill({
      id,
      phoneUser,
      nameProduct,
      amount,
      priceBuy,
      totalPrice: amount * priceBuy,
      addressShip,
      stateBill,
      user: req.userId,
    });
    await newBill.save();
    res.status(200).json({
      success: true,
      message: "Add successfully",
      bill: newBill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/home/detail/:id
// @desc create bill
// @access Private

router.post("/detail/:id", verifyToken, async (req, res) => {
  const {
    id,
    phoneUser,
    nameProduct,
    amount,
    priceBuy,
    totalPrice,
    addressShip,
    stateBill,
  } = req.body;

  // Simple validation
  if (!id)
    return res.status(400).json({ success: false, message: "Id is require" });
  if (
    id == "" ||
    phoneUser == "" ||
    nameProduct == "" ||
    amount == "" ||
    priceBuy == "" ||
    addressShip == "" ||
    stateBill == ""
  ) {
    return res
      .status(500)
      .json({ success: false, message: "Các trường không được bỏ trống" });
  }

  try {
    const newBill = new Bill({
      id,
      phoneUser,
      nameProduct,
      amount,
      priceBuy,
      totalPrice: amount * priceBuy,
      addressShip,
      stateBill,
      user: req.userId,
    });

    await newBill.save();
    res.status(200).json({
      success: true,
      message: "Add successfully",
      bill: newBill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/admin/bill
// @desc update bill
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const {
    id,
    phoneUser,
    nameProduct,
    amount,
    priceBuy,
    totalPrice,
    addressShip,
    stateBill,
  } = req.body;

  // Simple validation
  if (!id)
    return res.status(400).json({ success: false, message: "id is require" });

  try {
    let updateBill = {
      id,
      phoneUser,
      nameProduct,
      amount,
      priceBuy,
      totalPrice,
      addressShip,
      stateBill,
    };

    const billUpdateCondition = { _id: req.params.id, user: req.userId };

    updateBill = await Bill.findByIdAndUpdate(billUpdateCondition, updateBill, {
      new: true,
    });

    if (!updateBill)
      return res.status(401).json({
        success: false,
        message: "Bill not found or user not authorised",
      });
    res.status(200).json({
      success: true,
      message: "Update bill successfully",
      bill: updateBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/admin/bill
// @desc delete bill
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const billDeleteCondition = { _id: req.params.id, user: req.userId };
    const deleteBill = await Bill.findByIdAndDelete(billDeleteCondition);

    if (!deleteBill)
      return res.status(401).json({
        success: false,
        message: "Bill not found or user not authorised",
      });

    res.status(200).json({
      success: true,
      message: "Excellent progress",
      bill: deleteBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;

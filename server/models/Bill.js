const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  phoneUser: {
    type: String,
  },
  nameProduct: {
    type: String,
  },
  amount: {
    type: Number,
  },
  priceBuy: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  addressShip: {
    type: String,
  },
  stateBill: {
    type: String,
    enum: ["CART", "BOUGHT"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bills", billSchema);

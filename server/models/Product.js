const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  priceOld: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  // size: {
  //   type: Number,
  // },
  // color: {
  //   type: String,
  // },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categorys",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);

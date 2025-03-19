const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  ratings: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0 },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
});

const PRODUCTS = mongoose.model("Product", productSchema);

module.exports = PRODUCTS;

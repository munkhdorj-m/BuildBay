const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    number: { type: Number, required: true },
    description: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    city: { type: String },
    district: { type: String },
    address: { type: String, required: true },
    status: { type: String, default: "хүлээгдэж буй" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

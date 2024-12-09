import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  });

const cartSchema = new mongoose.Schema({
    products: [itemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "register",
  },
  total: {
    type: Number,
    default: 0,
  },
  __v: { type: Number, select: false },
},{timestamps:true})

export default mongoose.model("KarunaCart",cartSchema)
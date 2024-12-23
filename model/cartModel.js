import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "karunaProduct",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  });

  const kitSchema = mongoose.Schema({
    kitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "karunaKits",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  });

const cartSchema = new mongoose.Schema({
    products: [itemSchema],
    kits:[kitSchema],
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
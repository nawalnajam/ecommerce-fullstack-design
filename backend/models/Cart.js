import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        name: { type: String },
        image: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
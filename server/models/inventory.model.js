import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    stock: { type: Number, required: true },
    reservations: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;

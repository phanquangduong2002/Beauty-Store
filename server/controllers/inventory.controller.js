import mongoose from "mongoose";

import Inventory from "../models/inventory.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const addStockToInventory = async (req, res) => {
  const { productId, stock } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });

    const product = await Product.findById(productId).lean();
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    const query = { productId },
      updateSet = {
        $inc: {
          stock: stock,
        },
      },
      options = { upsert: true, new: true };

    const updateInventory = await Inventory.findOneAndUpdate(
      query,
      updateSet,
      options
    );

    res.status(200).json({
      success: true,
      message: "Add stock to inventory successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    const product = await Product.findById(productId);

    if (product) {
      res.status(200).json({
        success: true,
        product: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create review
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;

  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.userId.toString() === req.user.id.toString()
      );
      if (alreadyReviewed) {
        res.status(400).json({
          success: false,
          message: "Product already Reviewed",
        });
      } else {
        const user = await User.findById(req.user.id);
        const review = {
          name: user.name,
          rating: Number(rating),
          comment: comment,
          userId: user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        await product.save();

        res.status(201).json({
          success: true,
          message: "Reviewed added",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

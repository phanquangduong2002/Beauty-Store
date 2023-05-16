import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("parentCategory", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get product by id
export const getProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  try {
    const product = await Product.findById(productId)
      .populate("parentCategory", "name")
      .populate("subCategory", "name");

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

// Create product
export const createProduct = async (req, res) => {
  const { name, image, parentCategory, subCategory, description } = req.body;
  if (!name || !image || !description || !parentCategory || !subCategory)
    return res.status(400).json({
      success: false,
      message: "Missing product information",
    });

  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Only admin can create product",
      });

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(200).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Only admin can update product",
      });

    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateFields = {};

    for (const field in req.body) {
      if (req.body[field]) {
        updateFields[field] = req.body[field];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete product

export const deleteProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Only admin can update product",
      });

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete product successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

// Delete review

export const deleteReview = async (req, res) => {
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
      const alreadyReviewed = product.reviews.find(
        (r) => r.userId.toString() === req.user.id.toString()
      );
      if (!alreadyReviewed) {
        res.status(400).json({
          success: false,
          message: "The product has not been rated yet",
        });
      } else {
        const index = product.reviews.findIndex(
          (item) => item.userId.toString() === req.user.id
        );

        product.reviews.splice(index, 1);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        await product.save();

        res.status(201).json({
          success: true,
          message: "Reviewed deleted",
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

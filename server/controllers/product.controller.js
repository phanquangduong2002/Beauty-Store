import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Inventory from "../models/inventory.model.js";
import Review from "../models/review.model.js";

import getSelectData from "../utils/getInfoData.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).lean();

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
    const product = await Product.findById(productId).lean();

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

// Find Product

export const findAllProducts = async (req, res) => {
  const {
    limit = 50,
    sort = "ctime",
    page = 1,
    select = [
      "_id",
      "name",
      "thumb",
      "price",
      "rating",
      "numReviews",
      "qtySold",
    ],
    category = "",
  } = req.query;

  const skip = (page - 1) * limit;

  let sortBy;

  if (sort === "ctime") sortBy = { _id: -1 };
  if (sort === "qtySold") sortBy = { qtySold: -1 };
  if (sort === "rating") sortBy = { rating: -1 };

  const query = category ? { category } : {};

  try {
    const products = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(getSelectData(select))
      .lean();

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, thumb, price, category, qty, attributes } = req.body;
  if (!name || !thumb || !price || !qty || !category || !attributes)
    return res.status(400).json({
      success: false,
      message: "Missing product information",
    });

  try {
    const user = await User.findById(req.user.id).lean();

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });

    const newProduct = await Product.create(req.body);

    if (newProduct) {
      await Inventory.create({
        productId: newProduct._id,
        stock: req.body.qty,
      });

      await Review.create({ productId: newProduct._id });
    }

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
        message: "Unauthorized access",
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
        message: "Unauthorized access",
      });

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deletedReview = await Review.findOneAndDelete({
      productId: req.params.id,
    });
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

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const user = await User.findById(req.user.id).lean();
    const body = {
      name: user.name,
      rating: Number(rating),
      comment: comment,
      userId: user._id,
    };

    const review = await Review.findOne({ productId: req.params.id });

    const alreadyReviewed = review.reviews.find(
      (r) => r.userId.toString() === req.user.id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Product already Reviewed",
      });
    }

    review.reviews.push(body);

    await review.save();

    product.numReviews = review.reviews.length;
    product.rating =
      review.reviews.reduce((acc, item) => item.rating + acc, 0) /
      review.reviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Reviewed added",
    });
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

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = await Review.findOne({ productId: req.params.id });

    const alreadyReviewed = review.reviews.find(
      (r) => r.userId.toString() === req.user.id.toString()
    );

    if (!alreadyReviewed) {
      res.status(400).json({
        success: false,
        message: "The product has not been rated yet",
      });
    } else {
      const index = review.reviews.findIndex(
        (r) => r.userId.toString() === req.user.id.toString()
      );

      review.reviews.splice(index, 1);
      await review.save();

      product.numReviews = review.reviews.length;
      if (product.numReviews === 0) {
        product.rating = 0;
      } else {
        product.rating =
          review.reviews.reduce((acc, item) => item.rating + acc, 0) /
          review.reviews.length;
      }

      await product.save();

      res.status(201).json({
        success: true,
        message: "Reviewed deleted",
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

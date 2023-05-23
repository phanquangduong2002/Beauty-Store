import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Product from "../models/product.model";
import User from "../models/user.model.js";

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
    const product = await Product.findById(req.params.id).lean();

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const user = await User.findById(req.user.id).lean();
    const content = {
      name: user.name,
      rating: Number(rating),
      comment: comment,
      userId: user._id,
    };

    const review = await Review.find({ productId: req.params.id }).lean();

    if (!review) {
      await Review.create({
        productId,
        body: [content],
      });
    } else {
      const alreadyReviewed = review.body.find(
        (r) => r.userId.toString() === req.user.id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json({
          success: false,
          message: "Product already Reviewed",
        });
      }
      review.body.push(content);
    }

    const newReview = await Review.find({ productId: req.params.id }).lean();

    product.numReviews = newReview.body.length;
    product.rating =
      newReview.body.reduce((acc, item) => item.rating + acc, 0) /
      newReview.body.length;
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

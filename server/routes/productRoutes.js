import express from "express";

import {
  createProduct,
  updateProduct,
  createReview,
  deleteReview,
  getAllProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const productRoute = express.Router();

// Get all products
productRoute.get("/", getAllProducts);

// Get product by id
productRoute.get("/:id", getProduct);

// Create Product
productRoute.post("/", verifyToken, createProduct);

// Update Product
productRoute.put("/:id", verifyToken, updateProduct);

// Delete product
productRoute.delete("/:id", verifyToken, deleteProduct);

// Create review
productRoute.post("/:id/review", verifyToken, createReview);

// Delete review
productRoute.delete("/:id/review", verifyToken, deleteReview);

export default productRoute;

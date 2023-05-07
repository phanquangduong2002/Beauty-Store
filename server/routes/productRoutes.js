import express from "express";

import {
  createReview,
  getAllProducts,
  getProduct,
} from "../controllers/productControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const productRoute = express.Router();

// Get all products
productRoute.get("/", getAllProducts);

// Get product by id
productRoute.get("/:id", getProduct);

// Create review
productRoute.post("/:id/review", verifyToken, createReview);

export default productRoute;

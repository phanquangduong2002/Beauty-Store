import express from "express";

import { getAllProducts, getProduct } from "../controllers/productControllers.js";

const productRoute = express.Router();

// Get all products
productRoute.get("/", getAllProducts);

// Get product by id
productRoute.get("/:id", getProduct);

export default productRoute;

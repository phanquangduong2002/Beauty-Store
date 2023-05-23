import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { addToCart, getUserCart } from "../controllers/cart.controller.js";

const CartRoute = express.Router();

// Add product to cart

CartRoute.post("/", verifyToken, addToCart);

// Get user cart
CartRoute.get("/", verifyToken, getUserCart);

export default CartRoute;

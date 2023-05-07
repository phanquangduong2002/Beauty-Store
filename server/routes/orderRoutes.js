import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  createOrder,
  getOrder,
  getUserOrders,
  paymentOrder,
} from "../controllers/orderControllers.js";

const orderRoute = express.Router();

// Create order
orderRoute.post("/", verifyToken, createOrder);

// Get order by id
orderRoute.get("/:id", verifyToken, getOrder);

// Payment order
orderRoute.put("/:id/pay", verifyToken, paymentOrder);

// Get user orders
orderRoute.get("/", verifyToken, getUserOrders);

export default orderRoute;

import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  createOrder,
  deliveredOrder,
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

// Delivered
orderRoute.put("/:id/delivered", verifyToken, deliveredOrder);

// Get user orders
orderRoute.get("/", verifyToken, getUserOrders);

export default orderRoute;

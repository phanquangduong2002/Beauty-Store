import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";

import {
  checkoutReview,
  getAllOrdersByAdmin,
  orderByUser,
  updateOrderStatusByAdmin,
} from "../controllers/checkout.controller.js";

const checkoutRoute = express.Router();

// Checkout Review
checkoutRoute.post("/review", verifyToken, checkoutReview);

// Order By User
checkoutRoute.post("/order", verifyToken, orderByUser);

// Get All Order By Admin
checkoutRoute.get("/orders", verifyToken, getAllOrdersByAdmin);

// Get All Order By Admin
checkoutRoute.get("/orders", verifyToken, getAllOrdersByAdmin);

// update Order By Admin
checkoutRoute.put("/orders/:orderId", verifyToken, updateOrderStatusByAdmin);

export default checkoutRoute;

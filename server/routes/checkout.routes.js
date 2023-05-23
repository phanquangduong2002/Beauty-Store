import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";

import {
  checkoutReview,
  orderByUser,
} from "../controllers/checkout.controller.js";

const checkoutRoute = express.Router();

// Checkout Review
checkoutRoute.post("/review", verifyToken, checkoutReview);

// Order By User

checkoutRoute.post("/order", verifyToken, orderByUser);

export default checkoutRoute;

import express from "express";

import {
  createParentCategory,
  createSubCategory,
} from "../controllers/categoryControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const categoryRoute = express.Router();

// Create parent category
categoryRoute.post("/", verifyToken, createParentCategory);

// Create sub category
categoryRoute.post("/:id", verifyToken, createSubCategory);

export default categoryRoute;

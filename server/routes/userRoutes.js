import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { getUser, updateUser } from "../controllers/userControllers.js";
const userRoute = express.Router();

// Get user
userRoute.get("/:id", getUser);

// Update user
userRoute.put("/update/:id", verifyToken, updateUser);

export default userRoute;

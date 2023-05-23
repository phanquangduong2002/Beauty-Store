import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { getUser, updateUser } from "../controllers/user.controller.js";
const userRoute = express.Router();

// Get user
userRoute.get("/:id", getUser);

// Update user
userRoute.put("/:id/update", verifyToken, updateUser);

export default userRoute;

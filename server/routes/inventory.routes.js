import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { addStockToInventory } from "../controllers/inventory.controller.js";

const inventoryRoute = express.Router();

inventoryRoute.post("/", verifyToken, addStockToInventory);

export default inventoryRoute;

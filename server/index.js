import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/MongoDb.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/product.routes.js";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import CartRoute from "./routes/cart.routes.js";
import checkoutRoute from "./routes/checkout.routes.js";
import InventoryRoute from "./routes/inventory.routes.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/import", ImportData);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", CartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/inventory", InventoryRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

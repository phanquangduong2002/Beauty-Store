import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/MongoDb.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/productRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/import", ImportData);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

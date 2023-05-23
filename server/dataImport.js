import express from "express";

import User from "./models/user.model.js";
import users from "./data/users.js";

import Product from "./models/product.model.js";
import products from "./data/Products.js";

const ImportData = express.Router();

ImportData.post("/user", async (req, res) => {
  await User.deleteMany({});
  const importUser = await User.insertMany(users);
  res.send(importUser);
});

ImportData.post("/products", async (req, res) => {
  await Product.deleteMany({});
  const importProducts = await Product.insertMany(products);
  res.send(importProducts);
});

export default ImportData;

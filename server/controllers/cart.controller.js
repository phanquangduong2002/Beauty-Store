import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import Cart from "../models/cart.model.js";
import { updateProduct } from "./product.controller.js";

const createUserCart = async ({ userId, product }) => {
  const query = { userId },
    updateOrInsert = {
      $addToSet: {
        products: product,
      },
    },
    option = { upsert: true, new: true };

  return await Cart.findOneAndUpdate(query, updateOrInsert, option);
};

const updateUserCartQuantity = async ({ userId, product }) => {
  const { productId, quantity } = product;

  const query = { userId, "products.productId": productId },
    updateSet = {
      $inc: { "products.$.quantity": quantity },
    },
    option = { upsert: true, new: true };

  return await Cart.findOneAndUpdate(query, updateSet, option);
};

const deleteUserCart = async ({ userId, productId }) => {
  const query = { userId },
    updateSet = {
      $pull: {
        products: {
          productId,
        },
      },
    };

  return await Cart.updateOne(query, updateSet);
};

export const addToCart = async (req, res) => {
  const { userId, product } = req.body;

  const { productId, name, thumb, quantity, oldQuantity, price } = product;

  try {
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      const newCart = await createUserCart({ userId, product });

      return res.status(200).json({
        success: true,
        message: "Add to cart successfully!",
      });
    }

    if (!userCart.products.length) {
      userCart.products = [product];
      userCart.count_product += 1;
      await userCart.save();

      return res.status(200).json({
        success: true,
        message: "Add to cart successfully!",
      });
    }

    if (userCart.products.length > 0) {
      const productInCart = userCart.products.find(
        (p) => p.productId.toString() === productId.toString()
      );

      if (!productInCart) {
        userCart.products.push(product);
        userCart.count_product -= 1;
        await userCart.save();

        return res.status(200).json({
          success: true,
          message: "Add to cart successfully!",
        });
      } else {
        if (quantity === 0) {
          await deleteUserCart({ userId, productId });

          return res.status(200).json({
            success: true,
            message: "Remove to cart successfully!",
          });
        }

        const updateCart = await updateUserCartQuantity({
          userId,
          product: {
            productId,
            quantity: quantity - oldQuantity,
          },
        });

        return res.status(200).json({
          success: true,
          message: "Add to cart successfully!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).lean();

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

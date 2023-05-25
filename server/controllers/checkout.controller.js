import mongoose from "mongoose";

import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

import { acquireLock, releaseLock } from "../services/redis.service.js";
import { reservationInventory } from "../repositories/inventory.repo.js";
import { updateQtySoldProduct } from "../repositories/product.repo.js";

const deleteUserCart = async ({ userId, productId }) => {
  const query = { userId },
    updateSet = {
      $pull: {
        products: {
          productId,
        },
      },
      $inc: {
        count_product: -1,
      },
    };

  return await Cart.updateOne(query, updateSet);
};

const checkOutProductServer = async (product) => {
  const foundProduct = await Product.findById(product.productId);
  if (foundProduct) {
    return {
      price: foundProduct.price,
      quantity: product.quantity,
      productId: product.productId,
    };
  }
};

export const orderByUser = async (req, res) => {
  const {
    cartId,
    userId,
    newOrderIds,
    checkoutOrder,
    userAddress = {},
    userPayment = {},
  } = req.body;
  try {
    const products = newOrderIds.flatMap((order) => order.itemProduct);
    console.log(products);

    // const acquireProduct = [];
    // for (let i = 0; i < products.length; i++) {
    //   const { productId, quantity } = products[i];
    //   const keyLock = await acquireLock(productId, quantity, cartId);
    //   acquireProduct.push(keyLock ? true : false);
    //   if (keyLock) {
    //     await releaseLock(keyLock);
    //   }
    // }

    // if (acquireLock.includes(false)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "The product has been updated, please return to the cart",
    //   });
    // }
    const newOrder = await Order.create({
      userId,
      orderCheckout: checkoutOrder,
      orderShipping: userAddress,
      orderPayment: userPayment,
      orderProducts: newOrderIds,
    });

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const updateInventory = await reservationInventory({
        cartId,
        productId,
        quantity,
      });
    }

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const updateProduct = await updateQtySoldProduct({
        cartId,
        productId,
        quantity,
      });
    }

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const updateCart = await deleteUserCart({
        userId,
        productId,
      });
    }

    if (!newOrder)
      return res.status(400).json({
        success: false,
        message: "Order wrong!!!",
      });
    else
      return res.status(200).json({
        success: true,
        order: newOrder,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const checkoutReview = async (req, res) => {
  const { userId, cartId, orderIds, feeShip } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  try {
    const foundCart = await Cart.findById(cartId).lean();

    if (!foundCart)
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    const checkoutOrder = {
      totalPrice: 0,
      feeShip: feeShip ? feeShip : 0,
      totalCheckout: 0,
    };

    const newOrderIds = [];

    for (let i = 0; i < orderIds.length; i++) {
      const { itemProduct = {} } = orderIds[i];

      const checkProductServer = await checkOutProductServer(itemProduct);

      if (!checkProductServer)
        return res.status(400).json({
          success: false,
          message: "Order wrong!!!",
        });

      const checkoutPrice =
        checkProductServer.price * checkProductServer.quantity;

      const itemCheckout = {
        checkoutPrice,
        itemProduct: checkProductServer,
      };

      checkoutOrder.totalPrice += checkoutPrice;

      checkoutOrder.totalCheckout += itemCheckout.checkoutPrice;
      newOrderIds.push(itemCheckout);
    }

    checkoutOrder.totalCheckout += checkoutOrder.feeShip;

    return res.status(200).json({
      success: true,
      data: {
        newOrderIds,
        checkoutOrder,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOrdersByUser = async (req, res) => {};

export const getOneOrderByUser = async (req, res) => {};

export const getAllOrdersByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(403).json({
        success: false,
        menubar: "You are not admin",
      });

    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateOrderStatusByAdmin = async (req, res) => {
  const { orderStatus } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(403).json({
        success: false,
        menubar: "You are not admin",
      });
    const order = await Order.findById(req.params.orderId);
    console.log(order);
    order.orderStatus = orderStatus;
    await order.save();

    res.status(201).json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

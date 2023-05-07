import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create order
export const createOrder = async (req, res) => {
  const {
    userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No order items",
    });
  }

  try {
    const order = new Order({
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json({
      success: true,
      order: createOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get order by id
export const getOrder = async (req, res) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      sucess: false,
      message: "Order not found",
    });
  }
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (order) {
      res.status(200).json({
        success: true,
        order: order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Payment order
export const paymentOrder = async (req, res) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (!order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
        };

        const updateOrder = await order.save();
        await Promise.all(
          order.orderItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            product.qtySold = product.qtySold + item.qty;
            product.countInStock = product.countInStock - item.qty;
            await product.save();
          })
        );

        res.status(201).json({
          success: true,
          order: updateOrder,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Order has been paid!",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ _id: -1 });

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

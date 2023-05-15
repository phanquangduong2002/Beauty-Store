import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Create order or add product to order
export const createOrder = async (req, res) => {
  const { userId, orderItem } = req.body;

  if (!orderItem) {
    return res.status(400).json({
      success: false,
      message: "No order item",
    });
  }

  try {
    const order = await Order.findOne({ userId });
    if (!order) {
      const Neworder = new Order({
        userId,
        orderItems: [orderItem],
      });

      const createOrder = await Neworder.save();

      res.status(201).json({
        success: true,
        order: createOrder,
      });
    } else {
      // Check if the product already exists in orderItems
      const index = order.orderItems.findIndex(
        (item) =>
          item.orderItem.productId.toString() === orderItem.orderItem.productId
      );

      if (index !== -1) {
        // Product already exists in orderItems
        order.orderItems[index] = orderItem;
      } else {
        // Product doesn't exist in orderItems
        order.orderItems.push(orderItem);
      }

      const updateOrder = await order.save();

      res.status(201).json({
        success: true,
        order: updateOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove product from order

export const removeProduct = async (req, res) => {
  const orderId = req.params.id;

  const productId = req.body.productId;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      sucess: false,
      message: "Order not found",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).json({
      success: false,
      message: `Product not found`,
    });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        sucess: false,
        message: "Order not found",
      });

    const index = order.orderItems.findIndex(
      (item) => item.orderItem.productId.toString() === productId
    );

    if (index !== -1) {
      order.orderItems.splice(index, 1);

      const updateOrder = await order.save();

      res.status(201).json({
        success: true,
        order: updateOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
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

  const productId = req.body.productId;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        sucess: false,
        message: "Order not found",
      });

    const index = order.orderItems.findIndex(
      (item) => item.orderItem.productId.toString() === productId
    );

    if (!order.orderItems[index].isPaid) {
      order.orderItems[index].isPaid = true;
      order.orderItems[index].paidAt = Date.now();

      order.orderItems[index].paymentResult = req.body.paymentResult;
      order.orderItems[index].shippingAddress = req.body.shippingAddress;

      const updateOrder = await order.save();

      await Promise.all(
        order.orderItems.map(async (item) => {
          const product = await Product.findById(productId);
          product.qtySold = product.qtySold + item.orderItem.qty;
          product.countInStock = product.countInStock - item.orderItem.qty;
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delivered

export const deliveredOrder = async (req, res) => {
  const orderId = req.params.id;

  const productId = req.body.productId;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Only admin can edit",
      });

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        sucess: false,
        message: "Order not found",
      });

    const index = order.orderItems.findIndex(
      (item) => item.orderItem.productId.toString() === productId
    );

    if (!order.orderItems[index].isDelivered) {
      order.orderItems[index].isDelivered = true;
      order.orderItems[index].deliveredAt = Date.now();

      const updateOrder = await order.save();

      res.status(201).json({
        success: true,
        order: updateOrder,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Order has been delivered!",
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

// Delivered successfully
export const receivedOrder = async (req, res) => {
  const orderId = req.params.id;

  const productId = req.body.productId;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin)
      return res.status(403).json({
        success: false,
        message: "Only admin can edit",
      });

    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        sucess: false,
        message: "Order not found",
      });

    const index = order.orderItems.findIndex(
      (item) => item.orderItem.productId.toString() === productId
    );

    if (!order.orderItems[index].isReceived) {
      order.orderItems[index].isReceived = true;
      order.orderItems[index].receivedAt = Date.now();

      const updateOrder = await order.save();

      res.status(201).json({
        success: true,
        order: updateOrder,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Order has been delivered successfully!",
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

// Get user order
export const getUserOrders = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.user.id });
    res.status(200).json({
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

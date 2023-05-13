import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

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
        orderItems: [{ orderItem }],
      });

      const createOrder = await Neworder.save();

      res.status(201).json({
        success: true,
        order: createOrder,
      });
    } else {
      // Check if the product already exists in orderItems
      const index = order.orderItems.findIndex(
        (item) => item.orderItem.productId.toString() === orderItem.productId
      );

      if (index !== -1) {
        // Product already exists in orderItems
        order.orderItems[index].orderItem.qty = orderItem.qty;
        order.orderItems[index].orderItem.price = orderItem.price;
      } else {
        // Product doesn't exist in orderItems
        order.orderItems.push({ orderItem });
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

// Delivered

export const deliveredOrder = async (req, res) => {
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
      if (!order.isDelivered) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

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

// Delivered successfully
export const receivedOrder = async (req, res) => {
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
      if (!order.isReceived) {
        order.isReceived = true;
        order.receivedAt = Date.now();

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

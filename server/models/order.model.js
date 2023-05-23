import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderCheckout: {
      type: Object,
      default: {},
    },
    /* 
    orderCheckout: {
      totalPrice,
      feeShip,
      totalCheckout
    }
    */
    orderShipping: {
      type: Object,
      default: {},
    },

    /* 
    orderShipping: {
      tel,
      address,
      city,
      country
    }
    */

    orderPayment: {
      type: Object,
      default: {},
    },

    orderProducts: {
      type: Array,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

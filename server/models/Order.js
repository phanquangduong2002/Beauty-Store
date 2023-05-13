import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  orderItem: {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  shippingAddress: {
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    tel: {
      type: String,
      default: "",
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "Paypal",
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },

  isReceived: {
    type: Boolean,
    required: true,
    default: false,
  },

  receivedAt: {
    type: Date,
  },
});

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

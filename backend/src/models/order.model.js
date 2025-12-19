import mongoose from "mongoose"

const shopOrderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    subtotal: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "out of delivery", "delivered"],
      default: "pending",
    },

    assignedDeliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ✅ REQUIRED FOR STEP 3.8
    deliveryOtp: {
      type: String,
      default: null,
    },

    otpExpires: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    shopOrders: [shopOrderSchema],

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)
export default Order

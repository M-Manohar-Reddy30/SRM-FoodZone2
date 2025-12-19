import mongoose from "mongoose"

const itemSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "general"
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Item", itemSchema)

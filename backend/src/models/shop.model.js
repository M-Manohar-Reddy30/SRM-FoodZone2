import mongoose from "mongoose"

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isOpen: {
      type: Boolean,
      default: true
    },

    location: {
      latitude: Number,
      longitude: Number,
      text: String
    },

    category: {
      type: String,
      enum: ["canteen", "cafe", "restaurant", "food-stall"],
      default: "canteen"
    },

    image: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
)

export default mongoose.model("Shop", shopSchema)

import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "owner", "deliveryBoy"],
      default: "student"
    },

    mobile: {
      type: String
    },

    // 📍 For delivery boy tracking (SRM KTR campus)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    },

    socketId: {
      type: String
    }
  },
  { timestamps: true }
)

userSchema.index({ location: "2dsphere" })

export default mongoose.model("User", userSchema)

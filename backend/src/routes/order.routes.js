import express from "express"
import {
  getDeliveryBoyAssignment,
  acceptOrder,
  sendDeliveryOtp,
  verifyDeliveryOtp,
  getTodayDeliveries,
  getOwnerDashboardStats
} from "../controllers/order.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router()

// Delivery Boy
router.get(
  "/delivery/assignments",
  protect,
  getDeliveryBoyAssignment
)

router.post(
  "/delivery/accept/:assignmentId",
  protect,
  acceptOrder
)

router.post(
  "/delivery/send-otp",
  protect,
  sendDeliveryOtp
)

router.post(
  "/delivery/verify-otp",
  protect,
  verifyDeliveryOtp
)

router.get(
  "/delivery/today",
  protect,
  getTodayDeliveries
)

router.get(
  "/owner/dashboard",
  protect,
  getOwnerDashboardStats
)

export default router

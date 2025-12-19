import DeliveryAssignment from "../models/deliveryAssignment.model.js"
import Order from "../models/order.model.js"
import User from "../models/user.model.js"
import { sendDeliveryOtpMail } from "../utils/mail.js"   // ✅ FIX 1

const getStartOfToday = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

/* ================= DELIVERY BOY: GET ASSIGNMENTS ================= */
export const getDeliveryBoyAssignment = async (req, res) => {
  try {
    const assignments = await DeliveryAssignment.find({
      brodcastedTo: req.userId,
      status: "brodcasted",
    })
      .populate("order")
      .populate("shop")

    const formatted = assignments.map(a => ({
      assignmentId: a._id,
      orderId: a.order._id,
      shopName: a.shop.name,
      deliveryAddress: a.order.deliveryAddress,
      items:
        a.order.shopOrders.find(
          so => String(so._id) === String(a.shopOrderId)
        )?.shopOrderItems || [],
    }))

    return res.status(200).json(formatted)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= DELIVERY BOY: ACCEPT ORDER ================= */
export const acceptOrder = async (req, res) => {
  try {
    const { assignmentId } = req.params

    const assignment = await DeliveryAssignment.findById(assignmentId)
    if (!assignment || assignment.status !== "brodcasted") {
      return res.status(400).json({ message: "Assignment expired" })
    }

    const alreadyAssigned = await DeliveryAssignment.findOne({
      assignedTo: req.userId,
      status: "assigned",
    })

    if (alreadyAssigned) {
      return res.status(400).json({ message: "Already delivering an order" })
    }

    assignment.assignedTo = req.userId
    assignment.status = "assigned"
    assignment.acceptedAt = new Date()
    await assignment.save()

    const order = await Order.findById(assignment.order)
    const shopOrder = order.shopOrders.id(assignment.shopOrderId)
    shopOrder.assignedDeliveryBoy = req.userId
    await order.save()

    return res.status(200).json({ message: "Order accepted" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= SEND DELIVERY OTP ================= */
export const sendDeliveryOtp = async (req, res) => {
  try {
    const { orderId, shopOrderId } = req.body

    const order = await Order.findById(orderId).populate("user")
    if (!order) {
      return res.status(400).json({ message: "Order not found" })
    }

    const shopOrder = order.shopOrders.find(
      so => String(so._id) === String(shopOrderId)
    )
    if (!shopOrder) {
      return res.status(400).json({ message: "Shop order not found" })
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    shopOrder.deliveryOtp = otp
    shopOrder.otpExpires = Date.now() + 5 * 60 * 1000

    await order.save()
    await sendDeliveryOtpMail(order.user, otp)

    return res.status(200).json({ message: "OTP sent to customer" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= VERIFY DELIVERY OTP ================= */
export const verifyDeliveryOtp = async (req, res) => {
  try {
    const { orderId, shopOrderId, otp } = req.body

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(400).json({ message: "Order not found" })
    }

    const shopOrder = order.shopOrders.find(
      so => String(so._id) === String(shopOrderId)
    )
    if (!shopOrder) {
      return res.status(400).json({ message: "Shop order not found" })
    }

    if (
      shopOrder.deliveryOtp !== otp ||
      !shopOrder.otpExpires ||
      shopOrder.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" })
    }

    shopOrder.status = "delivered"
    shopOrder.deliveredAt = new Date()
    shopOrder.deliveryOtp = null
    shopOrder.otpExpires = null

    await order.save()

    await DeliveryAssignment.deleteOne({
      order: order._id,
      shopOrderId: shopOrder._id,
      assignedTo: shopOrder.assignedDeliveryBoy,
    })

    return res.status(200).json({ message: "Order delivered successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= DELIVERY BOY: TODAY DELIVERIES ================= */
export const getTodayDeliveries = async (req, res) => {
  try {
    const deliveryBoyId = req.userId
    const startOfDay = getStartOfToday()

    const orders = await Order.find({
      "shopOrders.assignedDeliveryBoy": deliveryBoyId,
      "shopOrders.status": "delivered",
      "shopOrders.deliveredAt": { $gte: startOfDay },
    }).lean()

    let hourlyStats = {}

    orders.forEach(order => {
      order.shopOrders.forEach(so => {
        if (
          String(so.assignedDeliveryBoy) === String(deliveryBoyId) &&
          so.status === "delivered"
        ) {
          const hour = new Date(so.deliveredAt).getHours()
          hourlyStats[hour] = (hourlyStats[hour] || 0) + 1
        }
      })
    })

    const formatted = Object.keys(hourlyStats)
      .map(hour => ({
        hour: Number(hour),
        count: hourlyStats[hour],
      }))
      .sort((a, b) => a.hour - b.hour)

    return res.status(200).json(formatted)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= OWNER DASHBOARD ================= */
export const getOwnerDashboardStats = async (req, res) => {
  try {
    const ownerId = req.userId
    const startOfDay = getStartOfToday()

    const orders = await Order.find({
      "shopOrders.owner": ownerId,   // ✅ FIX 3
      createdAt: { $gte: startOfDay },
    }).lean()

    const totalOrders = orders.length
    const totalRevenue = orders.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    )

    const statusCount = {
      pending: 0,
      assigned: 0,
      delivered: 0,
    }

    orders.forEach(o => {
      o.shopOrders.forEach(so => {
        if (String(so.owner) === String(ownerId)) {
          statusCount[so.status]++
        }
      })
    })

    return res.status(200).json({
      totalOrders,
      totalRevenue,
      statusCount,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  MapPin,
  Clock,
  DollarSign,
  Navigation,
  Phone,
  Bike,
} from "lucide-react"

import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

/* ================= TYPES ================= */

interface DeliveryStats {
  total: number
  earnings: number
  avgTime: number
  distance: number
}

interface Assignment {
  assignmentId: string
  orderId: string
  shopName: string
  items: any[]
  deliveryAddress?: {
    text: string
  }
}

interface ActiveOrder {
  _id: string
}

/* ================= COMPONENT ================= */

const DeliveryDashboard = () => {
  const [stats, setStats] = useState<DeliveryStats | null>(null)
  const [availableOrders, setAvailableOrders] = useState<Assignment[]>([])
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null)
  const [loading, setLoading] = useState(true)

  /* ===== FETCH DASHBOARD ===== */

  const fetchDashboard = async () => {
    try {
      setLoading(true)

      const [statsRes, availableRes, activeRes] = await Promise.all([
        api.get("/orders/delivery/today"),
        api.get("/orders/delivery/assignments"),
        api.get("/orders/delivery/current"),
      ])

      setStats(statsRes.data)
      setAvailableOrders(availableRes.data || [])
      setActiveOrder(activeRes.data || null)
    } catch (err) {
      console.error("Delivery dashboard error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  /* ===== ACCEPT ORDER ===== */

  const acceptOrder = async (assignmentId: string) => {
    try {
      await api.post(`/orders/delivery/accept/${assignmentId}`)
      await fetchDashboard()
    } catch (err) {
      alert("Failed to accept order")
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading delivery dashboard...
      </div>
    )
  }

  /* ===== STATS CONFIG ===== */

  const statCards = stats
    ? [
        {
          label: "Today's Deliveries",
          value: stats.total,
          icon: Package,
        },
        {
          label: "Earnings",
          value: `₹${stats.earnings}`,
          icon: DollarSign,
        },
        {
          label: "Avg Time",
          value: `${stats.avgTime} min`,
          icon: Clock,
        },
        {
          label: "Distance",
          value: `${stats.distance} km`,
          icon: Navigation,
        },
      ]
    : []

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Delivery Dashboard
          </h1>
          <p className="text-muted-foreground">
            Stay online and earn more 🚴‍♂️
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">Online</span>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ACTIVE DELIVERY */}
      {activeOrder && (
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>Active Delivery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Order #{activeOrder._id}
              </p>
            </div>
            <Badge className="ml-auto bg-success text-white">
              In Progress
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <Progress value={70} />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="success" className="flex-1">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AVAILABLE ORDERS */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Nearby Orders</CardTitle>
          <Badge variant="outline" className="border-success text-success">
            {availableOrders.length} New
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {availableOrders.length === 0 && (
            <p className="text-center text-muted-foreground">
              No available orders right now
            </p>
          )}

          {availableOrders.map((order, i) => (
            <motion.div
              key={order.assignmentId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 border rounded-xl hover:bg-success/5"
            >
              <p className="font-semibold">{order.shopName}</p>
              <p className="text-sm text-muted-foreground mb-2">
                #{order.orderId} • {order.items.length} items
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                {order.deliveryAddress?.text || "Campus Address"}
              </div>

              <Button
                className="w-full"
                variant="success"
                onClick={() => acceptOrder(order.assignmentId)}
              >
                Accept Order
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default DeliveryDashboard

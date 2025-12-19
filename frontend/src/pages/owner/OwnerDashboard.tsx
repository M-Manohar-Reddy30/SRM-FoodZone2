import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  Package,
  ArrowUpRight,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

/* ================= TYPES ================= */

type OrderStatus = "pending" | "preparing" | "ready" | "delivered"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  statusCount: {
    pending: number
    preparing: number
    ready: number
    delivered: number
  }
}

interface Order {
  _id: string
  totalAmount: number
  status: OrderStatus
  createdAt: string
  user?: {
    fullName: string
  }
  items?: any[]
}

/* ================= HELPERS ================= */

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-warning/10 text-warning">Pending</Badge>
    case "preparing":
      return <Badge className="bg-primary/10 text-primary">Preparing</Badge>
    case "ready":
      return <Badge className="bg-success/10 text-success">Ready</Badge>
    case "delivered":
      return <Badge variant="secondary">Delivered</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

/* ================= COMPONENT ================= */

const OwnerDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  /* ===== FETCH DATA ===== */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get("/orders/owner/dashboard"),
          api.get("/orders/owner/recent"),
        ])

        setStats(statsRes.data)
        setRecentOrders(ordersRes.data)
      } catch (err) {
        console.error("Owner dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading owner dashboard...
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load dashboard data
      </div>
    )
  }

  /* ===== STATS CONFIG ===== */

  const statCards = [
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      label: "Delivered",
      value: stats.statusCount.delivered,
      icon: CheckCircle,
    },
    {
      label: "Pending",
      value: stats.statusCount.pending,
      icon: Clock,
    },
  ]

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">
            Manage orders & track performance
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Store Online
        </div>
      </motion.div>

      {/* ===== STATS ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ===== RECENT ORDERS ===== */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button size="sm" variant="ghost">
            View all
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {recentOrders.length === 0 && (
            <p className="text-center text-muted-foreground">
              No recent orders
            </p>
          )}

          {recentOrders.map(order => (
            <div
              key={order._id}
              className="flex justify-between items-center p-4 rounded-xl bg-muted/50 hover:bg-muted"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <p className="font-medium">#{order._id.slice(-6)}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.user?.fullName || "Student"} •{" "}
                    {order.items?.length || 0} items
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{order.totalAmount}</p>
                <div className="flex gap-2 justify-end mt-1">
                  {statusBadge(order.status)}
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default OwnerDashboard

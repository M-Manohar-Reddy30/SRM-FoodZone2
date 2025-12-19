import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Search,
  ShoppingCart,
  Clock,
  User,
  Heart,
  MapPin,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react"

import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const menuItems = [
  { icon: Home, label: "Home", href: "/student/dashboard" },
  { icon: Search, label: "Browse", href: "/student/restaurants" },
  { icon: ShoppingCart, label: "Cart", href: "/student/cart" },
  { icon: Clock, label: "Orders", href: "/student/orders" },
  { icon: Heart, label: "Favorites", href: "/student/favorites" },
  { icon: MapPin, label: "Addresses", href: "/student/addresses" },
  { icon: User, label: "Profile", href: "/student/profile" },
]

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>

          <Logo showText={false} />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>

            <Link to="/student/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Logo />
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {menuItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-background border-r">
        <div className="flex items-center h-20 px-6 border-b">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

// src/layouts/OwnerLayout.tsx
import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Store,
} from "lucide-react"

import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/owner/dashboard" },
  { icon: ClipboardList, label: "Orders", href: "/owner/orders" },
  { icon: UtensilsCrossed, label: "Menu", href: "/owner/menu" },
  { icon: BarChart3, label: "Analytics", href: "/owner/analytics" },
  { icon: Settings, label: "Settings", href: "/owner/settings" },
]

export const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // 🔐 Role protection
  if (!user || user.role !== "owner") {
    navigate("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground">
        <div className="flex items-center justify-between h-16 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>
          <Logo variant="light" showText={false} />
          <Button variant="ghost" size="icon" className="relative text-secondary-foreground">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-foreground/50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-secondary text-secondary-foreground"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                <Logo variant="light" />
                <button onClick={() => setSidebarOpen(false)} className="p-2">
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
                        : "text-secondary-foreground/70 hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 w-full mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-secondary text-secondary-foreground flex-col">
        <div className="flex items-center h-20 px-6 border-b border-sidebar-border">
          <Logo variant="light" />
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
                  : "text-secondary-foreground/70 hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.fullName}</p>
              <p className="text-xs opacity-70">Restaurant Owner</p>
            </div>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

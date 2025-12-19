import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  MapPin,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Bike,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/delivery/dashboard" },
  { icon: Package, label: "Available Orders", href: "/delivery/orders" },
  { icon: MapPin, label: "Active Delivery", href: "/delivery/active" },
  { icon: History, label: "History", href: "/delivery/history" },
  { icon: Settings, label: "Settings", href: "/delivery/settings" },
];

export const DeliveryLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground">
        <div className="flex items-center justify-between h-16 px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>

          <Logo variant="light" showText={false} />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-success rounded-full animate-pulse" />
          </Button>
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
              className="lg:hidden fixed inset-0 z-50 bg-black/50"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-secondary text-secondary-foreground"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                <Logo variant="light" />
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                      location.pathname === item.href
                        ? "bg-success text-success-foreground"
                        : "text-secondary-foreground/70 hover:bg-sidebar-accent hover:text-secondary-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-sidebar-border">
                  <button
                    onClick={handleLogout}
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
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-secondary text-secondary-foreground">
        <div className="flex items-center h-20 px-6 border-b border-sidebar-border">
          <Logo variant="light" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                location.pathname === item.href
                  ? "bg-success text-success-foreground shadow-sm"
                  : "text-secondary-foreground/70 hover:bg-sidebar-accent hover:text-secondary-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent">
            <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
              <Bike className="w-5 h-5 text-success-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.fullName || "Delivery Partner"}
              </p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Online
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-secondary-foreground/50" />
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

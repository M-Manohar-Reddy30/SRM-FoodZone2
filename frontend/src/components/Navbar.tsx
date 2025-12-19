import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, LogIn, LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const isHome = location.pathname === "/"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getDashboardPath = () => {
    if (!user) return "/login"
    if (user.role === "student") return "/student/dashboard"
    if (user.role === "owner") return "/owner/dashboard"
    if (user.role === "delivery") return "/delivery/dashboard"
    return "/login"
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        isHome
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur border-b border-border"
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-10">
            <Logo variant={isHome ? "light" : "default"} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isHome
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  location.pathname === link.href &&
                    (isHome
                      ? "text-primary-foreground bg-primary-foreground/10"
                      : "text-foreground bg-muted")
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user?.role === "student" && (
              <Button variant={isHome ? "hero-outline" : "ghost"} size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            )}

            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant={isHome ? "hero" : "default"}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate(getDashboardPath())}
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden p-2 rounded-lg",
              isHome
                ? "text-primary-foreground hover:bg-primary-foreground/10"
                : "text-foreground hover:bg-muted"
            )}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-background border border-border rounded-b-xl"
            >
              <div className="p-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 border-t border-border">
                  {!isAuthenticated ? (
                    <Link to="/login">
                      <Button className="w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button
                        className="w-full mb-2"
                        onClick={() => navigate(getDashboardPath())}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

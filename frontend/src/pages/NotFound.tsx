import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Home, ArrowLeft, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      "[404] Route not found:",
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="font-display text-7xl font-bold text-primary mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="font-display text-2xl font-semibold mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8">
          The page you’re trying to reach doesn’t exist, was moved,
          or the URL is incorrect.  
          Don’t worry — good food is just one click away 🍔
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound

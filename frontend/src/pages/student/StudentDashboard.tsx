import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Search,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  Flame,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

/* ================= TYPES ================= */

interface Category {
  _id: string
  name: string
  emoji?: string
  count: number
}

interface Restaurant {
  _id: string
  name: string
  cuisine: string
  rating: number
  avgTime: string
  image?: string
  isOpen: boolean
  featured: boolean
}

/* ================= COMPONENT ================= */

const StudentDashboard = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  /* ===== FETCH DATA ===== */

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError("")

        const [restaurantsRes, categoriesRes] = await Promise.all([
          api.get("/student/restaurants"),
          api.get("/student/categories"),
        ])

        setRestaurants(restaurantsRes.data || [])
        setCategories(categoriesRes.data || [])
      } catch (err) {
        console.error("Student dashboard error:", err)
        setError("Failed to load dashboard. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  /* ===== SEARCH FILTER ===== */

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  /* ===== LOADING ===== */

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading dashboard...
      </div>
    )
  }

  /* ===== ERROR ===== */

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-muted-foreground">Good afternoon,</p>
        <h1 className="text-2xl lg:text-3xl font-bold">
          What would you like to eat?
        </h1>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search restaurants..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* LOCATION */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border">
        <MapPin className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">Delivering to</p>
          <p className="text-sm text-muted-foreground">SRM KTR Campus</p>
        </div>
      </div>

      {/* CATEGORIES */}
      <section>
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Categories</h2>
          <Link to="/student/restaurants" className="text-sm text-primary flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <div
              key={cat._id}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl bg-card border"
            >
              <span className="text-2xl">{cat.emoji || "🍽️"}</span>
              <span className="text-sm font-medium">{cat.name}</span>
              <span className="text-xs text-muted-foreground">
                {cat.count} places
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* RESTAURANTS */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Popular Near You</h2>
        </div>

        {filteredRestaurants.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No restaurants found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRestaurants.map(r => (
              <div key={r._id} className="rounded-xl overflow-hidden border hover:shadow-lg">
                <Link to={`/student/restaurant/${r._id}`}>
                  <div className="relative h-36">
                    <img
                      src={r.image || "/placeholder-food.jpg"}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />

                    {r.featured && (
                      <Badge className="absolute top-2 left-2 bg-accent">
                        Featured
                      </Badge>
                    )}

                    {!r.isOpen && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="secondary">Closed</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{r.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {r.cuisine}
                    </p>

                    <div className="flex gap-3 text-sm">
                      <span className="flex items-center gap-1 text-accent">
                        <Star className="w-4 h-4 fill-accent" />
                        {r.rating}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {r.avgTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Hungry? Order now!</h3>
        <p className="text-white/80 mb-4">
          Fast campus delivery powered by SRM FoodZone
        </p>
        <Link to="/student/restaurants">
          <Button variant="gold">
            Browse All Restaurants
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default StudentDashboard

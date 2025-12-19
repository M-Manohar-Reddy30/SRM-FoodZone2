import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Search,
  Star,
  Clock,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { api } from "@/lib/api"

/* ================= TYPES ================= */

interface Category {
  _id: string
  name: string
}

interface Restaurant {
  _id: string
  name: string
  cuisine: string
  rating: number
  reviews: number
  avgTime: string
  image: string
  isOpen: boolean
  featured: boolean
  priceRange: string
}

/* ================= COMPONENT ================= */

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const [loading, setLoading] = useState(true)

  /* ===== FETCH DATA ===== */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [restaurantsRes, categoriesRes] = await Promise.all([
          api.get("/student/restaurants"),
          api.get("/student/categories"),
        ])

        setRestaurants(restaurantsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error("Failed to load restaurants", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  /* ===== FILTER + SORT ===== */

  const filteredRestaurants = useMemo(() => {
    let data = [...restaurants]

    if (searchQuery) {
      data = data.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "All") {
      data = data.filter(r =>
        r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    if (sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating)
    }

    if (sortBy === "time") {
      data.sort(
        (a, b) => parseInt(a.avgTime) - parseInt(b.avgTime)
      )
    }

    return data
  }, [restaurants, searchQuery, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Loading restaurants...
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12">
      {/* HEADER */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Campus Restaurants
            </h1>
            <p className="text-secondary-foreground/70">
              Discover the best food spots inside SRM KTR
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Button
                size="sm"
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>

              {categories.map(cat => (
                <Button
                  key={cat._id}
                  size="sm"
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="time">Fastest Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* RESTAURANT GRID */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">
            {filteredRestaurants.length} restaurants found
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-elevated overflow-hidden"
              >
                <Link to={`/student/restaurant/${restaurant._id}`}>
                  <div className="relative h-48">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />

                    {restaurant.featured && (
                      <Badge className="absolute top-3 left-3 bg-accent">
                        Featured
                      </Badge>
                    )}

                    {!restaurant.isOpen && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="secondary">Closed</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {restaurant.cuisine}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1 text-accent">
                          <Star className="w-4 h-4 fill-accent" />
                          {restaurant.rating}
                          <span className="text-muted-foreground">
                            ({restaurant.reviews})
                          </span>
                        </span>

                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {restaurant.avgTime}
                        </span>
                      </div>

                      <span className="text-muted-foreground">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default RestaurantsPage

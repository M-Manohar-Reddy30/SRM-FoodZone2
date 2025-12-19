import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Clock,
  MapPin,
  Shield,
  Utensils,
  Bike,
  ChefHat,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import heroCampus from "@/assets/hero-campus.jpg"

/* ================= DATA ================= */

const features = [
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Get your food delivered within 15–30 minutes across campus",
  },
  {
    icon: MapPin,
    title: "Campus-Wide Coverage",
    description: "From hostels to academic blocks, we deliver everywhere in SRM KTR",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "OTP-verified deliveries ensure your food reaches the right hands",
  },
  {
    icon: Utensils,
    title: "Diverse Cuisines",
    description: "South Indian, North Indian, Chinese & more — all in one place",
  },
]

const stats = [
  { value: "50+", label: "Campus Restaurants" },
  { value: "10K+", label: "Happy Students" },
  { value: "15 min", label: "Avg Delivery Time" },
  { value: "4.8★", label: "User Rating" },
]

/* ================= ANIMATIONS ================= */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ================= HERO ================= */

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="SRM Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium">
              Now delivering across SRM KTR Campus
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Food, Fast —
            <span className="block text-accent">Inside SRM KTR</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl"
          >
            From your favorite campus eateries straight to your hostel door.
            Track every delivery in real-time.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link to="/restaurants">
              <Button variant="hero" size="xl">
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero-outline" size="xl">
                Join as Partner
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  {s.value}
                </div>
                <div className="text-sm text-primary-foreground/60">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

/* ================= FEATURES ================= */

export const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background brick-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-primary">SRM FoodZone</span>?
          </h2>
          <p className="text-muted-foreground">
            Built for SRM students. Designed for campus life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card-elevated p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= HOW IT WORKS ================= */

export const HowItWorksSection = () => {
  const steps = [
    { icon: Users, title: "Sign Up", desc: "Create your student account" },
    { icon: Utensils, title: "Browse", desc: "Explore campus restaurants" },
    { icon: ChefHat, title: "Order", desc: "Place order in seconds" },
    { icon: Bike, title: "Enjoy", desc: "Fast doorstep delivery" },
  ]

  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary text-white flex items-center justify-center">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-secondary-foreground mb-1">
                {s.title}
              </h3>
              <p className="text-sm text-secondary-foreground/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= CTA ================= */

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl">
            Join thousands of SRM students enjoying fast & reliable food delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/restaurants">
              <Button variant="gold" size="xl">
                Browse Restaurants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero-outline" size="xl">
                Create Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

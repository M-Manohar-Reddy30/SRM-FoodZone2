import { motion } from "framer-motion"

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          About SRM FoodZone
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          SRM FoodZone is a campus-first food delivery platform built
          exclusively for SRM KTR students.  
          Fast delivery, trusted vendors, and seamless ordering — all inside
          your campus.
        </p>
      </motion.div>
    </div>
  )
}

export default AboutPage

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
          Contact Us
        </h1>

        <div className="space-y-4 text-muted-foreground">
          <div className="flex gap-3 items-center">
            <MapPin className="w-5 h-5 text-primary" />
            SRM Institute of Science & Technology, KTR
          </div>

          <div className="flex gap-3 items-center">
            <Phone className="w-5 h-5 text-primary" />
            +91 98765 43210
          </div>

          <div className="flex gap-3 items-center">
            <Mail className="w-5 h-5 text-primary" />
            support@srmfoodzone.com
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactPage

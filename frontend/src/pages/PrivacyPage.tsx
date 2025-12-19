import { motion } from "framer-motion"

const PrivacyPage = () => {
  return (
    <div className="pt-20 pb-16">
      <section className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Your privacy is important to us. This Privacy Policy explains how
              <strong> SRM FoodZone </strong>
              collects, uses, and protects your information.
            </p>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name, email, and contact details</li>
                <li>Order and transaction history</li>
                <li>Delivery location within campus</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                2. How We Use Your Data
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process and deliver food orders</li>
                <li>Improve platform performance</li>
                <li>Provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                3. Data Protection
              </h2>
              <p>
                We use secure technologies and best practices to protect your
                data. Passwords and sensitive data are encrypted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                4. Data Sharing
              </h2>
              <p>
                Your data is shared only with vendors and delivery partners when
                required to fulfill your order. We do not sell user data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                5. Cookies
              </h2>
              <p>
                We may use cookies to improve your experience and maintain
                login sessions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                6. Policy Updates
              </h2>
              <p>
                This policy may be updated from time to time. Continued use of
                the platform indicates acceptance of the updated policy.
              </p>
            </section>

            <p className="pt-4">
              For any privacy-related concerns, email us at{" "}
              <strong>privacy@srmfoodzone.com</strong>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default PrivacyPage

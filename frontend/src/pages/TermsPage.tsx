import { motion } from "framer-motion"

const TermsPage = () => {
  return (
    <div className="pt-20 pb-16">
      <section className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Terms & Conditions
          </h1>

          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Welcome to <strong>SRM FoodZone</strong>. By accessing or using our
              platform, you agree to comply with and be bound by the following
              terms and conditions.
            </p>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                1. Platform Usage
              </h2>
              <p>
                SRM FoodZone is a campus-based food ordering and delivery
                platform intended for SRM KTR students, vendors, and delivery
                partners only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                2. User Responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate account information</li>
                <li>Do not misuse or exploit the platform</li>
                <li>Respect vendors, delivery partners, and staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                3. Orders & Payments
              </h2>
              <p>
                Once an order is placed, it cannot be cancelled after
                preparation begins. Prices, availability, and delivery times
                may vary.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                4. Delivery
              </h2>
              <p>
                Delivery times are estimates. SRM FoodZone is not responsible
                for delays caused by weather, traffic, or vendor issues.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                5. Account Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate accounts that
                violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                6. Changes to Terms
              </h2>
              <p>
                These terms may be updated periodically. Continued use of the
                platform implies acceptance of the updated terms.
              </p>
            </section>

            <p className="pt-4">
              If you have any questions, contact us at{" "}
              <strong>support@srmfoodzone.com</strong>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default TermsPage

import nodemailer from "nodemailer"

export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    // 🔹 DEV MODE: just log OTP (works without email setup)
    console.log("📨 DELIVERY OTP")
    console.log("User:", user?.email || user?.fullName)
    console.log("OTP:", otp)

    // 🔹 OPTIONAL: real email (enable later)
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      return
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"SRM FoodZone" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Your Delivery OTP",
      html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`,
    })
  } catch (err) {
    console.error("❌ Mail error:", err.message)
  }
}

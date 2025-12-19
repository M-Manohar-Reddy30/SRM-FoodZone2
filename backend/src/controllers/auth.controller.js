import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../utils/jwt.js"

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role
    })

    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

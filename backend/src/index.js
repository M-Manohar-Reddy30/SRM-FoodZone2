import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"

import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import ownerRoutes from "./routes/owner.routes.js"
import orderRoutes from "./routes/order.routes.js"

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

app.set("io", io)

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/owner", ownerRoutes)
app.use("/api/orders", orderRoutes)

connectDB()

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

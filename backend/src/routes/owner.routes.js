import express from "express"
import isAuth from "../middlewares/isAuth.js"
import {
  createShop,
  getMyShop,
  addItem,
  getMyItems,
  toggleItemAvailability
} from "../controllers/owner.controller.js"

const router = express.Router()

router.post("/shop", isAuth, createShop)
router.get("/shop", isAuth, getMyShop)

router.post("/item", isAuth, addItem)
router.get("/items", isAuth, getMyItems)
router.patch("/item/:itemId/toggle", isAuth, toggleItemAvailability)

export default router

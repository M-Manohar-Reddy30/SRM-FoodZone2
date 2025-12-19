import Shop from "../models/shop.model.js"
import Item from "../models/item.model.js"
import User from "../models/user.model.js"

/* ================= CREATE SHOP ================= */
export const createShop = async (req, res) => {
  try {
    const { name, description, category, location, image } = req.body

    const user = await User.findById(req.userId)
    if (!user || user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can create shops" })
    }

    const existingShop = await Shop.findOne({ owner: req.userId })
    if (existingShop) {
      return res.status(400).json({ message: "Owner already has a shop" })
    }

    const shop = await Shop.create({
      name,
      description,
      category,
      location,
      image,
      owner: req.userId
    })

    return res.status(201).json(shop)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= GET MY SHOP ================= */
export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    return res.status(200).json(shop)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= ADD MENU ITEM ================= */
export const addItem = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body

    const shop = await Shop.findOne({ owner: req.userId })
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    const item = await Item.create({
      shop: shop._id,
      name,
      price,
      description,
      image,
      category
    })

    return res.status(201).json(item)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= GET MY ITEMS ================= */
export const getMyItems = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    const items = await Item.find({ shop: shop._id }).sort({ createdAt: -1 })
    return res.status(200).json(items)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

/* ================= TOGGLE ITEM AVAILABILITY ================= */
export const toggleItemAvailability = async (req, res) => {
  try {
    const { itemId } = req.params

    const item = await Item.findById(itemId).populate("shop")
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (String(item.shop.owner) !== String(req.userId)) {
      return res.status(403).json({ message: "Not authorized" })
    }

    item.isAvailable = !item.isAvailable
    await item.save()

    return res.status(200).json(item)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

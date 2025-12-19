/* =========================================
   SRM FoodZone – Global Constants
   Single source of truth
========================================= */

/* ---------- API ---------- */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"

/* ---------- AUTH ---------- */
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
}

export const USER_ROLES = {
  STUDENT: "student",
  OWNER: "owner",
  DELIVERY: "delivery",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

/* ---------- ROUTES ---------- */
export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    RESTAURANTS: "/restaurants",
    ABOUT: "/about",
    CONTACT: "/contact",
    TERMS: "/terms",
    PRIVACY: "/privacy",
  },

  STUDENT: {
    ROOT: "/student",
    DASHBOARD: "/student/dashboard",
    RESTAURANTS: "/student/restaurants",
    CART: "/student/cart",
    ORDERS: "/student/orders",
    PROFILE: "/student/profile",
  },

  OWNER: {
    ROOT: "/owner",
    DASHBOARD: "/owner/dashboard",
    ORDERS: "/owner/orders",
    MENU: "/owner/menu",
    ANALYTICS: "/owner/analytics",
    SETTINGS: "/owner/settings",
  },

  DELIVERY: {
    ROOT: "/delivery",
    DASHBOARD: "/delivery/dashboard",
    ORDERS: "/delivery/orders",
    ACTIVE: "/delivery/active",
    HISTORY: "/delivery/history",
    SETTINGS: "/delivery/settings",
  },
}

/* ---------- ORDER STATUS ---------- */
export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  ASSIGNED: "assigned",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS]

/* ---------- DELIVERY STATUS ---------- */
export const DELIVERY_STATUS = {
  AVAILABLE: "available",
  ACCEPTED: "accepted",
  PICKED_UP: "picked_up",
  DELIVERED: "delivered",
} as const

/* ---------- UI ---------- */
export const APP_META = {
  NAME: "SRM FoodZone",
  TAGLINE: "Campus Food Delivery",
  CAMPUS: "SRM KTR",
  SUPPORT_EMAIL: "support@srmfoodzone.com",
}

/* ---------- PAGINATION ---------- */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  PAGE_SIZE: 10,
}

/* ---------- TOAST MESSAGES ---------- */
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back 👋",
  LOGOUT_SUCCESS: "Logged out successfully",
  LOGIN_FAILED: "Invalid email or password",
  REGISTER_SUCCESS: "Account created successfully 🎉",
  SOMETHING_WENT_WRONG: "Something went wrong. Try again.",
}

/* ---------- TIME ---------- */
export const TIME = {
  OTP_EXPIRY_MINUTES: 5,
  DELIVERY_AVG_MINUTES: 30,
}

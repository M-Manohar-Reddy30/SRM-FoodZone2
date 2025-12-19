// src/hooks/useUser.ts

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { STORAGE_KEYS, UserRole } from "@/constants"

/* =========================
   TYPES
========================= */

export interface User {
  _id: string
  fullName: string
  email: string
  role: UserRole
}

/* =========================
   HOOK
========================= */

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        // try local cache first
        const cached = localStorage.getItem(STORAGE_KEYS.USER)
        if (cached) {
          setUser(JSON.parse(cached))
        }

        // always verify with backend
        const res = await api.get("/auth/me")

        setUser(res.data)
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(res.data)
        )
      } catch (err) {
        console.error("User session invalid", err)
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initUser()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isStudent: user?.role === "student",
    isOwner: user?.role === "owner",
    isDelivery: user?.role === "delivery",
  }
}

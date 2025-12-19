import { useEffect, useState } from "react"
import { auth, AuthUser } from "@/lib/auth"
import { authService } from "@/services/auth.service"

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = auth.getUser()
    if (storedUser) setUser(storedUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login({ email, password })
    auth.setSession(token, user)
    setUser(user)
  }

  const logout = () => {
    auth.clearSession()
    setUser(null)
    window.location.href = "/login"
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}

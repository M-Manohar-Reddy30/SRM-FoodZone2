import { api } from "@/lib/api.ts"
import { AuthUser } from "@/lib/auth.ts"

export const authService = {
  async login(data: { email: string; password: string }) {
    const res = await api.post("/auth/login", data)
    return res.data as { token: string; user: AuthUser }
  },

  async register(data: any) {
    const res = await api.post("/auth/register", data)
    return res.data
  },

  async getMe() {
    const res = await api.get("/auth/me")
    return res.data as AuthUser
  },
}

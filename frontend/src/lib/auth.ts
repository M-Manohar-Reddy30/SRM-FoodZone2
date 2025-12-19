import { api } from "./api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data.user;
};

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// src/lib/auth.ts

export type UserRole = "student" | "owner" | "delivery"

export interface AuthUser {
  _id: string
  fullName: string
  email: string
  role: UserRole
}

const TOKEN_KEY = "token"
const USER_KEY = "user"

export const auth = {
  setSession(token: string, user: AuthUser) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY)
  },
}

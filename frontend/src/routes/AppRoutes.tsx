import { Routes, Route, Navigate } from "react-router-dom"

/* ================= LAYOUTS ================= */
import PublicLayout from "@/layouts/PublicLayout"
import { StudentLayout } from "@/layouts/StudentLayout"
import { OwnerLayout } from "@/layouts/OwnerLayout"
import { DeliveryLayout } from "@/layouts/DeliveryLayout"

/* ================= PUBLIC PAGES ================= */
import LandingPage from "@/pages/LandingPage"
import AboutPage from "@/pages/AboutPage"
import ContactPage from "@/pages/ContactPage"
import RestaurantsPage from "@/pages/RestaurantsPage"
import TermsPage from "@/pages/TermsPage"
import PrivacyPage from "@/pages/PrivacyPage"
import NotFound from "@/pages/NotFound"

/* ================= AUTH PAGES ================= */
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"

/* ================= STUDENT ================= */
import StudentDashboard from "@/pages/student/StudentDashboard"

/* ================= OWNER ================= */
import OwnerDashboard from "@/pages/owner/OwnerDashboard"

/* ================= DELIVERY ================= */
import DeliveryDashboard from "@/pages/delivery/DeliveryDashboard"

/* ================= AUTH HOOK ================= */
import { useAuth } from "@/hooks/useAuth"

/* =================================================
   PROTECTED ROUTE
================================================= */
const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element
  role?: "student" | "owner" | "delivery"
}) => {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

/* =================================================
   APP ROUTES
================================================= */
const AppRoutes = () => {
  return (
    <Routes>

      {/* ===== PUBLIC ===== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      {/* ===== AUTH ===== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ===== STUDENT ===== */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="restaurants" element={<StudentDashboard />} />
        <Route path="cart" element={<StudentDashboard />} />
        <Route path="orders" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentDashboard />} />
      </Route>

      {/* ===== OWNER ===== */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="orders" element={<OwnerDashboard />} />
        <Route path="menu" element={<OwnerDashboard />} />
        <Route path="analytics" element={<OwnerDashboard />} />
        <Route path="settings" element={<OwnerDashboard />} />
      </Route>

      {/* ===== DELIVERY ===== */}
      <Route
        path="/delivery"
        element={
          <ProtectedRoute role="delivery">
            <DeliveryLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DeliveryDashboard />} />
        <Route path="orders" element={<DeliveryDashboard />} />
        <Route path="active" element={<DeliveryDashboard />} />
        <Route path="history" element={<DeliveryDashboard />} />
        <Route path="settings" element={<DeliveryDashboard />} />
      </Route>

      {/* ===== 404 ===== */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes

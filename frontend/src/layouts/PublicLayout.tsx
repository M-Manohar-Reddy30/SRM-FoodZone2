import { Outlet } from "react-router-dom"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto h-16 flex items-center justify-between px-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SRM FoodZone · KTR Campus
      </footer>
    </div>
  )
}

export default PublicLayout

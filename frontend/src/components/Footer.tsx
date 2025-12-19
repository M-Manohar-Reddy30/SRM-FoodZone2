import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { href: "/restaurants", label: "Browse Restaurants" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/refund", label: "Refund Policy" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Your favorite campus food delivery platform. Fresh, fast, and always within SRM KTR.
            </p>
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary-foreground/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-secondary-foreground/70">
                  SRM Institute of Science and Technology, Kattankulathur, Chennai - 603203
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">support@srmfoodzone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} SRM FoodZone. All rights reserved.
          </p>
          <p className="text-sm text-secondary-foreground/50">
            Made with ❤️ for SRM Students
          </p>
        </div>
      </div>
    </footer>
  );
};

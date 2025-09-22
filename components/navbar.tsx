"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, LayoutDashboard, LogIn } from "lucide-react"

interface NavbarProps {
  onLogout: () => void
  isLoggedIn: boolean
  onNavigateToDashboard: () => void
  onNavigateToLogin: () => void
  onNavigateToContact?: () => void
  onNavigateToResources?: () => void
  onNavigateToPrivacy?: () => void
}

export function Navbar({
  onLogout,
  isLoggedIn,
  onNavigateToDashboard,
  onNavigateToLogin,
  onNavigateToContact,
  onNavigateToResources,
  onNavigateToPrivacy,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#hero" className="flex items-center">
              <img
                src="/EduTIMELY_LOGO_Cropped.png"
                alt="EduTIMELY"
                className="h-12 sm:h-16 w-auto cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-5">
            {[
              { label: "Home", href: "#hero" },
              { label: "Features", href: "#features" },
              { label: "Team", href: "#team" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[#1A3D6B] hover:text-[#3E99D1] transition-colors duration-300 px-1 py-0.5 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#3E99D1] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {onNavigateToPrivacy && (
              <button
                onClick={onNavigateToPrivacy}
                className="relative text-[#1A3D6B] hover:text-[#3E99D1] transition-colors duration-300 px-1 py-0.5 group"
              >
                Privacy
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#3E99D1] transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            {onNavigateToContact && (
              <button
                onClick={onNavigateToContact}
                className="relative text-[#1A3D6B] hover:text-[#3E99D1] transition-colors duration-300 px-1 py-0.5 group"
              >
                Contact
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#3E99D1] transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
            {onNavigateToResources && (
              <button
                onClick={onNavigateToResources}
                className="relative text-[#1A3D6B] hover:text-[#3E99D1] transition-colors duration-300 px-1 py-0.5 group"
              >
                Resources
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#3E99D1] transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Button
                  onClick={onNavigateToDashboard}
                  className="bg-gradient-to-r from-[#1A3D6B] to-[#3E99D1] hover:from-[#1A3D6B]/90 hover:to-[#3E99D1]/90 text-white shadow-lg border-0 transform hover:scale-105 transition-all duration-300"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-[#1A3D6B] border border-[#1A3D6B] hover:border-[#3E99D1] transform hover:scale-105 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={onNavigateToLogin}
                className="bg-gradient-to-r from-[#1A3D6B] to-[#3E99D1] hover:from-[#1A3D6B]/90 hover:to-[#3E99D1]/90 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Log In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1A3D6B] hover:text-[#3E99D1] transition-all duration-300 transform hover:scale-110"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { label: "Home", href: "#hero" },
              { label: "Features", href: "#features" },
              { label: "Team", href: "#team" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-[#1A3D6B] hover:text-[#3E99D1] rounded-md transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {onNavigateToPrivacy && (
              <button
                onClick={onNavigateToPrivacy}
                className="block w-full text-left px-3 py-2 text-[#1A3D6B] hover:text-[#3E99D1] rounded-md transition-colors duration-200"
              >
                Privacy
              </button>
            )}
            {onNavigateToContact && (
              <button
                onClick={onNavigateToContact}
                className="block w-full text-left px-3 py-2 text-[#1A3D6B] hover:text-[#3E99D1] rounded-md transition-colors duration-200"
              >
                Contact
              </button>
            )}
            {onNavigateToResources && (
              <button
                onClick={onNavigateToResources}
                className="block w-full text-left px-3 py-2 text-[#1A3D6B] hover:text-[#3E99D1] rounded-md transition-colors duration-200"
              >
                Resources
              </button>
            )}

            <div className="mt-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={onNavigateToDashboard}
                    className="w-full bg-gradient-to-r from-[#1A3D6B] to-[#3E99D1] text-white border-0"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full bg-white/90 text-[#1A3D6B] border border-[#1A3D6B]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onNavigateToLogin}
                  className="w-full bg-gradient-to-r from-[#1A3D6B] to-[#3E99D1] text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Log In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

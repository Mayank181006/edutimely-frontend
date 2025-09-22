"use client"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-1 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1A3D6B] via-[#2c62a9] to-[#8ab6f0] text-white font-poppins">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">EduTIMELY</h3>
          <p className="text-sm text-[#8ab6f0] max-w-sm">
            Smarter education powered by AI. We help students plan, learn, and grow with intelligent solutions for every learning journey.
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "Features", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[#8ab6f0] hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 rounded-full bg-[#8ab6f0]  hover:bg-white text-[#1a3d6b] transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-300 pt-6 text-center text-[16px] text-white">
        © {new Date().getFullYear()} EduTIMELY. All rights reserved.
      </div>
    </footer>
  )
}

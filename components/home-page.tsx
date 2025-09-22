// client/components/home-page.tsx
"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TeamSection } from "@/components/team-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"
import { AnnouncementsSection } from "@/components/announcements-section"
import { NotificationsWidget } from "@/components/notifications-widget"
import { FAQSection } from "@/components/faq-section"
import { FeedbackSystem } from "@/components/feedback-system"

interface HomePageProps {
  onNavigateToLogin: () => void
  onNavigateToDashboard: () => void
  onNavigateToContact: () => void
  onNavigateToResources: () => void
  onNavigateToPrivacy: () => void
  isLoggedIn: boolean
  onLogout: () => void
  // --- 1. ADD userType AS A PROP ---
  userType?: "student" | "admin"
}

export function HomePage({
  onNavigateToLogin,
  onNavigateToDashboard,
  onNavigateToContact,
  onNavigateToResources,
  onNavigateToPrivacy,
  isLoggedIn,
  onLogout,
  userType, // <-- Destructure the new prop
}: HomePageProps) {
  const [scrollY, setScrollY] = useState(0)

  // --- 2. REMOVE UNNECESSARY STATE AND EFFECTS ---
  // The component no longer needs to manage its own userType state
  // or read from localStorage. This is now handled by the parent.
  // const [userType, setUserType] = useState<"student" | "admin">("student")
  // useEffect(() => { ... }, [isLoggedIn])
  // ---

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Your scroll reveal animation logic is perfect and remains unchanged.
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen bg-background relative ${isLoggedIn ? "animate-fade-in-advanced" : ""}`}>
      {/* Parallax background remains unchanged */}
      <div className="fixed inset-0 parallax">
        <div
          className="parallax-layer parallax-back opacity-20"
          style={{
            transform: `translateZ(-1px) scale(2) translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full animate-float"></div>
          <div
            className="absolute top-60 right-32 w-48 h-48 bg-accent/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/3 w-80 h-80 bg-secondary/5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      <div className="relative z-10">
        <Navbar
          onLogout={onLogout}
          isLoggedIn={isLoggedIn}
          onNavigateToDashboard={onNavigateToDashboard}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToContact={onNavigateToContact}
          onNavigateToResources={onNavigateToResources}
          onNavigateToPrivacy={onNavigateToPrivacy}
        />
        <main>
          <HeroSection onNavigateToLogin={onNavigateToLogin} isLoggedIn={isLoggedIn} />
          <AboutSection />
          <FeaturesSection />
          <FAQSection />
          <TeamSection />
        </main>
        <Footer />
      </div>

      {/* --- 3. PASS THE userType PROP DOWN --- */}
      <NotificationsWidget isLoggedIn={isLoggedIn} userType={userType} />
      <FeedbackSystem isLoggedIn={isLoggedIn} userType={userType} />
    </div>
  )
}
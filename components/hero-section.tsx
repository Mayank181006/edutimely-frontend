"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  onNavigateToLogin?: () => void
  isLoggedIn?: boolean
}

export function HeroSection({ onNavigateToLogin, isLoggedIn }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToFooter = () => {
    const footer = document.getElementById("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>
        <div
          className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x * 0.02 + "px",
            top: mousePosition.y * 0.02 + "px",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{
            right: mousePosition.x * -0.01 + "px",
            bottom: mousePosition.y * -0.01 + "px",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full border border-primary/20 animate-shimmer">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
              </div>

              <h1 className="font-poppins text-balance">
                <span className="text-[40px] sm:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Smarter Timetables for
                </span>
                <br />
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-20 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ">
                  Smarter Education
                </span>
              </h1>

              <p className="text-xl text-muted-foreground font-poppins max-w-lg leading-relaxed">
                EduTIMELY brings AI-powered, NEP-compliant timetables to higher education, ensuring conflict-free schedules, flexible learning, and smarter academic planning.
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isLoggedIn && (
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 animate-pulse-glow transform hover:scale-105 transition-all duration-300"
                  onClick={onNavigateToLogin}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button
                size="lg"
                className="group px-6 py-3 rounded-lg border border-primary bg-white text-primary font-poppins font-medium transition-all duration-300 hover:bg-primary hover:text-white"
                onClick={scrollToFooter}
              >
                <Brain className="mr-2 h-4 w-4" />
                Learn More
              </Button>


            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2 group">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  Smart Scheduling
                </span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <span className="text-muted-foreground group-hover:text-accent transition-colors">
                  Conflict-Free Timetable
                </span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span className="text-muted-foreground group-hover:text-secondary transition-colors">
                  Personalized Learning
                </span>
              </div>
            </div>

          </div>

          <div className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative">
              {/* Central glowing orb */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow"></div>
                <div
                  className="absolute inset-4 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse-glow"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                  <img src="/EduTIMELY_LOGO_Icon.png" alt="edutimely" className="w-32 h-32 text-primary animate-pulse" />
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-rotate">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-3 h-3 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div
                    className="w-5 h-5 bg-secondary rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-8 -right-8 glass p-4 rounded-xl animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">AI Timetable</span>
                </div>
              </div>

              <div
                className="absolute -bottom-8 -left-8 glass p-4 rounded-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Smart Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

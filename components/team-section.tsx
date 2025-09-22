"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

const teamMembers = [
  { name: "Darshan Singh", email: "darshan.wkhra1@gmail.com" },
  { name: "Mayank Arora", email: "ma5297780@gmail.com" },
  { name: "Yasir Akhtar", email: "yasircpr@gmail.com" },
  { name: "Bharat Kumar", email: "bharatkumarrathore2006@gmail.com" },
  { name: "Saima", email: "saimaalauddin79@gmail.com" },
  { name: "Dev", email: "Devrajput45222@gmail.com" },
]

export function TeamSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prev) => {
        if (prev.length < teamMembers.length) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Team - DARKWING's
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the brilliant minds behind our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`glass hover:glass-dark transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                visibleCards.includes(index) ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Avatar with gradient background */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse-glow"></div>
                  <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                </div>

                {/* Social links placeholder */}
                <div className="flex justify-center space-x-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Github className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, GraduationCap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const benefits = [
  {
    icon: Building,
    title: "For Institutions",
    subtitle: "Efficient Management",
    description:
      "Streamline administrative processes, reduce manual work, and ensure optimal resource utilization across your institution.",
    stats: "90% Time Saved",
  },
  {
    icon: Users,
    title: "For Faculty",
    subtitle: "Balanced Workloads",
    description:
      "Achieve fair distribution of teaching loads, minimize conflicts, and provide better work-life balance for educators.",
    stats: "95% Satisfaction Rate",
  },
  {
    icon: GraduationCap,
    title: "For Students",
    subtitle: "Flexible Learning",
    description:
      "Experience optimized schedules that support diverse learning paths and accommodate individual academic needs.",
    stats: "100% NEP Compliant",
  },
]

export function BenefitsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const [counters, setCounters] = useState<number[]>([90, 95, 100])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })

            // Animate counter
            const targetValue = [90, 95, 100][index]
            let currentValue = 0
            const increment = targetValue / 50
            const timer = setInterval(() => {
              currentValue += increment
              if (currentValue >= targetValue) {
                currentValue = targetValue
                clearInterval(timer)
              }
              setCounters((prev) => {
                const newCounters = [...prev]
                newCounters[index] = Math.floor(currentValue)
                return newCounters
              })
            }, 30)
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Impact & Benefits</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover how EduTimely transforms the educational experience for institutions, faculty, and students alike.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-border/50 hover:border-primary/50 ${
                visibleCards[index] ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <benefit.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {benefit.title}
                </CardTitle>
                <p className="text-lg font-medium text-primary">{benefit.subtitle}</p>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-muted-foreground leading-relaxed text-pretty">{benefit.description}</p>
                <div className="bg-primary/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{counters[index]}%</div>
                  <div className="text-sm text-muted-foreground">{benefit.stats.split(" ").slice(1).join(" ")}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Upload, Brain, CheckCircle, Download } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    icon: Upload,
    title: "Admin Inputs",
    description:
      "Upload course data, faculty information, room details, and scheduling constraints through our intuitive interface.",
  },
  {
    icon: Brain,
    title: "AI Scheduling",
    description:
      "Our advanced AI algorithms analyze all inputs and generate optimal timetables considering every constraint and preference.",
  },
  {
    icon: CheckCircle,
    title: "Conflict Resolution",
    description:
      "Automatic detection and resolution of scheduling conflicts with intelligent suggestions for optimal solutions.",
  },
  {
    icon: Download,
    title: "Export Timetable",
    description:
      "Download your finalized timetables in multiple formats or access them through our interactive dashboard.",
  },
]

export function HowItWorksSection() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([])
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
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
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">How EduTimely Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From data input to final timetable - experience seamless automation in just four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <Card
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`relative bg-background border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg ${
                  visibleSteps[index] ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 relative z-10">
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

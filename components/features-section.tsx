"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Sparkles, Zap, Shield, Cpu, Globe } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Brain,
    title: "Smart Timetables",
    description: "AI-powered timetable generation to optimize your learning schedule across subjects and courses.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description: "Personalized learning paths for each student, adjusting content based on progress and performance.",
  },
  {
    icon: Zap,
    title: "Quick Scheduling",
    description: "Generate complex schedules in seconds, saving time for students, teachers, and administrators.",
  },
  {
    icon: Shield,
    title: "Secure Data",
    description: "All user data is encrypted and handled with privacy-first principles for full protection.",
  },
  {
    icon: Cpu,
    title: "AI Insights",
    description: "Advanced analytics provide insights into student performance and institutional efficiency.",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Access EduTIMELY on any device, ensuring learning continues anywhere, anytime.",
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Empower Your Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            EduTIMELY uses AI to make education smarter, adaptive, and efficient for every student and educator.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group bg-card border border-border rounded-xl shadow-md p-6 transition-all duration-300 cursor-pointer
  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
  hover:bg-primary hover:border-primary`}
            >
              <CardHeader className="text-center">
                <div
                  className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
      group-hover:bg-white"
                >
                  <feature.icon
                    className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-primary"
                  />
                </div>
                <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-white text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center transition-colors duration-300 group-hover:text-white text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>

          ))}
        </div>
      </div>
    </section>
  )
}

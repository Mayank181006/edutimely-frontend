"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Academic Director",
    institution: "Delhi University",
    content:
      "EduTimely has revolutionized our scheduling process. The AI-powered system perfectly aligns with NEP 2020 requirements while saving us countless hours of manual work.",
    rating: 5,
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Dean of Engineering",
    institution: "IIT Mumbai",
    content:
      "The conflict resolution feature is outstanding. We've eliminated scheduling overlaps completely and our faculty satisfaction has increased significantly.",
    rating: 5,
  },
  {
    name: "Dr. Anita Patel",
    role: "Vice Principal",
    institution: "Gujarat University",
    content:
      "Implementation was seamless and the results were immediate. Our students now have more flexible learning paths thanks to EduTimely's intelligent scheduling.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Leading Institutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            See how educational institutions across India are transforming their scheduling with EduTimely.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-background border-border/50 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />

                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-balance">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-lg text-foreground">{testimonials[currentIndex].name}</div>
                  <div className="text-primary font-medium">{testimonials[currentIndex].role}</div>
                  <div className="text-muted-foreground">{testimonials[currentIndex].institution}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary" : "bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

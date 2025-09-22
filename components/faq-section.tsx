"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search, HelpCircle, User, Shield, BookOpen, Settings } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: "login" | "features" | "technical" | "general"
  tags: string[]
}

export function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I login as a student or admin?",
      answer:
        "Click the 'LOG IN' button in the top navigation. Select your role (Student/Admin) from the dropdown, then enter your username and password. Students typically use their roll number as username, while admins use their employee ID.",
      category: "login",
      tags: ["login", "student", "admin", "authentication"],
    },
    {
      id: "2",
      question: "What happens if I forget my password?",
      answer:
        "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. Contact support if you don't receive the email within 10 minutes.",
      category: "login",
      tags: ["password", "reset", "forgot", "email"],
    },
    {
      id: "3",
      question: "Can I edit my timetable as a student?",
      answer:
        "No, students cannot edit the official timetable. Only admins and faculty members have permission to modify timetables. However, students can view their personalized schedule, add personal notes, and set reminders for classes.",
      category: "features",
      tags: ["timetable", "edit", "permissions", "student"],
    },
    {
      id: "4",
      question: "How does the attendance tracking work?",
      answer:
        "EduTimely uses smart attendance tracking with multiple methods: QR code scanning, geolocation verification, and manual entry by faculty. The system automatically calculates attendance percentages and sends alerts when attendance falls below 75%.",
      category: "features",
      tags: ["attendance", "tracking", "QR code", "alerts"],
    },
    {
      id: "5",
      question: "Why can't I see my dashboard after logging in?",
      answer:
        "This could be due to several reasons: 1) Clear your browser cache and cookies, 2) Ensure JavaScript is enabled, 3) Check your internet connection, 4) Try logging out and logging back in. If the issue persists, contact technical support.",
      category: "technical",
      tags: ["dashboard", "login", "technical", "troubleshooting"],
    },
    {
      id: "6",
      question: "How do I download my attendance report?",
      answer:
        "Go to your dashboard and click on 'Reports' section. Select 'Attendance Report', choose the date range, and click 'Download PDF'. The report will include detailed attendance records, percentages, and any remarks from faculty.",
      category: "features",
      tags: ["reports", "download", "attendance", "PDF"],
    },
    {
      id: "7",
      question: "Is my personal data safe on EduTimely?",
      answer:
        "Yes, we take data security seriously. All data is encrypted, stored securely, and only accessible to authorized personnel. We follow strict privacy policies and comply with data protection regulations. Only admins have edit rights to sensitive information.",
      category: "general",
      tags: ["privacy", "security", "data", "safety"],
    },
    {
      id: "8",
      question: "How do I submit assignments through the platform?",
      answer:
        "Navigate to the 'Assignments' section in your dashboard. Click on the assignment you want to submit, upload your file (PDF, DOC, or other allowed formats), add any comments if required, and click 'Submit'. You'll receive a confirmation email.",
      category: "features",
      tags: ["assignments", "submit", "upload", "files"],
    },
    {
      id: "9",
      question: "Can I access EduTimely on my mobile phone?",
      answer:
        "Yes, EduTimely is fully responsive and works on all devices including smartphones and tablets. You can access all features through your mobile browser. We're also working on dedicated mobile apps for iOS and Android.",
      category: "technical",
      tags: ["mobile", "responsive", "app", "devices"],
    },
    {
      id: "10",
      question: "How do I contact support if I need help?",
      answer:
        "You can contact support through multiple channels: 1) Use the help widget in the bottom-right corner, 2) Visit the Contact page, 3) Email support@edutimely.com, 4) Call +91 98765 43210 during business hours (9 AM - 6 PM, Mon-Fri).",
      category: "general",
      tags: ["support", "contact", "help", "assistance"],
    },
  ]

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle, color: "bg-blue-100 text-blue-800" },
    { id: "login", label: "Login & Access", icon: User, color: "bg-green-100 text-green-800" },
    { id: "features", label: "Features", icon: BookOpen, color: "bg-purple-100 text-purple-800" },
    { id: "technical", label: "Technical", icon: Settings, color: "bg-orange-100 text-orange-800" },
    { id: "general", label: "General", icon: Shield, color: "bg-gray-100 text-gray-800" },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about EduTimely. Can't find what you're looking for? Contact our
              support team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                      : "hover:bg-accent/80"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              // --- FIX IS HERE ---
              // Removed `scroll-reveal` and the `style` prop
              <Card
                key={faq.id}
                className="hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="cursor-pointer" onClick={() => toggleFAQ(faq.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={categories.find((c) => c.id === faq.category)?.color}>
                          {categories.find((c) => c.id === faq.category)?.label}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedFAQ === faq.id && (
                  <CardContent className="pt-0 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter. Still need help?{" "}
                <Button variant="link" className="p-0 h-auto text-primary">
                  Contact Support
                </Button>
              </p>
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent text-white">Contact Support</Button>
                <Button variant="outline">Browse Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Star, Send, CheckCircle, Lightbulb, Bug } from "lucide-react"

interface FeedbackSystemProps {
  isLoggedIn: boolean
  userType?: "student" | "admin"
}

export function FeedbackSystem({ isLoggedIn, userType }: FeedbackSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    category: "",
    rating: 0,
    subject: "",
    message: "",
    anonymous: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { value: "feature", label: "Feature Request", icon: Lightbulb, color: "bg-blue-100 text-blue-800" },
    { value: "bug", label: "Bug Report", icon: Bug, color: "bg-red-100 text-red-800" },
    { value: "improvement", label: "Improvement", icon: Star, color: "bg-yellow-100 text-yellow-800" },
    { value: "general", label: "General Feedback", icon: MessageSquare, color: "bg-green-100 text-green-800" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setIsOpen(false)
      setFeedbackData({
        name: "",
        email: "",
        category: "",
        rating: 0,
        subject: "",
        message: "",
        anonymous: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: any) => {
    setFeedbackData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange("rating", star)}
            className={`w-8 h-8 rounded-full transition-all duration-200 ${
              star <= feedbackData.rating
                ? "text-yellow-400 hover:text-yellow-500"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            <Star className={`w-6 h-6 ${star <= feedbackData.rating ? "fill-current" : ""}`} />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {feedbackData.rating > 0 ? `${feedbackData.rating}/5` : "Rate your experience"}
        </span>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Card className="w-96 max-h-[600px] overflow-hidden shadow-2xl animate-slide-in-up border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Feedback & Suggestions</span>
              </CardTitle>
              <CardDescription>
                {isLoggedIn ? "Help us improve EduTimely" : "Share your thoughts with us"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto p-6">
            {isSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your feedback has been submitted successfully. We appreciate your input!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Info (if not logged in) */}
                {!isLoggedIn && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <Input
                        value={feedbackData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input
                        type="email"
                        value={feedbackData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={feedbackData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const IconComponent = category.icon
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Overall Rating</label>
                  {renderStars()}
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Input
                    value={feedbackData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief summary of your feedback"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea
                    value={feedbackData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide detailed feedback..."
                    rows={4}
                    required
                  />
                </div>

                {/* User Type Badge */}
                {isLoggedIn && (
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/10 text-primary">Logged in as {userType}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Your identity will be included with this feedback
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

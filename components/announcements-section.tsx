"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Calendar, Users, ArrowRight, Bell } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  category: "academic" | "event" | "system" | "general"
  priority: "low" | "medium" | "high"
  author: string
}

export function AnnouncementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Mid-Semester Examinations Schedule Released",
      content:
        "The mid-semester examination schedule for all departments has been published. Students can view their exam timetable in the dashboard. Please ensure you're prepared and check the venue details.",
      date: "2024-03-15",
      category: "academic",
      priority: "high",
      author: "Academic Office",
    },
    {
      id: "2",
      title: "Annual Tech Fest 2024 - Registration Open",
      content:
        "Join us for the biggest tech event of the year! Register now for coding competitions, hackathons, and technical workshops. Prizes worth ₹50,000 to be won.",
      date: "2024-03-14",
      category: "event",
      priority: "medium",
      author: "Student Council",
    },
    {
      id: "3",
      title: "EduTimely System Upgrade Completed",
      content:
        "We've successfully upgraded our servers with new AI-powered features including smart attendance tracking, predictive analytics, and enhanced performance monitoring.",
      date: "2024-03-13",
      category: "system",
      priority: "low",
      author: "IT Department",
    },
    {
      id: "4",
      title: "Library Extended Hours During Exam Period",
      content:
        "The central library will remain open 24/7 during the examination period (March 20-30). Additional study spaces and resources have been arranged for students.",
      date: "2024-03-12",
      category: "general",
      priority: "medium",
      author: "Library Administration",
    },
  ]

  const categories = [
    { id: "all", label: "All", icon: Bell },
    { id: "academic", label: "Academic", icon: Calendar },
    { id: "event", label: "Events", icon: Users },
    { id: "system", label: "System", icon: Megaphone },
    { id: "general", label: "General", icon: ArrowRight },
  ]

  const filteredAnnouncements =
    selectedCategory === "all" ? announcements : announcements.filter((a) => a.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "system":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 scroll-reveal">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Latest Announcements
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, events, and important information from your institution
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 scroll-reveal">
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
                      : "hover:bg-primary/10"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* Announcements Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAnnouncements.map((announcement, index) => (
              <Card
                key={announcement.id}
                className={`scroll-reveal hover:shadow-lg transition-all duration-300 border-l-4 ${getPriorityColor(announcement.priority)} hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">{announcement.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                        <Badge
                          variant={announcement.priority === "high" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {announcement.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{announcement.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {announcement.author}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
              <p className="text-muted-foreground">No announcements available for the selected category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

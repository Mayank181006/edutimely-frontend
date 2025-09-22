"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  Download,
  ExternalLink,
  FileText,
  Video,
  Settings,
  BarChart3,
  Calendar,
  ClipboardList,
  UserCheck,
  GraduationCap,
} from "lucide-react"

interface ResourcesPageProps {
  onNavigateToHome: () => void
}

interface Resource {
  id: string
  title: string
  description: string
  type: "guide" | "video" | "document" | "template"
  category: "student" | "admin"
  downloadUrl?: string
  externalUrl?: string
  icon: any
  tags: string[]
}

export function ResourcesPage({ onNavigateToHome }: ResourcesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<"student" | "admin">("student")

  const resources: Resource[] = [
    // Student Resources
    {
      id: "s1",
      title: "Student Quick Start Guide",
      description:
        "Complete guide to get started with EduTimely as a student. Learn how to view timetables, check attendance, and submit assignments.",
      type: "guide",
      category: "student",
      icon: GraduationCap,
      tags: ["beginner", "setup", "basics"],
      externalUrl: "#",
    },
    {
      id: "s2",
      title: "How to Check Attendance",
      description:
        "Step-by-step instructions on viewing your attendance records, understanding percentages, and setting up alerts.",
      type: "video",
      category: "student",
      icon: UserCheck,
      tags: ["attendance", "tutorial", "alerts"],
      externalUrl: "#",
    },
    {
      id: "s3",
      title: "Assignment Submission Guide",
      description:
        "Learn how to submit assignments, check deadlines, view feedback, and track your submission history.",
      type: "document",
      category: "student",
      icon: ClipboardList,
      tags: ["assignments", "deadlines", "submission"],
      downloadUrl: "/docs/assignment-guide.pdf",
    },
    {
      id: "s4",
      title: "Timetable Management",
      description: "Understand how to view your class schedule, set reminders, and sync with external calendars.",
      type: "guide",
      category: "student",
      icon: Calendar,
      tags: ["timetable", "schedule", "calendar"],
      externalUrl: "#",
    },
    {
      id: "s5",
      title: "Performance Analytics Dashboard",
      description: "Guide to understanding your academic performance metrics, trends, and improvement suggestions.",
      type: "video",
      category: "student",
      icon: BarChart3,
      tags: ["analytics", "performance", "grades"],
      externalUrl: "#",
    },
    {
      id: "s6",
      title: "Student Report Template",
      description: "Downloadable template for generating comprehensive student performance reports.",
      type: "template",
      category: "student",
      icon: FileText,
      tags: ["template", "reports", "download"],
      downloadUrl: "/templates/student-report.xlsx",
    },

    // Admin Resources
    {
      id: "a1",
      title: "Admin Setup & Configuration",
      description: "Complete administrator guide covering initial setup, user management, and system configuration.",
      type: "guide",
      category: "admin",
      icon: Settings,
      tags: ["setup", "configuration", "admin"],
      externalUrl: "#",
    },
    {
      id: "a2",
      title: "Student Management System",
      description: "Learn how to add students, manage enrollments, assign classes, and handle bulk operations.",
      type: "video",
      category: "admin",
      icon: Users,
      tags: ["students", "management", "enrollment"],
      externalUrl: "#",
    },
    {
      id: "a3",
      title: "Timetable Creation Guide",
      description:
        "Step-by-step process for creating and managing timetables, handling conflicts, and publishing schedules.",
      type: "document",
      category: "admin",
      icon: Calendar,
      tags: ["timetable", "scheduling", "conflicts"],
      downloadUrl: "/docs/timetable-admin.pdf",
    },
    {
      id: "a4",
      title: "Attendance Management",
      description:
        "Comprehensive guide on setting up attendance tracking, managing exceptions, and generating reports.",
      type: "guide",
      category: "admin",
      icon: UserCheck,
      tags: ["attendance", "tracking", "reports"],
      externalUrl: "#",
    },
    {
      id: "a5",
      title: "Analytics & Reporting",
      description:
        "Learn to generate institutional reports, analyze trends, and create custom dashboards for insights.",
      type: "video",
      category: "admin",
      icon: BarChart3,
      tags: ["analytics", "reports", "insights"],
      externalUrl: "#",
    },
    {
      id: "a6",
      title: "Admin Report Templates",
      description: "Collection of pre-built templates for various administrative reports and data exports.",
      type: "template",
      category: "admin",
      icon: FileText,
      tags: ["templates", "reports", "admin"],
      downloadUrl: "/templates/admin-reports.zip",
    },
  ]

  const filteredResources = resources.filter((resource) => resource.category === selectedCategory)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "template":
        return <Download className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800 border-red-200"
      case "document":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "template":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-purple-100 text-purple-800 border-purple-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduTimely Resources
            </span>
          </div>
          <Button variant="outline" onClick={onNavigateToHome}>
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Documentation & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides, tutorials, and resources to help you make the most of EduTimely. Whether you're a
              student or administrator, find everything you need to succeed.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as "student" | "admin")}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="student" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>For Students</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>For Admins</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Student Resources</h2>
                <p className="text-muted-foreground">
                  Learn how to use EduTimely features as a student - from checking attendance to submitting assignments.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Administrator Resources</h2>
                <p className="text-muted-foreground">
                  Complete guides for administrators on managing students, creating timetables, and generating reports.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card
                  key={resource.id}
                  className="animate-slide-in-up hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {resource.downloadUrl && (
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {resource.externalUrl && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Guide
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Help Section */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Need More Help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the resource you're looking for? Our support team is ready to assist you with personalized
                guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent text-white">Contact Support</Button>
                <Button variant="outline">Request New Resource</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

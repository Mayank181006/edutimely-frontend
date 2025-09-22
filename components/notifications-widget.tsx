"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, X, Calendar, AlertTriangle, Info, CheckCircle } from "lucide-react"

interface Notification {
  id: string
  type: "info" | "warning" | "success" | "announcement"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
}

interface NotificationsWidgetProps {
  isLoggedIn: boolean
  userType?: "student" | "admin"
}

export function NotificationsWidget({ isLoggedIn, userType }: NotificationsWidgetProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Demo notifications - different for logged in vs not logged in users
    const demoNotifications: Notification[] = isLoggedIn
      ? [
          {
            id: "1",
            type: "warning",
            title: "Attendance Alert",
            message:
              userType === "student"
                ? "Your attendance is below 75% in Mathematics. Please attend upcoming classes."
                : "5 students have attendance below 75% this week.",
            timestamp: "2 hours ago",
            isRead: false,
            priority: "high",
          },
          {
            id: "2",
            type: "info",
            title: "Assignment Due",
            message:
              userType === "student"
                ? "Physics Lab Report due tomorrow at 11:59 PM"
                : "15 assignments pending review in your subjects",
            timestamp: "4 hours ago",
            isRead: false,
            priority: "medium",
          },
          {
            id: "3",
            type: "success",
            title: "Grade Updated",
            message:
              userType === "student"
                ? "Your Chemistry test score has been updated: 85/100"
                : "Successfully updated grades for 30 students",
            timestamp: "1 day ago",
            isRead: true,
            priority: "low",
          },
          {
            id: "4",
            type: "announcement",
            title: "System Maintenance",
            message: "EduTimely will undergo maintenance on Sunday 2-4 AM. Services may be temporarily unavailable.",
            timestamp: "2 days ago",
            isRead: true,
            priority: "medium",
          },
        ]
      : [
          {
            id: "demo1",
            type: "announcement",
            title: "Welcome to EduTimely!",
            message: "Experience the future of educational management. Login to access personalized features.",
            timestamp: "Just now",
            isRead: false,
            priority: "high",
          },
          {
            id: "demo2",
            type: "info",
            title: "New Features Available",
            message: "Smart attendance tracking, AI-powered analytics, and automated report generation now live!",
            timestamp: "1 hour ago",
            isRead: false,
            priority: "medium",
          },
          {
            id: "demo3",
            type: "success",
            title: "SIH 2025 Ready",
            message: "EduTimely is fully prepared for Smart India Hackathon evaluation with all required features.",
            timestamp: "3 hours ago",
            isRead: true,
            priority: "low",
          },
        ]

    setNotifications(demoNotifications)
  }, [isLoggedIn, userType])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "announcement":
        return <Bell className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50"
      case "medium":
        return "border-l-orange-500 bg-orange-50/50"
      default:
        return "border-l-blue-500 bg-blue-50/50"
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Notification Bell */}
      <div className="relative">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <Bell className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      {isExpanded && (
        <Card className="absolute bottom-16 right-0 w-96 max-h-96 overflow-hidden shadow-2xl animate-slide-in-up border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span>Notifications</span>
                </CardTitle>
                <CardDescription>{isLoggedIn ? "Your latest updates" : "Demo notifications"}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 ${getPriorityColor(
                        notification.priority,
                      )} ${!notification.isRead ? "bg-primary/5" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`text-sm font-medium truncate ${
                                !notification.isRead ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></div>
                            )}
                          </div>
                          <p
                            className={`text-xs leading-relaxed ${
                              !notification.isRead ? "text-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {notification.timestamp}
                            </span>
                            <Badge
                              variant={notification.priority === "high" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

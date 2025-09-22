"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Shield } from "lucide-react"

interface RegisterSelectionProps {
  onSelectUserType: (userType: "student" | "admin") => void
  onNavigateToHome: () => void
}

export function RegisterSelection({ onSelectUserType, onNavigateToHome }: RegisterSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden px-2 sm:px-4">
      <Button onClick={onNavigateToHome} variant="ghost" className="fixed top-4 left-4 z-50 flex items-center gap-2 text-sm sm:text-base">
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        Back to Home
      </Button>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-secondary/5 rounded-full animate-pulse"></div>
      </div>

      <div className="w-full mt-20 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 sm:mb-4">
            Choose Registration Type
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Select how you want to register with EduTimely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card
            className="glass animate-scale-in cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => onSelectUserType("student")}
          >
            <CardHeader className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold">Register as Student</CardTitle>
              <CardDescription className="text-sm sm:text-base">Access your courses, assignments, and timetables</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                <li>• View class timetables</li>
                <li>• Access assignments and modules</li>
                <li>• View student database</li>
                <li>• Manage account settings</li>
              </ul>
              <Button className="w-full text-sm sm:text-base bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Register as Student
              </Button>
            </CardContent>
          </Card>

          <Card
            className="glass animate-scale-in cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => onSelectUserType("admin")}
          >
            <CardHeader className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold">Register as Admin</CardTitle>
              <CardDescription className="text-sm sm:text-base">Manage the educational platform and students</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                <li>• Edit and manage timetables</li>
                <li>• Full student database access</li>
                <li>• Manage admin database</li>
                <li>• Create assignments and modules</li>
              </ul>
              <Button className="w-full text-sm sm:text-base bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Register as Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

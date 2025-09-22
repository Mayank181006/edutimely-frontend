// client/components/login-page.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// --- 1. UPDATE THE onLogin PROP TO ACCEPT REAL CREDENTIALS ---
interface LoginPageProps {
  onLogin: (email: string, password: string, userType: "student" | "admin") => Promise<void>;
  onNavigateToRegister: () => void;
  onNavigateToHome: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister, onNavigateToHome }: LoginPageProps) {
  // --- 2. CHANGE STATE FROM `username` TO `email` ---
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"student" | "admin">("admin") // Default to admin for convenience
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("") // Add state to hold error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("") // Clear previous errors

    try {
      // --- 3. CALL THE REAL onLogin FUNCTION WITH ALL CREDENTIALS ---
      await onLogin(email, password, userType)
      // On success, the parent App component will handle navigation to the dashboard
    } catch (err: any) {
      // If onLogin throws an error (e.g., 401 Unauthorized), we catch it here
      setError(err.message || "An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden animate-site-opening">
      <Button onClick={onNavigateToHome} variant="ghost" className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>

      {/* Animated background elements (unchanged) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute -bottom-10 -left-30 w-96 h-96 bg-accent/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md mx-4 glass animate-scale-in relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-white border-2 border-accent rounded-full flex items-center justify-center animate-pulse-glow">
            <img src="/EduTIMELY_LOGO_Icon.png" alt="" className="w-12 h-12 object-cover" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            EduTimely Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Login As</Label>
              <Select value={userType} onValueChange={(value: "student" | "admin") => setUserType(value)}>
                <SelectTrigger className="glass-dark">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* --- 4. UPDATE INPUTS TO USE `email` --- */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-dark transition-all duration-300 focus:scale-105"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-dark transition-all duration-300 focus:scale-105"
                required
              />
            </div>
            {/* --- 5. DISPLAY THE ERROR MESSAGE --- */}
            {error && <p className="text-sm text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 text-white font-semibold shadow-lg border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          <div className="w-full h-0.5 bg-primary/40 my-4"></div>
          <div className=" text-center">
            <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
            <Button
              onClick={onNavigateToRegister}
              variant="outline"
              className="w-full bg-white/90 text-primary border-primary/30 hover:bg-primary hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Register New Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
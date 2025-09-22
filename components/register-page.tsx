// client/components/register-page.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users, Shield } from "lucide-react"
import api from "@/lib/api" // <-- 1. IMPORT OUR API SERVICE

interface RegisterPageProps {
  onNavigateToLogin: () => void
  onNavigateToHome: () => void
  userType: "student" | "admin"
}

export function RegisterPage({ onNavigateToLogin, onNavigateToHome, userType }: RegisterPageProps) {
  // --- 2. UPDATE STATE TO MATCH BACKEND REQUIREMENTS ---
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [departmentId, setDepartmentId] = useState("") // NOTE: In a real app, this would be a dropdown.
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // --- 3. ADD CLIENT-SIDE VALIDATION ---
    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      setIsLoading(false)
      return
    }

    // --- 4. REPLACE MOCK LOGIC WITH A REAL API CALL ---
    try {
      const payload = {
        email,
        password,
        full_name: fullName,
        registration_number: registrationNumber,
        department_id: departmentId || null, // Send null if empty
      }
      
      await api.post("/auth/student/register", payload)

      setSuccess("Registration successful! You will be redirected to the login page shortly.")
      setTimeout(() => {
        onNavigateToLogin()
      }, 3000) // Wait 3 seconds before redirecting

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <Button onClick={onNavigateToLogin} variant="ghost" className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Button>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md mx-4 glass animate-scale-in relative z-10">
        <CardHeader className="text-center space-y-2">
          <div
            className={`mx-auto w-16 h-16 bg-gradient-to-br ${userType === "admin" ? "from-purple-500 to-purple-600" : "from-blue-500 to-blue-600"} rounded-full flex items-center justify-center animate-pulse-glow`}
          >
            {userType === "admin" ? (
              <Shield className="w-8 h-8 text-white" />
            ) : (
              <Users className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Register as {userType === "admin" ? "Admin" : "Student"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your {userType} account to access EduTimely
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- 5. HANDLE THE ADMIN REGISTRATION CASE --- */}
          {userType === 'admin' ? (
            <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <p>Admin registration is not public.</p>
              <p className="mt-2 text-sm">A Super Admin must create new admin accounts from the dashboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* --- 6. UPDATE FORM FIELDS --- */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="glass-dark"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="glass-dark"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required className="glass-dark"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="departmentId">Department ID (Optional)</Label>
                <Input id="departmentId" placeholder="Ask your admin for this ID" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className="glass-dark"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="glass-dark"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="glass-dark"/>
              </div>
              {/* --- 7. DISPLAY SUCCESS/ERROR MESSAGES --- */}
              {error && <p className="text-sm text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
              {success && <p className="text-sm text-center text-green-500 bg-green-100 p-2 rounded-md">{success}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Student Account'}
              </Button>
            </form>
          )}
          <div className="mt-4 text-center">
            <Button onClick={onNavigateToLogin} variant="outline" className="w-full bg-transparent">
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// client/app/page.tsx
"use client"

import { useState, useEffect } from "react"
// --- IMPORT THE HOOKS AND SERVICES ---
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api"
// ---

import { HomePage } from "@/components/home-page"
import { LoginPage } from "@/components/login-page"
import { RegisterPage } from "@/components/register-page"
import { RegisterSelection } from "@/components/register-selection"
import { DashboardPage } from "@/components/dashboard-page"
import { WelcomePopup } from "@/components/welcome-popup"
import { ContactPage } from "@/components/contact-page"
import { ResourcesPage } from "@/components/resources-page"
import { PrivacyPolicyPage } from "@/components/privacy-policy-page"
import { HelpSupportWidget } from "@/components/help-support-widget"

type PageType = "home" | "login" | "register" | "register-selection" | "dashboard" | "contact" | "resources" | "privacy"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [registerUserType, setRegisterUserType] = useState<"student" | "admin">("student")

  const { user, login, logout, isLoading } = useAuth()

  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showGoodbyePopup, setShowGoodbyePopup] = useState(false)

  // ==================================================================
  // THIS IS THE CRITICAL LOGIC (STEP 2 from our previous discussion)
  // This hook watches for changes in the user's login state.
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // If the user object exists, it means they are logged in.
        // We set the current page to "dashboard".
        setCurrentPage("dashboard")
      } else {
        // If the user object is null, it means they are logged out.
        // We set the current page to "home".
        setCurrentPage("home")
      }
    }
  }, [user, isLoading]) // This runs every time `user` or `isLoading` changes.
  // ==================================================================

  const handleLogin = async (email: string, password: string, userType: "student" | "admin") => {
    try {
      const endpoint = userType === 'admin' ? '/auth/admin/login' : '/auth/student/login';
      const response = await api.post(endpoint, { email, password });

      if (response.data.token) {
        login(response.data.token);
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials. Please try again.");
    }
  }

  const handleLogout = () => {
    setShowGoodbyePopup(true)
  }

  const completeLogout = () => {
    logout();
    // No need to set page here, the useEffect above will handle it automatically.
    setShowGoodbyePopup(false)
  }

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page)
  }

  const handleRegisterSelection = (selectedUserType: "student" | "admin") => {
    setRegisterUserType(selectedUserType)
    setCurrentPage("register")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
              <img src="/EduTIMELY_LOGO_Icon.png" alt="" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse">EduTimely</h2>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === "home" && (
        <HomePage
          onNavigateToLogin={() => navigateToPage("login")}
          onNavigateToDashboard={() => navigateToPage("dashboard")}
          onNavigateToContact={() => navigateToPage("contact")}
          onNavigateToResources={() => navigateToPage("resources")}
          onNavigateToPrivacy={() => navigateToPage("privacy")}
          isLoggedIn={!!user}
          onLogout={handleLogout}
          userType={user?.user_type as "student" | "admin"}
        />
      )}
      {currentPage === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => navigateToPage("register-selection")}
          onNavigateToHome={() => navigateToPage("home")}
        />
      )}
      {currentPage === "register-selection" && (
        <RegisterSelection onSelectUserType={handleRegisterSelection} onNavigateToHome={() => navigateToPage("home")} />
      )}
      {currentPage === "register" && (
        <RegisterPage
          onNavigateToLogin={() => navigateToPage("login")}
          onNavigateToHome={() => navigateToPage("home")}
          userType={registerUserType}
        />
      )}

      {currentPage === "dashboard" && user && (
        <DashboardPage
          onLogout={handleLogout}
          onNavigateToHome={() => navigateToPage("home")}
          userType={user.user_type as "student" | "admin"}
          user={user} // <-- ADD THIS LINE
        />
      )}
      {currentPage === "contact" && <ContactPage onNavigateToHome={() => navigateToPage("home")} />}
      {currentPage === "resources" && <ResourcesPage onNavigateToHome={() => navigateToPage("home")} />}
      {currentPage === "privacy" && <PrivacyPolicyPage onNavigateToHome={() => navigateToPage("home")} />}

      <HelpSupportWidget />

      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        title="Welcome to EduTimely!"
        message="You have successfully logged in. Enjoy exploring your educational dashboard!"
        type="welcome"
      />

      <WelcomePopup
        isOpen={showGoodbyePopup}
        onClose={completeLogout}
        title="Thank You for Visiting!"
        message="We hope you had a great experience with EduTimely. See you again soon!"
        type="goodbye"
      />
    </div>
  )
}
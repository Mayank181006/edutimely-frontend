"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, Users, FileText, Calendar, AlertTriangle } from "lucide-react"

interface PrivacyPolicyPageProps {
  onNavigateToHome: () => void
}

export function PrivacyPolicyPage({ onNavigateToHome }: PrivacyPolicyPageProps) {
  const lastUpdated = "March 15, 2024"

  const sections = [
    {
      id: "data-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal Information: Name, email address, student/employee ID, contact details",
        "Academic Data: Attendance records, grades, assignment submissions, timetable information",
        "Usage Data: Login times, feature usage patterns, system interactions",
        "Device Information: Browser type, IP address, device identifiers (for security purposes only)",
      ],
    },
    {
      id: "data-usage",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide educational management services and maintain academic records",
        "Generate attendance reports, performance analytics, and academic insights",
        "Send important notifications about classes, assignments, and institutional updates",
        "Improve our platform through usage analytics and user feedback",
        "Ensure system security and prevent unauthorized access",
      ],
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        "We DO NOT sell, trade, or rent your personal information to third parties",
        "Academic data is shared only with authorized faculty and administrative staff",
        "Parents/guardians may access student information as per institutional policies",
        "Anonymous, aggregated data may be used for research and improvement purposes",
        "Legal compliance: Information may be disclosed if required by law or court order",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        "All data is encrypted in transit and at rest using industry-standard protocols",
        "Access controls ensure only authorized personnel can view sensitive information",
        "Regular security audits and vulnerability assessments are conducted",
        "Secure backup systems protect against data loss",
        "Multi-factor authentication is required for administrative access",
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access: Request a copy of your personal data stored in our system",
        "Correction: Request correction of inaccurate or incomplete information",
        "Deletion: Request deletion of your data (subject to legal and institutional requirements)",
        "Portability: Request transfer of your data in a machine-readable format",
        "Objection: Object to certain types of data processing",
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: Calendar,
      content: [
        "Student academic records are retained as per institutional and regulatory requirements",
        "Login and usage logs are kept for 12 months for security purposes",
        "Personal information is deleted within 30 days of account closure (where legally permissible)",
        "Backup data is automatically purged according to our retention schedule",
        "Some data may be retained longer for legal compliance or legitimate business purposes",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduTimely Privacy Policy
            </span>
          </div>
          <Button variant="outline" onClick={onNavigateToHome}>
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Your privacy is important to us. This policy explains how EduTimely collects, uses, and protects your
              personal information.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Last Updated: {lastUpdated}</span>
              </Badge>
              <Badge className="bg-green-100 text-green-800">GDPR Compliant</Badge>
            </div>
          </div>

          {/* Quick Summary */}
          <Card className="mb-8 animate-slide-in-up border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span>Privacy at a Glance</span>
              </CardTitle>
              <CardDescription>Key points about how we handle your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600">Data Protection</h4>
                    <p className="text-sm text-muted-foreground">All data is encrypted and securely stored</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Limited Access</h4>
                    <p className="text-sm text-muted-foreground">Only authorized staff can access your data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600">No Third-Party Sales</h4>
                    <p className="text-sm text-muted-foreground">We never sell your personal information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600">Your Rights</h4>
                    <p className="text-sm text-muted-foreground">Access, correct, or delete your data anytime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Card
                  key={section.id}
                  className="animate-slide-in-up hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Questions About Privacy?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or how we handle your data, please don't hesitate to
                contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent text-white">Contact Privacy Officer</Button>
                <Button variant="outline">Data Protection Request</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Email: privacy@edutimely.com | Phone: +91 98765 43210
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

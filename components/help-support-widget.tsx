"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, X, MessageCircle, Phone, Mail, Search, ChevronRight, ExternalLink, Send } from "lucide-react"

const quickHelp = [
  {
    question: "How to login as student/admin?",
    answer: "Use your institutional email and password. Select your role from the dropdown before logging in.",
  },
  {
    question: "What if I forget my password?",
    answer: "Click 'Forgot Password' on the login page and follow the email instructions to reset it.",
  },
  {
    question: "Can I edit timetable as a student?",
    answer: "No, only administrators can edit timetables. Students can view and download their schedules.",
  },
  {
    question: "How to download attendance report?",
    answer: "Go to Dashboard → Reports → Download Attendance Report. The PDF will be generated automatically.",
  },
  {
    question: "How to submit assignments?",
    answer: "Navigate to Assignments section, select the assignment, and upload your file before the deadline.",
  },
]

export function HelpSupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "chat">("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [chatMessage, setChatMessage] = useState("")

  const filteredHelp = quickHelp.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In real app, this would send to support system
      alert("Message sent to support team! We'll get back to you soon.")
      setChatMessage("")
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HelpCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Help & Support</CardTitle>
              <CardDescription className="text-blue-100">We're here to help you</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-1 mt-4">
            {[
              { id: "faq", label: "FAQ", icon: HelpCircle },
              { id: "contact", label: "Contact", icon: Phone },
              { id: "chat", label: "Chat", icon: MessageCircle },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-white hover:bg-white/20 ${activeTab === tab.id ? "bg-white/20" : ""}`}
              >
                <tab.icon className="h-4 w-4 mr-1" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-4 h-[400px] overflow-y-auto">
          {activeTab === "faq" && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-3">
                {filteredHelp.map((item, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-blue-600" />
                      {item.question}
                    </h4>
                    <p className="text-sm text-gray-600 ml-5">{item.answer}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("contact")}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Need More Help?
                </Button>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600">Get in touch with our support team</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@edutimely.com</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">Response time: Within 24 hours</p>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Message</h3>
                <p className="text-sm text-gray-600">Send us a message and we'll get back to you</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <Textarea
                    placeholder="Describe your issue or question..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!chatMessage.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> For faster support, include your student ID and describe the specific issue
                  you're facing.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

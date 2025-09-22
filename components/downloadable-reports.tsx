"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, BarChart3, Calendar, User, Loader2 } from "lucide-react"

interface ReportData {
  studentName: string
  studentId: string
  semester: string
  totalClasses: number
  attendedClasses: number
  attendancePercentage: number
  subjects: Array<{
    name: string
    totalClasses: number
    attended: number
    percentage: number
  }>
  assignments: Array<{
    subject: string
    title: string
    dueDate: string
    status: "completed" | "pending" | "overdue"
    score?: number
  }>
  overallGrade: string
}

const mockReportData: ReportData = {
  studentName: "John Doe",
  studentId: "STU2024001",
  semester: "Fall 2024",
  totalClasses: 120,
  attendedClasses: 108,
  attendancePercentage: 90,
  subjects: [
    { name: "Mathematics", totalClasses: 30, attended: 28, percentage: 93.3 },
    { name: "Physics", totalClasses: 25, attended: 22, percentage: 88.0 },
    { name: "Chemistry", totalClasses: 25, attended: 23, percentage: 92.0 },
    { name: "Computer Science", totalClasses: 40, attended: 35, percentage: 87.5 },
  ],
  assignments: [
    { subject: "Mathematics", title: "Calculus Assignment 1", dueDate: "2024-01-15", status: "completed", score: 85 },
    { subject: "Physics", title: "Mechanics Lab Report", dueDate: "2024-01-20", status: "completed", score: 92 },
    { subject: "Chemistry", title: "Organic Chemistry Quiz", dueDate: "2024-01-25", status: "pending" },
    { subject: "Computer Science", title: "Data Structures Project", dueDate: "2024-01-30", status: "overdue" },
  ],
  overallGrade: "A-",
}

export function DownloadableReports() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const generatePDF = async (reportType: string) => {
    setIsGenerating(reportType)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a simple text-based report (in real app, use jsPDF or similar)
    const reportContent = generateReportContent(reportType)
    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${reportType.toLowerCase().replace(" ", "_")}_report.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setIsGenerating(null)
  }

  const generateReportContent = (reportType: string): string => {
    const data = mockReportData
    const date = new Date().toLocaleDateString()

    if (reportType === "Attendance Report") {
      return `
EDUTIMELY - ATTENDANCE REPORT
Generated on: ${date}

Student Information:
Name: ${data.studentName}
Student ID: ${data.studentId}
Semester: ${data.semester}

Overall Attendance:
Total Classes: ${data.totalClasses}
Attended Classes: ${data.attendedClasses}
Attendance Percentage: ${data.attendancePercentage}%

Subject-wise Attendance:
${data.subjects
  .map((subject) => `${subject.name}: ${subject.attended}/${subject.totalClasses} (${subject.percentage}%)`)
  .join("\n")}

Status: ${data.attendancePercentage >= 75 ? "SATISFACTORY" : "BELOW MINIMUM REQUIREMENT"}

Note: Minimum 75% attendance required for exam eligibility.
      `
    } else {
      return `
EDUTIMELY - PERFORMANCE REPORT
Generated on: ${date}

Student Information:
Name: ${data.studentName}
Student ID: ${data.studentId}
Semester: ${data.semester}

Overall Performance:
Grade: ${data.overallGrade}
Attendance: ${data.attendancePercentage}%

Assignment Status:
${data.assignments
  .map(
    (assignment) =>
      `${assignment.subject} - ${assignment.title}: ${assignment.status.toUpperCase()}${assignment.score ? ` (${assignment.score}/100)` : ""}`,
  )
  .join("\n")}

Subject Performance:
${data.subjects.map((subject) => `${subject.name}: ${subject.percentage}% attendance`).join("\n")}

Recommendations:
- Maintain consistent attendance
- Complete pending assignments
- Focus on overdue submissions
      `
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Downloadable Reports</h2>
        <p className="text-gray-600">Generate and download your academic reports</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Attendance Report</CardTitle>
                <CardDescription>Detailed attendance summary with subject-wise breakdown</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Report Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Overall attendance percentage</li>
                  <li>• Subject-wise attendance details</li>
                  <li>• Monthly attendance trends</li>
                  <li>• Eligibility status for exams</li>
                </ul>
              </div>
              <Button
                onClick={() => generatePDF("Attendance Report")}
                disabled={isGenerating === "Attendance Report"}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating === "Attendance Report" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Attendance Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Performance Report</CardTitle>
                <CardDescription>Comprehensive academic performance summary</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Report Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Assignment completion status</li>
                  <li>• Grade point average</li>
                  <li>• Subject-wise performance</li>
                  <li>• Improvement recommendations</li>
                </ul>
              </div>
              <Button
                onClick={() => generatePDF("Performance Report")}
                disabled={isGenerating === "Performance Report"}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isGenerating === "Performance Report" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Performance Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-purple-900">Custom Reports</CardTitle>
              <CardDescription className="text-purple-700">Request specific reports or data exports</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <User className="mr-2 h-4 w-4" />
              Request Custom Report
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

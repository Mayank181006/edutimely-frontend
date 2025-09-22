"use client"

import { useState, useEffect } from "react"
import api from "@/lib/api"
// Import all your beautiful components
import { Button } from "@/components/ui/button"
// --- PASTE THESE LINES with your other imports ---

import { Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StudentDashboardWidgets } from "@/components/student-dashboard-widgets"
import { DownloadableReports } from "@/components/downloadable-reports"
import { Textarea } from "@/components/ui/textarea"
import { CSVLink } from "react-csv";
import { User } from "@/context/AuthContext";
import { View, Download } from "lucide-react";
import { Clock, Users, BookOpen, Calendar, Award, Shield, BarChart3, MessageSquare, Settings, Home, LogOut, Database, Plus, Edit, Save, X, Eye, EyeOff, Trash2, Users2 } from "lucide-react"

// --- INTERFACES MATCHING BACKEND API ---
// --- UPDATE THIS INTERFACE ---
interface DashboardPageProps { 
  onLogout: () => void; 
  onNavigateToHome: () => void; 
  userType: "student" | "admin";
  user: User | null; // <-- ADD THIS LINE
}
interface Student { id: string; full_name: string; email: string; registration_number: string; }
interface Admin { id: string; full_name: string; email: string; role: string; }
interface Course { id: string; name: string; }
interface Classroom { id: string; name: string; }
interface TimeSlot { id: string; day_of_week: string; start_time: string; end_time: string; }
interface TimetableEntry { timetable_id: string; course_name: string; faculty_name: string; classroom_name: string; day_of_week: string; start_time: string; end_time: string; student_group_id?: string; group_name?: string; }
interface Assignment { id: string; title: string; course_name: string; due_date: string; submission_id: string | null; grade: number | null; }
interface AttendanceRecord { id: string; attendance_date: string; status: 'Present' | 'Absent' | 'Leave'; student_name: string; course_name: string; }
interface PerformanceRecord { id: string; grade: number; student_name: string; assignment_title: string; }
interface DashboardStats { students: number; admins: number; courses: number; assignments: number; }
interface Notification { id: string; message: string; created_at: string; }
interface UserProfile { id: string; full_name: string; email: string; user_type: string; }
interface Feedback { id: string; category: string; message: string; created_at: string; student_name: string; }
interface StudentGroup { id: string; name: string; year: number; member_count: string; }

export function DashboardPage({ onLogout, onNavigateToHome, userType , user}: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState(userType === "student" ? "overview" : "student_groups")

  // --- REAL DATA STATE ---
  const [students, setStudents] = useState<Student[]>([])
  // --- PASTE THESE LINES with your other useState hooks ---

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ type: 'day', timeframe: 'single', value: 'Monday' });
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<TimetableEntry[]>([]);
  const [viewTitle, setViewTitle] = useState("");
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", year: "" });
  const [admins, setAdmins] = useState<Admin[]>([])
  const [timetable, setTimetable] = useState<TimetableEntry[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [performance, setPerformance] = useState<PerformanceRecord[]>([])
  const [analytics, setAnalytics] = useState<DashboardStats | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([])

  // --- STATE FOR FORM DROPDOWNS ---
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allFaculty, setAllFaculty] = useState<Admin[]>([]);
  const [allClassrooms, setAllClassrooms] = useState<Classroom[]>([]);
  const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([]);
  const [isViewTimetableOpen, setIsViewTimetableOpen] = useState(false);
  const [selectedGroupTimetable, setSelectedGroupTimetable] = useState<TimetableEntry[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({ full_name: "", email: "", password: "", registration_number: "" })
  const [isCreateTimetableOpen, setIsCreateTimetableOpen] = useState(false);
  const [newTimetableEntry, setNewTimetableEntry] = useState({ course_id: "", faculty_id: "", classroom_id: "", time_slot_id: "", student_group_id: "" });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- STATE FOR SETTINGS PAGE ---
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

   useEffect(() => {
    const fetchData = async () => {
      // Static sections for a student don't need to fetch data. This is correct.
      if (userType === 'student' && ["reports", "feedback"].includes(activeSection)) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError("");
      try {
        // Special case for the student overview to fetch multiple resources.
        if (userType === 'student' && activeSection === 'overview') {
            const [ttRes, asRes, notifRes] = await Promise.all([
                api.get('/timetable/student'), 
                api.get('/assignments/student'), 
                api.get('/notifications')
            ]);
            setTimetable(ttRes.data); 
            setAssignments(asRes.data); 
            setNotifications(notifRes.data);
        } else {
            // For all other sections and all user types, fetch individually.
            const endpoints: { [key: string]: string } = {
                student_groups: '/student-groups',
                students: '/students',
                admins: '/admins',
                timetable: userType === 'student' ? '/timetable/student' : '/timetable',
                assignments: userType === 'student' ? '/assignments/student' : '/assignments',
                attendance: userType === 'student' ? '/attendance/student' : '/attendance',
                performance: userType === 'student' ? '/performance/student' : '/performance',
                analytics: '/admin/statistics',
                settings: '/auth/profile', // This will now be called for students too
                feedback: '/feedback' // Only called by admins
            };

            if (endpoints[activeSection]) {
                const response = await api.get(endpoints[activeSection]);
                const setters: { [key: string]: Function } = {
                    student_groups: setStudentGroups, students: setStudents, admins: setAdmins, 
                    timetable: setTimetable, assignments: setAssignments, attendance: setAttendance, 
                    performance: setPerformance, analytics: setAnalytics, settings: setUserProfile, 
                    feedback: setFeedbackList
                };
                
                if (setters[activeSection]) {
                    setters[activeSection](response.data);
                }
            }
        }
      } catch (err) {
        setError(`Could not load data for ${activeSection}.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeSection, userType]);

  useEffect(() => {
    if (userType === 'admin') {
      const fetchFormData = async () => {
        try {
          const [coursesRes, facultyRes, classroomsRes, timeSlotsRes, groupsRes] = await Promise.all([
            api.get('/courses'), api.get('/admins'), api.get('/classrooms'), api.get('/time-slots'), api.get('/student-groups')
          ]);
          setAllCourses(coursesRes.data); setAllFaculty(facultyRes.data);
          setAllClassrooms(classroomsRes.data); setAllTimeSlots(timeSlotsRes.data);
          setStudentGroups(groupsRes.data);
        } catch (error) { setError("Could not load form dependency data."); }
      };
      fetchFormData();
    }
  }, [userType]);

  // --- FORM HANDLER FUNCTIONS ---
  const handleProfileUpdate = async () => {
    if (!userProfile) return;
    setFormMessage({ type: "", text: "" });
    try {
      await api.put('/auth/profile', { full_name: userProfile.full_name, email: userProfile.email });
      setFormMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditingProfile(false);
    } catch (err) { setFormMessage({ type: "error", text: "Failed to update profile." }); }
  };
  const handlePasswordChange = async () => {
    setFormMessage({ type: "", text: "" });
    try {
      await api.put('/auth/change-password', passwordData);
      setFormMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) { setFormMessage({ type: "error", text: "Failed to change password. Check current password." }); }
  };
  // --- PASTE THIS NEW FUNCTION with your other form handlers ---
  // --- PASTE THESE NEW FUNCTIONS with your other form handlers ---

  const handleApplyFilter = () => {
    let data = timetable;
    let title = "";

    // Filter the data based on user's selection
    if (filterOptions.type === 'day') {
      data = timetable.filter(entry => entry.day_of_week === filterOptions.value);
      title = `Timetable for ${filterOptions.value}`;
    } else if (filterOptions.type === 'group') {
      data = timetable.filter(entry => entry.student_group_id === filterOptions.value);
      const groupName = studentGroups.find(g => g.id === filterOptions.value)?.name || "";
      title = `Timetable for ${groupName}`;
    } // Add more else-if blocks for 'course' or 'room' if needed

    // If timeframe is 'week', we don't need to filter by day
    if (filterOptions.timeframe === 'week') {
      data = timetable; // Use the full timetable
      if (filterOptions.type === 'group') {
        const groupName = studentGroups.find(g => g.id === filterOptions.value)?.name || "";
        title = `Full Week Timetable for ${groupName}`;
      } else {
        title = "Full Week Timetable";
      }
    }

    setFilteredData(data);
    setViewTitle(title);
    setIsFilterOpen(false); // Close the filter dialog
    setIsViewOpen(true); // Open the view dialog
  };

  // Data preparation for the CSV download
  const csvHeaders = [
    { label: "Day", key: "day_of_week" },
    { label: "Start Time", key: "start_time" },
    { label: "End Time", key: "end_time" },
    { label: "Course", key: "course_name" },
    { label: "Group", key: "group_name" },
    { label: "Faculty", key: "faculty_name" },
    { label: "Room", key: "classroom_name" }
  ];
  const handleViewTimetableClick = (groupId: string, groupName: string) => {
    // Filter the master timetable to find entries only for the selected group
    const groupSchedule = timetable.filter(entry => entry.student_group_id === groupId);
    setSelectedGroupTimetable(groupSchedule);
    setSelectedGroupName(groupName);
    setIsViewTimetableOpen(true);
  };
  // --- PASTE THIS NEW FUNCTION with your other form handlers ---

  const handleCreateGroup = async () => {
    if (!newGroup.name || !newGroup.year) {
      return alert("Please provide a group name and year.");
    }
    try {
      const response = await api.post('/student-groups', {
        name: newGroup.name,
        year: parseInt(newGroup.year, 10) // Convert year to a number
      });

      // Add the new group to the list to update the UI instantly
      // We add member_count: '0' for immediate display
      setStudentGroups([...studentGroups, { ...response.data, member_count: '0' }]);

      setIsAddGroupOpen(false); // Close the dialog
      setNewGroup({ name: "", year: "" }); // Reset the form
    } catch (err) {
      alert("Failed to create student group. The name may already exist.");
    }
  };
  const handleFeedbackSubmit = async () => {
    if (!feedbackCategory || !feedbackMessage) {
      setFeedbackStatus("Please select a category and write a message.");
      setTimeout(() => setFeedbackStatus(""), 3000); return;
    }
    try {
      await api.post('/feedback', { category: feedbackCategory, message: feedbackMessage });
      setFeedbackStatus("Thank you! Your feedback has been submitted.");
      setFeedbackMessage(""); setFeedbackCategory("");
      setTimeout(() => setFeedbackStatus(""), 3000);
    } catch (error) { setFeedbackStatus("Failed to submit feedback. Please try again."); }
  };
  const handleEditClick = (student: Student) => { setEditingStudent(student); setIsEditStudentOpen(true); };
  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    try {
      await api.put(`/students/${editingStudent.id}`, { full_name: editingStudent.full_name, email: editingStudent.email, registration_number: editingStudent.registration_number });
      setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
      setIsEditStudentOpen(false); setEditingStudent(null);
    } catch (err) { alert("Failed to update student."); }
  };
  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/students/${studentId}`);
        setStudents(students.filter(s => s.id !== studentId));
      } catch (err) { alert("Failed to delete student."); }
    }
  };
  const handleCreateTimetable = async () => {
    if (!Object.values(newTimetableEntry).every(field => field)) { return alert("Please fill out all fields."); }
    try {
      await api.post('/timetable', newTimetableEntry);
      const updatedTimetable = await api.get('/timetable');
      setTimetable(updatedTimetable.data);
      setIsCreateTimetableOpen(false);
      setNewTimetableEntry({ course_id: "", faculty_id: "", classroom_id: "", time_slot_id: "", student_group_id: "" });
    } catch (error) { alert("Failed to create timetable entry. Conflict likely."); }
  };
  // In client/components/dashboard-page.tsx

  const handleAddStudent = async () => {
    if (!newStudent.full_name || !newStudent.email || !newStudent.password || !newStudent.registration_number) {
      return alert("Please fill out all required fields.");
    }
    try {
      const response = await api.post('/students', newStudent);

      // --- THIS IS THE FIX ---
      // We check that the backend actually sent back a student object before updating the state
      if (response.data && response.data.student) {
        setStudents([...students, response.data.student]);
        setNewStudent({ full_name: "", email: "", password: "", registration_number: "" });
        setIsAddStudentOpen(false);
      } else {
        // If the backend response is unexpected, we show an error instead of crashing
        alert("Student was created, but an error occurred updating the list.");
      }
    } catch (err) {
      console.error("Failed to add student:", err);
      alert("Failed to add student. The email or registration number may already exist.");
    }
  };
  // In client/components/dashboard-page.tsx

  // --- THIS IS THE NEW, SMARTER AI HANDLER ---
  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    setError("");
    try {
      // The "clear" step is now gone.

      // 1. Generate new schedule to fill the gaps around existing entries
      const response = await api.post('/timetable/generate');

      if (response.data && response.data.status === 'success') {
        // 2. Save the new, additional schedule entries
        // The backend will automatically handle is_locked = FALSE for these
        for (const entry of response.data.schedule) {
          await api.post('/timetable', entry);
        }

        // 3. Fetch the complete, final timetable (manual + new AI) and display it
        const updatedTimetable = await api.get('/timetable');
        setTimetable(updatedTimetable.data);
        alert("AI has successfully completed the timetable around your existing entries!");
      } else {
        throw new Error(response.data.message || "AI generator failed.");
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };
  // --- PASTE THIS BLOCK after your handler functions ---



  const renderContent = () => {
    if (isLoading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

    switch (activeSection) {
      case "overview":
        return userType === "student" ? <StudentDashboardWidgets timetable={timetable} assignments={assignments} notifications={notifications} /> :
          (<div className="animate-slide-in"> <Card><CardHeader><CardTitle>Welcome, Admin!</CardTitle><CardDescription>Select a section to manage.</CardDescription></CardHeader></Card></div>);

      case "student_groups":
        return (
          <Card className="glass animate-slide-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Groups</CardTitle>
                <CardDescription>Manage student cohorts for scheduling</CardDescription>
              </div>
              {/* --- THIS BUTTON NOW OPENS THE DIALOG --- */}
              <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
                <DialogTrigger asChild>
                  <Button><Plus className="w-4 h-4 mr-2" />Create Group</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Student Group</DialogTitle>
                    <DialogDescription>
                      Enter a name and year for the new group (e.g., "FYUP CS - Section A", Year: 1).
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input
                        id="groupName"
                        value={newGroup.name}
                        onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
                        placeholder="e.g., FYUP CS - Section A"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupYear">Year</Label>
                      <Input
                        id="groupYear"
                        type="number"
                        value={newGroup.year}
                        onChange={e => setNewGroup({ ...newGroup, year: e.target.value })}
                        placeholder="e.g., 1"
                      />
                    </div>
                    <Button onClick={handleCreateGroup} className="w-full">Save Group</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {studentGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studentGroups.map((group) => (
                    <div key={group.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm">Year: {group.year}</p>
                      <p className="text-sm">Members: {group.member_count}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-center text-gray-500 py-4">No student groups found.</p>}
            </CardContent>
          </Card>
        );
      case "students":
        return (
          <Card className="glass animate-slide-in">
            <CardHeader className="flex flex-row justify-between items-center"><div><CardTitle>Student Database</CardTitle><CardDescription>Manage student records</CardDescription></div><Button onClick={() => setIsAddStudentOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Student</Button></CardHeader>
            <CardContent>
              {students.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{students.map((student) => (<div key={student.id} className="p-4 border rounded-lg flex flex-col justify-between hover:shadow-lg transition-shadow"><div><h3 className="font-semibold">{student.full_name}</h3><p className="text-sm text-muted-foreground">{student.registration_number}</p><p className="text-sm text-muted-foreground">{student.email}</p></div><div className="flex gap-2 mt-4"><Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditClick(student)}><Edit className="w-3 h-3 mr-2" /> Edit</Button><Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteStudent(student.id)}><Trash2 className="w-3 h-3 mr-2" /> Delete</Button></div></div>))}</div>) : <p className="text-center py-4 text-muted-foreground">No students found.</p>}
            </CardContent>
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}><DialogContent><DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader><div className="space-y-4 py-4"><Input value={newStudent.full_name} onChange={e => setNewStudent({ ...newStudent, full_name: e.target.value })} placeholder="Full Name" /><Input value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} placeholder="Email" /><Input value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })} placeholder="Temporary Password" type="password" /><Input value={newStudent.registration_number} onChange={e => setNewStudent({ ...newStudent, registration_number: e.target.value })} placeholder="Registration Number" /><Button onClick={handleAddStudent} className="w-full">Save Student</Button></div></DialogContent></Dialog>
            <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}><DialogContent><DialogHeader><DialogTitle>Edit Student Details</DialogTitle></DialogHeader>{editingStudent && (<div className="space-y-4 py-4"><div><Label>Full Name</Label><Input value={editingStudent.full_name} onChange={e => setEditingStudent({ ...editingStudent, full_name: e.target.value })} /></div><div><Label>Email Address</Label><Input value={editingStudent.email} onChange={e => setEditingStudent({ ...editingStudent, email: e.target.value })} /></div><div><Label>Registration Number</Label><Input value={editingStudent.registration_number} onChange={e => setEditingStudent({ ...editingStudent, registration_number: e.target.value })} /></div><Button onClick={handleUpdateStudent} className="w-full">Save Changes</Button></div>)}</DialogContent></Dialog>
          </Card>
        );

      case "timetable":
        // --- This logic groups the flat array of timetable entries by day ---
        const groupedTimetable: { [key: string]: TimetableEntry[] } = timetable.reduce((acc, entry) => {
            const day = entry.day_of_week;
            if (!acc[day]) acc[day] = [];
            acc[day].push(entry);
            acc[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
            return acc;
        }, {} as { [key: string]: TimetableEntry[] });

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        return (
          <Card className="glass animate-slide-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Time Table</CardTitle>
                <CardDescription>Full weekly schedule view</CardDescription>
              </div>
              {user && user.role === 'super-admin' && (
                <div className="flex gap-2">
                  {/* --- Button for Simplified View --- */}
                  <Button variant="outline" onClick={() => setIsFilterOpen(true)}><Filter className="w-4 h-4 mr-2"/>View Simplified</Button>
                  
                  {/* --- COMPLETE DIALOG FOR MANUAL CREATION --- */}
                  
                  <Dialog open={isCreateTimetableOpen} onOpenChange={setIsCreateTimetableOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><Plus className="w-4 h-4 mr-2"/>Create Manually</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Manual Timetable Entry</DialogTitle>
                        <DialogDescription>Select all options to schedule a class. The system will prevent conflicts.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Select onValueChange={value => setNewTimetableEntry({...newTimetableEntry, course_id: value})}><SelectTrigger><SelectValue placeholder="Select Course"/></SelectTrigger><SelectContent>{allCourses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
                        <Select onValueChange={value => setNewTimetableEntry({...newTimetableEntry, student_group_id: value})}><SelectTrigger><SelectValue placeholder="Select Student Group"/></SelectTrigger><SelectContent>{studentGroups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent></Select>
                        <Select onValueChange={value => setNewTimetableEntry({...newTimetableEntry, faculty_id: value})}><SelectTrigger><SelectValue placeholder="Select Faculty"/></SelectTrigger><SelectContent>{allFaculty.map(f => <SelectItem key={f.id} value={f.id}>{f.full_name}</SelectItem>)}</SelectContent></Select>
                        <Select onValueChange={value => setNewTimetableEntry({...newTimetableEntry, classroom_id: value})}><SelectTrigger><SelectValue placeholder="Select Classroom"/></SelectTrigger><SelectContent>{allClassrooms.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
                        <Select onValueChange={value => setNewTimetableEntry({...newTimetableEntry, time_slot_id: value})}><SelectTrigger><SelectValue placeholder="Select Time Slot"/></SelectTrigger><SelectContent>{allTimeSlots.map(t => <SelectItem key={t.id} value={t.id}>{`${t.day_of_week} ${t.start_time.substring(0,5)}-${t.end_time.substring(0,5)}`}</SelectItem>)}</SelectContent></Select>
                        <Button onClick={handleCreateTimetable} className="w-full">Save Entry</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* --- AI Generator Button --- */}
                  <Button onClick={handleGenerateTimetable} disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate with AI"}</Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {timetable.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {daysOfWeek.map(day => (
                    <div key={day}>
                      <h3 className="font-bold text-lg text-center mb-2 pb-2 border-b">{day}</h3>
                      <div className="space-y-2">
                        {(groupedTimetable[day] || []).map(entry => (
                          <Card key={entry.timetable_id || `${entry.course_name}-${entry.start_time}`} className="p-3 bg-gray-50/70 shadow-sm">
                            <p className="font-semibold text-sm">{entry.course_name}</p>
                            <p className="text-xs text-muted-foreground">{entry.start_time.substring(0,5)} - {entry.end_time.substring(0,5)}</p>
                            <p className="text-xs text-muted-foreground mt-1">Prof. {entry.faculty_name}</p>
                            <p className="text-xs text-muted-foreground">Room: {entry.classroom_name}</p>
                            {entry.group_name && <Badge variant="secondary" className="mt-2 text-xs">{entry.group_name}</Badge>}
                          </Card>
                        ))}
                        {(!groupedTimetable[day] || groupedTimetable[day].length === 0) && ( <div className="text-center text-sm text-gray-400 p-4 border border-dashed rounded-lg h-24 flex items-center justify-center">No Classes</div> )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-center text-gray-500 py-8">No timetable data available. Use the buttons above to create one.</p>}
            </CardContent>

            {/* --- DIALOGS FOR SIMPLIFIED VIEW FEATURE --- */}
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogContent>
                <DialogHeader><DialogTitle>View Simplified Timetable</DialogTitle><DialogDescription>Select filters to generate a specific view.</DialogDescription></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2"><Label>Filter By</Label><Select value={filterOptions.type} onValueChange={(v) => setFilterOptions({...filterOptions, type: v, value: ''})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="group">Student Group</SelectItem></SelectContent></Select></div>
                        <div className="flex-1 space-y-2"><Label>Timeframe</Label><Select value={filterOptions.timeframe} onValueChange={(v) => setFilterOptions({...filterOptions, timeframe: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="single">Single Day</SelectItem><SelectItem value="week">Full Week</SelectItem></SelectContent></Select></div>
                    </div>
                    {filterOptions.type === 'day' && filterOptions.timeframe === 'single' && (
                        <div className="space-y-2"><Label>Select Day</Label><Select value={filterOptions.value} onValueChange={(v) => setFilterOptions({...filterOptions, value: v})}><SelectTrigger><SelectValue placeholder="Choose a day"/></SelectTrigger><SelectContent>{daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}</SelectContent></Select></div>
                    )}
                    {filterOptions.type === 'group' && (
                        <div className="space-y-2"><Label>Select Group</Label><Select value={filterOptions.value} onValueChange={(v) => setFilterOptions({...filterOptions, value: v})}><SelectTrigger><SelectValue placeholder="Choose a group"/></SelectTrigger><SelectContent>{studentGroups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent></Select></div>
                    )}
                    <Button onClick={handleApplyFilter} className="w-full">View Timetable</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader><DialogTitle>{viewTitle}</DialogTitle></DialogHeader>
                    <div className="py-4 max-h-[60vh] overflow-y-auto">
                        <table className="w-full text-sm text-left table-auto">
                            <thead className="bg-gray-50"><tr>{csvHeaders.map(h => <th key={h.key} className="p-2 border-b">{h.label}</th>)}</tr></thead>
                            <tbody>{filteredData.length > 0 ? filteredData.map((entry, index) => (<tr key={index} className="border-b">
                                <td className="p-2">{entry.day_of_week}</td>
                                <td className="p-2">{entry.start_time.substring(0,5)}</td>
                                <td className="p-2">{entry.end_time.substring(0,5)}</td>
                                <td className="p-2">{entry.course_name}</td>
                                <td className="p-2">{entry.group_name}</td>
                                <td className="p-2">{entry.faculty_name}</td>
                                <td className="p-2">{entry.classroom_name}</td>
                            </tr>)) : <tr><td colSpan={7} className="text-center p-4">No entries match your filter.</td></tr>}</tbody>
                        </table>
                    </div>
                    <div className="flex justify-end">
                        <CSVLink data={filteredData} headers={csvHeaders} filename={`${viewTitle.replace(/\s+/g, '-')}.csv`}><Button disabled={filteredData.length === 0}><Download className="w-4 h-4 mr-2"/>Download as CSV</Button></CSVLink>
                    </div>
                </DialogContent>
            </Dialog>
          </Card>
        );
      case "admins":
        return (<Card className="glass animate-slide-in"><CardHeader><div><CardTitle>Admins Database</CardTitle></div></CardHeader><CardContent>{admins.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">{admins.map(admin => (<div key={admin.id} className="p-4 border rounded-lg"><h3 className="font-semibold">{admin.full_name}</h3><p className="text-sm">{admin.role}</p><p className="text-sm">{admin.email}</p></div>))}</div>) : <p className="text-center text-muted-foreground py-4">No admins found.</p>}</CardContent></Card>);

      case "assignments":
        return (<Card className="glass animate-slide-in"><CardHeader><CardTitle>Assignments</CardTitle></CardHeader><CardContent>{assignments.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{assignments.map(assignment => (<div key={assignment.id} className="p-4 border rounded-lg"><h3 className="font-semibold">{assignment.title}</h3><p className="text-sm">{assignment.course_name}</p><p className="text-xs">Due: {new Date(assignment.due_date).toLocaleDateString()}</p><Badge className="mt-2">{assignment.submission_id ? `Submitted` : 'Pending'}</Badge></div>))}</div>) : <p className="text-center text-muted-foreground py-4">No assignments.</p>}</CardContent></Card>);

      case "attendance":
        return (<Card className="glass animate-slide-in"><CardHeader><CardTitle>Attendance Tracker</CardTitle></CardHeader><CardContent>{attendance.length > 0 ? (<div className="space-y-2">{attendance.map((record) => (<div key={record.id} className="flex items-center justify-between p-3 border rounded"><div><span>{record.student_name}</span><span className="text-sm text-muted-foreground ml-2">{new Date(record.attendance_date).toLocaleDateString()}</span></div><Badge variant={record.status === "Present" ? "default" : "destructive"}>{record.status}</Badge></div>))}</div>) : <p className="text-center py-4 text-muted-foreground">No records found.</p>}</CardContent></Card>);

      case "performance":
        return (<Card className="glass animate-slide-in"><CardHeader><CardTitle>Performance & Grades</CardTitle></CardHeader><CardContent>{performance.length > 0 ? (<div className="space-y-2">{performance.map((record) => (<div key={record.id} className="flex items-center justify-between p-3 border rounded"><div><span>{record.student_name}</span><span className="text-sm text-muted-foreground ml-2">{record.assignment_title}</span></div><Badge>{record.grade}%</Badge></div>))}</div>) : <p className="text-center py-4 text-muted-foreground">No records found.</p>}</CardContent></Card>);

      case "analytics":
        return (<Card className="glass animate-slide-in"><CardHeader><CardTitle>Analytics</CardTitle></CardHeader><CardContent>{analytics ? (<div className="grid grid-cols-4 gap-4 text-center"><div className="p-4 bg-gray-50 rounded"><p className="text-2xl font-bold">{analytics.students}</p><p>Students</p></div><div className="p-4 bg-gray-50 rounded"><p className="text-2xl font-bold">{analytics.admins}</p><p>Admins</p></div><div className="p-4 bg-gray-50 rounded"><p className="text-2xl font-bold">{analytics.courses}</p><p>Courses</p></div><div className="p-4 bg-gray-50 rounded"><p className="text-2xl font-bold">{analytics.assignments}</p><p>Assignments</p></div></div>) : <p>No data.</p>}</CardContent></Card>);

      case "reports":
        return userType === "student" ? <DownloadableReports /> : null;

      case "feedback":
        return (
          <Card className="glass animate-slide-in">
            <CardHeader><CardTitle>Feedback System</CardTitle><CardDescription>{userType === "admin" ? "View student feedback" : "Submit feedback"}</CardDescription></CardHeader>
            <CardContent>
              {userType === "student" && (
                <div className="space-y-4">
                  <Select value={feedbackCategory} onValueChange={setFeedbackCategory}><SelectTrigger><SelectValue placeholder="Select a Category" /></SelectTrigger><SelectContent><SelectItem value="assignment">Assignment</SelectItem><SelectItem value="teaching">Teaching</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select>
                  <Textarea placeholder="Enter your feedback..." value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)} rows={5} />
                  <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                  {feedbackStatus && <p className="text-sm text-muted-foreground mt-2">{feedbackStatus}</p>}
                </div>
              )}
              {userType === "admin" && (
                <div className="space-y-4">
                  {feedbackList.length > 0 ? (
                    feedbackList.map(item => (<div key={item.id} className="p-4 border rounded-lg bg-muted/50"><div className="flex justify-between items-center mb-2"><Badge>{item.category}</Badge><span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</span></div><p className="text-sm mb-2">"{item.message}"</p><p className="text-xs font-semibold text-right">- {item.student_name}</p></div>))
                  ) : <p className="text-center text-muted-foreground py-4">No feedback submitted yet.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "settings":
        if (!userProfile) return <p>Could not load profile.</p>;
        return (
          <div className="space-y-6 animate-slide-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Your Profile</CardTitle><CardDescription>View and edit personal information.</CardDescription></div>{!isEditingProfile ? (<Button variant="outline" onClick={() => { setIsEditingProfile(true); setFormMessage({ type: "", text: "" }); }}><Edit className="w-4 h-4 mr-2" /> Edit</Button>) : (<div className="flex gap-2"><Button variant="outline" onClick={() => setIsEditingProfile(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button><Button onClick={handleProfileUpdate}><Save className="w-4 h-4 mr-2" /> Save</Button></div>)}</CardHeader>
              <CardContent className="space-y-4"><div><Label>Full Name</Label><Input value={userProfile.full_name} disabled={!isEditingProfile} onChange={(e) => setUserProfile({ ...userProfile, full_name: e.target.value })} /></div><div><Label>Email Address</Label><Input type="email" value={userProfile.email} disabled={!isEditingProfile} onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })} /></div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Change Password</CardTitle><CardDescription>Update your account password.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Current Password</Label><div className="relative"><Input type={showCurrentPassword ? "text" : "password"} placeholder="Enter current password" value={passwordData.currentPassword} onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div></div>
                <div><Label>New Password</Label><div className="relative"><Input type={showNewPassword ? "text" : "password"} placeholder="Enter new password" value={passwordData.newPassword} onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div></div>
                <Button onClick={handlePasswordChange}>Change Password</Button>
              </CardContent>
            </Card>
            {formMessage.text && (<div className={`p-4 rounded-md text-sm ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{formMessage.text}</div>)}
          </div>
        );

      default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-background flex animate-fade-in">
      <div className="w-64 bg-card/50 backdrop-blur-sm border-r border-border flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img
              src="/EduTIMELY_LOGO_Cropped.png"
              alt="EduTIMELY"
              className="h-12 sm:h-18 w-auto cursor-pointer"
            />
          </div>
          <nav className="space-y-2">
            {userType === "student" && <Button variant={activeSection === "overview" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("overview")}><BarChart3 className="w-4 h-4 mr-2" /> Overview</Button>}
            <Button variant={activeSection === "timetable" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("timetable")}><Clock className="w-4 h-4 mr-2" />Time Table</Button>
            {userType === "admin" && (<>
              <Button variant={activeSection === "student_groups" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("student_groups")}><Users2 className="w-4 h-4 mr-2" />Student Groups</Button>
              <Button variant={activeSection === "students" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("students")}><Users className="w-4 h-4 mr-2" />Student Database</Button>
              <Button variant={activeSection === "admins" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("admins")}><Shield className="w-4 h-4 mr-2" />Admins</Button>
              <Button variant={activeSection === "analytics" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("analytics")}><BarChart3 className="w-4 h-4 mr-2" />Analytics</Button>
            </>)}
            <Button variant={activeSection === "assignments" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("assignments")}><BookOpen className="w-4 h-4 mr-2" />Assignments</Button>
            <Button variant={activeSection === "attendance" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("attendance")}><Calendar className="w-4 h-4 mr-2" />Attendance</Button>
            <Button variant={activeSection === "performance" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("performance")}><Award className="w-4 h-4 mr-2" />Performance</Button>
            {userType === "student" && <Button variant={activeSection === "reports" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("reports")}><Download className="w-4 h-4 mr-2" />Reports</Button>}
            <Button variant={activeSection === "feedback" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("feedback")}><MessageSquare className="w-4 h-4 mr-2" />Feedback</Button>
            <Button variant={activeSection === "settings" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveSection("settings")}><Settings className="w-4 h-4 mr-2" />Settings</Button>
          </nav>
        </div>
        <div className="mt-auto p-4 space-y-2">
          <Button onClick={onNavigateToHome} variant="ghost" className="w-full justify-start"><Home className="w-4 h-4 mr-2" />Home</Button>
          <Button onClick={onLogout} variant="ghost" className="w-full justify-start"><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold">{userType === 'admin' ? "Admin Dashboard" : "Student Dashboard"}</h1>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Bell, BookOpen, AlertTriangle, CheckCircle, Target } from "lucide-react"

// --- INTERFACES MATCHING THE *REAL* BACKEND DATA ---
interface TimetableEntry {
  timetable_id: string;
  course_name: string;
  day_of_week: string;
  start_time: string;
}
interface Assignment {
  id: string;
  title: string;
  course_name: string;
  due_date: string;
  submission_id: string | null;
}
interface Notification {
  id: string;
  message: string;
  created_at: string;
  isRead?: boolean;
}
interface StudentDashboardWidgetsProps {
    timetable: TimetableEntry[];
    assignments: Assignment[];
    notifications: Notification[];
}

export function StudentDashboardWidgets({ timetable, assignments: initialAssignments, notifications: initialNotifications }: StudentDashboardWidgetsProps) {
    // Local state for UI interactions like marking notifications read
    const [notifications, setNotifications] = useState(initialAssignments.map(n => ({...n, isRead: false})));

    // --- LOGIC TO PROCESS REAL DATA ---
    const getDayName = (date = new Date()) => date.toLocaleDateString('en-US', { weekday: 'long' });
    const todaysClasses = timetable.filter(t => t.day_of_week === getDayName());
    const pendingAssignments = initialAssignments.filter(a => !a.submission_id);
    const overdueAssignments = pendingAssignments.filter(a => new Date(a.due_date) < new Date());
    const unreadNotifications = notifications.filter(n => !n.isRead);

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(notif => (notif.id === id ? { ...notif, isRead: true } : notif)));
    };

    // --- HELPER FUNCTIONS FOR STYLING ---
    const getStatusColor = (submitted: boolean, overdue: boolean) => {
        if(submitted) return "bg-green-100 text-green-800";
        if(overdue) return "bg-red-100 text-red-800";
        return "bg-yellow-100 text-yellow-800";
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Pending Tasks</p><p className="text-2xl font-bold text-blue-600">{pendingAssignments.length}</p></div><Target className="w-8 h-8 text-blue-500" /></div></CardContent></Card>
                <Card className="border-l-4 border-l-red-500"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Overdue</p><p className="text-2xl font-bold text-red-600">{overdueAssignments.length}</p></div><AlertTriangle className="w-8 h-8 text-red-500" /></div></CardContent></Card>
                <Card className="border-l-4 border-l-green-500"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Classes Today</p><p className="text-2xl font-bold text-green-600">{todaysClasses.length}</p></div><Calendar className="w-8 h-8 text-green-500" /></div></CardContent></Card>
                <Card className="border-l-4 border-l-purple-500"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Notifications</p><p className="text-2xl font-bold text-purple-600">{unreadNotifications.length}</p></div><Bell className="w-8 h-8 text-purple-500" /></div></CardContent></Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center space-x-2"><Clock /><span>Upcoming Deadlines</span></CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {pendingAssignments.length > 0 ? pendingAssignments.map(assignment => {
                                const isOverdue = new Date(assignment.due_date) < new Date();
                                return (
                                <div key={assignment.id} className="p-3 border-l-4 rounded-r-lg border-l-orange-500 bg-orange-50/50">
                                    <div className="flex items-start justify-between">
                                        <div><h4 className="font-medium text-sm">{assignment.title}</h4><p className="text-xs text-muted-foreground mt-1">{assignment.course_name}</p></div>
                                        <div className="ml-3 text-right"><Badge className={getStatusColor(!!assignment.submission_id, isOverdue)}>{isOverdue ? 'Overdue' : 'Pending'}</Badge><p className="text-xs text-muted-foreground mt-1">Due: {new Date(assignment.due_date).toLocaleDateString()}</p></div>
                                    </div>
                                </div>
                            )}) : <div className="text-center py-8"><CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" /><p className="text-muted-foreground">All assignments completed!</p></div>}
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Classes */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center space-x-2"><BookOpen/><span>Today's Classes</span></CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {todaysClasses.length > 0 ? todaysClasses.map(classItem => (
                                <div key={classItem.timetable_id} className="p-3 border rounded-lg">
                                    <h4 className="font-medium text-sm">{classItem.course_name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1"><Clock className="w-3 h-3 inline mr-1" />{classItem.start_time.substring(0,5)}</p>
                                </div>
                            )) : <p className="text-center py-4 text-muted-foreground">No classes scheduled for today.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
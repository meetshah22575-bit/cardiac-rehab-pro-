import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Clock, User, Phone, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface Appointment {
  id: number;
  provider: string;
  specialty: string;
  type: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "cancelled" | "in-progress";
  meetingLink?: string;
}

export function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-15");
  
  const appointments: Appointment[] = [
    {
      id: 1,
      provider: "Dr. Meet ",
      specialty: "physiotherapist",
      type: "Follow-up Consultation",
      date: "2024-01-15",
      time: "14:30",
      duration: 30,
      status: "upcoming",
      meetingLink: "https://meet.cardiorehab.com/dr-martinez-123"
    },
    {
      id: 2,
      provider: "Hethvi Soni, RN",
      specialty: "physiotherapist",
      type: "Exercise Program Review",
      date: "2024-01-16",
      time: "10:00",
      duration: 45,
      status: "upcoming"
    },
    {
      id: 3,
      provider: "Dr. Riya",
      specialty: "physiotherapist",
      type: "Monthly Check-up",
      date: "2024-01-10",
      time: "09:15",
      duration: 30,
      status: "completed"
    }
  ];

  const availableSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: false },
    { time: "15:30", available: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary text-primary-foreground";
      case "in-progress": return "bg-warning text-warning-foreground";
      case "completed": return "bg-success text-success-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your telehealth consultations</p>
        </div>
        <Button className="bg-primary">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments
                .filter(apt => apt.status === "upcoming" || apt.status === "in-progress")
                .map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{appointment.provider}</h3>
                          <Badge variant="outline">{appointment.specialty}</Badge>
                        </div>
                        <p className="text-muted-foreground">{appointment.type}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status === "in-progress" ? "In Session" : "Upcoming"}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(appointment.time)} ({appointment.duration} min)</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {appointment.status === "upcoming" && (
                        <>
                          <Button size="sm" className="bg-primary">
                            <Video className="h-4 w-4 mr-2" />
                            Join Video Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Provider
                          </Button>
                        </>
                      )}
                      {appointment.status === "in-progress" && (
                        <Button size="sm" className="bg-success">
                          <Video className="h-4 w-4 mr-2" />
                          Rejoin Session
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">Reschedule</Button>
                      <Button size="sm" variant="ghost" className="text-destructive">Cancel</Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Past Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>Your consultation history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments
                  .filter(apt => apt.status === "completed")
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.provider}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        <p className="text-xs text-muted-foreground">{appointment.date} at {formatTime(appointment.time)}</p>
                      </div>
                      <div className="space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>Completed</Badge>
                        <Button size="sm" variant="outline">View Notes</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule New Appointment */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New</CardTitle>
              <CardDescription>Book your next consultation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Provider</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Dr. Martinez - Cardiologist</option>
                  <option>Lisa Chen, RN - Cardiac Rehab</option>
                  <option>Dr. Johnson - Cardiologist</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Appointment Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Follow-up Consultation</option>
                  <option>Exercise Program Review</option>
                  <option>Medication Review</option>
                  <option>General Check-up</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Date</label>
                <input type="date" className="w-full p-2 border rounded-md" value={selectedDate} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Available Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outline" : "ghost"}
                      size="sm"
                      disabled={!slot.available}
                      className={!slot.available ? "opacity-50" : ""}
                    >
                      {formatTime(slot.time)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Provider Profiles
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Set Appointment Reminders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Sync with Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

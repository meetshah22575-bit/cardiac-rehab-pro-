import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Activity, MessageSquare, Video, AlertTriangle, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/telehealth-hero.jpg";

interface DashboardProps {
  patientName?: string;
}

export function PatientDashboard({ patientName = "Sarah" }: DashboardProps) {
  const upcomingAppointments = [
    {
      id: 1,
      provider: "Dr. Martinez",
      type: "Cardiology Follow-up",
      date: "Today",
      time: "2:30 PM",
      status: "upcoming"
    },
    {
      id: 2,
      provider: "Lisa Chen, RN",
      type: "Exercise Review",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "scheduled"
    }
  ];

  const recentVitals = {
    heartRate: { value: 68, status: "normal", trend: "stable" },
    bloodPressure: { value: "118/75", status: "normal", trend: "improving" },
    oxygenSat: { value: 98, status: "excellent", trend: "stable" }
  };

  const weeklyProgress = {
    exerciseGoal: 150, // minutes
    completed: 127,
    streak: 5
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {patientName}!</h1>
              <p className="text-primary-foreground/90 text-lg">Let's continue your heart health journey</p>
            </div>
            <Heart className="h-12 w-12 text-primary-foreground/80" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-success">Weekly Progress</CardTitle>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Exercise Minutes</span>
                <span className="font-semibold">{weeklyProgress.completed}/{weeklyProgress.exerciseGoal}</span>
              </div>
              <Progress value={(weeklyProgress.completed / weeklyProgress.exerciseGoal) * 100} className="h-2" />
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-warning" />
                <span className="text-sm text-muted-foreground">{weeklyProgress.streak} day streak!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Next Appointment</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold">{upcomingAppointments[0].provider}</p>
              <p className="text-sm text-muted-foreground">{upcomingAppointments[0].type}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{upcomingAppointments[0].date} at {upcomingAppointments[0].time}</Badge>
                <Button size="sm" className="h-7">
                  <Video className="h-3 w-3 mr-1" />
                  Join
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-secondary">Heart Rate</CardTitle>
              <Heart className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{recentVitals.heartRate.value}</span>
                <span className="text-sm text-muted-foreground">bpm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-success border-success">Normal</Badge>
                <span className="text-xs text-muted-foreground">Last reading: 2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Appointments</span>
            </CardTitle>
            <CardDescription>Your scheduled telehealth sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-semibold">{appointment.provider}</p>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  <p className="text-sm">{appointment.date} at {appointment.time}</p>
                </div>
                <div className="space-x-2">
                  {appointment.status === "upcoming" && (
                    <Button size="sm" variant="default">
                      <Video className="h-4 w-4 mr-2" />
                      Join Now
                    </Button>
                  )}
                  <Button size="sm" variant="outline">Details</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Vital Signs</span>
            </CardTitle>
            <CardDescription>Your latest health measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Heart Rate</p>
                  <p className="text-2xl font-bold text-secondary">{recentVitals.heartRate.value} <span className="text-sm font-normal">bpm</span></p>
                </div>
                <Badge variant="outline" className="text-success border-success">Normal</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Blood Pressure</p>
                  <p className="text-2xl font-bold text-primary">{recentVitals.bloodPressure.value} <span className="text-sm font-normal">mmHg</span></p>
                </div>
                <Badge variant="outline" className="text-success border-success">Normal</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Oxygen Saturation</p>
                  <p className="text-2xl font-bold text-accent">{recentVitals.oxygenSat.value}<span className="text-sm font-normal">%</span></p>
                </div>
                <Badge variant="outline" className="text-success border-success">Excellent</Badge>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              Record New Vitals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Video className="h-6 w-6" />
              <span className="text-sm">Start Video Call</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">Log Exercise</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Send Message</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Heart className="h-6 w-6" />
              <span className="text-sm">Track Vitals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, Zap, Award, Plus, Play, Pause, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Exercise {
  id: number;
  name: string;
  type: "cardio" | "strength" | "flexibility";
  duration: number;
  intensity: "low" | "moderate" | "high";
  calories: number;
  completed: boolean;
  date: string;
}

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
  totalDuration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export function ExerciseTracker() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const todaysWorkout: WorkoutPlan = {
    id: 1,
    name: "Cardiac Recovery - Week 3",
    description: "Low-impact cardiovascular exercises designed for heart health recovery",
    difficulty: "intermediate",
    totalDuration: 45,
    exercises: [
      {
        id: 1,
        name: "Warm-up Walk",
        type: "cardio",
        duration: 5,
        intensity: "low",
        calories: 25,
        completed: true,
        date: "2024-01-15"
      },
      {
        id: 2,
        name: "Stationary Cycling",
        type: "cardio",
        duration: 20,
        intensity: "moderate",
        calories: 120,
        completed: true,
        date: "2024-01-15"
      },
      {
        id: 3,
        name: "Arm Exercises",
        type: "strength",
        duration: 10,
        intensity: "low",
        calories: 40,
        completed: false,
        date: "2024-01-15"
      },
      {
        id: 4,
        name: "Cool-down Stretches",
        type: "flexibility",
        duration: 10,
        intensity: "low",
        calories: 20,
        completed: false,
        date: "2024-01-15"
      }
    ]
  };

  const weeklyStats = {
    totalMinutes: 127,
    goalMinutes: 150,
    workoutsCompleted: 5,
    caloriesBurned: 890,
    streak: 5
  };

  const recentWorkouts = [
    { date: "2024-01-14", duration: 30, type: "Cardio Recovery", calories: 180 },
    { date: "2024-01-13", duration: 25, type: "Flexibility Focus", calories: 95 },
    { date: "2024-01-12", duration: 35, type: "Low-Impact Strength", calories: 210 },
  ];

  const getTypeColor = (type: Exercise['type']) => {
    switch (type) {
      case "cardio": return "bg-primary text-primary-foreground";
      case "strength": return "bg-secondary text-secondary-foreground";
      case "flexibility": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getIntensityColor = (intensity: Exercise['intensity']) => {
    switch (intensity) {
      case "low": return "bg-success text-success-foreground";
      case "moderate": return "bg-warning text-warning-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleTimerToggle = (exerciseId: number) => {
    if (activeTimer === exerciseId) {
      setActiveTimer(null);
    } else {
      setActiveTimer(exerciseId);
      setCurrentTime(0);
    }
  };

  const completedExercises = todaysWorkout.exercises.filter(ex => ex.completed).length;
  const totalExercises = todaysWorkout.exercises.length;
  const workoutProgress = (completedExercises / totalExercises) * 100;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exercise Log</h1>
          <p className="text-muted-foreground">Track your cardiac rehabilitation progress</p>
        </div>
        <Button className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Custom Workout
        </Button>
      </div>

      {/* Weekly Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-success text-sm">Weekly Goal</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{weeklyStats.totalMinutes}<span className="text-sm font-normal text-muted-foreground">/{weeklyStats.goalMinutes}min</span></div>
              <Progress value={(weeklyStats.totalMinutes / weeklyStats.goalMinutes) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary text-sm">Workouts</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.workoutsCompleted}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-secondary text-sm">Calories</CardTitle>
              <Zap className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.caloriesBurned}</div>
            <p className="text-xs text-muted-foreground">Burned this week</p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-accent text-sm">Streak</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.streak}</div>
            <p className="text-xs text-muted-foreground">Days active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Workout */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>{todaysWorkout.name}</span>
                  </CardTitle>
                  <CardDescription>{todaysWorkout.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{Math.round(workoutProgress)}%</div>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              <Progress value={workoutProgress} className="h-2 mt-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysWorkout.exercises.map((exercise) => (
                <div key={exercise.id} className={`border rounded-lg p-4 transition-all ${exercise.completed ? 'bg-success/5 border-success/20' : 'hover:shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <Badge className={getTypeColor(exercise.type)} variant="secondary">
                          {exercise.type}
                        </Badge>
                        <Badge className={getIntensityColor(exercise.intensity)} variant="outline">
                          {exercise.intensity}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{exercise.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="h-3 w-3" />
                          <span>{exercise.calories} cal</span>
                        </div>
                      </div>
                    </div>
                    {exercise.completed && (
                      <Badge className="bg-success text-success-foreground">
                        ✓ Completed
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {!exercise.completed && (
                      <>
                        <Button
                          size="sm"
                          variant={activeTimer === exercise.id ? "destructive" : "default"}
                          onClick={() => handleTimerToggle(exercise.id)}
                        >
                          {activeTimer === exercise.id ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Stop Timer
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Complete
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost">
                      View Instructions
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{completedExercises}/{totalExercises}</div>
                <p className="text-sm text-muted-foreground">Exercises completed</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-semibold text-secondary">
                    {todaysWorkout.exercises.filter(ex => ex.completed).reduce((acc, ex) => acc + ex.duration, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>
                <div>
                  <div className="text-xl font-semibold text-accent">
                    {todaysWorkout.exercises.filter(ex => ex.completed).reduce((acc, ex) => acc + ex.calories, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Workouts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{workout.type}</p>
                    <p className="text-xs text-muted-foreground">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{workout.duration}min</p>
                    <p className="text-xs text-muted-foreground">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All History
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Log Manual Exercise
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Browse Exercise Library
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                View Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
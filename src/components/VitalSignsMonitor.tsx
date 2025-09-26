import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Activity, Thermometer, Droplets, Plus, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface VitalReading {
  id: number;
  type: "heart_rate" | "blood_pressure" | "oxygen_saturation" | "temperature" | "weight";
  value: string;
  unit: string;
  timestamp: string;
  status: "normal" | "high" | "low" | "critical";
  notes?: string;
}

export function VitalSignsMonitor() {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    heart_rate: "",
    systolic_bp: "",
    diastolic_bp: "",
    oxygen_saturation: "",
    temperature: "",
    weight: ""
  });

  const recentReadings: VitalReading[] = [
    {
      id: 1,
      type: "heart_rate",
      value: "68",
      unit: "bpm",
      timestamp: "2024-01-15T14:30:00",
      status: "normal"
    },
    {
      id: 2,
      type: "blood_pressure",
      value: "118/75",
      unit: "mmHg",
      timestamp: "2024-01-15T14:25:00",
      status: "normal"
    },
    {
      id: 3,
      type: "oxygen_saturation",
      value: "98",
      unit: "%",
      timestamp: "2024-01-15T14:20:00",
      status: "normal"
    },
    {
      id: 4,
      type: "temperature",
      value: "98.6",
      unit: "°F",
      timestamp: "2024-01-15T09:00:00",
      status: "normal"
    }
  ];

  const vitalTrends = {
    heart_rate: { current: 68, previous: 72, trend: "down", change: -4 },
    blood_pressure: { current: "118/75", previous: "122/78", trend: "down", change: "Improved" },
    oxygen_saturation: { current: 98, previous: 97, trend: "up", change: 1 },
    temperature: { current: 98.6, previous: 98.4, trend: "up", change: 0.2 }
  };

  const getStatusColor = (status: VitalReading['status']) => {
    switch (status) {
      case "normal": return "bg-success text-success-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "low": return "bg-warning text-warning-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getVitalIcon = (type: VitalReading['type']) => {
    switch (type) {
      case "heart_rate": return Heart;
      case "blood_pressure": return Activity;
      case "oxygen_saturation": return Droplets;
      case "temperature": return Thermometer;
      default: return Activity;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  };

  const getTrendColor = (type: string, trend: string) => {
    // For most vitals, stable or slight improvement is good
    switch (type) {
      case "heart_rate":
        return trend === "down" ? "text-success" : trend === "up" ? "text-warning" : "text-muted-foreground";
      case "blood_pressure":
        return trend === "down" ? "text-success" : "text-warning";
      case "oxygen_saturation":
        return trend === "up" ? "text-success" : "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveReading = (type: string) => {
    // Logic to save the reading would go here
    console.log(`Saving ${type} reading:`, inputValues);
    setActiveInput(null);
    // Reset the specific input
    setInputValues(prev => ({ ...prev, [type]: "" }));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vital Signs</h1>
          <p className="text-muted-foreground">Monitor and track your health metrics</p>
        </div>
        <Button className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Quick Entry
        </Button>
      </div>

      {/* Current Vitals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-secondary flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Heart Rate</span>
              </CardTitle>
              <Badge className={getStatusColor("normal")}>Normal</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{vitalTrends.heart_rate.current}</span>
                <span className="text-sm text-muted-foreground">bpm</span>
              </div>
              <div className="flex items-center space-x-2">
                {(() => {
                  const TrendIcon = getTrendIcon(vitalTrends.heart_rate.trend);
                  return <TrendIcon className={`h-4 w-4 ${getTrendColor("heart_rate", vitalTrends.heart_rate.trend)}`} />;
                })()}
                <span className="text-sm text-muted-foreground">
                  {Math.abs(vitalTrends.heart_rate.change)} from last reading
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Blood Pressure</span>
              </CardTitle>
              <Badge className={getStatusColor("normal")}>Normal</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{vitalTrends.blood_pressure.current}</span>
                <span className="text-sm text-muted-foreground">mmHg</span>
              </div>
              <div className="flex items-center space-x-2">
                {(() => {
                  const TrendIcon = getTrendIcon(vitalTrends.blood_pressure.trend);
                  return <TrendIcon className={`h-4 w-4 ${getTrendColor("blood_pressure", vitalTrends.blood_pressure.trend)}`} />;
                })()}
                <span className="text-sm text-muted-foreground">
                  {vitalTrends.blood_pressure.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-accent flex items-center space-x-2">
                <Droplets className="h-5 w-5" />
                <span>Oxygen Sat</span>
              </CardTitle>
              <Badge className={getStatusColor("normal")}>Excellent</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{vitalTrends.oxygen_saturation.current}</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <div className="flex items-center space-x-2">
                {(() => {
                  const TrendIcon = getTrendIcon(vitalTrends.oxygen_saturation.trend);
                  return <TrendIcon className={`h-4 w-4 ${getTrendColor("oxygen_saturation", vitalTrends.oxygen_saturation.trend)}`} />;
                })()}
                <span className="text-sm text-muted-foreground">
                  +{vitalTrends.oxygen_saturation.change}% from last
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-warning flex items-center space-x-2">
                <Thermometer className="h-5 w-5" />
                <span>Temperature</span>
              </CardTitle>
              <Badge className={getStatusColor("normal")}>Normal</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{vitalTrends.temperature.current}</span>
                <span className="text-sm text-muted-foreground">°F</span>
              </div>
              <div className="flex items-center space-x-2">
                {(() => {
                  const TrendIcon = getTrendIcon(vitalTrends.temperature.trend);
                  return <TrendIcon className="h-4 w-4 text-muted-foreground" />;
                })()}
                <span className="text-sm text-muted-foreground">
                  +{vitalTrends.temperature.change}° from morning
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input New Readings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Record New Readings</span>
              </CardTitle>
              <CardDescription>Enter your latest vital sign measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heart Rate */}
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-secondary" />
                    <span>Heart Rate (bpm)</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter heart rate"
                      value={inputValues.heart_rate}
                      onChange={(e) => handleInputChange("heart_rate", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveReading("heart_rate")}
                      disabled={!inputValues.heart_rate}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>Blood Pressure</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Systolic"
                      value={inputValues.systolic_bp}
                      onChange={(e) => handleInputChange("systolic_bp", e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-muted-foreground">/</span>
                    <Input
                      type="number"
                      placeholder="Diastolic"
                      value={inputValues.diastolic_bp}
                      onChange={(e) => handleInputChange("diastolic_bp", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveReading("blood_pressure")}
                      disabled={!inputValues.systolic_bp || !inputValues.diastolic_bp}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Oxygen Saturation */}
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-accent" />
                    <span>Oxygen Saturation (%)</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter SpO2"
                      value={inputValues.oxygen_saturation}
                      onChange={(e) => handleInputChange("oxygen_saturation", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveReading("oxygen_saturation")}
                      disabled={!inputValues.oxygen_saturation}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-warning" />
                    <span>Temperature (°F)</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter temperature"
                      value={inputValues.temperature}
                      onChange={(e) => handleInputChange("temperature", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveReading("temperature")}
                      disabled={!inputValues.temperature}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Recording Guidelines</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Record your vitals at the same time daily for consistency. Contact your care team immediately if you notice unusual readings or symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Readings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
              <CardDescription>Your latest measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReadings.map((reading) => {
                const Icon = getVitalIcon(reading.type);
                return (
                  <div key={reading.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm capitalize">
                          {reading.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(reading.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{reading.value} <span className="font-normal text-muted-foreground">{reading.unit}</span></p>
                      <Badge className={getStatusColor(reading.status)}>{reading.status}</Badge>
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" size="sm" className="w-full">
                View Full History
              </Button>
            </CardContent>
          </Card>

          {/* Alerts & Reminders */}
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm">All readings normal</p>
                  <p className="text-xs text-muted-foreground">Keep up the great work!</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <Heart className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Reminder</p>
                  <p className="text-xs text-muted-foreground">Take evening medication at 8 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
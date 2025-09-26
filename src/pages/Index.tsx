import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { PatientDashboard } from "@/components/PatientDashboard";
import { AppointmentScheduler } from "@/components/AppointmentScheduler";
import { ExerciseTracker } from "@/components/ExerciseTracker";
import { VitalSignsMonitor } from "@/components/VitalSignsMonitor";
import { SecureMessaging } from "@/components/SecureMessaging";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <PatientDashboard />;
      case "appointments":
        return <AppointmentScheduler />;
      case "exercise":
        return <ExerciseTracker />;
      case "vitals":
        return <VitalSignsMonitor />;
      case "messages":
        return <SecureMessaging />;
      case "profile":
        return <div className="p-6"><h1 className="text-3xl font-bold">Profile Settings</h1><p className="text-muted-foreground">Manage your account and preferences</p></div>;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/20">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Index;

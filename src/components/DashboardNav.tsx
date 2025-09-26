import { Heart, Calendar, Activity, MessageSquare, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Heart, description: "Overview & health status" },
  { id: "appointments", label: "Appointments", icon: Calendar, description: "Video consultations" },
  { id: "exercise", label: "Exercise Log", icon: Activity, description: "Track your progress" },
  { id: "vitals", label: "Vital Signs", icon: Heart, description: "Monitor your health" },
  { id: "messages", label: "Messages", icon: MessageSquare, description: "Secure communication" },
  { id: "profile", label: "Profile", icon: User, description: "Personal settings" },
];

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">CardioRehab</h1>
                <p className="text-xs text-muted-foreground">Telehealth Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200",
                isActive && "bg-primary text-primary-foreground shadow-sm",
                !isActive && "hover:bg-muted",
                isCollapsed && "px-2"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              )}
            </Button>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium">System Status</span>
            </div>
            <p className="text-xs text-muted-foreground">All services operational</p>
          </div>
        </div>
      )}
    </div>
  );
}

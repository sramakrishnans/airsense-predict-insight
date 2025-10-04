import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthAdvisoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  level: "good" | "moderate" | "unhealthy" | "hazardous";
}

const levelColors = {
  good: "bg-aqi-good",
  moderate: "bg-aqi-moderate",
  unhealthy: "bg-aqi-unhealthy",
  hazardous: "bg-aqi-hazardous",
};

export const HealthAdvisoryCard = ({ icon: Icon, title, description, level }: HealthAdvisoryCardProps) => {
  return (
    <Card className="overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
      <div className={cn("h-2", levelColors[level])} />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-xl text-white", levelColors[level])}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

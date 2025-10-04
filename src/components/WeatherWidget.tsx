import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WeatherWidgetProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
}

export const WeatherWidget = ({ icon: Icon, label, value, unit }: WeatherWidgetProps) => {
  return (
    <Card className="p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-sky">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">
            {value}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

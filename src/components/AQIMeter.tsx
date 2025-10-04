import { cn } from "@/lib/utils";

interface AQIMeterProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "aqi-good";
  if (aqi <= 100) return "aqi-moderate";
  if (aqi <= 150) return "aqi-unhealthySensitive";
  if (aqi <= 200) return "aqi-unhealthy";
  if (aqi <= 300) return "aqi-veryUnhealthy";
  return "aqi-hazardous";
};

const getAQILabel = (aqi: number) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export const AQIMeter = ({ value, size = "md", showLabel = true }: AQIMeterProps) => {
  const colorClass = getAQIColor(value);
  const label = getAQILabel(value);
  const percentage = Math.min((value / 500) * 100, 100);
  
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64"
  };
  
  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.51} 251`}
            className={cn(`text-${colorClass}`, "transition-all duration-1000 ease-out")}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", textSizeClasses[size])}>{value}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">AQI</span>
        </div>
      </div>
      {showLabel && (
        <div className={cn("text-center px-4 py-2 rounded-full text-white font-semibold", `bg-${colorClass}`)}>
          {label}
        </div>
      )}
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { HealthAdvisoryCard } from "@/components/HealthAdvisoryCard";
import { ArrowLeft, Home, Footprints, ShieldAlert, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Health = () => {
  const navigate = useNavigate();

  // Mock current AQI
  const currentAQI = 87;

  const getAdvisories = () => {
    if (currentAQI <= 50) {
      return [
        {
          icon: Footprints,
          title: "Outdoor Activities",
          description: "Perfect time for outdoor exercise and activities. Air quality is excellent.",
          level: "good" as const,
        },
        {
          icon: ShieldCheck,
          title: "General Health",
          description: "No health precautions needed. Enjoy your day!",
          level: "good" as const,
        },
      ];
    } else if (currentAQI <= 100) {
      return [
        {
          icon: Footprints,
          title: "Outdoor Activities",
          description: "Generally safe for most people. Sensitive individuals should consider limiting prolonged outdoor exertion.",
          level: "moderate" as const,
        },
        {
          icon: ShieldAlert,
          title: "Sensitive Groups",
          description: "People with respiratory conditions should monitor symptoms and reduce outdoor activity if needed.",
          level: "moderate" as const,
        },
      ];
    } else if (currentAQI <= 150) {
      return [
        {
          icon: ShieldAlert,
          title: "Wear Protection",
          description: "Wear a mask (N95 or equivalent) when going outdoors, especially for extended periods.",
          level: "unhealthy" as const,
        },
        {
          icon: Footprints,
          title: "Limit Outdoor Activity",
          description: "Reduce prolonged or heavy outdoor exertion. Schedule outdoor activities when air quality improves.",
          level: "unhealthy" as const,
        },
        {
          icon: Home,
          title: "Indoor Safety",
          description: "Keep windows closed and use air purifiers if available. Create a clean air space at home.",
          level: "unhealthy" as const,
        },
      ];
    } else {
      return [
        {
          icon: Home,
          title: "Stay Indoors",
          description: "Avoid all outdoor activities. Keep windows and doors closed at all times.",
          level: "hazardous" as const,
        },
        {
          icon: ShieldAlert,
          title: "Health Alert",
          description: "Everyone should avoid outdoor exposure. People with heart or lung disease should stay alert for symptoms.",
          level: "hazardous" as const,
        },
        {
          icon: ShieldAlert,
          title: "Use Air Purifiers",
          description: "Run air purifiers continuously. Consider relocating to areas with better air quality if possible.",
          level: "hazardous" as const,
        },
      ];
    }
  };

  const advisories = getAdvisories();

  return (
    <div className="min-h-screen bg-gradient-atmospheric">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Health Advisory</h1>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations based on current AQI: {currentAQI}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Current Air Quality: {currentAQI}</h2>
          <p className="text-muted-foreground">
            Based on the current air quality index, here are personalized safety recommendations:
          </p>
        </div>

        <div className="grid gap-6">
          {advisories.map((advisory, index) => (
            <HealthAdvisoryCard key={index} {...advisory} />
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => navigate("/prediction")}>
            Check Future Predictions
          </Button>
          <Button variant="outline" onClick={() => navigate("/analytics")}>
            View Historical Data
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Health;

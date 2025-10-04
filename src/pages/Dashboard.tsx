import { AQIMeter } from "@/components/AQIMeter";
import { WeatherWidget } from "@/components/WeatherWidget";
import { AQIChart } from "@/components/AQIChart";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Button } from "@/components/ui/button";
import { CloudRain, Droplets, Wind, MapPin, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Mock data
  const currentAQI = 87;
  const chartData = [
    { time: "00:00", aqi: 65 },
    { time: "04:00", aqi: 58 },
    { time: "08:00", aqi: 72 },
    { time: "12:00", aqi: 95 },
    { time: "16:00", aqi: 102 },
    { time: "20:00", aqi: 87 },
  ];

  return (
    <div className="min-h-screen bg-gradient-atmospheric">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-sky">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AirSense</h1>
                <p className="text-sm text-muted-foreground">AQI Predictor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationPanel />
              <Button onClick={() => navigate("/prediction")}>
                Make Prediction
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuLabel>{user?.name || "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate("/");
                  }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Location */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold">Chennai, Tamil Nadu</span>
        </div>

        {/* AQI Meter and Weather Widgets */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AQI Meter */}
          <div className="flex items-center justify-center bg-card rounded-2xl p-8 shadow-elevated">
            <AQIMeter value={currentAQI} size="lg" />
          </div>

          {/* Weather Widgets */}
          <div className="grid grid-cols-2 gap-4">
            <WeatherWidget
              icon={CloudRain}
              label="Temperature"
              value="28"
              unit="°C"
            />
            <WeatherWidget
              icon={Droplets}
              label="Humidity"
              value="65"
              unit="%"
            />
            <WeatherWidget
              icon={Wind}
              label="Wind Speed"
              value="12"
              unit="km/h"
            />
            <WeatherWidget
              icon={CloudRain}
              label="Pressure"
              value="1013"
              unit="hPa"
            />
          </div>
        </div>

        {/* AQI Trend Chart */}
        <div className="mb-8">
          <AQIChart data={chartData} />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto py-6"
            onClick={() => navigate("/prediction")}
          >
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">Prediction</div>
              <div className="text-sm text-muted-foreground">
                Forecast AQI for any location
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6"
            onClick={() => navigate("/health")}
          >
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">Health Advisory</div>
              <div className="text-sm text-muted-foreground">
                Get personalized recommendations
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6"
            onClick={() => navigate("/analytics")}
          >
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">Analytics</div>
              <div className="text-sm text-muted-foreground">
                View historical trends
              </div>
            </div>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

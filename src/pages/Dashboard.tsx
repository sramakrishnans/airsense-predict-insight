import { useEffect, useState } from "react";
import { AQIMeter } from "@/components/AQIMeter";
import { WeatherWidget } from "@/components/WeatherWidget";
import { AQIChart } from "@/components/AQIChart";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Button } from "@/components/ui/button";
import { CloudRain, Droplets, Wind, MapPin, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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
  const [currentAQI, setCurrentAQI] = useState(87);
  const [chartData, setChartData] = useState<Array<{ time: string; aqi: number }>>([]);
  const [currentLocation, setCurrentLocation] = useState("Chennai, Tamil Nadu");

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching predictions:", error);
        return;
      }

      if (data && data.length > 0) {
        // Update current location from latest prediction
        setCurrentLocation(data[0].location);
        
        // Update current AQI from latest prediction
        setCurrentAQI(data[0].predicted_aqi);

        // Generate chart data from predictions
        const chartPoints = data.slice(0, 6).reverse().map((pred, index) => ({
          time: new Date(pred.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          aqi: pred.predicted_aqi,
        }));
        
        setChartData(chartPoints);
      }
    };

    fetchPredictions();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('predictions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'predictions',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          fetchPredictions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

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
                  <DropdownMenuLabel>{user?.email || "User"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await logout();
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
          <span className="text-lg font-semibold">{currentLocation}</span>
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

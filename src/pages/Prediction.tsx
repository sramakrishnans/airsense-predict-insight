import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AQIMeter } from "@/components/AQIMeter";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Prediction = () => {
  const navigate = useNavigate();
  const [predictedAQI, setPredictedAQI] = useState<number | null>(null);
  const [location, setLocation] = useState("");

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate prediction
    const randomAQI = Math.floor(Math.random() * 300) + 1;
    setPredictedAQI(randomAQI);
  };

  const getHealthSuggestion = (aqi: number) => {
    if (aqi <= 50) return "Safe to go outside 🚶 - Air quality is excellent!";
    if (aqi <= 100) return "Generally safe 👍 - Sensitive individuals should limit prolonged outdoor activity.";
    if (aqi <= 150) return "Wear a mask 😷 if outdoors - Air quality is unhealthy for sensitive groups.";
    if (aqi <= 200) return "Limit outdoor activity 🏠 - Everyone may experience health effects.";
    if (aqi <= 300) return "Avoid outdoor activity 🚫 - Health alert for everyone.";
    return "Stay indoors ⚠️ - Emergency health warning, avoid all outdoor activity.";
  };

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
              <h1 className="text-2xl font-bold">AQI Prediction</h1>
              <p className="text-sm text-muted-foreground">Forecast air quality for any location</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <Card className="p-6 shadow-elevated h-fit">
            <h2 className="text-xl font-semibold mb-6">Enter Prediction Parameters</h2>
            <form onSubmit={handlePredict} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter city name"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time of Day</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM - 12 AM)</SelectItem>
                    <SelectItem value="night">Night (12 AM - 6 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Predict AQI
              </Button>
            </form>
          </Card>

          {/* Prediction Result */}
          <div className="space-y-6">
            {predictedAQI !== null ? (
              <>
                <Card className="p-8 shadow-elevated">
                  <h2 className="text-xl font-semibold mb-6 text-center">Predicted AQI</h2>
                  <div className="flex justify-center">
                    <AQIMeter value={predictedAQI} size="lg" />
                  </div>
                </Card>

                <Card className="p-6 shadow-elevated">
                  <h3 className="text-lg font-semibold mb-3">Health Suggestion</h3>
                  <p className="text-lg">{getHealthSuggestion(predictedAQI)}</p>
                </Card>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/health")}
                >
                  View Detailed Health Advisory
                </Button>
              </>
            ) : (
              <Card className="p-12 shadow-soft">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Enter location and date to get AQI prediction</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prediction;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Analytics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("daily");
  const [dailyData, setDailyData] = useState<Array<{ date: string; aqi: number }>>([]);
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching predictions:", error);
        return;
      }

      if (data) {
        setPredictions(data);
        
        // Process data for daily view (last 7 predictions)
        const last7 = data.slice(0, 7).reverse();
        const daily = last7.map((pred, index) => ({
          date: new Date(pred.created_at).toLocaleDateString('en-US', { weekday: 'short' }),
          aqi: pred.predicted_aqi,
        }));
        setDailyData(daily);
      }
    };

    fetchPredictions();
  }, [user?.id]);

  const handleDownload = () => {
    // Generate CSV content from actual predictions
    let csvContent = "Location,Date,Time,Predicted AQI,Created At\n";
    
    predictions.forEach(pred => {
      csvContent += `"${pred.location}",${pred.prediction_date},${pred.prediction_time},${pred.predicted_aqi},${new Date(pred.created_at).toLocaleString()}\n`;
    });

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `aqi_predictions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-atmospheric">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                <p className="text-sm text-muted-foreground">Historical air quality data and trends</p>
              </div>
            </div>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Time Range Tabs */}
        <Tabs value={timeRange} onValueChange={setTimeRange} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6 mt-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Last 7 Days AQI Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

          </TabsContent>

          <TabsContent value="weekly" className="space-y-6 mt-6">
            <Card className="p-6 shadow-soft text-center py-12">
              <p className="text-muted-foreground">Weekly view coming soon. Keep making predictions to see aggregated data!</p>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6 mt-6">
            <Card className="p-6 shadow-soft text-center py-12">
              <p className="text-muted-foreground">Monthly view coming soon. Keep making predictions to see aggregated data!</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Predictions */}
        <Card className="p-6 shadow-soft mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Predictions</h3>
          {predictions.length > 0 ? (
            <div className="space-y-2">
              {predictions.slice(0, 10).map((pred) => (
                <div key={pred.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{pred.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(pred.created_at).toLocaleDateString()} - {pred.prediction_time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">AQI: {pred.predicted_aqi}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No predictions yet. Make your first prediction!</p>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Analytics;

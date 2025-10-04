import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("daily");

  // Mock data
  const dailyData = [
    { date: "Mon", aqi: 65, temp: 28 },
    { date: "Tue", aqi: 58, temp: 29 },
    { date: "Wed", aqi: 72, temp: 27 },
    { date: "Thu", aqi: 95, temp: 30 },
    { date: "Fri", aqi: 102, temp: 31 },
    { date: "Sat", aqi: 87, temp: 29 },
    { date: "Sun", aqi: 78, temp: 28 },
  ];

  const weeklyData = [
    { week: "Week 1", aqi: 75 },
    { week: "Week 2", aqi: 82 },
    { week: "Week 3", aqi: 68 },
    { week: "Week 4", aqi: 91 },
  ];

  const monthlyData = [
    { month: "Jan", aqi: 85 },
    { month: "Feb", aqi: 78 },
    { month: "Mar", aqi: 92 },
    { month: "Apr", aqi: 105 },
    { month: "May", aqi: 98 },
    { month: "Jun", aqi: 88 },
  ];

  const cityComparison = [
    { city: "Chennai", aqi: 87 },
    { city: "Mumbai", aqi: 102 },
    { city: "Delhi", aqi: 156 },
    { city: "Bangalore", aqi: 65 },
    { city: "Kolkata", aqi: 118 },
  ];

  const handleDownload = () => {
    alert("Report download feature would be implemented here");
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

            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Temperature vs AQI</h3>
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
                    dataKey="temp"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Temperature"
                  />
                  <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="AQI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6 mt-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Last 4 Weeks Average AQI</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="aqi" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6 mt-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Last 6 Months Average AQI</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="aqi" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>

        {/* City Comparison */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4">City Comparison (Current AQI)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityComparison} layout="vertical">
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                type="category"
                dataKey="city"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="aqi" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;

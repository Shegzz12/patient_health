'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import SensorChartDisplay from '@/components/sensor-chart-display'
import {
  Activity,
  RotateCw,
  Download,
  Gauge,
  Settings,
  TrendingUp,
} from 'lucide-react'

// Initial mock sensor data with more data points for better visualization
const generateInitialSensorData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}`,
    accelerometer_x: 0.2 + Math.sin(i * 0.15) * 0.15,
    accelerometer_y: 0.1 + Math.cos(i * 0.12) * 0.2,
    accelerometer_z: 9.8 + Math.sin(i * 0.1) * 0.15,
    gyroscope_x: Math.sin(i * 0.15) * 5,
    gyroscope_y: Math.cos(i * 0.12) * 5.5,
    gyroscope_z: Math.sin(i * 0.08) * 3.5,
  }))
}

const mockSensorData = generateInitialSensorData();

export default function SensorMeasurement() {
  const [activeTab, setActiveTab] = useState('accelerometer')
  const [chartData, setChartData] = useState(generateInitialSensorData())
  const [realTimeData, setRealTimeData] = useState({
    acc_x: 0.18,
    acc_y: 0.12,
    acc_z: 9.75,
    gyro_x: 2.5,
    gyro_y: 1.8,
    gyro_z: 0.5,
  })

  // Simulate real-time sensor updates and update charts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAccX = 0.2 + Math.random() * 0.3 - 0.15
      const newAccY = 0.1 + Math.random() * 0.4 - 0.2
      const newAccZ = 9.8 + Math.random() * 0.2 - 0.1
      const newGyroX = Math.random() * 10 - 5
      const newGyroY = Math.random() * 10 - 5
      const newGyroZ = Math.random() * 6 - 3

      // Update real-time values
      setRealTimeData({
        acc_x: newAccX,
        acc_y: newAccY,
        acc_z: newAccZ,
        gyro_x: newGyroX,
        gyro_y: newGyroY,
        gyro_z: newGyroZ,
      })

      // Update chart data - add new point and remove oldest
      setChartData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastTime = prevData[prevData.length - 1].time
        const [hours, minutes] = lastTime.split(':').map(Number)
        let newMinutes = minutes + 2
        let newHours = hours
        if (newMinutes >= 60) {
          newMinutes = newMinutes % 60
          newHours = (newHours + 1) % 24
        }
        const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`

        newData.push({
          time: newTime,
          accelerometer_x: newAccX,
          accelerometer_y: newAccY,
          accelerometer_z: newAccZ,
          gyroscope_x: newGyroX,
          gyroscope_y: newGyroY,
          gyroscope_z: newGyroZ,
        })

        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Sensor Measurements
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium mt-2">
                Real-time gyroscope and accelerometer data tracking for PWDs
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-700 px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-600 mr-2" />
                Live
              </Badge>
              <Badge variant="outline">Sampling Rate: 100Hz</Badge>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="accelerometer">Accelerometer</TabsTrigger>
            <TabsTrigger value="gyroscope">Gyroscope</TabsTrigger>
          </TabsList>

          {/* Accelerometer Tab */}
          <TabsContent value="accelerometer" className="space-y-6">
            {/* Real-time Values */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-blue-700">Accelerometer Live Values</CardTitle>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">m/s²</Badge>
                </div>
                <CardDescription>Real-time acceleration measurements on three axes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* X-Axis */}
                  <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">X-Axis</span>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">X</Badge>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {realTimeData.acc_x.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Lateral movement</p>
                  </div>

                  {/* Y-Axis */}
                  <div className="bg-white rounded-lg border-2 border-green-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">Y-Axis</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">Y</Badge>
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {realTimeData.acc_y.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-green-300 to-green-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Forward/backward</p>
                  </div>

                  {/* Z-Axis */}
                  <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">Z-Axis</span>
                      <Badge className="bg-purple-100 text-purple-700 text-xs">Z</Badge>
                    </div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {realTimeData.acc_z.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-purple-300 to-purple-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Vertical movement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <SensorChartDisplay
              title="Accelerometer Data Visualization"
              description="Live trend showing acceleration across all three axes (X, Y, Z)"
              data={chartData}
              sensorType="accelerometer"
            />

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Peak Acceleration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">9.89 m/s²</p>
                  <p className="text-sm text-muted-foreground mt-2">Z-axis maximum</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Average Movement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">0.45 m/s²</p>
                  <p className="text-sm text-muted-foreground mt-2">Overall average</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Stability Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">94%</p>
                  <p className="text-sm text-muted-foreground mt-2">Very stable</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gyroscope Tab */}
          <TabsContent value="gyroscope" className="space-y-6">
            {/* Real-time Values */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-orange-700">Gyroscope Live Values</CardTitle>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">°/s</Badge>
                </div>
                <CardDescription>Real-time angular velocity measurements on three axes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* X-Rotation */}
                  <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">X-Rotation</span>
                      <Badge className="bg-orange-100 text-orange-700 text-xs">Roll</Badge>
                    </div>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {realTimeData.gyro_x.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Tilting motion</p>
                  </div>

                  {/* Y-Rotation */}
                  <div className="bg-white rounded-lg border-2 border-amber-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">Y-Rotation</span>
                      <Badge className="bg-amber-100 text-amber-700 text-xs">Pitch</Badge>
                    </div>
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {realTimeData.gyro_y.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Nodding motion</p>
                  </div>

                  {/* Z-Rotation */}
                  <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-muted-foreground">Z-Rotation</span>
                      <Badge className="bg-yellow-100 text-yellow-700 text-xs">Yaw</Badge>
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {realTimeData.gyro_z.toFixed(2)}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2">Spinning motion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <SensorChartDisplay
              title="Gyroscope Data Visualization"
              description="Live trend showing angular velocity across all three axes (X, Y, Z)"
              data={chartData}
              sensorType="gyroscope"
            />

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Peak Rotation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-600">5.2 °/s</p>
                  <p className="text-sm text-muted-foreground mt-2">X-axis maximum</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Average Rotation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">1.8 °/s</p>
                  <p className="text-sm text-muted-foreground mt-2">Overall average</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Motion Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">Normal</p>
                  <p className="text-sm text-muted-foreground mt-2">No anomalies</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Button className="gap-2 flex-1 md:flex-none">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="gap-2 flex-1 md:flex-none bg-transparent">
            <Settings className="h-4 w-4" />
            Calibrate Sensors
          </Button>
          <Button variant="outline" className="gap-2 flex-1 md:flex-none bg-transparent">
            <Activity className="h-4 w-4" />
            Live Stream
          </Button>
        </div>
      </main>
    </div>
  )
}

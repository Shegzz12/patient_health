'use client'

import { useState } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { HealthMetricCard } from '@/components/health-metric-card'
import { SensorDataChart } from '@/components/sensor-data-chart'
import { AlertNotification } from '@/components/alert-notification'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useHealthVitals } from '@/hooks/use-health-vitals'
import {
  formatLastUpdated,
  getHeartRateStatus,
  getSpO2Status,
  getTempStatus,
  getTrend,
} from '@/lib/health-api'
import {
  Heart,
  Wind,
  Thermometer,
  AlertTriangle,
  Activity,
  TrendingUp,
  Bell,
  RefreshCw,
  Zap,
  Clock,
  CheckCircle,
  TrendingDown,
} from 'lucide-react'

// Mock data for sensor readings
const mockSensorData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  accelerometer_x: 0.2 + Math.sin(i * 0.3) * 0.15,
  accelerometer_y: 0.1 + Math.cos(i * 0.4) * 0.2,
  accelerometer_z: 9.8 + Math.sin(i * 0.2) * 0.1,
  gyroscope_x: Math.sin(i * 0.2) * 5,
  gyroscope_y: Math.cos(i * 0.3) * 5,
  gyroscope_z: Math.sin(i * 0.15) * 3,
}))

interface MockAlert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  metric: string
  value: string
  normalRange: string
  timestamp: Date
  notified: boolean
}

export default function Dashboard() {
  const { live, loading, refreshing, error, refresh, previousReading } = useHealthVitals()

  const [alerts, setAlerts] = useState<MockAlert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Critical Blood Oxygen Level',
      description: 'Blood oxygen is critically low',
      metric: 'SpO2',
      value: '88%',
      normalRange: '95-100%',
      timestamp: new Date(Date.now() - 5 * 60000),
      notified: true,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Elevated Heart Rate',
      description: 'Heart rate is higher than normal',
      metric: 'Heart Rate',
      value: '105 bpm',
      normalRange: '60-100 bpm',
      timestamp: new Date(Date.now() - 15 * 60000),
      notified: false,
    },
  ])

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleSendToPersonnel = (id: string) => {
    setAlerts(alerts.map((alert) =>
      alert.id === id ? { ...alert, notified: true } : alert
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="p-4 md:p-8">
        {/* Header with Enhanced Design */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Health Monitoring System - Joy Joseph
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Comprehensive real-time health monitoring and wellness tracking
              </p>
            </div>
            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-background border-primary/30 hover:bg-primary/5 flex-1 md:flex-none md:size-lg"
                onClick={refresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 md:h-5 w-4 md:w-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden md:inline">Refresh</span>
              </Button>
              <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-1 md:flex-none md:size-lg">
                <Bell className="h-4 md:h-5 w-4 md:w-5" />
                <span className="hidden md:inline">Notifications</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8">
          {/* Status Card */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-xs font-semibold text-green-700">Status</p>
                </div>
                <p className="text-2xl font-bold text-foreground">Stable</p>
                <p className="text-xs text-muted-foreground">All systems normal</p>
              </div>
            </CardContent>
          </Card>

          {/* Last Sync Card */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <p className="text-xs font-semibold text-blue-700">Last Sync</p>
                </div>
                <p className="text-2xl font-bold text-foreground">2 min</p>
                <p className="text-xs text-muted-foreground">ago</p>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts Card */}
          <Card className={`border-2 ${alerts.length > 0 ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' : 'border-green-200 bg-gradient-to-br from-green-50 to-white'}`}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${alerts.length > 0 ? 'text-red-600' : 'text-green-600'}`} />
                  <p className={`text-xs font-semibold ${alerts.length > 0 ? 'text-red-700' : 'text-green-700'}`}>Alerts</p>
                </div>
                <p className={`text-2xl font-bold ${alerts.length > 0 ? 'text-red-600' : 'text-green-600'}`}>{alerts.length}</p>
                <p className="text-xs text-muted-foreground">active</p>
              </div>
            </CardContent>
          </Card>

          {/* Devices Card */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <p className="text-xs font-semibold text-purple-700">Devices</p>
                </div>
                <p className="text-2xl font-bold text-foreground">2/2</p>
                <p className="text-xs text-muted-foreground">connected</p>
              </div>
            </CardContent>
          </Card>

          {/* Monitoring Card */}
          <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-600" />
                  <p className="text-xs font-semibold text-amber-700">Monitoring</p>
                </div>
                <p className="text-2xl font-bold text-foreground">Active</p>
                <p className="text-xs text-muted-foreground">24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Card className="mb-6 border-2 border-red-200 bg-red-50">
            <CardContent className="py-4">
              <p className="text-sm text-red-700">
                Could not load live vitals: {error}. Showing last known values when available.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Primary Health Metrics - Core Vital Signs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            Vital Signs Monitoring
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <HealthMetricCard
              label="Heart Rate"
              value={loading && !live ? '—' : live?.heartRate ?? '—'}
              unit="bpm"
              normalRange={{ min: 60, max: 100 }}
              trend={live ? getTrend(live.heartRate, previousReading?.heartRate) : 'stable'}
              icon={<Heart className="h-6 w-6" />}
              status={live ? getHeartRateStatus(live.heartRate) : 'normal'}
              lastUpdated={live ? formatLastUpdated(live.timestamp) : 'Loading...'}
            />
            <HealthMetricCard
              label="Blood Oxygen"
              value={loading && !live ? '—' : live?.spo2 ?? '—'}
              unit="%"
              normalRange={{ min: 95, max: 100 }}
              trend={live ? getTrend(live.spo2, previousReading?.spo2) : 'stable'}
              icon={<Wind className="h-6 w-6" />}
              status={live ? getSpO2Status(live.spo2) : 'normal'}
              lastUpdated={live ? formatLastUpdated(live.timestamp) : 'Loading...'}
            />
            <HealthMetricCard
              label="Temperature"
              value={loading && !live ? '—' : live?.temp ?? '—'}
              unit="°C"
              normalRange={{ min: 36.5, max: 37.5 }}
              trend={live ? getTrend(live.temp, previousReading?.temp) : 'stable'}
              icon={<Thermometer className="h-6 w-6" />}
              status={live ? getTempStatus(live.temp) : 'normal'}
              lastUpdated={live ? formatLastUpdated(live.timestamp) : 'Loading...'}
            />
            <HealthMetricCard
              label="Malaria Level"
              value={0}
              unit="parasites/µL"
              normalRange={{ min: 0, max: 0 }}
              trend="stable"
              icon={<Activity className="h-6 w-6" />}
              status="normal"
              lastUpdated="1 hour ago"
            />
          </div>
        </div>

        {/* Sensor Data Section with Enhanced Layout */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Motion & Movement Analysis
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="all">All Data</TabsTrigger>
              <TabsTrigger value="accelerometer">Accelerometer</TabsTrigger>
              <TabsTrigger value="gyroscope">Gyroscope</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <SensorDataChart
                  title="Accelerometer Data"
                  description="Real-time movement and vibration readings (X, Y, Z axes)"
                  data={mockSensorData}
                  sensorType="accelerometer"
                />
                <SensorDataChart
                  title="Gyroscope Data"
                  description="Real-time angular velocity readings (X, Y, Z axes)"
                  data={mockSensorData}
                  sensorType="gyroscope"
                />
              </div>
            </TabsContent>

            <TabsContent value="accelerometer" className="mt-6">
              <SensorDataChart
                title="Accelerometer Data"
                description="Real-time movement and vibration readings across all axes"
                data={mockSensorData}
                sensorType="accelerometer"
              />
            </TabsContent>

            <TabsContent value="gyroscope" className="mt-6">
              <SensorDataChart
                title="Gyroscope Data"
                description="Real-time angular velocity and rotation readings across all axes"
                data={mockSensorData}
                sensorType="gyroscope"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Alerts Section - Critical Information */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Health Alerts & Notifications
            </h2>
            {alerts.length > 0 && (
              <Badge className="bg-red-100 text-red-700 text-sm px-3 py-1">
                {alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'}
              </Badge>
            )}
          </div>
          {alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <AlertNotification
                  key={alert.id}
                  {...alert}
                  onDismiss={() => handleDismissAlert(alert.id)}
                  onSendToPersonnel={() => handleSendToPersonnel(alert.id)}
                  icon={alert.metric === 'SpO2' ? <Wind className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
                />
              ))}
            </div>
          ) : (
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="py-8">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <p className="text-center text-green-600 font-semibold text-lg">
                    No active alerts - Patient status is stable
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity Timeline */}
        <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Last 5 system events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '14:32', action: 'Blood Oxygen dropped to 88% - Critical Alert Generated', type: 'alert' },
                { time: '14:25', action: 'Heart rate increased to 105 bpm - Abnormal Activity Detected', type: 'warning' },
                { time: '14:15', action: 'Temperature reading: 36.8°C - Normal', type: 'info' },
                { time: '14:05', action: 'Gyroscope and Accelerometer Calibration Completed', type: 'success' },
                { time: '13:55', action: 'All Sensor Data Synchronized Successfully', type: 'success' },
              ].map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border-l-4 border-transparent hover:border-primary/50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      entry.type === 'alert' ? 'bg-red-500' :
                      entry.type === 'warning' ? 'bg-yellow-500' :
                      entry.type === 'info' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`} />
                    <span className="text-sm text-foreground font-medium">{entry.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4 font-semibold">{entry.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

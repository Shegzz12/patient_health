'use client'

import { useState } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { AlertNotification } from '@/components/alert-notification'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  ArchiveX,
  Filter,
} from 'lucide-react'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  metric: string
  value: string | number
  normalRange?: string
  timestamp: Date
  notified: boolean
  resolved?: boolean
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Critical Blood Oxygen Level',
      description: 'Blood oxygen is critically low and requires immediate attention',
      metric: 'SpO2',
      value: '88%',
      normalRange: '95-100%',
      timestamp: new Date(Date.now() - 5 * 60000),
      notified: true,
      resolved: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Elevated Heart Rate',
      description: 'Heart rate is higher than normal range for extended period',
      metric: 'Heart Rate',
      value: '105 bpm',
      normalRange: '60-100 bpm',
      timestamp: new Date(Date.now() - 15 * 60000),
      notified: false,
      resolved: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Temperature Elevation',
      description: 'Slight temperature increase detected',
      metric: 'Temperature',
      value: '37.8°C',
      normalRange: '36.5-37.5°C',
      timestamp: new Date(Date.now() - 45 * 60000),
      notified: true,
      resolved: false,
    },
    {
      id: '4',
      type: 'info',
      title: 'Sensor Calibration Completed',
      description: 'Accelerometer and gyroscope calibration successful',
      metric: 'Sensors',
      value: 'Calibrated',
      timestamp: new Date(Date.now() - 2 * 3600000),
      notified: true,
      resolved: true,
    },
    {
      id: '5',
      type: 'critical',
      title: 'Low SpO2 Detection',
      description: 'Blood oxygen dropped below critical threshold',
      metric: 'SpO2',
      value: '85%',
      normalRange: '95-100%',
      timestamp: new Date(Date.now() - 3 * 3600000),
      notified: true,
      resolved: true,
    },
  ])

  const activeAlerts = alerts.filter((a) => !a.resolved)
  const resolvedAlerts = alerts.filter((a) => a.resolved)
  const criticalAlerts = activeAlerts.filter((a) => a.type === 'critical')
  const warningAlerts = activeAlerts.filter((a) => a.type === 'warning')
  const infoAlerts = activeAlerts.filter((a) => a.type === 'info')

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.map((alert) =>
      alert.id === id ? { ...alert, resolved: true } : alert
    ))
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleSendToPersonnel = (id: string) => {
    setAlerts(alerts.map((alert) =>
      alert.id === id ? { ...alert, notified: true } : alert
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        {/* Header with Enhanced Design */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Health Alerts
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Monitor, manage, and respond to all health alerts and notifications
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Filter className="h-5 w-5" />
              Filter Alerts
            </Button>
          </div>
        </div>

        {/* Alert Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Critical</p>
                  <p className="text-3xl font-bold text-red-600">{criticalAlerts.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Warnings</p>
                  <p className="text-3xl font-bold text-yellow-600">{warningAlerts.length}</p>
                </div>
                <Bell className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Info</p>
                  <p className="text-3xl font-bold text-blue-600">{infoAlerts.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{resolvedAlerts.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Alert Management */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active Alerts ({activeAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedAlerts.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Alerts Tab */}
          <TabsContent value="active" className="mt-6 space-y-4">
            {activeAlerts.length > 0 ? (
              <>
                {/* Critical Alerts */}
                {criticalAlerts.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Critical Alerts
                    </h2>
                    <div className="space-y-3">
                      {criticalAlerts.map((alert) => (
                        <div key={alert.id} className="relative">
                          <AlertNotification
                            {...alert}
                            onDismiss={() => handleDismissAlert(alert.id)}
                            onSendToPersonnel={() => handleSendToPersonnel(alert.id)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning Alerts */}
                {warningAlerts.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Bell className="h-5 w-5 text-yellow-600" />
                      Warning Alerts
                    </h2>
                    <div className="space-y-3">
                      {warningAlerts.map((alert) => (
                        <div key={alert.id} className="relative">
                          <AlertNotification
                            {...alert}
                            onDismiss={() => handleDismissAlert(alert.id)}
                            onSendToPersonnel={() => handleSendToPersonnel(alert.id)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info Alerts */}
                {infoAlerts.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Info Alerts
                    </h2>
                    <div className="space-y-3">
                      {infoAlerts.map((alert) => (
                        <div key={alert.id} className="relative">
                          <AlertNotification
                            {...alert}
                            onDismiss={() => handleDismissAlert(alert.id)}
                            onSendToPersonnel={() => handleSendToPersonnel(alert.id)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-4 right-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardContent className="py-8">
                  <p className="text-center text-green-600 font-semibold">
                    ✓ No active alerts - All systems normal
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Resolved Alerts Tab */}
          <TabsContent value="resolved" className="mt-6 space-y-4">
            {resolvedAlerts.length > 0 ? (
              <div className="space-y-3">
                {resolvedAlerts.map((alert) => (
                  <div key={alert.id} className="relative">
                    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white opacity-75">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                        <div className="flex-1">
                          <CardTitle className="text-green-700 line-through">
                            {alert.title}
                          </CardTitle>
                          <CardDescription className="line-through">
                            {alert.description}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      </CardHeader>
                    </Card>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 right-12 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDeleteAlert(alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="py-8">
                  <p className="text-center text-gray-600 font-semibold">
                    No resolved alerts yet
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Alert History Summary */}
        <Card className="mt-8 border-2 border-border bg-gradient-to-br from-background to-card">
          <CardHeader>
            <CardTitle className="text-primary">Alert Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Most Frequent Alert</p>
                <p className="text-lg font-semibold text-foreground">
                  Blood Oxygen Level
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Today{'\''}s Alerts</p>
                <p className="text-lg font-semibold text-foreground">5 alerts</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-lg font-semibold text-foreground">60%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

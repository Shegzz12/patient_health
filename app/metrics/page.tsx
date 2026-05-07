'use client'

import React from "react"

import { SidebarNav } from '@/components/sidebar-nav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Wind,
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Mock historical data
const heartRateData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  average: 72 + Math.sin(i * 0.2) * 15,
  min: 60 + Math.sin(i * 0.3) * 10,
  max: 85 + Math.cos(i * 0.2) * 15,
}))

const spO2Data = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: 97 + Math.sin(i * 0.2) * 2,
}))

const temperatureData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  morning: 36.5 + Math.random() * 0.5,
  afternoon: 36.8 + Math.random() * 0.4,
  evening: 36.7 + Math.random() * 0.3,
}))

interface MetricDetail {
  name: string
  icon: React.ReactNode
  currentValue: string
  unit: string
  status: 'normal' | 'warning' | 'critical'
  lastReading: string
  average: string
  trend: 'up' | 'down' | 'stable'
  trendPercentage: string
  minToday: string
  maxToday: string
  normalRange: string
  description: string
}

const metrics: MetricDetail[] = [
  {
    name: 'Heart Rate',
    icon: <Heart className="h-6 w-6" />,
    currentValue: '92',
    unit: 'bpm',
    status: 'normal',
    lastReading: '2 minutes ago',
    average: '78 bpm',
    trend: 'up',
    trendPercentage: '+18%',
    minToday: '65 bpm',
    maxToday: '115 bpm',
    normalRange: '60-100 bpm',
    description:
      'Your heart rate is currently within normal range. Average is slightly elevated due to physical activity.',
  },
  {
    name: 'Blood Oxygen',
    icon: <Wind className="h-6 w-6" />,
    currentValue: '88',
    unit: '%',
    status: 'critical',
    lastReading: 'Just now',
    average: '97%',
    trend: 'down',
    trendPercentage: '-9%',
    minToday: '87%',
    maxToday: '99%',
    normalRange: '95-100%',
    description:
      'Your blood oxygen level is critically low. Please seek immediate medical attention and ensure proper ventilation.',
  },
  {
    name: 'Temperature',
    icon: <Thermometer className="h-6 w-6" />,
    currentValue: '36.8',
    unit: '°C',
    status: 'normal',
    lastReading: '5 minutes ago',
    average: '36.7°C',
    trend: 'stable',
    trendPercentage: '0%',
    minToday: '36.5°C',
    maxToday: '37.2°C',
    normalRange: '36.5-37.5°C',
    description: 'Your body temperature is normal and stable throughout the day.',
  },
  {
    name: 'Malaria Level',
    icon: <Activity className="h-6 w-6" />,
    currentValue: '0',
    unit: 'parasites/µL',
    status: 'normal',
    lastReading: '1 hour ago',
    average: '0',
    trend: 'stable',
    trendPercentage: '0%',
    minToday: '0',
    maxToday: '0',
    normalRange: '0 (Negative)',
    description:
      'No malaria parasites detected. Continue with preventive measures and regular monitoring.',
  },
]

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        {/* Header with Enhanced Design */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                Health Metrics
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Comprehensive analysis of vital signs, trends, and historical data
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
          {metrics.map((metric) => {
            const statusColors = {
              normal: 'bg-green-50 border-green-200',
              warning: 'bg-yellow-50 border-yellow-200',
              critical: 'bg-red-50 border-red-200',
            }

            const statusBadgeColors = {
              normal: 'bg-green-100 text-green-700',
              warning: 'bg-yellow-100 text-yellow-700',
              critical: 'bg-red-100 text-red-700',
            }

            return (
              <Card
                key={metric.name}
                className={`border-2 ${statusColors[metric.status]} overflow-hidden`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="text-primary">{metric.icon}</div>
                      <div>
                        <CardTitle className="text-primary text-xl">
                          {metric.name}
                        </CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={statusBadgeColors[metric.status]}>
                      {metric.status.charAt(0).toUpperCase() +
                        metric.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Value */}
                    <div className="py-4 px-4 bg-white/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Current Reading
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">
                          {metric.currentValue}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {metric.unit}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {metric.lastReading}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Daily Average
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {metric.average}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Trend
                        </p>
                        <div className="flex items-center gap-1">
                          {metric.trend === 'up' && (
                            <TrendingUp className="h-5 w-5 text-red-500" />
                          )}
                          {metric.trend === 'down' && (
                            <TrendingDown className="h-5 w-5 text-green-500" />
                          )}
                          {metric.trend === 'stable' && (
                            <div className="h-1 w-5 bg-blue-500 rounded-full" />
                          )}
                          <span className="text-sm font-semibold text-foreground">
                            {metric.trendPercentage}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Today{'\''}s Min
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {metric.minToday}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Today{'\''}s Max
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {metric.maxToday}
                        </p>
                      </div>
                    </div>

                    {/* Normal Range */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Normal Range: <strong>{metric.normalRange}</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Historical Charts */}
        <div className="space-y-6">
          {/* Heart Rate Chart */}
          <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Heart Rate Trend (30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '2px solid var(--border)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="var(--chart-1)"
                    name="Average"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="min"
                    stroke="var(--chart-2)"
                    name="Min"
                    strokeWidth={1}
                  />
                  <Line
                    type="monotone"
                    dataKey="max"
                    stroke="var(--chart-3)"
                    name="Max"
                    strokeWidth={1}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SpO2 Chart */}
          <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Wind className="h-5 w-5" />
                Blood Oxygen Level (30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spO2Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                    domain={[85, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '2px solid var(--border)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-2)"
                    name="SpO2 %"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Temperature Chart */}
          <Card className="border-2 border-border bg-gradient-to-br from-background to-card">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Temperature by Time of Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="day"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '2px solid var(--border)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="morning"
                    fill="var(--chart-1)"
                    name="Morning"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="afternoon"
                    fill="var(--chart-2)"
                    name="Afternoon"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="evening"
                    fill="var(--chart-3)"
                    name="Evening"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

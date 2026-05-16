'use client'

import React, { useMemo } from "react"

import { SidebarNav } from '@/components/sidebar-nav'
import { useHealthVitals } from '@/hooks/use-health-vitals'
import {
  formatLastUpdated,
  getHeartRateStatus,
  getSpO2Status,
  getTempStatus,
  getTrend,
} from '@/lib/health-api'
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
  Download,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

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

const malariaMetric: MetricDetail = {
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
}

function formatTrendPercentage(current: number, previous: number | undefined): string {
  if (previous === undefined || previous === 0) return '0%'
  const change = ((current - previous) / previous) * 100
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(0)}%`
}

export default function MetricsPage() {
  const {
    live,
    chartData,
    error,
    previousReading,
    heartRateStats,
    spo2Stats,
    tempStats,
  } = useHealthVitals()

  const metrics: MetricDetail[] = useMemo(() => {
    const heartTrend = live ? getTrend(live.heartRate, previousReading?.heartRate) : 'stable'
    const spo2Trend = live ? getTrend(live.spo2, previousReading?.spo2) : 'stable'
    const tempTrend = live ? getTrend(live.temp, previousReading?.temp) : 'stable'

    return [
      {
        name: 'Heart Rate',
        icon: <Heart className="h-6 w-6" />,
        currentValue: live ? String(live.heartRate) : '—',
        unit: 'bpm',
        status: live ? getHeartRateStatus(live.heartRate) : 'normal',
        lastReading: live ? formatLastUpdated(live.timestamp) : 'Loading...',
        average: `${heartRateStats.average.toFixed(1)} bpm`,
        trend: heartTrend,
        trendPercentage: formatTrendPercentage(
          live?.heartRate ?? 0,
          previousReading?.heartRate,
        ),
        minToday: `${heartRateStats.min.toFixed(1)} bpm`,
        maxToday: `${heartRateStats.max.toFixed(1)} bpm`,
        normalRange: '60-100 bpm',
        description: 'Live heart rate readings from the health monitor sensor.',
      },
      {
        name: 'Blood Oxygen',
        icon: <Wind className="h-6 w-6" />,
        currentValue: live ? String(live.spo2) : '—',
        unit: '%',
        status: live ? getSpO2Status(live.spo2) : 'normal',
        lastReading: live ? formatLastUpdated(live.timestamp) : 'Loading...',
        average: `${spo2Stats.average.toFixed(1)}%`,
        trend: spo2Trend,
        trendPercentage: formatTrendPercentage(live?.spo2 ?? 0, previousReading?.spo2),
        minToday: `${spo2Stats.min.toFixed(1)}%`,
        maxToday: `${spo2Stats.max.toFixed(1)}%`,
        normalRange: '95-100%',
        description: 'Live blood oxygen (SpO2) readings from the health monitor sensor.',
      },
      {
        name: 'Temperature',
        icon: <Thermometer className="h-6 w-6" />,
        currentValue: live ? String(live.temp) : '—',
        unit: '°C',
        status: live ? getTempStatus(live.temp) : 'normal',
        lastReading: live ? formatLastUpdated(live.timestamp) : 'Loading...',
        average: `${tempStats.average.toFixed(1)}°C`,
        trend: tempTrend,
        trendPercentage: formatTrendPercentage(live?.temp ?? 0, previousReading?.temp),
        minToday: `${tempStats.min.toFixed(1)}°C`,
        maxToday: `${tempStats.max.toFixed(1)}°C`,
        normalRange: '36.5-37.5°C',
        description: 'Live body temperature readings from the health monitor sensor.',
      },
      malariaMetric,
    ]
  }, [live, previousReading, heartRateStats, spo2Stats, tempStats])

  const heartRateChartData = chartData.map((point) => ({
    time: point.time,
    value: point.heartRate,
  }))

  const spO2ChartData = chartData.map((point) => ({
    time: point.time,
    value: point.spo2,
  }))

  const temperatureChartData = chartData.map((point) => ({
    time: point.time,
    value: point.temp,
  }))

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

        {error && (
          <Card className="mb-6 border-2 border-red-200 bg-red-50">
            <CardContent className="py-4">
              <p className="text-sm text-red-700">
                Could not load vitals from the API: {error}
              </p>
            </CardContent>
          </Card>
        )}

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
                Heart Rate History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={heartRateChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="time"
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-1)"
                    name="Heart Rate (bpm)"
                    strokeWidth={2}
                    dot
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
                Blood Oxygen History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spO2ChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="time"
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
                Temperature History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperatureChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="time"
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
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-3)"
                    name="Temperature (°C)"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

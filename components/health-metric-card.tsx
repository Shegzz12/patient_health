'use client'

import React from "react"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface HealthMetricCardProps {
  label: string
  value: number | string
  unit: string
  normalRange?: {
    min: number
    max: number
  }
  trend?: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  status: 'normal' | 'warning' | 'critical'
  lastUpdated?: string
}

export function HealthMetricCard({
  label,
  value,
  unit,
  normalRange,
  trend,
  icon,
  status,
  lastUpdated,
}: HealthMetricCardProps) {
  const statusColors = {
    normal: 'border-green-200 bg-gradient-to-br from-green-50 to-white',
    warning: 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white',
    critical: 'border-red-200 bg-gradient-to-br from-red-50 to-white',
  }

  const statusTextColors = {
    normal: 'text-green-700',
    warning: 'text-yellow-700',
    critical: 'text-red-700',
  }

  const statusBadgeColors = {
    normal: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
  }

  return (
    <Card className={`border-2 ${statusColors[status]} overflow-hidden hover:shadow-lg transition-shadow duration-300 relative`}>
      {/* Status Indicator Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        status === 'critical' ? 'bg-red-500' :
        status === 'warning' ? 'bg-yellow-500' :
        'bg-green-500'
      }`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${
            status === 'critical' ? 'bg-red-100' :
            status === 'warning' ? 'bg-yellow-100' :
            'bg-green-100'
          }`}>
            <div className={`text-primary ${
              status === 'critical' ? 'text-red-600' :
              status === 'warning' ? 'text-yellow-600' :
              'text-green-600'
            }`}>{icon}</div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            <p className="text-xs text-muted-foreground">Health Metric</p>
          </div>
        </div>
        {status === 'critical' && (
          <AlertCircle className="h-5 w-5 text-red-600 animate-pulse flex-shrink-0" />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main Value Display */}
          <div className="bg-white/40 rounded-lg p-3 space-y-1">
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-bold ${statusTextColors[status]}`}>
                {value}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{unit}</span>
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full" />
          </div>

          {/* Trend and Range Info */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {trend === 'up' && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-red-500 font-bold" />
                  <span className="text-xs font-semibold text-red-600">Increasing</span>
                </div>
              )}
              {trend === 'down' && (
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-green-500 font-bold" />
                  <span className="text-xs font-semibold text-green-600">Decreasing</span>
                </div>
              )}
              {trend === 'stable' && (
                <div className="flex items-center gap-1">
                  <div className="h-1 w-4 bg-blue-500 rounded-full" />
                  <span className="text-xs font-semibold text-blue-600">Stable</span>
                </div>
              )}
            </div>
          </div>

          {/* Normal Range */}
          {normalRange && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground font-medium">
                Normal: <span className="font-bold text-foreground">{normalRange.min}-{normalRange.max}{unit}</span>
              </p>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground pt-1 font-medium">
              ⏱ {lastUpdated}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import React from "react"
import { Clock } from 'lucide-react' // Import Clock icon

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Heart, Thermometer, Wind, AlertCircle, Check } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

// Helper function to format timestamp
const formatTime = (date: Date) => {
  try {
    return formatDistanceToNow(date, { addSuffix: true })
  } catch {
    return date.toLocaleTimeString()
  }
}

interface AlertNotificationProps {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  metric: string
  value: string | number
  normalRange?: string
  timestamp: Date
  icon?: React.ReactNode
  notified?: boolean
  onDismiss?: () => void
  onSendToPersonnel?: () => void
}

export function AlertNotification({
  id,
  type,
  title,
  description,
  metric,
  value,
  normalRange,
  timestamp,
  icon,
  notified,
  onDismiss,
  onSendToPersonnel,
}: AlertNotificationProps) {
  const typeColors = {
    critical: 'border-red-300 bg-gradient-to-br from-red-50 to-white',
    warning: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-white',
    info: 'border-blue-300 bg-gradient-to-br from-blue-50 to-white',
  }

  const typeBgColors = {
    critical: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  }

  const typeIcons = {
    critical: <AlertTriangle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Heart className="h-5 w-5" />,
  }

  return (
    <Card className={`border-2 ${typeColors[type]} overflow-hidden hover:shadow-md transition-all duration-300 relative`}>
      {/* Alert Type Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${
        type === 'critical' ? 'bg-red-600' :
        type === 'warning' ? 'bg-yellow-600' :
        'bg-blue-600'
      }`} />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 pt-6">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2.5 rounded-lg ${
            type === 'critical' ? 'bg-red-100' :
            type === 'warning' ? 'bg-yellow-100' :
            'bg-blue-100'
          }`}>
            <Badge className={`${typeBgColors[type]} border-0`}>
              {icon || typeIcons[type]}
            </Badge>
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${
              type === 'critical' ? 'text-red-700' :
              type === 'warning' ? 'text-yellow-700' :
              'text-blue-700'
            }`}>{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        {notified && (
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
            <Check className="h-3.5 w-3.5" />
            Notified
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Metric Info - Enhanced Layout */}
          <div className={`grid grid-cols-2 gap-4 py-4 px-4 rounded-lg border ${
            type === 'critical' ? 'bg-red-50/50 border-red-200' :
            type === 'warning' ? 'bg-yellow-50/50 border-yellow-200' :
            'bg-blue-50/50 border-blue-200'
          }`}>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Metric</p>
              <p className={`text-lg font-bold ${
                type === 'critical' ? 'text-red-600' :
                type === 'warning' ? 'text-yellow-600' :
                'text-blue-600'
              }`}>{metric}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Current Value</p>
              <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
            {normalRange && (
              <div className="col-span-2 pt-2 border-t border-current/20">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Normal Range</p>
                <p className="text-sm font-semibold text-foreground">{normalRange}</p>
              </div>
            )}
          </div>

          {/* Timestamp with Icon */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timestamp)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {type === 'critical' && (
              <Button
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={onSendToPersonnel}
              >
                <AlertTriangle className="h-4 w-4" />
                Send to Doctor
              </Button>
            )}
            {type === 'warning' && (
              <Button
                size="sm"
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
                onClick={onSendToPersonnel}
              >
                Notify Doctor
              </Button>
            )}
            {type === 'info' && (
              <Button
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                onClick={onSendToPersonnel}
              >
                Acknowledge
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent border border-border hover:bg-muted/50"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

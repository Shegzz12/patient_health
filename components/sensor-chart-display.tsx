'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JSX } from 'react' // Declare JSX variable
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'

interface SensorChartDisplayProps {
  data: Array<{
    time: string
    accelerometer_x: number
    accelerometer_y: number
    accelerometer_z: number
    gyroscope_x: number
    gyroscope_y: number
    gyroscope_z: number
  }>
  sensorType: 'accelerometer' | 'gyroscope'
  title: string
  description: string
}

export function SensorChartDisplay({
  data,
  sensorType,
  title,
  description,
}: SensorChartDisplayProps): JSX.Element {
  const isAccelerometer = sensorType === 'accelerometer'

  if (isAccelerometer) {
    return (
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-blue-700">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Acceleration (m/s²)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '2px solid var(--blue-500)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px',
                }}
                labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
                cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                formatter={(value: any) => {
                  if (typeof value === 'number') {
                    return value.toFixed(3)
                  }
                  return value
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="accelerometer_x"
                stroke="#3b82f6"
                name="X-Axis (Lateral)"
                dot={false}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={500}
              />
              <Line
                type="monotone"
                dataKey="accelerometer_y"
                stroke="#10b981"
                name="Y-Axis (Forward/Back)"
                dot={false}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={500}
              />
              <Line
                type="monotone"
                dataKey="accelerometer_z"
                stroke="#a78bfa"
                name="Z-Axis (Vertical)"
                dot={false}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  // Gyroscope chart
  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-orange-700">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Angular Velocity (°/s)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '2px solid var(--orange-500)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '12px',
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
              cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return value.toFixed(3)
                }
                return value
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="gyroscope_x"
              stroke="#f97316"
              name="X-Rotation (Roll)"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={true}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="gyroscope_y"
              stroke="#fbbf24"
              name="Y-Rotation (Pitch)"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={true}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="gyroscope_z"
              stroke="#ec4899"
              name="Z-Rotation (Yaw)"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={true}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SensorChartDisplay

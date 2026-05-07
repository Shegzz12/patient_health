'use client'

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface DataPoint {
  time: string
  accelerometer_x: number
  accelerometer_y: number
  accelerometer_z: number
  gyroscope_x: number
  gyroscope_y: number
  gyroscope_z: number
}

interface SensorDataChartProps {
  title: string
  description: string
  data: DataPoint[]
  sensorType: 'accelerometer' | 'gyroscope'
}

export function SensorDataChart({
  title,
  description,
  data,
  sensorType,
}: SensorDataChartProps) {
  const isAccelerometer = sensorType === 'accelerometer'

  return (
    <Card className="border-2 border-border bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-primary text-xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/5 border-primary/20">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '2px solid var(--primary)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '12px',
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
              cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Legend />
            {isAccelerometer ? (
              <>
                <Line
                  type="monotone"
                  dataKey="accelerometer_x"
                  stroke="var(--chart-1)"
                  name="X-Axis"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
                <Line
                  type="monotone"
                  dataKey="accelerometer_y"
                  stroke="var(--chart-2)"
                  name="Y-Axis"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
                <Line
                  type="monotone"
                  dataKey="accelerometer_z"
                  stroke="var(--chart-3)"
                  name="Z-Axis"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="gyroscope_x"
                  stroke="var(--chart-1)"
                  name="X-Rotation"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
                <Line
                  type="monotone"
                  dataKey="gyroscope_y"
                  stroke="var(--chart-2)"
                  name="Y-Rotation"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
                <Line
                  type="monotone"
                  dataKey="gyroscope_z"
                  stroke="var(--chart-3)"
                  name="Z-Rotation"
                  dot={false}
                  strokeWidth={2.5}
                  isAnimationActive={true}
                  animationDuration={500}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

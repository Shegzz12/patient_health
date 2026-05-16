const HEALTH_API_BASE = 'https://health-monitor-1m4c.onrender.com/api/v1'

export interface VitalsReading {
  heart_rate: string
  spo2: string
  temp: string
  timestamp: string
}

export interface ParsedVitals {
  heartRate: number
  spo2: number
  temp: number
  timestamp: string
}

export function parseVitalsReading(reading: VitalsReading): ParsedVitals {
  return {
    heartRate: parseFloat(reading.heart_rate),
    spo2: parseFloat(reading.spo2),
    temp: parseFloat(reading.temp),
    timestamp: reading.timestamp,
  }
}

export async function fetchLiveVitals(): Promise<VitalsReading> {
  const res = await fetch(`${HEALTH_API_BASE}/live`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Live vitals request failed (${res.status})`)
  return res.json()
}

export async function fetchHistoryVitals(): Promise<VitalsReading[]> {
  const res = await fetch(`${HEALTH_API_BASE}/history`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`History vitals request failed (${res.status})`)
  return res.json()
}

export type VitalStatus = 'normal' | 'warning' | 'critical'

export function getHeartRateStatus(value: number): VitalStatus {
  if (value < 50 || value > 120) return 'critical'
  if (value < 60 || value > 100) return 'warning'
  return 'normal'
}

export function getSpO2Status(value: number): VitalStatus {
  if (value < 90) return 'critical'
  if (value < 95) return 'warning'
  return 'normal'
}

export function getTempStatus(value: number): VitalStatus {
  if (value < 35 || value > 38.5) return 'critical'
  if (value < 36.5 || value > 37.5) return 'warning'
  return 'normal'
}

export type VitalTrend = 'up' | 'down' | 'stable'

export function getTrend(current: number, previous: number | undefined): VitalTrend {
  if (previous === undefined || Number.isNaN(previous)) return 'stable'
  const delta = current - previous
  if (Math.abs(delta) < 0.5) return 'stable'
  return delta > 0 ? 'up' : 'down'
}

export function formatLastUpdated(timestamp: string): string {
  const parsed = new Date(timestamp.replace(' ', 'T'))
  if (Number.isNaN(parsed.getTime())) return timestamp

  const diffMs = Date.now() - parsed.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `${diffHours} hr ago`
  return parsed.toLocaleString()
}

export function formatChartTime(timestamp: string): string {
  const parsed = new Date(timestamp.replace(' ', 'T'))
  if (Number.isNaN(parsed.getTime())) return timestamp
  return parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function historyStats(values: number[]) {
  if (values.length === 0) return { min: 0, max: 0, average: 0 }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const average = values.reduce((sum, v) => sum + v, 0) / values.length
  return { min, max, average }
}

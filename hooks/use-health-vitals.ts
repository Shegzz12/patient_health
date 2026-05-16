'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  fetchHistoryVitals,
  fetchLiveVitals,
  formatChartTime,
  historyStats,
  parseVitalsReading,
  type ParsedVitals,
  type VitalsReading,
} from '@/lib/health-api'

const POLL_INTERVAL_MS = 15_000

export interface VitalsChartPoint {
  time: string
  heartRate: number
  spo2: number
  temp: number
}

export function useHealthVitals() {
  const [live, setLive] = useState<ParsedVitals | null>(null)
  const [history, setHistory] = useState<VitalsReading[]>([])
  const [chartData, setChartData] = useState<VitalsChartPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadVitals = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const [liveReading, historyReadings] = await Promise.all([
        fetchLiveVitals(),
        fetchHistoryVitals(),
      ])

      const parsedLive = parseVitalsReading(liveReading)
      setLive(parsedLive)
      setHistory(historyReadings)
      setChartData(
        historyReadings.map((reading) => {
          const parsed = parseVitalsReading(reading)
          return {
            time: formatChartTime(reading.timestamp),
            heartRate: parsed.heartRate,
            spo2: parsed.spo2,
            temp: parsed.temp,
          }
        }),
      )
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vitals')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadVitals()
    const interval = setInterval(() => loadVitals(true), POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [loadVitals])

  const previousReading =
    history.length >= 2 ? parseVitalsReading(history[history.length - 2]) : null

  const heartRates = chartData.map((point) => point.heartRate)
  const spo2Values = chartData.map((point) => point.spo2)
  const temps = chartData.map((point) => point.temp)

  return {
    live,
    history,
    chartData,
    loading,
    refreshing,
    error,
    refresh: () => loadVitals(true),
    previousReading,
    heartRateStats: historyStats(heartRates),
    spo2Stats: historyStats(spo2Values),
    tempStats: historyStats(temps),
  }
}

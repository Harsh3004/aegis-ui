"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

type ForecastData = {
  time: string
  actualTime: string
  probability: number
  threshold: number
}

const formatTimeRelative = (date: Date) => {
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffMins = Math.round(diffMs / 60000)
  
  if (diffMins === 0) return 'Now'
  if (diffMins < 60) return `+${diffMins}m`
  const hours = Math.floor(diffMins / 60)
  const mins = diffMins % 60
  return mins > 0 ? `+${hours}h${mins}m` : `+${hours}h`
}

const generateMockForecast = () => {
  const data: ForecastData[] = []
  const now = new Date()
  const threshold = 75 // Critical threshold

  // Start from now and forecast forward
  for (let i = 0; i < 12; i++) {
    const forecastTime = new Date(now.getTime() + i * 30 * 60000) // 30-minute intervals
    const baseProb = 60 + Math.random() * 20 // Base probability 60-80%
    const trend = i > 6 ? (i - 6) * 5 : 0 // Increasing trend after 6 intervals
    const noise = Math.random() * 10 - 5 // Random noise ±5%

    data.push({
      time: formatTimeRelative(forecastTime),
      actualTime: forecastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      probability: Math.min(100, Math.max(0, baseProb + trend + noise)),
      threshold
    })
  }
  
  return data

  return data
}

export function ProbabilityForecast() {
  const [data, setData] = useState<ForecastData[]>(generateMockForecast())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateMockForecast())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-teal-400">Rockfall Probability Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
                domain={[0, 100]}
                label={{ 
                  value: 'Probability (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#94a3b8' }
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: '#94a3b8' }}
                labelFormatter={(label, data) => {
                  if (data && data[0]) {
                    return `Time: ${data[0].payload.actualTime} (${data[0].payload.time})`
                  }
                  return label
                }}
              />
              <defs>
                <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F28C28" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#F28C28" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <Bar 
                dataKey="probability"
                fill="url(#probGradient)"
                radius={[4, 4, 0, 0]}
                label={{
                  position: 'top',
                  fill: '#475569',
                  fontSize: 12,
                  formatter: (value: any) => (typeof value === 'number' ? `${Math.round(value)}%` : '')
                }}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props
                  const fill = payload.probability >= payload.threshold ? 'url(#criticalGradient)' : 'url(#probGradient)'
                  return (
                    <path
                      d={`M${x},${y + height}
                         L${x},${y + 4}
                         Q${x},${y} ${x + 4},${y}
                         L${x + width - 4},${y}
                         Q${x + width},${y} ${x + width},${y + 4}
                         L${x + width},${y + height}
                         Z`}
                      fill={fill}
                    />
                  )
                }}
              />
              <ReferenceLine
                y={75}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{
                  value: 'Critical Threshold (75%)',
                  fill: '#ef4444',
                  position: 'right'
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

type ForecastData = {
  time: string
  probability: number
  threshold: number
}

const generateMockForecast = () => {
  const data: ForecastData[] = []
  const now = new Date()
  const threshold = 75 // Critical threshold

  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() + i * 30 * 60000) // 30-minute intervals
    const baseProb = 60 + Math.random() * 20 // Base probability 60-80%
    const trend = i > 6 ? (i - 6) * 5 : 0 // Increasing trend after 6 intervals
    const noise = Math.random() * 10 - 5 // Random noise ±5%

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      probability: Math.min(100, Math.max(0, baseProb + trend + noise)),
      threshold
    })
  }

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
              />
              <Bar 
                dataKey="probability"
                fill={(data) => data.probability > data.threshold ? '#ef4444' : '#3b82f6'}
                radius={[4, 4, 0, 0]}
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

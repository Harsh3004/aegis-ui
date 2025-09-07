"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const generateMockData = (hours = 24) => {
  const data = []
  const now = new Date()
  let rainfall = 0
  let tilt = 0

  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 3600000))
    
    // Simulate correlated data
    rainfall = Math.max(0, rainfall + (Math.random() * 2 - 0.8)) // -0.8 to 1.2 change
    // Tilt follows rainfall with some delay and noise
    if (i < hours - 2) { // Delay effect
      tilt = Math.max(0, tilt + (rainfall > 5 ? 0.2 : -0.1) + (Math.random() * 0.2 - 0.1))
    }

    data.push({
      time: time.toLocaleTimeString(),
      rainfall: rainfall.toFixed(1),
      tilt: tilt.toFixed(2)
    })
  }
  return data
}

export function WeatherCorrelation() {
  const [data, setData] = useState(generateMockData())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)]
        const lastData = prev[prev.length - 1]
        const newRainfall = Math.max(0, parseFloat(lastData.rainfall) + (Math.random() * 2 - 0.8))
        const newTilt = Math.max(0, parseFloat(lastData.tilt) + (newRainfall > 5 ? 0.2 : -0.1) + (Math.random() * 0.2 - 0.1))
        
        newData.push({
          time: new Date().toLocaleTimeString(),
          rainfall: newRainfall.toFixed(1),
          tilt: newTilt.toFixed(2)
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-[300px] w-full bg-slate-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">Weather Impact Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis 
            yAxisId="left" 
            stroke="#3b82f6" 
            label={{ 
              value: "Rainfall (mm/hr)", 
              angle: -90, 
              position: "insideLeft",
              style: { fill: "#3b82f6" }
            }} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#ef4444" 
            label={{ 
              value: "Tilt Angle (°)", 
              angle: 90, 
              position: "insideRight",
              style: { fill: "#ef4444" }
            }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rainfall"
            stroke="#3b82f6"
            dot={false}
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tilt"
            stroke="#ef4444"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

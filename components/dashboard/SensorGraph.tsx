"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data generator for sensor readings
const generateMockData = (hours = 24) => {
  const data = []
  const now = new Date()
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 3600000))
    data.push({
      time: time.toLocaleTimeString(),
      tilt: Math.random() * 5 + (Math.random() > 0.95 ? 10 : 0), // Occasional spikes
      vibration: Math.random() * 100 + (Math.random() > 0.95 ? 200 : 0),
      displacement: Math.random() * 2 + (Math.random() > 0.95 ? 4 : 0)
    })
  }
  return data
}

export function SensorGraph() {
  const [data, setData] = useState(generateMockData())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)]
        const lastTime = new Date()
        newData.push({
          time: lastTime.toLocaleTimeString(),
          tilt: Math.random() * 5 + (Math.random() > 0.95 ? 10 : 0),
          vibration: Math.random() * 100 + (Math.random() > 0.95 ? 200 : 0),
          displacement: Math.random() * 2 + (Math.random() > 0.95 ? 4 : 0)
        })
        return newData
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-[300px] w-full bg-slate-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">Real-time Sensor Data</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Line 
            type="monotone" 
            dataKey="tilt" 
            stroke="#ef4444" 
            dot={false}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="vibration" 
            stroke="#3b82f6" 
            dot={false}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="displacement" 
            stroke="#10b981" 
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

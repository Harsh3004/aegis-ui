"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { AlertTriangle, Mountain, User, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"

const mockData = {
  alerts: [
    { zone: "SE Wall", severity: "High", confidence: "92%", time: "10:42 AM" },
    { zone: "North Slope", severity: "Medium", confidence: "75%", time: "09:58 AM" },
    { zone: "West Ramp", severity: "Clear", confidence: "100%", time: "09:30 AM" },
  ],
  sensors: [
    { name: "Tiltmeter #12", status: "Normal", value: "0.2°/min" },
    { name: "Geophone #4", status: "Spike", value: "3.4 Hz" },
    { name: "Weather API", status: "Rainfall 15 mm/hr", value: "Temp 28°C" },
  ],
  prediction: {
    siteStatus: "ORANGE — Partial Evacuation",
    countdown: "8 min",
    confidence: "89%",
  },
}

const timeSeriesData = [
  { time: "09:00", tiltmeter: 0.1, geophone: 2.1, rainfall: 0 },
  { time: "09:30", tiltmeter: 0.15, geophone: 2.8, rainfall: 5 },
  { time: "10:00", tiltmeter: 0.18, geophone: 3.2, rainfall: 12 },
  { time: "10:30", tiltmeter: 0.2, geophone: 3.4, rainfall: 15 },
  { time: "11:00", tiltmeter: 0.22, geophone: 3.1, rainfall: 8 },
]

export default function AegisDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-500 text-white"
      case "Medium":
        return "bg-orange-500 text-white"
      case "Clear":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-500 text-white"
      case "Spike":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-teal-400" />
              <span className="text-xl font-bold">AEGIS</span>
            </div>
            <div className="flex gap-4">
              <Link href="/" className="px-4 py-2 bg-teal-600 rounded text-white">
                Web Dashboard
              </Link>
              <Link href="/mobile" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Mobile App
              </Link>
              <Link href="/wallboard" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Wallboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mountain className="h-8 w-8 text-teal-400" />
              <h1 className="text-3xl font-bold">AEGIS Control Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Operator: John Smith</p>
                <p className="font-mono text-lg">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Risk Heatmap */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Risk Heatmap (Mine Map)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 h-64">
                  <div
                    className="bg-red-500 rounded p-4 flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors"
                    title="Zone: SE Wall | Risk: High | Confidence: 92%"
                  >
                    <div className="text-center">
                      <div className="font-bold">SE Wall</div>
                      <div className="text-sm">High Risk</div>
                      <div className="text-xs">92%</div>
                    </div>
                  </div>
                  <div
                    className="bg-orange-500 rounded p-4 flex items-center justify-center cursor-pointer hover:bg-orange-400 transition-colors"
                    title="Zone: North Slope | Risk: Medium | Confidence: 75%"
                  >
                    <div className="text-center">
                      <div className="font-bold">North Slope</div>
                      <div className="text-sm">Medium</div>
                      <div className="text-xs">75%</div>
                    </div>
                  </div>
                  <div
                    className="bg-green-500 rounded p-4 flex items-center justify-center cursor-pointer hover:bg-green-400 transition-colors"
                    title="Zone: West Ramp | Risk: Clear | Confidence: 100%"
                  >
                    <div className="text-center">
                      <div className="font-bold">West Ramp</div>
                      <div className="text-sm">Clear</div>
                      <div className="text-xs">100%</div>
                    </div>
                  </div>
                  <div className="bg-slate-600 rounded p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-bold">East Ridge</div>
                      <div className="text-sm">Monitoring</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Alert Feed & Time Series */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Alert Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.alerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-700 rounded">
                      <AlertTriangle
                        className={`h-5 w-5 ${alert.severity === "High" ? "text-red-400" : alert.severity === "Medium" ? "text-orange-400" : "text-green-400"}`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">
                          {alert.severity} Risk — {alert.zone}
                        </div>
                        <div className="text-sm text-slate-400">
                          {alert.time} — Confidence {alert.confidence}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Time-Series Graph</CardTitle>
                <CardDescription>Tiltmeter #12, Geophone #4, Rainfall overlay</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "6px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="tiltmeter"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      name="Tiltmeter (°/min)"
                    />
                    <Line type="monotone" dataKey="geophone" stroke="#f97316" strokeWidth={2} name="Geophone (Hz)" />
                    <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={2} name="Rainfall (mm/hr)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Sensor Status */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Sensor Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.sensors.map((sensor, index) => (
                    <div key={index} className="p-4 bg-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{sensor.name}</div>
                        <Badge className={getSensorStatusColor(sensor.status)}>{sensor.status}</Badge>
                      </div>
                      <div className="text-lg font-bold text-teal-400">{sensor.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-slate-400 mb-3">Mark latest alert as:</div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Valid
                    </Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      False Alarm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

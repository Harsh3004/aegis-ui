"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

type Alert = {
  id: string
  timestamp: Date
  zone: string
  severity: "HIGH" | "MEDIUM" | "LOW"
  confidence: number
  message: string
}

const generateMockAlert = (): Alert => {
  const zones = ["SE Wall", "North Slope", "West Ramp", "East Ridge"]
  const severities = ["HIGH", "MEDIUM", "LOW"] as const
  const messages = [
    "Unusual tilt detected",
    "Vibration spike observed",
    "Displacement threshold exceeded",
    "Multiple sensors triggered",
    "Weather conditions deteriorating"
  ]

  return {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date(),
    zone: zones[Math.floor(Math.random() * zones.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    confidence: Math.round(Math.random() * 30 + 70), // 70-100%
    message: messages[Math.floor(Math.random() * messages.length)]
  }
}

export function AlertTimeline() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Initialize with some alerts
    setAlerts([
      generateMockAlert(),
      generateMockAlert(),
      generateMockAlert(),
      generateMockAlert(),
      generateMockAlert()
    ])

    // Add new alerts periodically
    const timer = setInterval(() => {
      setAlerts(prev => {
        const newAlert = generateMockAlert()
        return [newAlert, ...prev.slice(0, 9)] // Keep last 10 alerts
      })
    }, 10000) // New alert every 10 seconds

    return () => clearInterval(timer)
  }, [])

  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "HIGH":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "MEDIUM":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "LOW":
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getSeverityClass = (severity: Alert["severity"]) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-950 border-red-500"
      case "MEDIUM":
        return "bg-yellow-950 border-yellow-500"
      case "LOW":
        return "bg-green-950 border-green-500"
    }
  }

  return (
    <div className="h-[400px] w-full bg-slate-800 rounded-lg p-4 overflow-hidden">
      <h3 className="text-xl font-bold mb-4 text-white">Alert Timeline</h3>
      <div className="space-y-2 overflow-y-auto h-[320px] pr-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-3 rounded border ${getSeverityClass(
              alert.severity
            )} ${
              alert.severity === "HIGH" ? "animate-pulse" : ""
            }`}
          >
            {getSeverityIcon(alert.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{alert.zone}</span>
                <span className="text-sm text-slate-400">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-slate-300 mt-1">{alert.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-sm ${
                    alert.severity === "HIGH"
                      ? "text-red-400"
                      : alert.severity === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {alert.severity} Priority
                </span>
                <span className="text-sm text-slate-400">
                  {alert.confidence}% Confidence
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

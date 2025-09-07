"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain, User } from "lucide-react"
import Link from "next/link"

import { KPICards } from "@/components/dashboard/monitoring/KPICards"
import { GisHeatmap } from "@/components/dashboard/GisHeatmap"
import { SensorGraph } from "@/components/dashboard/SensorGraph"
import { WeatherCorrelation } from "@/components/dashboard/WeatherCorrelation"
import { AlertTimeline } from "@/components/dashboard/AlertTimeline"
import { ProbabilityForecast } from "@/components/dashboard/charts/ProbabilityForecast"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
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
        {/* Header with User Info */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">AEGIS Control Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Operator: Harsh Joshi</p>
                <p className="font-mono text-lg">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="mt-8">
            <KPICards />
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Risk Map & Forecast */}
          <div className="lg:col-span-2 space-y-6">
            <GisHeatmap />
            <ProbabilityForecast />
          </div>

          {/* Right Column - Alerts & Sensors */}
          <div className="space-y-6">
            <AlertTimeline />
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-teal-400">Live Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <SensorGraph />
                <WeatherCorrelation />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

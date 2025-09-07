"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Mountain, Timer } from "lucide-react"
import Link from "next/link"
import { SensorGraph } from "@/components/dashboard/SensorGraph"
import { RiskGauge } from "@/components/dashboard/RiskGauge"
import { GisHeatmap } from "@/components/dashboard/GisHeatmap"
import { AlertTimeline } from "@/components/dashboard/AlertTimeline"
import { WeatherCorrelation } from "@/components/dashboard/WeatherCorrelation"

export default function Wallboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-teal-400" />
              <span className="text-xl font-bold">AEGIS</span>
            </div>
            <div className="flex gap-4">
              <Link href="/" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Web Dashboard
              </Link>
              <Link href="/mobile" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Mobile App
              </Link>
              <Link href="/wallboard" className="px-4 py-2 bg-teal-600 rounded text-white">
                Wallboard
              </Link>
            </div>
          </div>
          <div className="text-slate-400">
            <Timer className="h-5 w-5 inline mr-2" />
            {currentTime.toLocaleString()}
          </div>
        </div>
      </nav>

      <div className="p-8 space-y-8">
        {/* Risk Status Banner */}
        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <AlertTriangle className="h-12 w-12 text-red-400" />
            <h1 className="text-4xl font-bold text-red-400">
              HIGH RISK ALERT: Immediate Evacuation Required
            </h1>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-8 space-y-8">
            {/* Sensor Graph */}
            <SensorGraph />
            
            {/* GIS Heatmap */}
            <GisHeatmap />
            
            {/* Weather Correlation */}
            <WeatherCorrelation />
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-8">
            {/* Risk Gauge */}
            <RiskGauge />
            
            {/* Alert Timeline */}
            <AlertTimeline />
          </div>
        </div>

        {/* Alert Ticker */}
        <div className="bg-slate-800 border-t-4 border-teal-400 p-4 fixed bottom-0 left-0 right-0">
          <div className="flex items-center gap-4">
            <Badge variant="destructive" className="bg-red-600">CRITICAL ALERTS</Badge>
            {/* <AlertTimeline /> */} 
            {/* to check harsh modifications  */}
          </div>
        </div>
      </div>
    </div>
  )
}

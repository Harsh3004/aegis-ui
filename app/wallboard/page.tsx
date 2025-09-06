"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Mountain, Timer, MapPin } from "lucide-react"
import Link from "next/link"

export default function Wallboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countdown, setCountdown] = useState(8 * 60) // 8 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setCountdown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const alerts = [
    "⚠ High Risk — SE Wall — 10:42 AM — Confidence 92%",
    "⚠ Medium Risk — North Slope — 09:58 AM — Confidence 75%",
    "✓ All Clear — West Ramp — 09:30 AM — Confidence 100%",
    "📡 Sensor Update — Tiltmeter #12 — Normal — 0.2°/min",
    "🌧 Weather Alert — Rainfall 15 mm/hr — Temperature 28°C",
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 p-4">
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
        </div>
      </nav>

      <div className="p-8">
        {/* Full-screen Map */}
        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-96 mb-8">
          <div className="col-span-2 row-span-2 bg-red-500 rounded-lg flex items-center justify-center text-2xl font-bold hover:bg-red-400 transition-colors cursor-pointer">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <div>SE Wall</div>
              <div className="text-lg">HIGH RISK</div>
              <div className="text-sm">92% Confidence</div>
            </div>
          </div>
          <div className="bg-orange-500 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-orange-400 transition-colors cursor-pointer">
            <div className="text-center">
              <div>North Slope</div>
              <div className="text-sm">MEDIUM</div>
            </div>
          </div>
          <div className="bg-green-500 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-green-400 transition-colors cursor-pointer">
            <div className="text-center">
              <div>West Ramp</div>
              <div className="text-sm">CLEAR</div>
            </div>
          </div>
          <div className="bg-slate-600 rounded-lg flex items-center justify-center text-xl font-bold">
            <div className="text-center">
              <div>East Ridge</div>
              <div className="text-sm">MONITORING</div>
            </div>
          </div>
          <div className="bg-slate-600 rounded-lg flex items-center justify-center text-xl font-bold">
            <div className="text-center">
              <div>Central Pit</div>
              <div className="text-sm">MONITORING</div>
            </div>
          </div>
          <div className="col-span-2 bg-slate-700 rounded-lg flex items-center justify-center text-xl font-bold">
            <div className="text-center">
              <Mountain className="h-16 w-16 mx-auto mb-2 text-teal-400" />
              <div className="text-teal-400">AEGIS Control Center</div>
              <div className="text-sm text-slate-300">Real-time Monitoring Active</div>
            </div>
          </div>
        </div>

        {/* Big Risk Banner */}
        <div className="bg-orange-600 rounded-lg p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <AlertTriangle className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Site Status: ORANGE — Partial Evacuation Required</h1>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-6">
            <Timer className="h-16 w-16 text-red-400" />
            <div>
              <div className="text-6xl font-bold font-mono text-red-400">{formatCountdown(countdown)}</div>
              <div className="text-2xl text-red-200">Predicted Rockfall | Confidence: 89%</div>
            </div>
          </div>
        </div>

        {/* Alert Ticker */}
        <div className="bg-slate-800 border-t-4 border-teal-400 p-4 fixed bottom-0 left-0 right-0">
          <div className="flex items-center gap-4">
            <Badge className="bg-teal-600 text-white px-4 py-2">LIVE ALERTS</Badge>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll whitespace-nowrap">
                {alerts.map((alert, index) => (
                  <span key={index} className="mx-8 text-lg">
                    {alert}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-slate-400">{currentTime.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

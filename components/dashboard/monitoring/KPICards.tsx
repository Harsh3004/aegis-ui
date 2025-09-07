"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Bell, ThumbsUp, Activity } from "lucide-react"
import { useState, useEffect } from "react"

type KPIData = {
  leadTime: string
  uptime: string
  accuracy: string
  falseAlarms: number
  totalAlerts: number
}

const generateMockKPIs = (): KPIData => ({
  leadTime: `${Math.floor(Math.random() * 3 + 6)} min`,
  uptime: `${(Math.random() * 1 + 99).toFixed(2)}%`,
  accuracy: `${(Math.random() * 5 + 90).toFixed(1)}%`,
  falseAlarms: Math.floor(Math.random() * 3),
  totalAlerts: Math.floor(Math.random() * 10 + 20)
})

export function KPICards() {
  const [kpiData, setKpiData] = useState<KPIData>(generateMockKPIs())

  useEffect(() => {
    const timer = setInterval(() => {
      setKpiData(generateMockKPIs())
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-teal-400">
            Avg Lead Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.leadTime}</div>
          <p className="text-xs text-muted-foreground">
            Before critical events
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-teal-400">
            System Uptime
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.uptime}</div>
          <p className="text-xs text-muted-foreground">
            Last 30 days
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-teal-400">
            Alert Accuracy
          </CardTitle>
          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.accuracy}</div>
          <p className="text-xs text-muted-foreground">
            True positive rate
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-teal-400">
            False Alarms
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.falseAlarms} / {kpiData.totalAlerts}</div>
          <p className="text-xs text-muted-foreground">
            Last 24 hours
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

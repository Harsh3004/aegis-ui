"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const RISK_LEVELS = {
  LOW: { color: "#22c55e", text: "Low Risk" },
  MEDIUM: { color: "#f59e0b", text: "Medium Risk" },
  HIGH: { color: "#ef4444", text: "High Risk" }
}

export function RiskGauge() {
  const [riskScore, setRiskScore] = useState(92)
  const [riskLevel, setRiskLevel] = useState<keyof typeof RISK_LEVELS>("HIGH")

  useEffect(() => {
    const timer = setInterval(() => {
      const newScore = Math.floor(Math.random() * 100)
      setRiskScore(newScore)
      setRiskLevel(
        newScore < 33 ? "LOW" : 
        newScore < 66 ? "MEDIUM" : "HIGH"
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const data = [
    { name: "Risk", value: riskScore },
    { name: "Remaining", value: 100 - riskScore }
  ]

  return (
    <div className="h-[300px] w-full bg-slate-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">Slope Risk Level</h3>
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={RISK_LEVELS[riskLevel].color} />
              <Cell fill="#1f2937" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold" style={{ color: RISK_LEVELS[riskLevel].color }}>
            {riskScore}%
          </div>
          <div className="text-sm text-slate-300">
            {RISK_LEVELS[riskLevel].text}
          </div>
        </div>
      </div>
    </div>
  )
}

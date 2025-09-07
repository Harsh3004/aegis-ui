"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const ZONES = [
  { id: "se-wall", name: "SE Wall", risk: "HIGH", coords: "10,10,100,100" },
  { id: "north-slope", name: "North Slope", risk: "MEDIUM", coords: "110,10,200,100" },
  { id: "west-ramp", name: "West Ramp", risk: "LOW", coords: "210,10,300,100" },
  { id: "east-ridge", name: "East Ridge", risk: "MEDIUM", coords: "310,10,400,100" }
]

const RISK_COLORS = {
  HIGH: "rgba(239, 68, 68, 0.5)",
  MEDIUM: "rgba(245, 158, 11, 0.5)",
  LOW: "rgba(34, 197, 94, 0.5)"
}

export function GisHeatmap({ onZoneClick }: { onZoneClick?: (zone: string) => void }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId)
    onZoneClick?.(zoneId)
  }

  return (
    <div className="h-[400px] w-full bg-slate-800 rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4 text-white">Mine Zone Risk Map</h3>
      <div className="relative h-[300px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.jpg"
            alt="Mine Map"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          {ZONES.map((zone) => (
            <polygon
              key={zone.id}
              points={zone.coords}
              fill={RISK_COLORS[zone.risk as keyof typeof RISK_COLORS]}
              stroke="white"
              strokeWidth="2"
              className={`cursor-pointer transition-all duration-200 ${
                selectedZone === zone.id ? "opacity-90 stroke-2" : "opacity-70 hover:opacity-90"
              }`}
              onClick={() => handleZoneClick(zone.id)}
            >
              <title>{`${zone.name} - ${zone.risk} Risk`}</title>
            </polygon>
          ))}
        </svg>
        <div className="absolute bottom-4 right-4 bg-slate-900 bg-opacity-80 p-2 rounded">
          <div className="flex items-center gap-4">
            {Object.entries(RISK_COLORS).map(([risk, color]) => (
              <div key={risk} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-white">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

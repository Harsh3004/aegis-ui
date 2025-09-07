"use client"

import { useState, useEffect } from "react"
import { Expand, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

// Risk zone mock data
const riskZones = [
  {
    id: 1,
    name: "SE Wall",
    position: [45, 120],
    riskLevel: "High",
    confidence: 92,
    color: "#ef4444",
    lastAlert: "10:42 AM"
  },
  {
    id: 2,
    name: "North Slope",
    position: [210, 150],
    riskLevel: "Medium",
    confidence: 75,
    color: "#f59e0b",
    lastAlert: "09:58 AM"
  },
  {
    id: 3, 
    name: "West Ramp",
    position: [320, 230],
    riskLevel: "Clear",
    confidence: 100,
    color: "#22c55e",
    lastAlert: "09:30 AM"
  },
  {
    id: 4,
    name: "East Ridge",
    position: [150, 300],
    riskLevel: "Monitoring",
    confidence: 60,
    color: "#3b82f6",
    lastAlert: "09:15 AM"
  }
]

export function GisHeatmap({ onZoneClick }: { onZoneClick?: (zone: string) => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [zones, setZones] = useState(riskZones)

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setZones(prevZones => 
        prevZones.map(zone => ({
          ...zone,
          confidence: Math.max(50, Math.min(100, zone.confidence + (Math.random() * 10 - 5))),
          lastAlert: new Date().toLocaleTimeString()
        }))
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle display mode toggle
  const toggleDisplayMode = () => {
    setShowHeatmap(!showHeatmap)
  }

  return (
    <div className={`relative bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px] w-full'
    }`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDisplayMode}
          className="relative bg-black hover:bg-black -top-1.5 left-2"
        >
          <Layers className="h-4 w-4 mr-2" />
          {showHeatmap ? 'Show Markers' : 'Show Heatmap'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          className="relative bg-black hover:bg-black -top-1.5 left-2"
        >
          <Expand className="h-4 w-4 mr-2" />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="relative -top-3 right-2 text-xl font-bold text-white mb-2 bg-black py-2 text-center rounded-xl">
          Mine Zone Risk Map
        </h3>
        <div className="flex items-center gap-2">
          {['High', 'Medium', 'Clear', 'Monitoring'].map(level => (
            <Badge
              key={level}
              variant={
                level === 'High' ? 'destructive' :
                level === 'Medium' ? 'secondary' :
                level === 'Clear' ? 'outline' : 'default'
              }
              className={
                level === 'High' ? 'bg-red-500/20 text-red-500' :
                level === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                level === 'Clear' ? 'bg-green-500/20 text-green-500' :
                'bg-blue-500/20 text-blue-500'
              }
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sketchfab iframe */}
      <iframe
        title="Open Pit Mine 3D Model"
        className="w-full h-full"
        src="https://sketchfab.com/models/bff279e206e24402ab3fdf3a0d94ba1a/embed?autostart=1&preload=1&ui_controls=0&ui_infos=0&ui_hint=0&ui_annotations=0&ui_watermark=0&ui_theme=dark"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{ background: '#1e293b' }}
      />
      
    </div>
  )
}

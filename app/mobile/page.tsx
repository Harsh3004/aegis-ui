"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Mountain, Phone, CheckCircle, WifiOff, Bell } from "lucide-react"
import { SOSButton } from '@/components/SOSButton'
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link"
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants"

export default function MobileApp() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
              <Link href="/dashboard" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Web Dashboard
              </Link>
              <Link href="/mobile" className="px-4 py-2 bg-teal-600 rounded text-white">
                Mobile App
              </Link>
              <Link href="/wallboard" className="px-4 py-2 bg-slate-700 rounded text-white hover:bg-slate-600">
                Wallboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-teal-400" />
            <h1 className="text-xl font-bold">AEGIS Mobile</h1>
          </div>
          <div className="flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-gray-400" />
            <Badge variant="outline" className="text-xs">
              Offline Mode
            </Badge>
          </div>
        </div>

        {/* Risk Banner */}
        <Card className="bg-red-900 border-red-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <div className="font-bold text-lg">Current Site Risk: HIGH</div>
                <div className="text-sm text-red-200">SE Wall - Immediate attention required</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Push Notification Mock */}
        <Alert className="bg-orange-900 border-orange-700">
          <Bell className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            <span>⚠ Rockfall Alert: North Slope</span>
          </AlertTitle>
          <AlertDescription>Evacuate immediately (10:42 AM)</AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-teal-400">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={() => toast.success(`Acknowledge`)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Acknowledge Alert
            </Button>
            {/* <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Send SOS
            </Button> */}
            <SOSButton 
              recipients={['kushagrasharma231029@acropolis.in']}
              subject="🚨 Emergency Alert: Mine Site"
              className="w-full h-10 bg-red-600 hover:bg-red-700 text-white"
            />  
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-teal-400">Current Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Location</span>
              <Badge className="bg-green-600">Zone A - Safe</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Last Update</span>
              <span className="text-sm text-slate-400">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Connection</span>
              <Badge variant="outline" className="text-gray-400">
                Offline
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-teal-400">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-900 rounded">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <div className="flex-1">
                  <div className="font-medium">High Risk - SE Wall</div>
                  <div className="text-xs text-red-200">10:42 AM - 92% confidence</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-900 rounded">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <div className="flex-1">
                  <div className="font-medium">Medium Risk - North Slope</div>
                  <div className="text-xs text-orange-200">09:58 AM - 75% confidence</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoadingOverlay } from '@/components/ui/loading-overlay'

type SOSMeasurements = {
  temperature?: string
  slopeAngle?: string
  vibration?: string
  [key: string]: string | undefined
}

type SOSUserInfo = {
  id?: string
  name?: string
  email?: string
  role?: string
}

type SOSButtonProps = {
  /** Array of email addresses to send the alert to */
  recipients?: string[]
  /** The current zone or location */
  zone?: string
  /** Current sensor measurements */
  measurements?: SOSMeasurements
  /** Current user information */
  user?: SOSUserInfo
  /** Any additional context or notes */
  additionalNotes?: string
  /** Optional className for custom styling */
  className?: string
}

export function SOSButton({
  recipients = ['kushagrasharma231029@acropolis.in'],
  zone = 'Main Control Room',
  measurements = {
    temperature: '36°C',
    slopeAngle: '34°',
    vibration: '5.2 Hz'
  },
  user = {
    id: '1024',
    name: 'Harsh Joshi',
    email: 'harshjoshi230495@acropolis.in',
    role: 'Site Engineer'
  },
  additionalNotes = 'Detected abnormal slope instability',
  className
}: SOSButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSOSClick = async () => {
    const toastId = toast.loading('Sending emergency alert...')
    
    try {
      setIsLoading(true)

      // Using the full API route path for Next.js 13+ app directory
      const response = await fetch('/api/sos-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: recipients,
          zone,
          measurements,
          user,
          additionalNotes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send SOS alert')
      }

      toast.success('Emergency alert sent successfully! Authorities have been notified.', {
        id: toastId,
        duration: 5000
      })
    } catch (error) {
      console.error('Error sending SOS alert:', error)
      toast.error('Failed to send emergency alert. Please try again or use alternative emergency contacts.', {
        id: toastId,
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      <Button
        variant="destructive"
        size="lg"
        className={cn(
          'relative w-32 h-32 rounded-xl text-2xl font-bold',
          'transform transition-transform active:scale-95',
          'hover:animate-pulse hover:bg-red-600',
          'focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50',
          className
        )}
        onClick={handleSOSClick}
        disabled={isLoading}
        aria-label="SOS Emergency Button"
      >
        <AlertCircle className="w-16 h-16" />
        SOS
      </Button>
    </div>
  )
}

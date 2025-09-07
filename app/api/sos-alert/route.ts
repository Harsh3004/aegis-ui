import { NextRequest, NextResponse } from 'next/server'
import { sendSOSAlert } from '@/lib/emailService'

export const POST = async (req: NextRequest) => {
  console.log('🚨 SOS Alert API called')
  
  try {
    const { emails, zone, measurements, user, additionalNotes } = await req.json()
    
    console.log('📨 Request payload:', {
      hasEmails: !!emails,
      zone,
      hasMeasurements: !!measurements,
      hasUser: !!user
    })

    // Validate request body
    if (!emails) {
      console.error('❌ Missing required fields: emails')
      return NextResponse.json(
        { success: false, message: 'Missing required fields: emails' },
        { status: 400 }
      )
    }

    // Validate measurements data if provided
    if (measurements && typeof measurements !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid measurements data format' },
        { status: 400 }
      )
    }

    // Validate user data if provided
    if (user && typeof user !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid user data format' },
        { status: 400 }
      )
    }

    // Prepare SOS alert data
    const sosData = {
      zone,
      measurements,
      user,
      timestamp: new Date().toISOString(),
      additionalNotes
    }

    // Send SOS alert
    const result = await sendSOSAlert(emails, sosData)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'SOS alert sent successfully'
    })

  } catch (error) {
    console.error('❌ Error in SOS alert API:', error)
    console.error('Full error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    // Extract a meaningful error message
    let errorMessage = 'Failed to process SOS alert'
    if (error instanceof Error) {
      if (error.message.includes('SMTP')) {
        errorMessage = 'Email server connection failed'
      } else if (error.message.includes('EENVELOPE')) {
        errorMessage = 'Invalid email address format'
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

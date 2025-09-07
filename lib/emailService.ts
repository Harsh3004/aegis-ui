/**
 * GitHub Copilot Prompt:
 * I am building an SOS email alert feature in a Next.js + TypeScript application.
 * I need a **production-ready** and **secure** implementation using Nodemailer.
 * 
 * Requirements as specified in the prompt above.
 */

import nodemailer from 'nodemailer'
import type { SentMessageInfo } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

// Create reusable transporter using SMTP settings from .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Needed for some Gmail connections
  },
  debug: true // Enable debugging
})

export type SOSMeasurements = {
  temperature?: string
  slopeAngle?: string
  vibration?: string
  [key: string]: string | undefined
}

export type SOSUserInfo = {
  id?: string
  name?: string
  email?: string
  role?: string
}

export type SOSAlertData = {
  zone?: string
  measurements?: SOSMeasurements
  user?: SOSUserInfo
  timestamp: string
  additionalNotes?: string
}

export type SOSAlertResponse = {
  success: boolean
  message: string
}

/**
 * Formats the SOS alert data into an HTML email
 * @param data - The SOS alert data to format
 * @returns Formatted HTML string
 */
function formatSOSEmailHTML(data: SOSAlertData): string {
  const measurements = data.measurements
    ? Object.entries(data.measurements)
        .map(([key, value]) => `  - ${key}: ${value}`)
        .join('\n')
    : 'No measurement data available'

  const userInfo = data.user
    ? `
  - ID: ${data.user.id || 'N/A'}
  - Name: ${data.user.name || 'N/A'}
  - Role: ${data.user.role || 'N/A'}
  - Email: ${data.user.email || 'N/A'}`
    : 'No user information available'

  return `
<!DOCTYPE html>
<html>
<body>
  <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid #ff0000; border-radius: 8px;">
    <h1 style="color: #ff0000; text-align: center;">🚨 SOS Alert Triggered 🚨</h1>
    
    <div style="background: #fff3f3; padding: 15px; border-radius: 4px; margin: 10px 0;">
      <h2 style="margin-top: 0;">Location Information</h2>
      <p>Zone: ${data.zone || 'Unknown'}</p>
      
      <h2>Measurements</h2>
      <pre style="background: #fff; padding: 10px; border-radius: 4px;">${measurements}</pre>
      
      <h2>User Information</h2>
      <pre style="background: #fff; padding: 10px; border-radius: 4px;">${userInfo}</pre>
      
      <h2>Timestamp</h2>
      <p>${new Date(data.timestamp).toLocaleString()} UTC</p>
      
      ${data.additionalNotes ? `
        <h2>Additional Notes</h2>
        <p>${data.additionalNotes}</p>
      ` : ''}
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #ff0000;">
      <strong>⚠️ Please take immediate action ⚠️</strong>
    </div>
  </div>
</body>
</html>`
}

/**
 * Sends an SOS alert email to specified recipients using Nodemailer
 * @param toEmails - Single email or array of recipient emails
 * @param data - The SOS alert data to include in the email
 * @returns Promise with success status and message
 */
export async function sendSOSAlert(
  toEmails: string[] | string,
  data: SOSAlertData
): Promise<SOSAlertResponse> {
  try {
    console.log('📧 Starting email send process...')
    console.log('Environment Check:', {
      host: process.env.SMTP_HOST ? '✓ Set' : '✗ Missing',
      port: process.env.SMTP_PORT ? '✓ Set' : '✗ Missing',
      user: process.env.SMTP_USER ? '✓ Set' : '✗ Missing',
      pass: process.env.SMTP_PASS ? '✓ Set' : '✗ Missing'
    })

    // Validate environment variables
    if (!process.env.SMTP_USER) {
      console.error('❌ SMTP_USER not configured')
      throw new Error('SMTP_USER not configured')
    }

    // Convert single email to array and filter out empty/undefined values
    console.log('📧 Processing email recipients:', { original: toEmails })
    
    const recipients = (Array.isArray(toEmails) ? toEmails : [toEmails])
      .filter(email => email && typeof email === 'string' && email.trim().length > 0)
      .map(email => email.trim())
    
    console.log('📧 Processed recipients:', { recipients })

    // Validate email addresses
    if (recipients.length === 0) {
      console.error('❌ No valid recipient emails found')
      throw new Error('No valid recipient emails provided')
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = recipients.filter(email => !emailRegex.test(email))
    if (invalidEmails.length > 0) {
      console.error('❌ Invalid email addresses found:', { invalidEmails })
      throw new Error(`Invalid email address(es): ${invalidEmails.join(', ')}`)
    }

    // Validate sender email
    if (!process.env.SMTP_USER || !emailRegex.test(process.env.SMTP_USER)) {
      throw new Error('Invalid sender email configuration')
    }

    // Format the zone name for the subject
    const zoneText = data.zone ? ` - ${data.zone}` : ''
    const timestamp = new Date(data.timestamp).toISOString()
    
    // Prepare email options with proper typing
    const mailOptions: nodemailer.SendMailOptions = {
      from: {
        name: 'AEGIS Emergency Alert System',
        address: process.env.SMTP_USER || ''
      },
      to: recipients.join(', '),
      subject: `🚨 URGENT: SOS Alert${zoneText} [${timestamp}]`,
      html: formatSOSEmailHTML(data),
      priority: 'high' as const
    }

    // Send email and await response
    try {
      console.log('📧 Attempting to send email with options:', {
        to: mailOptions.to,
        from: mailOptions.from,
        subject: mailOptions.subject,
        zone: data.zone,
        hasUser: !!data.user,
        hasMeasurements: !!data.measurements
      })

      const info = await transporter.sendMail(mailOptions) as SMTPTransport.SentMessageInfo

      // Log the full response
      console.log('📧 SMTP Response:', {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
        envelope: info.envelope
      })

      // Verify the email was sent successfully
      if (!info || !info.messageId) {
        console.error('❌ No message ID received from SMTP server')
        throw new Error('Failed to send email - no message ID received')
      }

      console.log('✅ Email sent successfully!')
      return {
        success: true,
        message: `Alert sent successfully. Message ID: ${info.messageId}`,
      }
    } catch (sendError) {
      console.error('❌ SMTP Send Error:', sendError)
      console.error('Error Details:', {
        name: sendError instanceof Error ? sendError.name : 'Unknown',
        message: sendError instanceof Error ? sendError.message : 'Unknown error',
        stack: sendError instanceof Error ? sendError.stack : undefined
      })
      throw new Error(
        sendError instanceof Error 
          ? `Email send failed: ${sendError.message}`
          : 'Failed to send email through SMTP'
      )
    }
  } catch (error) {
    console.error('Error sending SOS alert:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send alert',
    }
  }
}

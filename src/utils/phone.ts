export const PHONE_FORMAT_ERROR = 'Неверный формат номера телефона'

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.startsWith('8')) {
    return `7${digits.slice(1)}`
  }

  return digits
}

export function formatPhoneDisplay(phone: string): string {
  const normalized = normalizePhone(phone)

  if (normalized.length === 11 && normalized.startsWith('7')) {
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9)}`
  }

  return phone
}

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')

  if (digits.length !== 11) {
    return false
  }

  if (trimmed.startsWith('+7')) {
    return digits.startsWith('7')
  }

  if (trimmed.startsWith('8')) {
    return digits.startsWith('8')
  }

  return false
}
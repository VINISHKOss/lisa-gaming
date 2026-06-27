const PASSWORD_SALT = 'lisa-gaming-v1'

export function hashPassword(password: string): string {
  const input = `${PASSWORD_SALT}:${password}`
  let hash = 0

  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }

  return `lg_${Math.abs(hash).toString(36)}`
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6
}
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/product'
import { hashPassword, isValidPassword } from '../utils/password'
import {
  PHONE_FORMAT_ERROR,
  formatPhoneDisplay,
  isValidPhone,
  normalizePhone,
} from '../utils/phone'

interface UserAccount extends User {
  passwordHash: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthState {
  currentUser: User | null
  accounts: UserAccount[]
  register: (fullName: string, phone: string, password: string) => AuthResult
  login: (phone: string, password: string) => AuthResult
  logout: () => void
}

function createUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      accounts: [],

      register: (fullName, phone, password) => {
        const trimmedName = fullName.trim()

        if (trimmedName.length < 3) {
          return { success: false, error: 'Введите ФИО полностью' }
        }

        if (!isValidPhone(phone)) {
          return { success: false, error: PHONE_FORMAT_ERROR }
        }

        if (!isValidPassword(password)) {
          return { success: false, error: 'Пароль должен содержать минимум 6 символов' }
        }

        const normalizedPhone = normalizePhone(phone)
        const existing = get().accounts.find((account) => account.phone === normalizedPhone)

        if (existing) {
          return { success: false, error: 'Пользователь с таким номером уже зарегистрирован' }
        }

        const user: UserAccount = {
          id: createUserId(),
          fullName: trimmedName,
          phone: normalizedPhone,
          passwordHash: hashPassword(password),
        }

        set((state) => ({
          accounts: [...state.accounts, user],
          currentUser: {
            id: user.id,
            fullName: user.fullName,
            phone: user.phone,
          },
        }))

        return { success: true }
      },

      login: (phone, password) => {
        if (!isValidPhone(phone)) {
          return { success: false, error: PHONE_FORMAT_ERROR }
        }

        const normalizedPhone = normalizePhone(phone)
        const account = get().accounts.find((item) => item.phone === normalizedPhone)

        if (!account || account.passwordHash !== hashPassword(password)) {
          return { success: false, error: 'Неверный телефон или пароль' }
        }

        set({
          currentUser: {
            id: account.id,
            fullName: account.fullName,
            phone: account.phone,
          },
        })

        return { success: true }
      },

      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'lisa-gaming-auth',
      partialize: (state) => ({
        currentUser: state.currentUser,
        accounts: state.accounts,
      }),
    },
  ),
)

export function getUserDisplayPhone(user: User): string {
  return formatPhoneDisplay(user.phone)
}
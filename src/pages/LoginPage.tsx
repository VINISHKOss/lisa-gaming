import { useState } from 'react'
import type { Page } from '../types/product'
import { useAuthStore } from '../store/authStore'
import { AccountView } from '../components/AccountView'
import { PageGutter } from '../components/PageGutter'

interface LoginPageProps {
  onNavigate: (page: Page) => void
  onSuccess?: () => void
}

const INPUT_CLASS =
  'w-full rounded-xl border border-fox-border bg-fox-dark px-4 py-3 text-sm text-white placeholder:text-fox-muted focus:border-fox-yellow/50 focus:outline-none focus:ring-2 focus:ring-fox-yellow/20'

export function LoginPage({ onNavigate, onSuccess }: LoginPageProps) {
  const currentUser = useAuthStore((state) => state.currentUser)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (currentUser) {
    return (
      <PageGutter className="py-4 sm:py-6 lg:py-8">
        <AccountView
          user={currentUser}
          onNavigate={onNavigate}
          onLogout={logout}
        />
      </PageGutter>
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    const result = login(phone, password)

    if (!result.success) {
      setError(result.error ?? 'Не удалось войти')
      return
    }

    onSuccess?.()
  }

  return (
    <PageGutter className="py-4 sm:py-6 lg:py-8">
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-fox-border bg-fox-card shadow-[0_8px_22px_rgba(0,0,0,0.45)]">
        <div className="h-1.5 bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]" />

        <div className="p-6 sm:p-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Вход</h2>
          <p className="mb-6 text-sm text-fox-muted">
            Войдите по номеру телефона и паролю, чтобы сохранить корзину
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-white">Номер телефона</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+7 (999) 123-45-67"
                className={INPUT_CLASS}
                autoComplete="tel"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-white">Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Введите пароль"
                className={INPUT_CLASS}
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-fox-yellow px-4 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover"
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-fox-muted">
            Нет аккаунта?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="font-semibold text-fox-yellow transition-colors hover:text-fox-yellow-hover"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
    </PageGutter>
  )
}
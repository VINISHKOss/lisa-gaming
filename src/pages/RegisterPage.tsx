import { useState } from 'react'
import type { Page } from '../types/product'
import { useAuthStore } from '../store/authStore'
import { PageGutter } from '../components/PageGutter'

interface RegisterPageProps {
  onNavigate: (page: Page) => void
  onSuccess?: () => void
}

const INPUT_CLASS =
  'w-full rounded-xl border border-fox-border bg-fox-dark px-4 py-3 text-sm text-white placeholder:text-fox-muted focus:border-fox-yellow/50 focus:outline-none focus:ring-2 focus:ring-fox-yellow/20'

export function RegisterPage({ onNavigate, onSuccess }: RegisterPageProps) {
  const register = useAuthStore((state) => state.register)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    const result = register(fullName, phone, password)

    if (!result.success) {
      setError(result.error ?? 'Не удалось зарегистрироваться')
      return
    }

    onSuccess?.()
  }

  return (
    <PageGutter className="py-4 sm:py-6 lg:py-8">
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-fox-border bg-fox-card p-6 sm:p-8">
        <h2 className="mb-2 text-2xl font-bold text-white">Регистрация</h2>
        <p className="mb-6 text-sm text-fox-muted">
          Создайте аккаунт, чтобы сохранять корзину
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-white">ФИО</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Иванов Иван Иванович"
              className={INPUT_CLASS}
              autoComplete="name"
              required
            />
          </label>

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
              placeholder="Минимум 6 символов"
              className={INPUT_CLASS}
              autoComplete="new-password"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white">Повторите пароль</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Повторите пароль"
              className={INPUT_CLASS}
              autoComplete="new-password"
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
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-fox-muted">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="font-semibold text-fox-yellow transition-colors hover:text-fox-yellow-hover"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
    </PageGutter>
  )
}
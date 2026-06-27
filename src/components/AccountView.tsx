import type { Page, User } from '../types/product'
import { getUserDisplayPhone } from '../store/authStore'
import { getUserFirstName } from '../utils/user'
import { UserAvatar } from './UserAvatar'

interface AccountViewProps {
  user: User
  onNavigate: (page: Page) => void
  onLogout: () => void
}

export function AccountView({ user, onNavigate, onLogout }: AccountViewProps) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <section className="overflow-hidden rounded-2xl border border-fox-border bg-fox-card shadow-[0_8px_22px_rgba(0,0,0,0.45)]">
        <div className="h-1.5 bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]" />

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <UserAvatar fullName={user.fullName} size="lg" />

            <div className="min-w-0 flex-1">
              <span className="mb-2 inline-flex rounded-full border border-fox-yellow/30 bg-fox-yellow/10 px-3 py-1 text-xs font-semibold text-fox-yellow">
                Аккаунт активен
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Здравствуйте, {getUserFirstName(user.fullName)}
              </h2>
              <p className="mt-1 text-fox-muted">{user.fullName}</p>
            </div>
          </div>

          <div className="rounded-xl border border-fox-border bg-fox-dark p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-fox-muted">
              Телефон
            </p>
            <p className="font-semibold text-white">{getUserDisplayPhone(user)}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="flex-1 rounded-xl bg-fox-yellow px-4 py-3 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover"
            >
              Перейти в корзину
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex-1 rounded-xl border border-fox-border bg-fox-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-red-400/50 hover:text-red-300"
            >
              Выйти
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
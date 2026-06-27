import { contacts } from '../data/contacts'
import { FOX_ICON_FILL } from '../constants/brand'
import { IconShell } from './IconShell'
import { NavIcon } from './NavIcons'

type CheckoutModalVariant = 'checkout' | 'manager'

interface CheckoutModalBaseProps {
  isOpen: boolean
  onClose: () => void
  variant?: CheckoutModalVariant
}

type CheckoutModalProps =
  | (CheckoutModalBaseProps & {
      variant?: 'checkout'
      isAuthenticated: boolean
      onRequireLogin: () => void
    })
  | (CheckoutModalBaseProps & {
      variant: 'manager'
      isAuthenticated?: never
      onRequireLogin?: never
    })

const modalContent = {
  checkout: {
    title: 'Оформление заказа',
    accent: 'заказа',
    description:
      'Свяжитесь с нами в Telegram или по телефону — поможем оформить заказ и ответим на вопросы',
  },
  manager: {
    title: 'Связаться с менеджером',
    accent: 'менеджером',
    description:
      'Напишите нам в Telegram или позвоните — рассчитаем доставку, подберём способ оплаты и ответим на вопросы',
  },
} as const

const accentBarClass =
  'h-1.5 bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]'

const contactCardClass =
  'group flex items-center gap-4 rounded-xl border border-fox-border bg-fox-dark/80 p-4 transition-all hover:-translate-y-0.5 hover:border-fox-yellow/30 hover:bg-fox-dark hover:shadow-[0_10px_24px_rgba(0,0,0,0.45)]'

function TelegramIcon({ className }: { className?: string }) {
  return (
    <IconShell gradientId="modal-telegram-icon" className={className}>
      <path
        d="M46 18L18 30.5l9.2 3.1 3.4 11.2 6.8-9.4 10.6-17.4z"
        fill={FOX_ICON_FILL}
      />
      <path
        d="M30.2 33.6l12.8 9.2-4.6-12.1-8.2 2.9z"
        fill={FOX_ICON_FILL}
        opacity="0.72"
      />
    </IconShell>
  )
}

function ContactChevron() {
  return (
    <svg
      className="ml-auto h-5 w-5 shrink-0 text-fox-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fox-yellow"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ContactLinks() {
  return (
    <div className="space-y-3">
      <a
        href={contacts.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={contactCardClass}
      >
        <TelegramIcon className="h-12 w-12 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]" />
        <div className="min-w-0">
          <p className="font-semibold text-white transition-colors group-hover:text-fox-yellow">
            Написать в Telegram
          </p>
          <p className="text-sm text-fox-muted">{contacts.telegram}</p>
        </div>
        <ContactChevron />
      </a>

      <a href={`tel:${contacts.phone}`} className={contactCardClass}>
        <NavIcon
          name="contacts"
          className="h-12 w-12 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
        />
        <div className="min-w-0">
          <p className="font-semibold text-white transition-colors group-hover:text-fox-yellow">
            Позвонить
          </p>
          <p className="text-sm text-fox-muted">{contacts.phoneDisplay}</p>
        </div>
        <ContactChevron />
      </a>
    </div>
  )
}

function ModalTitle({ title, accent }: { title: string; accent: string }) {
  const titlePrefix = title.replace(accent, '').trim()

  return (
    <h2 id="checkout-title" className="text-2xl font-bold text-white">
      {titlePrefix}{' '}
      <span className="bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] bg-clip-text text-transparent">
        {accent}
      </span>
    </h2>
  )
}

export function CheckoutModal(props: CheckoutModalProps) {
  const { isOpen, onClose, variant = 'checkout' } = props
  const content = modalContent[variant]
  const showContactLinks = variant === 'manager' || props.isAuthenticated

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-fox-border bg-fox-card shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_40px_rgba(232,136,48,0.08)]">
        <div className={accentBarClass} aria-hidden />

        <div className="relative p-6 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-fox-border bg-fox-dark/80 text-fox-muted transition-colors hover:border-fox-yellow/30 hover:text-white"
            aria-label="Закрыть"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-5 pr-10">
            <div className="flex items-center gap-4">
              <NavIcon
                name="contacts"
                className="h-12 w-12 shrink-0 drop-shadow-[0_6px_14px_rgba(0,0,0,0.8)]"
              />
              <ModalTitle title={content.title} accent={content.accent} />
            </div>
            <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21] sm:ml-16" />
          </div>

          {showContactLinks ? (
            <>
              <p className="mb-5 leading-relaxed text-fox-muted">{content.description}</p>
              <ContactLinks />
            </>
          ) : (
            <>
              <p className="mb-5 leading-relaxed text-fox-muted">
                Войдите в аккаунт, чтобы оформить заказ
              </p>
              <button
                type="button"
                onClick={props.onRequireLogin}
                className="w-full rounded-xl bg-fox-yellow py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover"
              >
                Войти в аккаунт
              </button>
            </>
          )}

          <div className="mt-5 rounded-xl border border-fox-border/80 bg-fox-dark/60 px-4 py-3 text-center text-xs text-fox-muted">
            <span className="font-medium text-gray-300">{contacts.telegram}</span>
            <span className="mx-2 text-fox-border">·</span>
            <span>{contacts.schedule}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
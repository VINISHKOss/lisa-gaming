import type { Page } from '../types/product'
import { contacts } from '../data/contacts'
import { legal } from '../data/legal'
import { BrandName } from './BrandName'
import { FoxLogo } from './FoxLogo'

interface SiteFooterProps {
  onNavigate: (page: Page) => void
  onOpenPcBuilds: () => void
}

type FooterNavItem =
  | { type: 'page'; page: Page; label: string }
  | { type: 'pc-builds'; label: string }
  | { type: 'placeholder'; label: string }

const navLinks: FooterNavItem[] = [
  { type: 'page', page: 'home', label: 'Главная' },
  { type: 'placeholder', label: 'Акции' },
  { type: 'placeholder', label: 'Новости' },
  { type: 'pc-builds', label: 'ПК на заказ' },
  { type: 'page', page: 'about', label: 'О нас' },
  { type: 'page', page: 'contacts', label: 'Контакты' },
  { type: 'placeholder', label: 'Выкуп' },
]

type LegalLink =
  | { type: 'page'; page: Page; label: string }
  | { type: 'placeholder'; label: string }

const legalLinks: LegalLink[] = [
  { type: 'page', page: 'delivery', label: 'Доставка и оплата' },
  { type: 'page', page: 'warranty', label: 'Гарантия и возврат' },
  { type: 'placeholder', label: 'Политика конфиденциальности' },
  { type: 'placeholder', label: 'Условия использования' },
]

const linkClass =
  'inline-flex min-h-11 items-center py-2 text-sm text-[#a0a0a0] transition-colors hover:text-fox-yellow'

const contactLinkClass =
  'inline-flex min-h-11 items-center py-2 text-sm transition-colors hover:text-fox-yellow'

const headingClass = 'mb-4 text-sm font-semibold uppercase tracking-wide text-white'

export function SiteFooter({ onNavigate, onOpenPcBuilds }: SiteFooterProps) {
  const handleNavClick = (item: FooterNavItem) => {
    if (item.type === 'page') {
      onNavigate(item.page)
      return
    }

    if (item.type === 'pc-builds') {
      onOpenPcBuilds()
    }
  }

  return (
    <footer className="mt-10 min-w-0 border-t border-fox-border bg-[#141414]">
      <div className="h-1 bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-3">
            <div className="mb-4 flex items-center gap-3">
              <FoxLogo className="h-12 w-12 shrink-0 rounded-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]" />
              <div>
                <p className="text-lg font-bold">
                  <BrandName />
                </p>
                <p className="text-xs text-fox-muted">Игровая техника</p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-[#a0a0a0]">
              Ваш надёжный партнёр в мире компьютерных технологий. Качество, честность и
              экспертиза.
            </p>
          </div>

          <div className="xl:col-span-2">
            <h3 className={headingClass}>Навигация</h3>
            <ul className="space-y-0.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.type === 'placeholder' ? (
                    <a href="#" className={linkClass}>
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className={linkClass}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:col-span-3">
            <h3 className={headingClass}>Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contacts.phone}`}
                  className={`${contactLinkClass} font-medium text-white`}
                >
                  {contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className={`${contactLinkClass} text-[#a0a0a0]`}
                >
                  {contacts.email}
                </a>
              </li>
              <li>
                <p className="text-sm text-[#a0a0a0]">Москва, Россия.</p>
              </li>
              <li>
                <p className="text-sm text-[#a0a0a0]">Ежедневно: 10:00 - 22:00.</p>
              </li>
            </ul>
          </div>

          <div className="xl:col-span-4">
            <h3 className={headingClass}>Мы на карте</h3>
            <div className="overflow-hidden rounded-xl border border-fox-border bg-fox-card">
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  src={contacts.mapEmbedUrl}
                  title={`Карта — ${contacts.fullAddress}`}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-t border-fox-border px-4 py-3 text-center text-sm font-medium text-fox-yellow transition-colors hover:bg-fox-dark"
              >
                Открыть в Картах
              </a>
            </div>

            <div className="mt-5 space-y-1 break-words text-left text-sm text-[#a0a0a0] sm:text-right">
              <p className="break-words">{legal.entrepreneur}</p>
              <p className="break-words">ОГРНИП {legal.ogrnip}</p>
              <p className="break-words">ИНН {legal.inn}</p>
              <a
                href={legal.promotionUrl}
                className={`${linkClass} pt-1`}
              >
                {legal.promotionLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-fox-border bg-[#101010]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="text-sm text-[#a0a0a0]">© 2026 Lisa Gaming. Все права защищены.</p>

          <nav className="flex flex-wrap gap-x-3 gap-y-0">
            {legalLinks.map((item) =>
              item.type === 'page' ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className={linkClass}
                >
                  {item.label}
                </button>
              ) : (
                <a key={item.label} href="#" className={linkClass}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  )
}
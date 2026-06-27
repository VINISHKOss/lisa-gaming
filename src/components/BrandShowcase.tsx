import type { ReactNode } from 'react'
import { FoxLogo3D } from './FoxLogo3D'
import { foxGradientTextClass, foxWhiteGradientTextClass } from '../constants/brand'

interface ShowcaseCardProps {
  icon: ReactNode
  children: ReactNode
  className?: string
}

function ShowcaseCard({ icon, children, className = '' }: ShowcaseCardProps) {
  return (
    <article
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-fox-border bg-fox-card px-3 py-3 text-center transition-all duration-300 hover:border-fox-yellow/45 hover:bg-fox-dark hover:shadow-lg hover:shadow-fox-yellow/10 sm:rounded-2xl sm:px-4 sm:py-3.5 lg:px-4 lg:py-4 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e18830]/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e18830]/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <span className="relative mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] text-[#0c1f33] shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105 sm:mb-2.5 sm:h-9 sm:w-9 sm:rounded-xl lg:mb-3 lg:h-10 lg:w-10">
        {icon}
      </span>

      <div className="relative text-[clamp(0.8125rem,0.55rem+0.55vw,0.9375rem)] font-semibold leading-snug text-white lg:text-[clamp(0.75rem,0.6rem+0.35vw,0.875rem)]">
        {children}
      </div>
    </article>
  )
}

function Accent({ children }: { children: ReactNode }) {
  return <span className={foxGradientTextClass}>{children}</span>
}

function SubLine({ children }: { children: ReactNode }) {
  return (
    <span className="mt-0.5 block text-[0.92em] font-medium leading-snug text-gray-200 sm:mt-1">
      {children}
    </span>
  )
}

function LogoPanel() {
  return (
    <div className="relative flex min-h-[14rem] items-center justify-center overflow-hidden rounded-xl border border-fox-border bg-gradient-to-b from-fox-card via-fox-dark to-fox-black p-5 shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:min-h-[16rem] sm:rounded-2xl sm:p-6 lg:min-h-[18rem] lg:p-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fox-yellow/70 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,136,48,0.32)_0%,rgba(200,60,33,0.14)_34%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[clamp(10rem,34vw,15rem)] w-[clamp(10rem,34vw,15rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,206,70,0.4)_0%,transparent_72%)] [animation:fox-glow-pulse_4s_ease-in-out_infinite] lg:h-[clamp(12rem,36vw,18rem)] lg:w-[clamp(12rem,36vw,18rem)]"
        aria-hidden
      />

      <FoxLogo3D />
    </div>
  )
}

const iconClass =
  'h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-[1.05rem] lg:w-[1.05rem]'

const icons = {
  warranty: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M12 3l7 3v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  assortment: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M12 4l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M3 7h11v8H3V7zM14 10h3l3 3v2h-6v-5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  ),
  installment: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M14.7 6.3a4 4 0 00-5.4 5.4l-4.8 4.8 1.7 1.7 4.8-4.8a4 4 0 005.4-5.4l-2.2 2.2-1.7-1.7 2.2-2.2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  exchange: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M7 7h11l-2-2M17 17H6l2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  customers: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.5 18c.8-2.4 2.8-4 4.5-4s3.7 1.6 4.5 4M13.5 18c.5-1.6 1.8-2.8 3.3-2.8S19.2 16.4 19.5 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
      <path
        d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export function BrandShowcase() {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-4 text-center sm:mb-5 lg:mb-4">
        <h2 className="break-words text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] font-bold leading-tight tracking-tight sm:tracking-[0.08em]">
          <span className={foxWhiteGradientTextClass}>Lisa</span>{' '}
          <span className={foxGradientTextClass}>Gaming</span>
        </h2>
        <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-fox-yellow to-transparent sm:w-40" />
      </div>

      <div className="grid gap-2 sm:grid-cols-3 sm:gap-2.5 lg:gap-3">
        <ShowcaseCard icon={icons.warranty}>
          Надежная гарантия <Accent>до 12 месяцев</Accent>
        </ShowcaseCard>

        <ShowcaseCard icon={icons.assortment}>
          <span className="block">Широкий ассортимент:</span>
          <SubLine>Новых и б/у ноутбуков.</SubLine>
          <SubLine>
            Готовых сборок ПК <Accent>под любые задачи.</Accent>
          </SubLine>
        </ShowcaseCard>

        <ShowcaseCard icon={icons.delivery}>
          <span className="block">Доставка по всей России</span>
          <SubLine>
            <Accent>(в пределах МКАД- бесплатно)</Accent>
          </SubLine>
        </ShowcaseCard>
      </div>

      <div className="mt-2 grid gap-2 sm:mt-2.5 sm:gap-2.5 lg:mt-3 lg:grid-cols-[1fr_1.65fr_1fr] lg:gap-3">
        <div className="grid gap-2 sm:gap-2.5 lg:gap-3">
          <ShowcaseCard icon={icons.installment}>
            <span className="block">
              Рассрочка <Accent>без %</Accent>
            </span>
            <SubLine>До 2 лет</SubLine>
            <SubLine>Сплит, Долями, кредит</SubLine>
          </ShowcaseCard>

          <ShowcaseCard icon={icons.service}>Свой сервисный центр</ShowcaseCard>
        </div>

        <LogoPanel />

        <div className="grid gap-2 sm:gap-2.5 lg:gap-3">
          <ShowcaseCard icon={icons.location}>
            <span className="block">Удобное расположение</span>
            <SubLine>
              <Accent>в центре у метро</Accent>
            </SubLine>
          </ShowcaseCard>

          <ShowcaseCard icon={icons.exchange}>Обмен и выкуп ноутбуков</ShowcaseCard>
        </div>
      </div>

      <div className="mt-2 grid gap-2 sm:mt-2.5 sm:grid-cols-2 sm:gap-2.5 lg:mt-3 lg:gap-3">
        <ShowcaseCard icon={icons.customers}>
          <span className="block">
            Более <Accent>10000</Accent>
          </span>
          <SubLine>довольных покупателей!</SubLine>
        </ShowcaseCard>

        <ShowcaseCard icon={icons.experience}>
          <span className="block">Работаем в сфере</span>
          <SubLine>
            больше <Accent>10 лет!</Accent>
          </SubLine>
        </ShowcaseCard>
      </div>
    </section>
  )
}
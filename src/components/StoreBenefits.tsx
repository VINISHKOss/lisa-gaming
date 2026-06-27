import type { ReactNode } from 'react'
import { foxGradientTextClass } from '../constants/brand'

const mainBenefits = [
  {
    id: 'experience',
    width: 'w-full',
    title: (
      <>
        Более <span className={foxGradientTextClass}>10 лет</span> предлагаем лучшее
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    width: 'w-[86%]',
    title: (
      <>
        Поддержка <span className={foxGradientTextClass}>24/7</span>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M4 12a8 8 0 0116 0v2.5a2.5 2.5 0 01-2.5 2.5H17l-2 2.5H9l-2-2.5H6.5A2.5 2.5 0 014 14.5V12z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'warranty',
    width: 'w-[72%]',
    title: (
      <>
        Гарантия до <span className={foxGradientTextClass}>1 года</span>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const

const extraBenefits = [
  'Бесплатная доставка',
  'Рассрочка до 24 месяцев',
  'Внутренний обмен 365 дней',
  'Сборки ПК на заказ в кратчайшие сроки',
  'Пожизненная постгарантийная поддержка',
] as const

const overlayTextShadow = '[text-shadow:0_2px_14px_rgba(0,0,0,0.85)]'

function BenefitPanel({
  width,
  icon,
  title,
}: {
  width: string
  icon: ReactNode
  title: ReactNode
}) {
  return (
    <div className={`relative ${width}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-l-2xl bg-gradient-to-r from-fox-black/78 via-fox-black/48 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black_55%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-[#e18830]/80 to-transparent"
        aria-hidden
      />

      <div className="relative flex items-center gap-3 px-3 py-2.5 sm:gap-3.5 sm:px-4 sm:py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] text-[#0c1f33] shadow-[0_4px_14px_rgba(0,0,0,0.5)] sm:h-10 sm:w-10">
          {icon}
        </span>
        <p className="text-[clamp(0.8125rem,1.2vw,1.0625rem)] font-semibold leading-snug text-white">
          {title}
        </p>
      </div>
    </div>
  )
}

export function StoreBenefits() {
  return (
    <div className={`w-full ${overlayTextShadow}`}>
      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {mainBenefits.map(({ id, width, title, icon }) => (
          <li key={id}>
            <BenefitPanel width={width} icon={icon} title={title} />
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex w-[72%] flex-col gap-1.5 sm:mt-4 sm:gap-2">
        {extraBenefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2">
            <svg
              viewBox="0 0 12 12"
              className="mt-0.5 h-3 w-3 shrink-0 text-[#f8ce46]"
              fill="none"
              aria-hidden
            >
              <path
                d="M2.5 6l2.2 2.2L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[clamp(0.6875rem,1vw,0.875rem)] leading-snug text-gray-200/95">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
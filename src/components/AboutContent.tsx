import type { ReactNode } from 'react'
import type { Page } from '../types/product'
import { foxGradientTextClass } from '../constants/brand'
import { AboutAdvantageIcon, AboutOfferingIcon, type AboutOfferingIconName } from './AboutIcons'

interface AboutContentProps {
  onNavigate: (page: Page) => void
}

const historyParagraphs = [
  'С 2015 года мы помогаем людям получать именно тот компьютер, который им действительно нужен.',
  'Всё начиналось с небольшой команды энтузиастов, которые хотели, чтобы качественная и мощная техника была доступна не только в крупных сетях, а у тех, кто ценит индивидуальный подход и честное качество. За эти годы мы выросли из небольшой мастерской в надёжного партнёра для тысяч клиентов по всей стране.',
  'Сегодня мы — это более 10 лет опыта, собственное производство сборок и глубокое понимание того, как должен работать компьютер под разные задачи: от повседневной работы и учёбы до серьёзного гейминга, монтажа видео и профессиональных проектов.',
] as const

const offerings: {
  id: AboutOfferingIconName
  title: string
  description: string
}[] = [
  {
    id: 'ready-pc',
    title: 'Готовые сборки ПК',
    description:
      'Проверенные временем конфигурации, которые уже собраны, протестированы и готовы к работе. Вы просто выбираете модель под свой бюджет и задачи — и получаете полностью готовый компьютер с гарантией.',
  },
  {
    id: 'custom-pc',
    title: 'Сборки ПК под заказ',
    description:
      'Индивидуальный подход. Вы рассказываете, для чего нужен компьютер, а мы подбираем оптимальную конфигурацию именно под вас. Хотите максимальную производительность, тишину, красивую подсветку, компактный корпус или конкретный бюджет — мы реализуем любой запрос. Никаких компромиссов и «средних» решений.',
  },
  {
    id: 'laptops',
    title: 'Ноутбуки',
    description:
      'Широкий выбор современных моделей ведущих брендов — от лёгких ультрабуков для работы и учёбы до мощных игровых ноутбуков.',
  },
]

const advantages = [
  'Только проверенные комплектующие от официальных поставщиков',
  'Профессиональная сборка и тщательное тестирование каждой системы',
  'Честные цены и прозрачное формирование стоимости',
  'Персональные консультации — помогаем выбрать, а не просто продать',
  'Гарантия качества и поддержка после покупки',
  'Возможность апгрейда и сервисного обслуживания',
] as const

const sectionCardClass =
  'overflow-hidden rounded-2xl border border-fox-border bg-fox-card shadow-[0_8px_22px_rgba(0,0,0,0.35)]'

const accentBarClass =
  'h-1.5 bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]'

const sectionTitleClass = 'text-2xl font-bold text-white sm:text-3xl'

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 space-y-3">
      <h2 className={sectionTitleClass}>{children}</h2>
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]" />
    </div>
  )
}

export function AboutContent({ onNavigate }: AboutContentProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>
            Наша <span className={foxGradientTextClass}>история</span>
          </SectionHeading>

          <div className="space-y-4">
            {historyParagraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="p-6 sm:p-8">
          <SectionHeading>Что мы предлагаем</SectionHeading>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map(({ id, title, description }) => (
              <article
                key={id}
                className="flex h-full flex-col rounded-xl border border-fox-border bg-fox-dark p-5 transition-colors hover:border-fox-yellow/25"
              >
                <AboutOfferingIcon
                  name={id}
                  className="mb-4 h-12 w-12 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
                />
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-fox-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="p-6 sm:p-8">
          <SectionHeading>
            Почему нас выбирают уже больше{' '}
            <span className={foxGradientTextClass}>10 лет</span>
          </SectionHeading>

          <ul className="grid gap-3 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <li
                key={advantage}
                className="flex items-start gap-3 rounded-xl border border-fox-border/80 bg-fox-dark/80 px-4 py-3.5"
              >
                <AboutAdvantageIcon />
                <span className="text-sm leading-relaxed text-gray-200">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${sectionCardClass} border-fox-yellow/20`}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-4 p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-gray-200">
            Мы не просто продаём компьютеры. Мы помогаем людям получить инструмент, который будет
            работать именно так, как нужно — надёжно, быстро и без лишних трат.
          </p>
          <p className="leading-relaxed text-fox-muted">
            Если вы ищете готовое решение или хотите собрать ПК своей мечты — мы с радостью поможем.
          </p>
          <p className="text-xl font-semibold text-white">
            Выберите свой компьютер вместе с{' '}
            <span className={foxGradientTextClass}>нами</span>!
          </p>

          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="mt-2 w-full rounded-xl bg-fox-yellow px-6 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover sm:w-auto"
          >
            Перейти в каталог
          </button>
        </div>
      </section>
    </div>
  )
}
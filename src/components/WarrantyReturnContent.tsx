import { useState, type ReactNode } from 'react'
import type { Page } from '../types/product'
import { contacts } from '../data/contacts'
import { foxGradientTextClass } from '../constants/brand'
import { CheckoutModal } from './CheckoutModal'

interface WarrantyReturnContentProps {
  onNavigate: (page: Page) => void
}

const properQualityReturnConditions = [
  'Товар не был в эксплуатации (актуально для новой техники), сохранён его идеальный товарный вид и потребительские свойства.',
  'Сохранены все заводские пломбы, контрольные плёнки, ярлыки и оригинальная упаковка без повреждений.',
  'В наличии документ, подтверждающий факт покупки (чек).',
] as const

const defectReturnOptions = [
  'Бесплатный ремонт устройства',
  'Замену на аналогичный товар (при наличии)',
  'Полный возврат уплаченных средств',
] as const

const nonWarrantyCases = [
  'Механических повреждений (следы от падений, ударов, глубокие царапины, погнутые контакты сокета или процессора).',
  'Попадания внутрь устройства жидкостей, насекомых, пыли или посторонних предметов.',
  'Термических повреждений из-за нарушения работы систем охлаждения (например, перекрытие вентиляционных отверстий ноутбука).',
  'Самостоятельного вскрытия, модификации аппаратной части, экстремального разгона (overclocking) или несанкционированного ремонта.',
  'Повреждения или отсутствия гарантийных пломб и серийных номеров магазина/производителя.',
  'Сбоев в электросети (перепады напряжения, использование некачественных блоков питания) или неправильного подключения кабелей.',
  'Использования нелицензионного программного обеспечения, установки некорректных BIOS/прошивок или заражения вирусами.',
  'Использования домашних видеокарт и ПК для майнинга криптовалют (если иное прямо не оговорено при покупке).',
] as const

const warrantySteps = [
  {
    title: 'Свяжитесь с нами',
    description:
      'Напишите на электронную почту или позвоните. Кратко опишите проблему и подготовьте номер заказа или чека.',
  },
  {
    title: 'Передайте товар',
    description: `Привезите технику в наш магазин по адресу ${contacts.fullAddress}, или отправьте транспортной компанией/курьером по предварительному согласованию с менеджером.`,
  },
  {
    title: 'Ожидайте результатов',
    description:
      'Мы оперативно проведём диагностику и свяжемся с вами для решения вопроса.',
  },
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

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-fox-border/80 bg-fox-dark/80 px-4 py-3.5"
        >
          <span
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21]"
            aria-hidden
          />
          <span className="text-sm leading-relaxed text-gray-200">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function WarrantyTypeCard({
  title,
  description,
  term,
  includes,
}: {
  title: string
  description: string
  term: string
  includes: string
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-fox-border bg-fox-dark p-5 transition-colors hover:border-fox-yellow/25">
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-fox-muted">{description}</p>
      <div className="mt-auto space-y-3">
        <p className="text-sm leading-relaxed text-gray-200">
          <span className="font-semibold text-fox-yellow">Срок гарантии:</span> {term}
        </p>
        <p className="text-sm leading-relaxed text-gray-200">
          <span className="font-semibold text-fox-yellow">Что включает:</span> {includes}
        </p>
      </div>
    </article>
  )
}

export function WarrantyReturnContent({ onNavigate }: WarrantyReturnContentProps) {
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
        <section className={sectionCardClass}>
          <div className={accentBarClass} aria-hidden />
          <div className="space-y-5 p-6 sm:p-8">
            <SectionHeading>
              Гарантия и возврат в <span className={foxGradientTextClass}>Лиса Гейминг</span>
            </SectionHeading>

            <p className="leading-relaxed text-gray-300">
              В <span className="font-medium text-white">Lisa Gaming</span> мы тщательно проверяем
              всю технику перед продажей, чтобы вы были уверены в надёжности своих покупок. Ваше
              спокойствие — наш приоритет. Ниже представлены условия гарантийного обслуживания и
              возврата для новых и бывших в употреблении (б/у) компьютеров, ноутбуков и периферии.
            </p>
          </div>
        </section>

        <section className={sectionCardClass}>
          <div className={accentBarClass} aria-hidden />
          <div className="space-y-6 p-6 sm:p-8">
            <SectionHeading>Гарантийное обслуживание</SectionHeading>

            <div className="grid gap-4 md:grid-cols-2">
              <WarrantyTypeCard
                title="На новую технику"
                description="На все новые компьютеры, ноутбуки, комплектующие и периферию предоставляется официальная гарантия от нашего магазина."
                term="до 12 месяцев (в зависимости от типа товара)."
                includes="Бесплатный ремонт или замену устройства при обнаружении заводского брака в течение всего гарантийного срока."
              />
              <WarrantyTypeCard
                title="На б/у технику"
                description="Покупка б/у техники в Lisa Gaming — это безопасно. Каждый системный блок, ноутбук или отдельная деталь проходят строгую предпродажную диагностику и стресс-тесты."
                term="до 12 месяцев (точный срок указывается при оформлении товара, а также в гарантийном талоне)."
                includes="Бесплатное устранение аппаратных неисправностей, возникших не по вине покупателя в период действия гарантии."
              />
            </div>
          </div>
        </section>

        <section className={sectionCardClass}>
          <div className={accentBarClass} aria-hidden />
          <div className="space-y-6 p-6 sm:p-8">
            <SectionHeading>Условия возврата и обмена</SectionHeading>

            <div className="space-y-5">
              <div className="rounded-xl border border-fox-border bg-fox-dark/80 p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  1. Возврат товара надлежащего качества
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  Если товар вам не подошёл, вы можете вернуть или обменять его в течение 14 дней с
                  момента покупки при соблюдении следующих условий:
                </p>
                <BulletList items={properQualityReturnConditions} />
                <div className="mt-4 rounded-xl border border-fox-yellow/25 bg-fox-dark px-4 py-4">
                  <p className="text-sm leading-relaxed text-gray-200">
                    <span className="font-semibold text-fox-yellow">Примечание:</span> согласно
                    закону о защите прав потребителей, технически сложные товары (к которым относятся
                    ПК и ноутбуки) надлежащего качества могут не подлежать возврату. Однако в{' '}
                    <span className="font-medium text-white">Lisa Gaming</span> мы всегда стараемся
                    идти навстречу клиентам и рассматриваем каждый случай индивидуально.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-fox-border bg-fox-dark/80 p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  2. Возврат товара ненадлежащего качества (при обнаружении брака)
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  Если в процессе эксплуатации выявился дефект, свяжитесь с нами для передачи
                  устройства на диагностику. Диагностика занимает до 20 дней (обычно мы справляемся
                  гораздо быстрее).
                </p>
                <p className="mb-3 text-sm font-semibold text-fox-yellow">
                  Если дефект подтверждается как гарантийный, мы предложим вам на выбор:
                </p>
                <BulletList items={defectReturnOptions} />
              </div>
            </div>
          </div>
        </section>

        <section className={sectionCardClass}>
          <div className={accentBarClass} aria-hidden />
          <div className="space-y-5 p-6 sm:p-8">
            <SectionHeading>Негарантийные случаи</SectionHeading>

            <p className="leading-relaxed text-gray-300">
              Гарантийное обслуживание не предоставляется, если неисправность возникла в результате:
            </p>

            <BulletList items={nonWarrantyCases} />
          </div>
        </section>

        <section className={`${sectionCardClass} border-fox-yellow/20`}>
          <div className={accentBarClass} aria-hidden />
          <div className="space-y-5 p-6 sm:p-8">
            <SectionHeading>Как оформить возврат или обратиться по гарантии?</SectionHeading>

            <ol className="space-y-3">
              {warrantySteps.map(({ title, description }, index) => (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-xl border border-fox-border/80 bg-fox-dark/80 px-4 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] text-sm font-bold text-fox-black">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-fox-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${contacts.email}`}
                className="rounded-xl border border-fox-border bg-fox-dark px-4 py-3.5 text-sm transition-colors hover:border-fox-yellow/30 hover:text-fox-yellow"
              >
                <p className="mb-1 text-fox-muted">Электронная почта</p>
                <p className="font-semibold text-white">{contacts.email}</p>
              </a>
              <a
                href={`tel:${contacts.phone}`}
                className="rounded-xl border border-fox-border bg-fox-dark px-4 py-3.5 text-sm transition-colors hover:border-fox-yellow/30 hover:text-fox-yellow"
              >
                <p className="mb-1 text-fox-muted">Телефон</p>
                <p className="font-semibold text-white">{contacts.phoneDisplay}</p>
              </a>
            </div>

            <p className="leading-relaxed text-gray-300">
              Команда <span className={foxGradientTextClass}>Лиса Гейминг</span> всегда на связи. Мы
              делаем всё, чтобы ваша техника работала безупречно!
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="w-full rounded-xl bg-fox-yellow px-6 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover sm:w-auto"
              >
                Перейти в каталог
              </button>
              <button
                type="button"
                onClick={() => setIsManagerModalOpen(true)}
                className="w-full rounded-xl border border-fox-border bg-fox-dark px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-fox-yellow/25 hover:text-fox-yellow sm:w-auto"
              >
                Связаться с менеджером
              </button>
            </div>
          </div>
        </section>
      </div>

      <CheckoutModal
        variant="manager"
        isOpen={isManagerModalOpen}
        onClose={() => setIsManagerModalOpen(false)}
      />
    </>
  )
}
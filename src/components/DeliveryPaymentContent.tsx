import { useState, type ReactNode } from 'react'
import type { Page } from '../types/product'
import { foxGradientTextClass } from '../constants/brand'
import { CheckoutModal } from './CheckoutModal'

interface DeliveryPaymentContentProps {
  onNavigate: (page: Page) => void
}

const deliveryServices = [
  {
    name: 'Яндекс Доставка',
    type: 'Курьерская / ПВЗ',
    note: 'Для быстрой доставки в крупных городах.',
  },
  {
    name: 'СДЭК',
    type: 'Курьерская / ПВЗ',
    note: 'Оптимальный баланс цены и скорости по всей РФ.',
  },
  {
    name: 'Boxberry',
    type: 'Пункты выдачи',
    note: 'Удобно забрать заказ рядом с домом.',
  },
  {
    name: 'Почта России',
    type: 'Отделения',
    note: 'Доставка в самые удалённые населённые пункты.',
  },
  {
    name: 'Dostavista',
    type: 'Срочный курьер',
    note: 'Экспресс-доставка «день в день» (в пределах города).',
  },
] as const

const deliveryCosts = [
  'Малогабаритные товары (ноутбуки, комплектующие): от 400 ₽.',
  'Крупногабаритные товары (системные блоки, мониторы): от 800 ₽.',
  'Срочная доставка (Dostavista/Яндекс): рассчитывается по тарифам сервиса на момент вызова курьера.',
  'При заказе на сумму свыше определённого порога (уточняйте у менеджера) возможна бесплатная доставка.',
] as const

const deliveryTerms = [
  'Москва и МО: 1–2 рабочих дня (или в день заказа через Dostavista).',
  'Санкт-Петербург: 2–3 рабочих дня.',
  'Крупные города РФ: 3–7 рабочих дней.',
  'Удалённые регионы: от 7 рабочих дней (зависит от работы Почты России и СДЭК).',
] as const

const orderSteps = [
  {
    title: 'Выбор товара',
    description: 'Вы оставляете заявку на сайте.',
  },
  {
    title: 'Связь с менеджером',
    description:
      'Наш специалист связывается с вами для подтверждения наличия и уточнения адреса.',
  },
  {
    title: 'Расчёт и выбор службы',
    description:
      'Менеджер рассчитывает стоимость через разные сервисы (СДЭК, Boxberry и др.) и предлагает вам лучший вариант.',
  },
  {
    title: 'Оплата и упаковка',
    description: 'После оплаты мы упаковываем технику в усиленную противоударную тару.',
  },
  {
    title: 'Трекинг',
    description:
      'Вы получаете трек-номер для отслеживания посылки на сайте выбранной службы.',
  },
] as const

const paymentMethods = [
  {
    title: 'Банковской картой',
    description:
      'Оплачивайте через терминал при самовывозе. Принимаем карты всех основных платёжных систем.',
  },
  {
    title: 'Наличными',
    description: 'Классический способ оплаты при самовывозе из магазина.',
  },
  {
    title: 'По QR-коду (СБП)',
    description:
      'Мгновенная и безопасная оплата через систему быстрых платежей. Просто отсканируйте код в приложении вашего банка.',
  },
  {
    title: 'В рассрочку',
    description:
      'Не откладывайте апгрейд на потом! Оформите рассрочку от банков-партнёров на выгодных условиях и забирайте технику уже сегодня.',
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

function NumberedList({ items }: { items: readonly string[] }) {
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

export function DeliveryPaymentContent({ onNavigate }: DeliveryPaymentContentProps) {
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false)

  return (
    <>
    <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>
            Доставка заказов по всей <span className={foxGradientTextClass}>России</span>
          </SectionHeading>

          <p className="leading-relaxed text-gray-300">
            Мы стремимся к тому, чтобы ваш новый компьютер или ноутбук доехал до вас максимально
            быстро и в полной сохранности. Для вашего удобства мы сотрудничаем с ведущими
            логистическими сервисами страны.
          </p>

          <div className="rounded-xl border border-fox-yellow/25 bg-fox-dark/80 px-4 py-4 sm:px-5">
            <p className="text-sm leading-relaxed text-gray-200">
              <span className="font-semibold text-fox-yellow">Важно:</span> оформление и расчёт
              точной стоимости доставки производятся через нашего менеджера после подтверждения
              заказа. Это позволяет нам подобрать оптимальный тариф и гарантировать надёжную
              упаковку.
            </p>
          </div>
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-6 p-6 sm:p-8">
          <SectionHeading>Способы и зоны доставки</SectionHeading>

          <p className="leading-relaxed text-gray-300">
            Мы осуществляем доставку в любую точку Российской Федерации. Вы можете выбрать
            наиболее подходящий сервис:
          </p>

          <div className="overflow-x-auto rounded-xl border border-fox-border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-fox-border bg-fox-dark">
                  <th className="px-4 py-3.5 font-semibold text-fox-yellow">Служба доставки</th>
                  <th className="px-4 py-3.5 font-semibold text-fox-yellow">Тип услуги</th>
                  <th className="px-4 py-3.5 font-semibold text-fox-yellow">Кому подойдёт</th>
                </tr>
              </thead>
              <tbody>
                {deliveryServices.map(({ name, type, note }, index) => (
                  <tr
                    key={name}
                    className={index % 2 === 0 ? 'bg-fox-card' : 'bg-fox-dark/60'}
                  >
                    <td className="px-4 py-3.5 font-medium text-white">{name}</td>
                    <td className="px-4 py-3.5 text-gray-300">{type}</td>
                    <td className="px-4 py-3.5 text-fox-muted">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>Стоимость доставки</SectionHeading>

          <p className="leading-relaxed text-gray-300">
            Итоговая цена зависит от веса, габаритов устройства и удалённости вашего региона.
          </p>

          <NumberedList items={deliveryCosts} />
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>Сроки доставки</SectionHeading>

          <NumberedList items={deliveryTerms} />

          <p className="text-sm leading-relaxed text-fox-muted">
            Сроки указаны с момента передачи заказа в транспортную компанию. Мы отгружаем товар в
            течение 24 часов после подтверждения оплаты.
          </p>
        </div>
      </section>

      <section className={sectionCardClass}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>Как происходит оформление</SectionHeading>

          <p className="leading-relaxed text-gray-300">
            Поскольку компьютерная техника требует особого внимания при транспортировке, процесс
            организован следующим образом:
          </p>

          <ol className="space-y-3">
            {orderSteps.map(({ title, description }, index) => (
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
        </div>
      </section>

      <section className={`${sectionCardClass} border-fox-yellow/20`}>
        <div className={accentBarClass} aria-hidden />
        <div className="space-y-5 p-6 sm:p-8">
          <SectionHeading>
            Способы оплаты в <span className={foxGradientTextClass}>Лиса Гейминг</span>
          </SectionHeading>

          <p className="leading-relaxed text-gray-300">
            Мы предусмотрели все современные способы оплаты, чтобы покупка нового компьютера или
            ноутбука была максимально комфортной для вас.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {paymentMethods.map(({ title, description }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-xl border border-fox-border bg-fox-dark p-5 transition-colors hover:border-fox-yellow/25"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-fox-muted">{description}</p>
              </article>
            ))}
          </div>

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
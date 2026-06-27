import { contacts } from '../data/contacts'
import { TelegramButton } from './TelegramButton'

interface EmptyFilterResultsProps {
  categoryLabel: string
}

export function EmptyFilterResults({ categoryLabel }: EmptyFilterResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-fox-border bg-fox-card/50 px-6 py-16 text-center">
      <span className="mb-4 text-5xl">🔍</span>
      <h3 className="mb-2 text-xl font-bold text-white">
        Подходящих {categoryLabel} не найдено
      </h3>
      <p className="mb-6 max-w-md text-fox-muted leading-relaxed">
        По выбранным фильтрам ничего не подошло. Свяжитесь с менеджером — мы
        подберём конфигурацию под ваши задачи или соберём ПК на заказ.
      </p>
      <TelegramButton>Связаться с менеджером в Telegram</TelegramButton>
      <a
        href={`tel:${contacts.phone}`}
        className="mt-3 text-sm font-medium text-fox-yellow transition-colors hover:text-fox-yellow-hover"
      >
        или позвоните: {contacts.phoneDisplay}
      </a>
    </div>
  )
}
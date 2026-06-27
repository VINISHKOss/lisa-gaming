import { contacts } from '../data/contacts'
import { PageGutter } from '../components/PageGutter'
import { YandexMap } from '../components/YandexMap'

export function ContactsPage() {
  return (
    <PageGutter className="space-y-8 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl font-bold text-white">Контакты</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-fox-border bg-fox-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-fox-yellow">Связаться с нами</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fox-yellow/10 text-lg">
                📞
              </span>
              <div>
                <p className="text-sm text-fox-muted">Телефон</p>
                <a
                  href={`tel:${contacts.phone}`}
                  className="font-medium text-white transition-colors hover:text-fox-yellow"
                >
                  {contacts.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fox-yellow/10 text-lg">
                📱
              </span>
              <div>
                <p className="text-sm text-fox-muted">Telegram</p>
                <a
                  href={contacts.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white transition-colors hover:text-fox-yellow"
                >
                  {contacts.telegram}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fox-yellow/10 text-lg">
                ✉️
              </span>
              <div>
                <p className="text-sm text-fox-muted">Email</p>
                <a
                  href={`mailto:${contacts.email}`}
                  className="font-medium text-white transition-colors hover:text-fox-yellow"
                >
                  {contacts.email}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fox-yellow/10 text-lg">
                📍
              </span>
              <div>
                <p className="text-sm text-fox-muted">Адрес</p>
                <p className="font-medium text-white">{contacts.address}</p>
                <p className="text-sm text-fox-muted">{contacts.mapEntrance}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-fox-border bg-fox-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-fox-yellow">Режим работы</h3>
          <div className="rounded-xl border border-fox-border bg-fox-dark p-4">
            <p className="text-lg font-semibold text-white">{contacts.schedule}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-fox-muted">
            Звоните или пишите в Telegram — поможем с выбором ноутбука или сборкой ПК
            под ваши задачи.
          </p>
        </div>
      </div>

      <YandexMap />
    </PageGutter>
  )
}
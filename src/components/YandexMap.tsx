import { contacts } from '../data/contacts'

export function YandexMap() {
  return (
    <section className="overflow-hidden rounded-2xl border border-fox-border bg-fox-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fox-border px-5 py-4 sm:px-6">
        <div>
          <h3 className="font-semibold text-white">Как нас найти</h3>
          <p className="text-sm text-fox-muted">
            {contacts.fullAddress}, {contacts.mapEntrance}
          </p>
        </div>
        <a
          href={contacts.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-fox-border bg-fox-dark px-4 py-2 text-sm font-medium text-fox-yellow transition-colors hover:border-fox-yellow/50 hover:bg-fox-black"
        >
          Открыть в Яндекс Картах
        </a>
      </div>

      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <iframe
          src={contacts.mapEmbedUrl}
          title={`Карта — ${contacts.fullAddress}`}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
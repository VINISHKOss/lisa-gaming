import type { CatalogView } from '../types/product'
import { CategoryIcon, type CategoryIconName } from './CategoryIcon'

interface CatalogChoiceProps {
  onSelect: (view: CatalogView) => void
}

const choices: {
  view: CatalogView
  icon: CategoryIconName
  title: string
  description: string
  count: string
}[] = [
  {
    view: 'laptops',
    icon: 'laptops',
    title: 'Ноутбуки',
    description: 'Игровые и рабочие ноутбуки от ведущих брендов',
    count: '6 моделей',
  },
  {
    view: 'pc-builds',
    icon: 'pc-builds',
    title: 'Сборки ПК',
    description: 'Готовые игровые и рабочие конфигурации под любые задачи',
    count: '6 сборок',
  },
]

export function CatalogChoice({ onSelect }: CatalogChoiceProps) {
  return (
    <section>
      <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
        Что вас интересует?
      </h2>
      <p className="mb-8 text-center text-fox-muted">
        Выберите категорию, чтобы перейти в каталог
      </p>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {choices.map(({ view, icon, title, description, count }) => (
          <button
            key={view}
            type="button"
            onClick={() => onSelect(view)}
            className="group flex flex-col items-center rounded-2xl border border-fox-border bg-fox-card p-8 text-center transition-all duration-300 hover:border-fox-yellow/50 hover:bg-fox-dark hover:shadow-xl hover:shadow-fox-yellow/10"
          >
            <CategoryIcon
              name={icon}
              className="mb-4 h-20 w-20 rounded-2xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110 sm:h-[5.05rem] sm:w-[5.05rem]"
            />
            <h3 className="mb-2 text-xl font-bold text-white group-hover:text-fox-yellow">
              {title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-fox-muted">
              {description}
            </p>
            <span className="rounded-full bg-fox-dark px-3 py-1 text-xs font-medium text-fox-yellow">
              {count}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
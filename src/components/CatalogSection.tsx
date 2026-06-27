import { useState } from 'react'
import type { CatalogView, Product } from '../types/product'
import { ProductCard } from './ProductCard'
import { ProductFilters } from './ProductFilters'
import { EmptyFilterResults } from './EmptyFilterResults'
import type { FilterOption, FilterState } from '../types/product'
import { hasActiveFilters } from '../utils/filters'
import { CategoryIcon, type CategoryIconName } from './CategoryIcon'

interface CatalogSectionProps {
  view: CatalogView
  products: Product[]
  filterOptions: FilterOption[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  categoryLabel: string
  onBack: () => void
  onViewChange: (view: CatalogView) => void
  onProductOpen?: (product: Product) => void
}

const categoryTabs: {
  view: CatalogView
  icon: CategoryIconName
  label: string
}[] = [
  { view: 'laptops', icon: 'laptops', label: 'Ноутбуки' },
  { view: 'pc-builds', icon: 'pc-builds', label: 'Сборки ПК' },
]

export function CatalogSection({
  view,
  products,
  filterOptions,
  filters,
  onFiltersChange,
  categoryLabel,
  onBack,
  onViewChange,
  onProductOpen,
}: CatalogSectionProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const activeFilterCount = Object.values(filters).reduce(
    (count, values) => count + (values?.length ?? 0),
    0,
  )

  return (
    <section className="page-gutter space-y-6 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fox-border bg-fox-card text-fox-yellow transition-colors hover:border-fox-yellow/50"
            aria-label="На главную"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categoryTabs.map(({ view: tabView, icon, label }) => {
              const isActive = view === tabView

              return (
                <button
                  key={tabView}
                  type="button"
                  onClick={() => onViewChange(tabView)}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 transition-all sm:px-4 ${
                    isActive
                      ? 'border-fox-yellow/50 bg-fox-yellow/10 text-white shadow-lg shadow-fox-yellow/10'
                      : 'border-fox-border bg-fox-card text-fox-muted hover:border-fox-yellow/40 hover:text-white'
                  }`}
                >
                  <CategoryIcon
                    name={icon}
                    className={`h-8 w-8 shrink-0 rounded-lg drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)] sm:h-9 sm:w-9 ${
                      isActive ? '' : 'opacity-80'
                    }`}
                  />
                  <span
                    className={`hidden text-base font-bold sm:inline sm:text-xl ${isActive ? 'text-fox-yellow' : ''}`}
                  >
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => setIsFiltersOpen((open) => !open)}
            aria-expanded={isFiltersOpen}
            className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none ${
              isFiltersOpen
                ? 'border-fox-yellow/50 bg-fox-yellow/10 text-fox-yellow'
                : 'border-fox-border bg-fox-card text-white hover:border-fox-yellow/40 hover:text-fox-yellow'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Фильтры
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-fox-yellow px-1.5 py-0.5 text-xs font-semibold text-fox-black">
                {activeFilterCount}
              </span>
            )}
            <svg
              className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <span className="rounded-full bg-fox-card px-3 py-1 text-sm text-fox-muted">
            {products.length}{' '}
            {products.length === 1 ? 'модель' : products.length < 5 ? 'модели' : 'моделей'}
            {hasActiveFilters(filters) && ' (отфильтровано)'}
          </span>
        </div>
      </div>

      {isFiltersOpen && (
        <ProductFilters
          options={filterOptions}
          filters={filters}
          onChange={onFiltersChange}
        />
      )}

      {products.length === 0 ? (
        <EmptyFilterResults categoryLabel={categoryLabel} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={onProductOpen} />
          ))}
        </div>
      )}
    </section>
  )
}
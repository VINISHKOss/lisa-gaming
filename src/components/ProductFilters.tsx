import { useEffect, useRef, useState } from 'react'
import type { FilterKey, FilterOption, FilterState } from '../types/product'
import { hasActiveFilters, toggleFilterValue, clearFilters } from '../utils/filters'

interface ProductFiltersProps {
  options: FilterOption[]
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function ProductFilters({ options, filters, onChange }: ProductFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = (key: FilterKey, value: string) => {
    onChange(toggleFilterValue(filters, key, value))
  }

  useEffect(() => {
    if (!openDropdown) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) return
      setOpenDropdown(null)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openDropdown])

  return (
    <div className="rounded-2xl border border-fox-border bg-fox-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">Фильтры</h3>
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange(clearFilters())}
            className="text-xs font-medium text-fox-yellow transition-colors hover:text-fox-yellow-hover"
          >
            Сбросить
          </button>
        )}
      </div>

      <div className="space-y-5">
        {options.map(({ key, label, values, variant = 'chips' }) => {
          if (variant === 'dropdown') {
            const isOpen = openDropdown === key
            const selectedCount = filters[key]?.length ?? 0

            return (
              <div key={key} ref={isOpen ? dropdownRef : undefined} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  className={`inline-flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:min-w-[10rem] sm:w-auto ${
                    isOpen || selectedCount > 0
                      ? 'border-fox-yellow/50 bg-fox-yellow/10 text-fox-yellow'
                      : 'border-fox-border bg-fox-dark text-white hover:border-fox-yellow/40 hover:text-fox-yellow'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {label}
                    {selectedCount > 0 && (
                      <span className="rounded-full bg-fox-yellow px-1.5 py-0.5 text-xs font-semibold text-fox-black">
                        {selectedCount}
                      </span>
                    )}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <ul
                    role="listbox"
                    aria-label="Выбор бренда"
                    className="absolute left-0 top-full z-20 mt-2 max-h-60 w-full min-w-[12rem] overflow-y-auto rounded-xl border border-fox-border bg-fox-card py-1 shadow-xl shadow-black/40 sm:w-auto"
                  >
                    {values.map((value) => {
                      const isActive = filters[key]?.includes(value)

                      return (
                        <li key={value} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onClick={() => handleToggle(key, value)}
                            className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                              isActive
                                ? 'bg-fox-yellow/15 text-fox-yellow'
                                : 'text-gray-300 hover:bg-fox-dark hover:text-white'
                            }`}
                          >
                            <span>{value}</span>
                            {isActive && (
                              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          }

          return (
            <div key={key}>
              <p className="mb-2 text-sm font-medium text-fox-muted">{label}</p>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => {
                  const isActive = filters[key]?.includes(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleToggle(key, value)}
                      className={`min-h-10 rounded-lg px-3.5 py-2 text-sm font-medium transition-all sm:px-3 sm:py-1.5 sm:text-xs ${
                        isActive
                          ? 'bg-fox-yellow text-fox-black shadow-md shadow-fox-yellow/20'
                          : 'border border-fox-border bg-fox-dark text-gray-300 hover:border-fox-yellow/40 hover:text-white'
                      }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
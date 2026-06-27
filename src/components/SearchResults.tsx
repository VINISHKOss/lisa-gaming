import type { Product } from '../types/product'
import { searchProducts } from '../utils/searchProducts'
import { ProductCard } from './ProductCard'
import { EmptyFilterResults } from './EmptyFilterResults'

interface SearchResultsProps {
  query: string
  onProductOpen?: (product: Product) => void
}

export function SearchResults({ query, onProductOpen }: SearchResultsProps) {
  const results = searchProducts(query)

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">
          Результаты поиска
          <span className="ml-2 text-base font-normal text-fox-muted">
            «{query}»
          </span>
        </h2>
        <span className="rounded-full bg-fox-card px-3 py-1 text-sm text-fox-muted">
          {results.length}{' '}
          {results.length === 1 ? 'товар' : results.length < 5 ? 'товара' : 'товаров'}
        </span>
      </div>

      {results.length === 0 ? (
        <EmptyFilterResults categoryLabel="товаров" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={onProductOpen} />
          ))}
        </div>
      )}
    </section>
  )
}
import { useMemo, useState } from 'react'
import type { CatalogView, FilterState, Product } from '../types/product'
import { hasProductGallery } from '../types/product'
import { laptops, getLaptopById } from '../data/products'
import { pcBuilds, getPcBuildById } from '../data/pcBuilds'
import { CatalogSection } from '../components/CatalogSection'
import { SearchResults } from '../components/SearchResults'
import { ProductDetailPage } from './ProductDetailPage'
import {
  filterLaptops,
  filterPcBuilds,
  laptopFilterOptions,
  pcFilterOptions,
} from '../utils/filters'

interface CatalogPageProps {
  view: CatalogView
  searchQuery: string
  selectedProductId: string | null
  onSelectedProductIdChange: (productId: string | null) => void
  onBackToHome: () => void
  onViewChange: (view: CatalogView) => void
}

export function CatalogPage({
  view,
  searchQuery,
  selectedProductId,
  onSelectedProductIdChange,
  onBackToHome,
  onViewChange,
}: CatalogPageProps) {
  const [laptopFilters, setLaptopFilters] = useState<FilterState>({})
  const [pcFilters, setPcFilters] = useState<FilterState>({})

  const isSearching = searchQuery.trim().length > 0
  const selectedProduct =
    selectedProductId
      ? (getLaptopById(selectedProductId) ?? getPcBuildById(selectedProductId))
      : undefined

  const filteredLaptops = useMemo(
    () => filterLaptops(laptops, laptopFilters),
    [laptopFilters],
  )

  const filteredPcBuilds = useMemo(
    () => filterPcBuilds(pcBuilds, pcFilters),
    [pcFilters],
  )

  const handleProductOpen = (product: Product) => {
    if (hasProductGallery(product)) {
      onSelectedProductIdChange(product.id)
    }
  }

  if (selectedProduct) {
    return (
      <div className="page-gutter py-4 sm:py-6 lg:py-8">
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => onSelectedProductIdChange(null)}
        />
      </div>
    )
  }

  if (isSearching) {
    return (
      <div className="page-gutter space-y-10 py-4 sm:py-6 lg:py-8">
        <SearchResults query={searchQuery} onProductOpen={handleProductOpen} />
      </div>
    )
  }

  if (view === 'laptops') {
    return (
      <CatalogSection
        view="laptops"
        products={filteredLaptops}
        filterOptions={laptopFilterOptions}
        filters={laptopFilters}
        onFiltersChange={setLaptopFilters}
        categoryLabel="ноутбуков"
        onBack={onBackToHome}
        onViewChange={onViewChange}
        onProductOpen={handleProductOpen}
      />
    )
  }

  return (
    <CatalogSection
      view="pc-builds"
      products={filteredPcBuilds}
      filterOptions={pcFilterOptions}
      filters={pcFilters}
      onFiltersChange={setPcFilters}
      categoryLabel="сборок"
      onBack={onBackToHome}
      onViewChange={onViewChange}
      onProductOpen={handleProductOpen}
    />
  )
}
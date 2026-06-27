import { BrandShowcase } from '../components/BrandShowcase'
import { CatalogChoice } from '../components/CatalogChoice'
import { PageGutter } from '../components/PageGutter'
import { WelcomeHero } from '../components/WelcomeHero'
import type { CatalogView } from '../types/product'

interface HomePageProps {
  onCategorySelect: (view: CatalogView) => void
}

export function HomePage({ onCategorySelect }: HomePageProps) {
  return (
    <div className="min-w-0 overflow-x-clip">
      <WelcomeHero />
      <PageGutter className="space-y-8 py-4 sm:space-y-9 sm:py-6 lg:space-y-8 lg:py-8">
        <CatalogChoice onSelect={onCategorySelect} />
        <BrandShowcase />
      </PageGutter>
    </div>
  )
}
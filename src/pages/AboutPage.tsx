import type { Page } from '../types/product'
import { AboutContent } from '../components/AboutContent'
import { AboutHero } from '../components/AboutHero'
import { PageGutter } from '../components/PageGutter'

interface AboutPageProps {
  onNavigate: (page: Page) => void
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-w-0 overflow-x-clip">
      <AboutHero />
      <PageGutter className="space-y-8 py-4 sm:space-y-10 sm:py-6 lg:space-y-12 lg:py-8">
        <AboutContent onNavigate={onNavigate} />
      </PageGutter>
    </div>
  )
}
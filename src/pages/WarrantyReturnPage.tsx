import type { Page } from '../types/product'
import { PageGutter } from '../components/PageGutter'
import { WarrantyReturnContent } from '../components/WarrantyReturnContent'
import { foxGradientTextClass } from '../constants/brand'

interface WarrantyReturnPageProps {
  onNavigate: (page: Page) => void
}

export function WarrantyReturnPage({ onNavigate }: WarrantyReturnPageProps) {
  return (
    <div className="min-w-0 overflow-x-clip">
      <PageGutter className="space-y-8 py-4 sm:space-y-10 sm:py-6 lg:space-y-12 lg:py-8">
        <header className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Гарантия и <span className={foxGradientTextClass}>возврат</span>
          </h1>
          <div
            className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#f8ce46] via-[#e18830] to-[#c83c21]"
            aria-hidden
          />
        </header>

        <WarrantyReturnContent onNavigate={onNavigate} />
      </PageGutter>
    </div>
  )
}
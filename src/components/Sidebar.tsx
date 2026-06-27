import type { Page } from '../types/product'
import { contacts } from '../data/contacts'
import { useCartStore } from '../store/cartStore'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onGoHome: () => void
  isOpen: boolean
  onClose: () => void
}

const navItems: { page: Page; label: string; icon: string }[] = [
  { page: 'catalog', label: 'Каталог', icon: '📦' },
  { page: 'cart', label: 'Корзина', icon: '🛒' },
  { page: 'about', label: 'О Нас', icon: 'ℹ️' },
  { page: 'contacts', label: 'Контакты', icon: '📞' },
]

export function Sidebar({
  currentPage,
  onNavigate,
  onGoHome,
  isOpen,
  onClose,
}: SidebarProps) {
  const totalItems = useCartStore((state) => state.getTotalItems())

  const handleNavigate = (page: Page) => {
    onNavigate(page)
    onClose()
  }

  const handleGoHome = () => {
    onGoHome()
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 shrink-0 flex-col border-r border-fox-border bg-fox-dark transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative border-b border-fox-border">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex w-full items-center gap-3 px-6 py-6 pr-14 text-left transition-colors hover:bg-fox-card/50"
          >
          <img
            src="/fox-logo.jpg"
            alt="Lisa Gaming"
            className="h-12 w-12 rounded-xl object-cover ring-2 ring-fox-yellow/30"
          />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-fox-yellow">
              Lisa Gaming
            </h1>
            <p className="text-xs text-fox-muted">Игровая техника</p>
          </div>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-fox-muted transition-colors hover:bg-fox-card hover:text-white"
            aria-label="Закрыть меню"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map(({ page, label, icon }) => (
            <button
              key={page}
              type="button"
              onClick={() => handleNavigate(page)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                currentPage === page
                  ? 'bg-fox-yellow text-fox-black shadow-lg shadow-fox-yellow/20'
                  : 'text-gray-300 hover:bg-fox-card hover:text-white'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="flex-1">{label}</span>
              {page === 'cart' && totalItems > 0 && (
                <span
                  className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    currentPage === 'cart'
                      ? 'bg-fox-black text-fox-yellow'
                      : 'bg-fox-yellow text-fox-black'
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto shrink-0 space-y-2 border-t border-fox-border p-4">
          <a
            href={`tel:${contacts.phone}`}
            className="block text-center text-xs text-fox-muted transition-colors hover:text-fox-yellow"
          >
            {contacts.phoneDisplay}
          </a>
          <p className="text-center text-xs text-fox-muted">
            © 2026 Lisa Gaming
          </p>
        </div>
      </aside>
    </>
  )
}
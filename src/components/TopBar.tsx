import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { Page, Product } from '../types/product'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { getUserFirstName } from '../utils/user'
import { searchProducts } from '../utils/searchProducts'
import { formatPrice } from '../utils/formatPrice'
import { BrandName } from './BrandName'
import { FoxLogo } from './FoxLogo'
import { NavIcon, type NavIconName } from './NavIcons'

interface TopBarProps {
  currentPage: Page
  searchQuery: string
  onSearchChange: (query: string) => void
  onNavigate: (page: Page) => void
  onSearchSubmit: () => void
  onOpenProduct: (product: Product) => void
  onGoHome: () => void
}

const NAV_ICON_SIZE =
  'h-11 w-11 min-h-11 min-w-11 lg:h-[2.6rem] lg:w-[2.6rem] lg:min-h-[2.6rem] lg:min-w-[2.6rem]'

const NAV_BUTTON_BASE =
  'rounded-2xl bg-fox-dark p-1 shadow-[0_8px_22px_rgba(0,0,0,0.75),0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_4px_rgba(0,0,0,0.4)]'

const NAV_ICON_CLASS =
  'h-full w-full rounded-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]'

const NAV_TOOLTIP_CLASS =
  'pointer-events-none fixed z-[9999] -translate-x-1/2 whitespace-nowrap rounded-xl bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] px-3 py-1.5 text-xs font-bold text-fox-black shadow-[0_4px_14px_rgba(232,136,48,0.45),0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.35)]'

export const MOBILE_MENU_CLOSE_MS = 280

type MobileMenuState = 'closed' | 'open' | 'closing'

const navItems: {
  page: Page
  label: string
  icon: NavIconName
}[] = [
  { page: 'catalog', label: 'Каталог', icon: 'catalog' },
  { page: 'cart', label: 'Корзина', icon: 'cart' },
  { page: 'about', label: 'О Нас', icon: 'about' },
  { page: 'contacts', label: 'Контакты', icon: 'contacts' },
]

function HamburgerIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 6l12 12M6 18L18 6" />
    </svg>
  )
}

interface DesktopNavButtonProps {
  page: Page
  label: string
  icon: NavIconName
  isActive: boolean
  showCartBadge?: boolean
  cartBadgeActive?: boolean
  cartCount?: number
  buttonClass: string
  onNavigate: (page: Page) => void
}

function DesktopNavButton({
  page,
  label,
  icon,
  isActive,
  showCartBadge = false,
  cartBadgeActive = false,
  cartCount = 0,
  buttonClass,
  onNavigate,
}: DesktopNavButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({})

  const updateTooltipPosition = () => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    setTooltipStyle({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2,
    })
  }

  const showTooltip = () => {
    updateTooltipPosition()
    setTooltipVisible(true)
  }

  const hideTooltip = () => {
    setTooltipVisible(false)
  }

  useEffect(() => {
    if (!tooltipVisible) return

    const handleReposition = () => updateTooltipPosition()
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)

    return () => {
      window.removeEventListener('scroll', handleReposition, true)
      window.removeEventListener('resize', handleReposition)
    }
  }, [tooltipVisible])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => onNavigate(page)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={buttonClass}
      >
        <NavIcon name={icon} className={NAV_ICON_CLASS} />
        {showCartBadge && cartCount > 0 && (
          <span
            className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
              cartBadgeActive ? 'bg-fox-black text-fox-yellow' : 'bg-fox-yellow text-fox-black'
            }`}
          >
            {cartCount}
          </span>
        )}
      </button>

      {tooltipVisible &&
        createPortal(
          <span role="tooltip" className={NAV_TOOLTIP_CLASS} style={tooltipStyle}>
            {label}
          </span>,
          document.body,
        )}
    </>
  )
}

export function TopBar({
  currentPage,
  searchQuery,
  onSearchChange,
  onNavigate,
  onSearchSubmit,
  onOpenProduct,
  onGoHome,
}: TopBarProps) {
  const currentUser = useAuthStore((state) => state.currentUser)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuState, setMobileMenuState] = useState<MobileMenuState>('closed')
  const searchRef = useRef<HTMLDivElement>(null)

  const isMobileMenuVisible = mobileMenuState !== 'closed'
  const isMobileMenuClosing = mobileMenuState === 'closing'

  const openMobileMenu = () => {
    if (mobileMenuState === 'open') return
    setMobileMenuState('open')
  }

  const closeMobileMenu = () => {
    if (mobileMenuState !== 'open') return
    setMobileMenuState('closing')
  }

  const accountLabel = currentUser ? getUserFirstName(currentUser.fullName) : 'Войти'
  const isAccountActive = currentPage === 'login' || currentPage === 'register'

  const previewResults = searchQuery.trim().length >= 2
    ? searchProducts(searchQuery).slice(0, 6)
    : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileMenuState !== 'closing') return

    const timer = window.setTimeout(() => {
      setMobileMenuState('closed')
    }, MOBILE_MENU_CLOSE_MS)

    return () => window.clearTimeout(timer)
  }, [mobileMenuState])

  useEffect(() => {
    if (!isMobileMenuVisible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileMenu()
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuVisible])

  useEffect(() => {
    if (mobileMenuState === 'open') {
      closeMobileMenu()
    }
  }, [currentPage])

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearchSubmit()
      setDropdownOpen(false)
    }
  }

  const handlePreviewSelect = (product: Product) => {
    onOpenProduct(product)
    setDropdownOpen(false)
  }

  const handleNavigate = (page: Page) => {
    closeMobileMenu()
    setDropdownOpen(false)
    onNavigate(page)
  }

  const navButtonClass = (isActive: boolean) =>
    `group relative flex items-center justify-center transition-all ${NAV_ICON_SIZE} ${NAV_BUTTON_BASE} ${
      isActive
        ? 'ring-2 ring-fox-yellow ring-offset-1 ring-offset-fox-black lg:ring-offset-2'
        : 'hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.8),0_4px_10px_rgba(245,197,24,0.12)]'
    }`

  const renderCartBadge = (isActive: boolean) =>
    totalItems > 0 ? (
      <span
        className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
          isActive ? 'bg-fox-black text-fox-yellow' : 'bg-fox-yellow text-fox-black'
        }`}
      >
        {totalItems}
      </span>
    ) : null

  const mobileMenuItems: { page: Page; label: string; icon: NavIconName }[] = [
    ...navItems,
    { page: 'login', label: accountLabel, icon: 'account' },
  ]

  const mobileMenuOverlay =
    isMobileMenuVisible &&
    createPortal(
      <div className="fixed inset-0 z-[200] flex flex-col md:hidden" role="presentation">
        <button
          type="button"
          className={`absolute inset-0 bg-[#050505]/96 backdrop-blur-lg ${
            isMobileMenuClosing ? 'mobile-menu-backdrop-exit' : 'mobile-menu-backdrop-enter'
          }`}
          aria-label="Закрыть меню"
          onClick={closeMobileMenu}
        />

        <nav
          id="mobile-nav-menu"
          aria-label="Мобильная навигация"
          className={`relative z-10 flex min-h-0 flex-1 flex-col ${
            isMobileMenuClosing ? 'mobile-menu-panel-exit' : 'mobile-menu-panel-enter'
          }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-fox-border/80 bg-fox-black px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <p className="text-lg font-bold text-white">Меню</p>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Закрыть меню"
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#6b3535] bg-[#4a2222] px-4 py-2.5 text-sm font-semibold text-[#e8d0d0] transition-colors hover:bg-[#552828] active:bg-[#3d1c1c]"
            >
              <CloseMenuIcon />
              <span>Закрыть</span>
            </button>
          </div>

          <ul className="flex shrink-0 flex-col gap-2 overflow-y-auto px-4 py-4">
            {mobileMenuItems.map(({ page, label, icon }) => {
              const isActive = page === 'login' ? isAccountActive : currentPage === page

              return (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(page)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex min-h-[3.25rem] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? 'border-fox-yellow/50 bg-fox-yellow/15 text-fox-yellow'
                        : 'border-fox-border bg-fox-card text-white hover:border-fox-yellow/35 hover:bg-fox-dark'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${NAV_BUTTON_BASE}`}
                    >
                      <NavIcon name={icon} className="h-9 w-9 rounded-lg" />
                    </span>
                    <span className="text-base font-semibold">{label}</span>
                    {page === 'cart' && totalItems > 0 && (
                      <span className="ml-auto flex h-7 min-w-7 items-center justify-center rounded-full bg-fox-yellow px-2 text-xs font-bold text-fox-black">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>,
      document.body,
    )

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-clip border-b border-fox-border bg-fox-black/90 backdrop-blur-md">
      <div className="relative px-3 py-3 sm:px-6 md:min-h-[4.25rem] lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <button
            type="button"
            onClick={onGoHome}
            className="relative z-20 flex min-h-11 min-w-11 shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="На главную"
          >
            <FoxLogo className="h-10 w-10 shrink-0 rounded-xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)] sm:h-11 sm:w-11" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-bold">
                <BrandName />
              </p>
              <p className="text-[10px] text-fox-muted">Игровая техника</p>
            </div>
          </button>

          <nav
            className="relative z-20 hidden shrink-0 items-center gap-1.5 md:flex"
            aria-label="Основная навигация"
          >
            {navItems.map(({ page, label, icon }) => (
              <DesktopNavButton
                key={page}
                page={page}
                label={label}
                icon={icon}
                isActive={currentPage === page}
                showCartBadge={page === 'cart'}
                cartBadgeActive={currentPage === 'cart'}
                cartCount={totalItems}
                buttonClass={navButtonClass(currentPage === page)}
                onNavigate={handleNavigate}
              />
            ))}
            <DesktopNavButton
              page="login"
              label={accountLabel}
              icon="account"
              isActive={isAccountActive}
              buttonClass={navButtonClass(isAccountActive)}
              onNavigate={handleNavigate}
            />
          </nav>

          <div className="relative z-20 flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => handleNavigate('cart')}
              aria-label="Корзина"
              aria-current={currentPage === 'cart' ? 'page' : undefined}
              className={navButtonClass(currentPage === 'cart')}
            >
              <NavIcon name="cart" className={NAV_ICON_CLASS} />
              {renderCartBadge(currentPage === 'cart')}
            </button>

            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Открыть меню"
              aria-expanded={mobileMenuState === 'open'}
              aria-controls="mobile-nav-menu"
              className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-2xl border border-fox-border bg-fox-dark text-white transition-colors hover:border-fox-yellow/40 hover:text-fox-yellow"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        <div
          ref={searchRef}
          className="relative z-10 mt-3 w-full md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:w-[min(calc(100%-16rem),18rem)] md:-translate-x-1/2 md:-translate-y-1/2 lg:w-[min(calc(100%-20rem),22rem)]"
        >
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fox-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value)
                setDropdownOpen(true)
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit()
                if (e.key === 'Escape') setDropdownOpen(false)
              }}
              placeholder="Поиск..."
              className="w-full rounded-full border border-fox-border bg-fox-card py-2.5 pl-9 pr-4 text-base text-white placeholder:text-fox-muted focus:border-fox-yellow/50 focus:outline-none focus:ring-2 focus:ring-fox-yellow/20 sm:text-sm"
            />
          </div>

          {dropdownOpen && searchQuery.trim().length >= 2 && (
            <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-fox-border bg-fox-card shadow-xl shadow-black/40 md:left-1/2 md:w-[min(calc(100dvw-2rem),22rem)] md:-translate-x-1/2">
              {previewResults.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto">
                  {previewResults.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => handlePreviewSelect(product)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-fox-dark"
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="h-10 w-14 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-fox-muted">
                            {product.category === 'laptop' ? 'Ноутбук' : 'Сборка ПК'}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-fox-yellow">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-3 text-sm text-fox-muted">Ничего не найдено</p>
              )}
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full border-t border-fox-border px-4 py-3 text-sm font-medium text-fox-yellow transition-colors hover:bg-fox-dark"
              >
                Показать все результаты
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOverlay}
    </header>
  )
}
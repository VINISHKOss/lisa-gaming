import { useEffect, useRef, useState } from 'react'
import type { CatalogView, Page, Product } from './types/product'
import { TopBar } from './components/TopBar'
import { SiteFooter } from './components/SiteFooter'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import { AboutPage } from './pages/AboutPage'
import { ContactsPage } from './pages/ContactsPage'
import { DeliveryPaymentPage } from './pages/DeliveryPaymentPage'
import { WarrantyReturnPage } from './pages/WarrantyReturnPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { useAuthStore } from './store/authStore'
import { useCartStore } from './store/cartStore'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [catalogView, setCatalogView] = useState<CatalogView>('laptops')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const mainRef = useRef<HTMLElement>(null)
  const currentUser = useAuthStore((state) => state.currentUser)
  const setActiveUserId = useCartStore((state) => state.setActiveUserId)

  useEffect(() => {
    setActiveUserId(currentUser?.id ?? null)
  }, [currentUser?.id, setActiveUserId])

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const goHome = () => {
    setCurrentPage('home')
    setSearchQuery('')
    setSelectedProductId(null)
  }

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    setSelectedProductId(null)
    if (page === 'home') {
      setSearchQuery('')
    }
    if (page === 'catalog') {
      setCatalogView('laptops')
      setSearchQuery('')
    }
  }

  const handleCategorySelect = (view: CatalogView) => {
    setCatalogView(view)
    setCurrentPage('catalog')
    setSearchQuery('')
    setSelectedProductId(null)
  }

  const handleOpenPcBuilds = () => {
    setCatalogView('pc-builds')
    setCurrentPage('catalog')
    setSearchQuery('')
    setSelectedProductId(null)
  }

  const handleSearchSubmit = () => {
    setSelectedProductId(null)
    setCurrentPage('catalog')
  }

  const handleOpenProduct = (product: Product) => {
    setCatalogView(product.category === 'laptop' ? 'laptops' : 'pc-builds')
    setCurrentPage('catalog')
    setSearchQuery('')
    setSelectedProductId(product.id)
  }

  const handleAuthSuccess = () => {
    setCurrentPage('cart')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onCategorySelect={handleCategorySelect} />
      case 'catalog':
        return (
          <CatalogPage
            view={catalogView}
            searchQuery={searchQuery}
            selectedProductId={selectedProductId}
            onSelectedProductIdChange={setSelectedProductId}
            onBackToHome={goHome}
            onViewChange={setCatalogView}
          />
        )
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />
      case 'contacts':
        return <ContactsPage />
      case 'delivery':
        return <DeliveryPaymentPage onNavigate={handleNavigate} />
      case 'warranty':
        return <WarrantyReturnPage onNavigate={handleNavigate} />
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onSuccess={handleAuthSuccess} />
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onSuccess={handleAuthSuccess} />
    }
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-clip">
      <TopBar
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigate}
        onSearchSubmit={handleSearchSubmit}
        onOpenProduct={handleOpenProduct}
        onGoHome={goHome}
      />

      <main
        ref={mainRef}
        className="min-w-0 flex-1 overflow-x-clip overflow-y-auto overscroll-x-none"
      >
        <div className="flex min-h-full min-w-0 flex-col">
          <div className="min-w-0 flex-1 overflow-x-clip">{renderPage()}</div>
          <SiteFooter onNavigate={handleNavigate} onOpenPcBuilds={handleOpenPcBuilds} />
        </div>
      </main>
    </div>
  )
}

export default App
import { useState } from 'react'
import type { Page } from '../types/product'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { CheckoutModal } from '../components/CheckoutModal'
import { PageGutter } from '../components/PageGutter'

interface CartPageProps {
  onNavigate: (page: Page) => void
}

export function CartPage({ onNavigate }: CartPageProps) {
  const currentUser = useAuthStore((state) => state.currentUser)
  const items = useCartStore((state) => state.getItems())
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <PageGutter className="space-y-6 py-4 sm:py-6 lg:py-8">
        <h2 className="text-2xl font-bold text-white">Корзина</h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-fox-border bg-fox-card/50 px-6 py-20 text-center">
            <span className="mb-4 text-5xl">🛒</span>
            <h3 className="mb-2 text-xl font-bold text-white">Корзина пуста</h3>
            <p className="mb-6 text-fox-muted">Добавьте товары из каталога</p>
            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="rounded-xl bg-fox-yellow px-6 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover"
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-2xl border border-fox-border bg-fox-card p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-fox-muted">
                      {product.specs.gpu} · {product.specs.ram}
                    </p>
                    <p className="mt-1 font-bold text-fox-yellow">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-fox-border bg-fox-dark">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-11 w-11 items-center justify-center text-fox-yellow transition-colors hover:bg-fox-card"
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-11 w-11 items-center justify-center text-fox-yellow transition-colors hover:bg-fox-card"
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-red-400 transition-colors hover:bg-red-400/10"
                      aria-label="Удалить товар"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="text-right sm:w-28">
                    <p className="text-sm text-fox-muted">Сумма</p>
                    <p className="font-bold text-white">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end gap-4 rounded-2xl border border-fox-yellow/20 bg-fox-card p-6">
              <div className="text-right">
                <p className="text-sm text-fox-muted">Итого</p>
                <p className="text-3xl font-bold text-fox-yellow">
                  {formatPrice(getTotalPrice())}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-xl bg-fox-yellow px-8 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover sm:w-auto"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </PageGutter>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAuthenticated={Boolean(currentUser)}
        onRequireLogin={() => {
          setIsModalOpen(false)
          onNavigate('login')
        }}
      />
    </>
  )
}
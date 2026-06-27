import { useState } from 'react'
import type { Product } from '../types/product'
import { isLaptopProduct } from '../types/product'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { getProductSpecEntries } from '../utils/productSpecs'
import { getProductMedia } from '../utils/productMedia'
import { CategoryIcon } from '../components/CategoryIcon'
import { ProductImageLightbox } from '../components/ProductImageLightbox'

interface ProductDetailPageProps {
  product: Product
  onBack: () => void
}

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const [activeMedia, setActiveMedia] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const mediaItems = getProductMedia(product)
  const current = mediaItems[activeMedia]
  const activeImageIndex =
    current.type === 'image' ? Math.max(0, product.images.indexOf(current.src)) : 0
  const isLaptop = isLaptopProduct(product)

  return (
    <section className="mx-auto min-w-0 max-w-5xl space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-fox-border bg-fox-card px-4 py-2.5 text-sm font-medium text-fox-yellow transition-colors hover:border-fox-yellow/50 hover:bg-fox-dark"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад к каталогу
      </button>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-fox-border bg-fox-dark">
            {current.type === 'video' ? (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                className="aspect-[4/3] w-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="group/image relative block w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fox-yellow/50"
                aria-label={`Увеличить фото: ${product.name}`}
              >
                <img
                  src={current.src}
                  alt={`${product.name} — фото ${activeMedia + 1}`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover/image:scale-[1.02]"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-fox-black/70 px-2.5 py-1 text-xs text-white/90 opacity-100 backdrop-blur-sm transition-opacity sm:opacity-0 sm:group-hover/image:opacity-100">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M11 8a3 3 0 100 6 3 3 0 000-6zM4 8V4m0 0h4M4 4l5 5"
                    />
                  </svg>
                  Увеличить
                </span>
              </button>
            )}
          </div>

          <div className="flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
            {mediaItems.map((item, index) => (
              <button
                key={`${item.type}-${item.src}`}
                type="button"
                onClick={() => setActiveMedia(index)}
                className={`relative w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:w-auto ${
                  activeMedia === index
                    ? 'border-fox-yellow shadow-lg shadow-fox-yellow/20'
                    : 'border-fox-border opacity-75 hover:border-fox-yellow/40 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <>
                    <img
                      src={item.poster ?? product.image}
                      alt={`${product.name} — видео`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fox-yellow/90 text-fox-black">
                        <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </span>
                    </span>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={`${product.name} — миниатюра ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CategoryIcon
              className="h-14 w-14 shrink-0 rounded-2xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]"
              name={isLaptop ? 'laptops' : 'pc-builds'}
            />
            <div>
              <p className="mb-1 text-sm font-medium text-fox-yellow">
                {isLaptop ? 'Ноутбук' : 'Сборка ПК'}
              </p>
              <h1 className="break-words text-2xl font-bold text-white sm:text-3xl">{product.name}</h1>
              <p className="mt-3 text-2xl font-bold text-fox-yellow sm:text-3xl">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-fox-border bg-fox-card p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Характеристики</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {getProductSpecEntries(product).map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-fox-border/80 bg-fox-dark/50 px-4 py-3"
                >
                  <dt className="text-xs font-medium uppercase tracking-wide text-fox-yellow">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="w-full rounded-xl bg-fox-yellow px-6 py-3.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover active:scale-[0.99] sm:w-auto"
          >
            Добавить в корзину
          </button>
        </div>
      </div>

      <article className="rounded-2xl border border-fox-border bg-gradient-to-br from-fox-card via-fox-card to-fox-dark p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-white">
          {isLaptop ? 'О модели' : 'О сборке'}
        </h2>
        <p className="text-base leading-relaxed text-gray-300">{product.description}</p>
      </article>

      <ProductImageLightbox
        isOpen={isLightboxOpen}
        images={product.images}
        initialIndex={activeImageIndex}
        productName={product.name}
        onClose={() => setIsLightboxOpen(false)}
      />
    </section>
  )
}
import { useRef, useState, type KeyboardEvent } from 'react'
import type { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { getProductSpecEntries } from '../utils/productSpecs'

interface ProductCardProps {
  product: Product
  onOpen?: (product: Product) => void
}

const categoryBadge: Record<Product['category'], string> = {
  laptop: 'Ноутбук',
  'pc-build': 'Сборка ПК',
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const isClickable = Boolean(onOpen)
  const previewVideo = product.video

  const handleCardClick = () => {
    onOpen?.(product)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onOpen) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(product)
    }
  }

  const handlePreviewEnter = () => {
    if (!previewVideo) return

    const video = videoRef.current
    if (!video) return

    setIsPreviewPlaying(true)
    video.currentTime = 0
    void video.play().catch(() => {
      setIsPreviewPlaying(false)
    })
  }

  const handlePreviewLeave = () => {
    if (!previewVideo) return

    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }

    setIsPreviewPlaying(false)
  }

  return (
    <article
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleCardClick : undefined}
      onKeyDown={isClickable ? handleCardKeyDown : undefined}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-fox-border bg-fox-card transition-all duration-300 hover:border-fox-yellow/40 hover:shadow-xl hover:shadow-fox-yellow/5 ${
        isClickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-fox-yellow/40' : ''
      }`}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden bg-fox-dark"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') handlePreviewEnter()
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') handlePreviewLeave()
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-all duration-500 ${
            isPreviewPlaying ? 'scale-105 opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {previewVideo && (
          <video
            ref={videoRef}
            src={previewVideo}
            poster={product.image}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
              isPreviewPlaying ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fox-card/80 to-transparent" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-lg bg-fox-black/70 px-2.5 py-1 text-xs font-medium text-fox-yellow backdrop-blur-sm">
          {categoryBadge[product.category]}
        </span>
        {isClickable && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-fox-black/70 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            Подробнее →
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-white">{product.name}</h3>

        <ul className="space-y-1.5 text-sm text-fox-muted">
          {getProductSpecEntries(product).slice(0, 3).map(({ label, value }) => (
            <li key={label} className="flex gap-2">
              <span className="text-fox-yellow">{label}:</span>
              <span className="truncate" title={value}>
                {value}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xl font-bold text-fox-yellow">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              addItem(product)
            }}
            className="min-h-11 rounded-xl bg-fox-yellow px-4 py-2.5 text-sm font-semibold text-fox-black transition-colors hover:bg-fox-yellow-hover active:scale-95 sm:shrink-0"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  )
}
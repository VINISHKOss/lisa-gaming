import { useCallback, useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'

interface ProductImageLightboxProps {
  isOpen: boolean
  images: string[]
  initialIndex?: number
  productName: string
  onClose: () => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.35

export function ProductImageLightbox({
  isOpen,
  images,
  initialIndex = 0,
  productName,
  onClose,
}: ProductImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragOrigin = useRef({ x: 0, y: 0, panX: 0, panY: 0 })

  const resetView = useCallback(() => {
    setZoom(MIN_ZOOM)
    setPan({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (!isOpen) return

    setActiveIndex(initialIndex)
    resetView()
  }, [isOpen, initialIndex, resetView])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (images.length < 2) return

      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + images.length) % images.length)
        resetView()
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % images.length)
        resetView()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, isOpen, onClose, resetView])

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()

    const direction = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    setZoom((current) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current + direction))
      if (next === MIN_ZOOM) {
        setPan({ x: 0, y: 0 })
      }
      return next
    })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom <= MIN_ZOOM) return

    dragOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= MIN_ZOOM) return

    setPan({
      x: dragOrigin.current.panX + event.clientX - dragOrigin.current.x,
      y: dragOrigin.current.panY + event.clientY - dragOrigin.current.y,
    })
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    setIsDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleImageClick = () => {
    if (zoom > MIN_ZOOM) {
      resetView()
      return
    }

    setZoom(2)
  }

  const goToImage = (index: number) => {
    setActiveIndex(index)
    resetView()
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[activeIndex]

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Просмотр фото: ${productName}`}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{productName}</p>
          {images.length > 1 && (
            <p className="text-xs text-fox-muted">
              {activeIndex + 1} из {images.length}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-fox-border bg-fox-card/90 text-white transition-colors hover:border-fox-yellow/50 hover:text-fox-yellow"
            aria-label="Уменьшить"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              setZoom((current) => {
                const next = Math.min(MAX_ZOOM, current + ZOOM_STEP)
                if (next === MIN_ZOOM) {
                  setPan({ x: 0, y: 0 })
                }
                return next
              })
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-fox-border bg-fox-card/90 text-white transition-colors hover:border-fox-yellow/50 hover:text-fox-yellow"
            aria-label="Увеличить"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-fox-border bg-fox-card/90 text-white transition-colors hover:border-fox-yellow/50 hover:text-fox-yellow"
            aria-label="Закрыть"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-4 sm:px-10">
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => goToImage((activeIndex - 1 + images.length) % images.length)}
            className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-fox-border bg-fox-card/90 text-white transition-colors hover:border-fox-yellow/50 hover:text-fox-yellow sm:left-4"
            aria-label="Предыдущее фото"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          className={`relative max-h-[calc(100vh-10rem)] w-full max-w-5xl overflow-hidden rounded-2xl border border-fox-border/70 bg-fox-dark/60 ${
            zoom > MIN_ZOOM ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={handleImageClick}
        >
          <img
            src={currentImage}
            alt={`${productName} — фото ${activeIndex + 1}`}
            className="mx-auto max-h-[calc(100vh-10rem)] w-full select-none object-contain transition-transform duration-200"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
            draggable={false}
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => goToImage((activeIndex + 1) % images.length)}
            className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-fox-border bg-fox-card/90 text-white transition-colors hover:border-fox-yellow/50 hover:text-fox-yellow sm:right-4"
            aria-label="Следующее фото"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="relative z-10 flex justify-center gap-2 overflow-x-auto px-4 pb-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goToImage(index)}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                activeIndex === index
                  ? 'border-fox-yellow shadow-lg shadow-fox-yellow/20'
                  : 'border-fox-border opacity-70 hover:border-fox-yellow/40 hover:opacity-100'
              }`}
              aria-label={`Открыть фото ${index + 1}`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <p className="relative z-10 pb-4 text-center text-xs text-fox-muted">
        Клик — увеличить · колесо мыши — масштаб · перетаскивание при увеличении
      </p>
    </div>
  )
}
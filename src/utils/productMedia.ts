import type { ProductMedia } from '../types/product'

interface ProductWithMedia {
  image: string
  images: string[]
  video?: string
}

export function getProductMedia(product: ProductWithMedia): ProductMedia[] {
  const media: ProductMedia[] = product.images.map((src) => ({ type: 'image', src }))

  if (product.video) {
    media.push({
      type: 'video',
      src: product.video,
      poster: product.images[0],
    })
  }

  return media
}
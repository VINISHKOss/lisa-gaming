import { laptops } from '../data/products'
import { pcBuilds } from '../data/pcBuilds'
import type { Product } from '../types/product'

const allProducts: Product[] = [...laptops, ...pcBuilds]

function getSearchText(product: Product): string {
  const categoryLabel = product.category === 'laptop' ? 'ноутбук' : 'сборка пк'
  return [product.name, categoryLabel, ...Object.values(product.specs)]
    .join(' ')
    .toLowerCase()
}

export function searchProducts(query: string): Product[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []

  const words = trimmed.split(/\s+/).filter(Boolean)

  return allProducts.filter((product) => {
    const haystack = getSearchText(product)
    return words.every((word) => haystack.includes(word))
  })
}
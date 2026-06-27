export interface LaptopSpecs {
  cpu: string
  gpu: string
  ram: string
  display: string
  storage?: string
}

export interface PcBuildSpecs {
  cpu: string
  gpu: string
  motherboard: string
  cooler: string
  psu: string
  ram: string
  storage: string
}

export type ProductMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

export interface LaptopProduct {
  id: string
  category: 'laptop'
  name: string
  price: number
  image: string
  images: string[]
  video?: string
  description: string
  specs: LaptopSpecs
}

export interface PcBuildProduct {
  id: string
  category: 'pc-build'
  name: string
  price: number
  image: string
  images: string[]
  video?: string
  description: string
  specs: PcBuildSpecs
}

export type Product = LaptopProduct | PcBuildProduct

export function isLaptopProduct(product: Product): product is LaptopProduct {
  return product.category === 'laptop'
}

export function isPcBuildProduct(product: Product): product is PcBuildProduct {
  return product.category === 'pc-build'
}

export function hasProductGallery(
  product: Product,
): product is LaptopProduct | PcBuildProduct {
  return isLaptopProduct(product) || isPcBuildProduct(product)
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  fullName: string
  phone: string
}

export type Page =
  | 'home'
  | 'catalog'
  | 'cart'
  | 'about'
  | 'contacts'
  | 'delivery'
  | 'warranty'
  | 'login'
  | 'register'

export type CatalogView = 'laptops' | 'pc-builds'

export type FilterKey =
  | 'brand'
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'cooler'
  | 'psu'
  | 'ram'
  | 'display'
  | 'storage'

export interface FilterOption {
  key: FilterKey
  label: string
  values: string[]
  variant?: 'chips' | 'dropdown'
}

export type FilterState = Partial<Record<FilterKey, string[]>>
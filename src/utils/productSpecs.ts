import type { Product } from '../types/product'

const specLabels: Record<string, string> = {
  cpu: 'CPU',
  gpu: 'GPU',
  motherboard: 'Материнская плата',
  cooler: 'Охлаждение',
  psu: 'Блок питания',
  ram: 'RAM',
  display: 'Экран',
  storage: 'Накопитель',
}

export function getProductSpecEntries(product: Product): { label: string; value: string }[] {
  return Object.entries(product.specs).map(([key, value]) => ({
    label: specLabels[key] ?? key,
    value,
  }))
}
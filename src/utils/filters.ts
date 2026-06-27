import type {
  FilterKey,
  FilterOption,
  FilterState,
  LaptopProduct,
  PcBuildProduct,
} from '../types/product'
import { laptops } from '../data/products'
import { pcBuilds } from '../data/pcBuilds'

const GPU_OPTIONS = [
  'RTX 4090',
  'RTX 4080 Super',
  'RTX 4080',
  'RTX 4070 Ti Super',
  'RTX 4070 Super',
  'RTX 4070',
  'RTX 4060',
] as const

const MOTHERBOARD_CHIPSETS = ['B650', 'B760I', 'B760', 'X670E', 'X670', 'Z790'] as const

const RAM_ORDER = ['16 GB', '32 GB', '64 GB'] as const

const PSU_ORDER = ['650 Вт', '750 Вт', '850 Вт', '1000 Вт'] as const

function extractGpu(gpu: string): string {
  for (const option of GPU_OPTIONS) {
    if (gpu.includes(option)) return option
  }
  return gpu
}

function extractRam(ram: string): string {
  const match = ram.match(/(\d+)\s*GB/)
  return match ? `${match[1]} GB` : ram
}

function extractCpuBrand(cpu: string): string {
  return cpu.includes('Intel') ? 'Intel' : 'AMD'
}

function extractBrand(name: string): string {
  return name.split(' ')[0] ?? name
}

function extractDisplay(display: string): string {
  const match = display.match(/(\d+(?:\.\d+)?)"/)
  return match ? `${match[1]}"` : display
}

const STORAGE_ORDER = ['512 GB', '1 TB', '2 TB'] as const

function extractStorage(storage: string): string {
  if (storage.includes('2 TB')) return '2 TB'
  if (storage.includes('1 TB')) return '1 TB'
  if (storage.includes('512 GB')) return '512 GB'
  return storage
}

function sortByOrder(values: string[], order: readonly string[]): string[] {
  return [...new Set(values)].sort((a, b) => {
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)

    if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'ru')
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}

function sortStorageValues(values: string[]): string[] {
  return sortByOrder(values, STORAGE_ORDER)
}

function extractPcCpu(cpu: string): string {
  const amd = cpu.match(/Ryzen\s+\d+\s*\d*\w*/i)
  if (amd) return amd[0].replace(/\s+/g, ' ')

  const intel = cpu.match(/Core\s+i[3579]-?\d+\w*/i)
  if (intel) return intel[0].replace(/\s+/g, ' ')

  return cpu
}

function extractMotherboard(motherboard: string): string {
  for (const chipset of MOTHERBOARD_CHIPSETS) {
    if (motherboard.includes(chipset)) return chipset
  }

  return motherboard
}

function extractCooler(cooler: string): string {
  const isWaterCooling =
    /liquid|kraken|galahad|h150i|h100|l240|сжо|водян|aio|freezer ii/i.test(cooler)

  return isWaterCooling ? 'Водяное охлаждение' : 'Воздушное охлаждение'
}

function extractPsu(psu: string): string {
  const match = psu.match(/(\d{3,4})\s*(?:W|Вт|w)/i)
  return match ? `${match[1]} Вт` : psu
}

export function getLaptopFilterValues(product: LaptopProduct) {
  return {
    brand: extractBrand(product.name),
    cpu: extractCpuBrand(product.specs.cpu),
    gpu: extractGpu(product.specs.gpu),
    ram: extractRam(product.specs.ram),
    display: extractDisplay(product.specs.display),
    storage: product.specs.storage ? extractStorage(product.specs.storage) : '',
  }
}

export function getPcFilterValues(product: PcBuildProduct) {
  return {
    cpu: extractPcCpu(product.specs.cpu),
    gpu: extractGpu(product.specs.gpu),
    motherboard: extractMotherboard(product.specs.motherboard),
    cooler: extractCooler(product.specs.cooler),
    psu: extractPsu(product.specs.psu),
    ram: extractRam(product.specs.ram),
    storage: extractStorage(product.specs.storage),
  }
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort()
}

export const laptopFilterOptions: FilterOption[] = [
  {
    key: 'brand',
    label: 'Бренд',
    variant: 'dropdown',
    values: uniqueSorted(laptops.map((p) => getLaptopFilterValues(p).brand)),
  },
  {
    key: 'cpu',
    label: 'Процессор',
    values: uniqueSorted(laptops.map((p) => getLaptopFilterValues(p).cpu)),
  },
  {
    key: 'gpu',
    label: 'Видеокарта',
    values: uniqueSorted(laptops.map((p) => getLaptopFilterValues(p).gpu)),
  },
  {
    key: 'ram',
    label: 'RAM',
    values: uniqueSorted(laptops.map((p) => getLaptopFilterValues(p).ram)),
  },
  {
    key: 'display',
    label: 'Диагональ',
    values: uniqueSorted(laptops.map((p) => getLaptopFilterValues(p).display)),
  },
  {
    key: 'storage',
    label: 'SSD',
    values: sortStorageValues(
      laptops
        .map((p) => getLaptopFilterValues(p).storage)
        .filter((value) => value.length > 0),
    ),
  },
]

export const pcFilterOptions: FilterOption[] = [
  {
    key: 'cpu',
    label: 'Процессор',
    values: uniqueSorted(pcBuilds.map((p) => getPcFilterValues(p).cpu)),
  },
  {
    key: 'gpu',
    label: 'Видеокарта',
    values: uniqueSorted(pcBuilds.map((p) => getPcFilterValues(p).gpu)),
  },
  {
    key: 'motherboard',
    label: 'Материнская плата',
    values: uniqueSorted(pcBuilds.map((p) => getPcFilterValues(p).motherboard)),
  },
  {
    key: 'cooler',
    label: 'Охлаждение',
    values: uniqueSorted(pcBuilds.map((p) => getPcFilterValues(p).cooler)),
  },
  {
    key: 'psu',
    label: 'Блок питания',
    values: sortByOrder(pcBuilds.map((p) => getPcFilterValues(p).psu), PSU_ORDER),
  },
  {
    key: 'ram',
    label: 'Оперативная память',
    values: sortByOrder(pcBuilds.map((p) => getPcFilterValues(p).ram), RAM_ORDER),
  },
  {
    key: 'storage',
    label: 'SSD',
    values: sortStorageValues(pcBuilds.map((p) => getPcFilterValues(p).storage)),
  },
]

function matchesFilters(
  values: Record<string, string>,
  filters: FilterState,
): boolean {
  return (Object.entries(filters) as [FilterKey, string[]][]).every(
    ([key, selected]) => {
      if (!selected || selected.length === 0) return true
      return selected.includes(values[key])
    },
  )
}

export function filterLaptops(
  items: LaptopProduct[],
  filters: FilterState,
): LaptopProduct[] {
  return items.filter((product) =>
    matchesFilters(getLaptopFilterValues(product), filters),
  )
}

export function filterPcBuilds(
  items: PcBuildProduct[],
  filters: FilterState,
): PcBuildProduct[] {
  return items.filter((product) =>
    matchesFilters(getPcFilterValues(product), filters),
  )
}

export function hasActiveFilters(filters: FilterState): boolean {
  return Object.values(filters).some((values) => values && values.length > 0)
}

export function toggleFilterValue(
  filters: FilterState,
  key: FilterKey,
  value: string,
): FilterState {
  const current = filters[key] ?? []
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]

  return { ...filters, [key]: next }
}

export function clearFilters(): FilterState {
  return {}
}
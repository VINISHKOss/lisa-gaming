import type { PcBuildProduct } from '../types/product'

const pcBuildGallery = ['/pc-builds-choice.png', '/fox-head.png'] as const

export const pcBuilds: PcBuildProduct[] = [
  {
    id: 'fox-starter',
    category: 'pc-build',
    name: 'Fox Starter',
    price: 89990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-starter.mp4',
    description:
      'Fox Starter — идеальная точка входа в мир ПК-гейминга. Сбалансированная связка Ryzen 5 и RTX 4060 уверенно тянет современные AAA-тайтлы в Full HD, а быстрый NVMe-накопитель и 16 ГБ DDR5 не тормозят загрузки и мультизадачность. Компактная сборка с продуманным воздушным охлаждением тихо работает в длинных сессиях — отличный выбор для первого игрового ПК или апгрейда со старой системы.',
    specs: {
      cpu: 'AMD Ryzen 5 7600',
      gpu: 'NVIDIA RTX 4060 8GB',
      motherboard: 'MSI MAG B650 Tomahawk WiFi',
      cooler: 'DeepCool AK400',
      psu: '650 Вт 80+ Bronze',
      ram: '16 GB DDR5',
      storage: '1 TB NVMe SSD',
    },
  },
  {
    id: 'fox-gamer',
    category: 'pc-build',
    name: 'Fox Gamer',
    price: 134990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-gamer.mp4',
    description:
      'Fox Gamer создан для тех, кто хочет больше кадров и выше настройки без компромиссов. Core i5-14600K и RTX 4070 Super дают запас по производительности в QHD, а СЖО Arctic Liquid Freezer II держит температуры под контролем даже в жарких рейдах. 32 ГБ оперативной памяти и золотой блок питания 750 Вт делают эту сборку надёжной базой для игр, стримов и монтажа.',
    specs: {
      cpu: 'Intel Core i5-14600K',
      gpu: 'NVIDIA RTX 4070 Super 12GB',
      motherboard: 'ASUS TUF Gaming B760-Plus WiFi',
      cooler: 'Arctic Liquid Freezer II 240',
      psu: '750 Вт 80+ Gold',
      ram: '32 GB DDR5',
      storage: '1 TB NVMe SSD',
    },
  },
  {
    id: 'fox-pro',
    category: 'pc-build',
    name: 'Fox Pro',
    price: 189990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-pro.mp4',
    description:
      'Fox Pro — мечта соревновательного геймера и требовательного стримера. Легендарный Ryzen 7 7800X3D в паре с RTX 4070 Ti Super выдаёт топовый FPS в онлайн-шутерах и стратегиях, а премиальная платформа X670 и СЖО NZXT Kraken обеспечивают стабильность под нагрузкой. Два терабайта быстрого SSD — с запасом для библиотеки игр, записей и рабочих проектов.',
    specs: {
      cpu: 'AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA RTX 4070 Ti Super 16GB',
      motherboard: 'Gigabyte X670 Aorus Elite AX',
      cooler: 'NZXT Kraken X63',
      psu: '850 Вт 80+ Gold',
      ram: '32 GB DDR5',
      storage: '2 TB NVMe SSD',
    },
  },
  {
    id: 'fox-elite',
    category: 'pc-build',
    name: 'Fox Elite',
    price: 289990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-elite.mp4',
    description:
      'Fox Elite — абсолютный флагман линейки Lisa Gaming. Core i9-14900K и RTX 4090 без ограничений раскрывают 4K-гейминг, VR и тяжёлый 3D-рендер, а 64 ГБ DDR5 и платина 1000 Вт говорят о том, что система готова к любым апгрейдам. ROG Maximus Z790 и Corsair H150i ELITE подчёркивают премиальный характер сборки — для тех, кто не признаёт слова «недостаточно мощно».',
    specs: {
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4090 24GB',
      motherboard: 'ASUS ROG Maximus Z790 Hero',
      cooler: 'Corsair iCUE H150i ELITE',
      psu: '1000 Вт 80+ Platinum',
      ram: '64 GB DDR5',
      storage: '2 TB NVMe SSD',
    },
  },
  {
    id: 'fox-workstation',
    category: 'pc-build',
    name: 'Fox Workstation',
    price: 219990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-workstation.mp4',
    description:
      'Fox Workstation — рабочая станция для создателей контента и профессионалов. Ryzen 9 7950X и RTX 4080 Super одинаково уверенно справляются с монтажом 4K, 3D-моделированием и рендером, а 64 ГБ памяти и гибридное хранилище 2 TB SSD + 4 TB HDD закрывают вопрос архивов и проектов. Тихое воздушное охлаждение Noctua NH-D15 делает систему комфортной для ежедневной работы.',
    specs: {
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4080 Super 16GB',
      motherboard: 'ASUS ProArt X670E-CREATOR WiFi',
      cooler: 'Noctua NH-D15 chromax.black',
      psu: '850 Вт 80+ Gold',
      ram: '64 GB DDR5',
      storage: '2 TB NVMe SSD + 4 TB HDD',
    },
  },
  {
    id: 'fox-compact',
    category: 'pc-build',
    name: 'Fox Compact ITX',
    price: 154990,
    image: '/pc-builds-choice.png',
    images: [...pcBuildGallery],
    video: '/fox-compact.mp4',
    description:
      'Fox Compact ITX доказывает, что мощный игровой ПК не обязан занимать полкомнаты. В компактном корпусе Mini-ITX спрятаны Core i7-14700F, RTX 4070 и 32 ГБ DDR5 — конфигурация, которая уверенно тянет современные игры и рабочие задачи. СЖО Lian Li Galahad II и SFX-блок питания 750 Вт сохраняют баланс производительности и аккуратного внешнего вида — идеально для небольшой комнаты или гостиной.',
    specs: {
      cpu: 'Intel Core i7-14700F',
      gpu: 'NVIDIA RTX 4070 12GB',
      motherboard: 'MSI MPG B760I Edge WiFi',
      cooler: 'Lian Li Galahad II 240',
      psu: '750 Вт 80+ Gold SFX',
      ram: '32 GB DDR5',
      storage: '1 TB NVMe SSD',
    },
  },
]

export function getPcBuildById(id: string): PcBuildProduct | undefined {
  return pcBuilds.find((build) => build.id === id)
}
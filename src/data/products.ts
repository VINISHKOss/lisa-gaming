import type { LaptopProduct } from '../types/product'

export const laptops: LaptopProduct[] = [
  {
    id: 'asus-rog-strix-g16',
    category: 'laptop',
    name: 'ASUS ROG Strix G16',
    price: 189990,
    image: '/asus-rog-strix-g16-1.jpg',
    images: ['/asus-rog-strix-g16-1.jpg', '/asus-rog-strix-g16-2.jpg'],
    video: '/asus-rog-strix-g16.mp4',
    description:
      'ASUS ROG Strix G16 — это настоящий штурмовик для геймеров, которые не признают компромиссов. Агрессивный дизайн с фирменной подсветкой ROG, мощный Intel Core i9 и RTX 4070 превращают каждую игровую сессию в праздник: плавный геймплей на 240 Гц, высокие настройки графики и уверенная работа в стримах. Идеальный выбор для тех, кто хочет домашнюю игровую станцию без перехода на стационарный ПК.',
    specs: {
      cpu: 'Intel Core i9-14900HX',
      gpu: 'NVIDIA RTX 4070 8GB',
      ram: '32 GB DDR5',
      display: '16" QHD 240Hz',
      storage: '1 TB NVMe SSD',
    },
  },
  {
    id: 'lenovo-legion-pro-7',
    category: 'laptop',
    name: 'Lenovo Legion Pro 7',
    price: 214990,
    image: '/lenovo-legion-pro-7-1.jpg',
    images: ['/lenovo-legion-pro-7-1.jpg', '/lenovo-legion-pro-7-2.jpg'],
    video: '/lenovo-legion-pro-7.mp4',
    description:
      'Lenovo Legion Pro 7 — холодный расчёт и горячая производительность в одном корпусе. Легендарная система охлаждения Legion Coldfront держит Ryzen 9 и RTX 4080 в узде даже в длинных рейдах, а матовый 16-дюймовый экран 240 Гц дарит кристальную картинку без размытия. Это ноутбук для киберспортсменов и создателей контента, которым нужна мощь флагмана и сдержанный, взрослый внешний вид.',
    specs: {
      cpu: 'AMD Ryzen 9 7945HX',
      gpu: 'NVIDIA RTX 4080 12GB',
      ram: '32 GB DDR5',
      display: '16" WQXGA 240Hz',
      storage: '1 TB NVMe SSD',
    },
  },
  {
    id: 'msi-raider-ge78',
    category: 'laptop',
    name: 'MSI Raider GE78',
    price: 249990,
    image:
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525547719578-a2d4b9a8f2a9?w=800&h=600&fit=crop',
    ],
    description:
      'MSI Raider GE78 — абсолютный титан игрового мира. 17-дюймовый экран, RTX 4090 и 64 ГБ оперативной памяти — конфигурация, от которой захватывает дух. Mystic Light превращает корпус в световое шоу, а мощнейший процессор Intel Core i9 без труда тянет 4K-рендер, VR и самые требовательные AAA-тайтлы на максималках. Если вы ищете ноутбук без потолка по производительности — Raider GE78 отвечает на этот вызов.',
    specs: {
      cpu: 'Intel Core i9-14900HX',
      gpu: 'NVIDIA RTX 4090 16GB',
      ram: '64 GB DDR5',
      display: '17" QHD+ 240Hz',
      storage: '2 TB NVMe SSD',
    },
  },
  {
    id: 'acer-predator-helios-16',
    category: 'laptop',
    name: 'Acer Predator Helios 16',
    price: 174990,
    image:
      'https://images.unsplash.com/photo-1525547719578-a2d4b9a8f2a9?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1525547719578-a2d4b9a8f2a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
    ],
    description:
      'Acer Predator Helios 16 — умный выбор для геймера с чувством меры. За доступную цену вы получаете сбалансированную связку Core i7 и RTX 4060, яркий WQXGA-экран 165 Гц и фирменный хищный стиль Predator. Он уверенно тянет современные игры, не перегревается в марафонских сессиях и оставляет запас для учёбы, монтажа и работы — идеальный первый или апгрейдный игровой ноутбук.',
    specs: {
      cpu: 'Intel Core i7-13700HX',
      gpu: 'NVIDIA RTX 4060 8GB',
      ram: '16 GB DDR5',
      display: '16" WQXGA 165Hz',
      storage: '512 GB NVMe SSD',
    },
  },
  {
    id: 'hp-omen-16',
    category: 'laptop',
    name: 'HP Omen 16',
    price: 159990,
    image:
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525547719578-a2d4b9a8f2a9?w=800&h=600&fit=crop',
    ],
    description:
      'HP Omen 16 — универсальный боец на каждый день. Строгий дизайн без лишнего пафоса, энергоэффективный Ryzen 7 и RTX 4070 дают отличный баланс автономности и мощности. Ноутбук одинаково уместен в общежитии, дома и на стриме: тихая клавиатура, чёткий 165-Гц экран и продуманное охлаждение Omen Tempest делают его надёжным спутником и геймера, и студента.',
    specs: {
      cpu: 'AMD Ryzen 7 7840HS',
      gpu: 'NVIDIA RTX 4070 8GB',
      ram: '16 GB DDR5',
      display: '16.1" FHD 165Hz',
      storage: '1 TB NVMe SSD',
    },
  },
  {
    id: 'razer-blade-16',
    category: 'laptop',
    name: 'Razer Blade 16',
    price: 279990,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
    ],
    description:
      'Razer Blade 16 — премиальный шедевр в мире игровых ноутбуков. Цельный алюминиевый корпус, безупречная сборка и легендарная клавиатура Chroma создают ощущение роскошного инструмента. UHD+-экран 240 Гц сочетает невероятную детализацию и скорость, а RTX 4080 с i9 справляются с любой задачей — от Cyberpunk на ультрах до профессионального монтажа. Blade 16 — для тех, кто ценит стиль не меньше, чем сырую мощь.',
    specs: {
      cpu: 'Intel Core i9-14900HX',
      gpu: 'NVIDIA RTX 4080 12GB',
      ram: '32 GB DDR5',
      display: '16" UHD+ 240Hz',
      storage: '2 TB NVMe SSD',
    },
  },
]

export function getLaptopById(id: string): LaptopProduct | undefined {
  return laptops.find((laptop) => laptop.id === id)
}
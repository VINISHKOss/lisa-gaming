import { useId } from 'react'
import { FOX_ICON_FILL } from '../constants/brand'
import { IconShell } from './IconShell'

export type CategoryIconName = 'laptops' | 'pc-builds'

interface CategoryIconProps {
  name: CategoryIconName
  className?: string
}

const icons: Record<CategoryIconName, (fill: string) => React.ReactNode> = {
  laptops: (fill) => (
    <>
      <rect
        x="14"
        y="16"
        width="36"
        height="24"
        rx="3"
        fill="none"
        stroke={fill}
        strokeWidth="4"
      />
      <rect x="18" y="20" width="28" height="16" rx="1.5" fill={fill} opacity="0.15" />
      <path
        d="M10 42h44l-3.5 6h-37L10 42z"
        fill={fill}
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 44h48" stroke={fill} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'pc-builds': (fill) => (
    <>
      <rect
        x="12"
        y="14"
        width="30"
        height="22"
        rx="2.5"
        fill="none"
        stroke={fill}
        strokeWidth="4"
      />
      <rect x="25" y="36" width="4" height="7" fill={fill} />
      <rect x="18" y="43" width="18" height="3.5" rx="1.5" fill={fill} />
      <rect
        x="44"
        y="18"
        width="14"
        height="30"
        rx="2.5"
        fill="none"
        stroke={fill}
        strokeWidth="4"
      />
      <circle cx="51" cy="26" r="2.5" fill={fill} />
      <rect x="47" y="32" width="8" height="2" rx="1" fill={fill} />
      <rect x="47" y="37" width="8" height="2" rx="1" fill={fill} />
      <rect x="47" y="42" width="8" height="2" rx="1" fill={fill} />
    </>
  ),
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const gradientId = useId().replace(/:/g, '')

  return (
    <IconShell gradientId={gradientId} className={className}>
      {icons[name](FOX_ICON_FILL)}
    </IconShell>
  )
}
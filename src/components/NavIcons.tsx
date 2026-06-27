import { FOX_ICON_FILL } from '../constants/brand'
import { IconShell } from './IconShell'

export type NavIconName = 'catalog' | 'cart' | 'about' | 'contacts' | 'account'

interface NavIconProps {
  name: NavIconName
  className?: string
}

const icons: Record<NavIconName, (fill: string) => React.ReactNode> = {
  catalog: (fill) => (
    <>
      <rect x="14" y="14" width="17" height="17" rx="3" fill={fill} />
      <rect x="33" y="14" width="17" height="17" rx="3" fill={fill} />
      <rect x="14" y="33" width="17" height="17" rx="3" fill={fill} />
      <rect x="33" y="33" width="17" height="17" rx="3" fill={fill} />
    </>
  ),
  cart: (fill) => (
    <>
      <path
        d="M16 22h4l3.2 16.5a3 3 0 0 0 3 2.4h14.6a3 3 0 0 0 2.9-2.3L46 28H22"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="48" r="3.5" fill={fill} />
      <circle cx="41" cy="48" r="3.5" fill={fill} />
    </>
  ),
  about: (fill) => (
    <>
      <circle cx="32" cy="32" r="16" fill="none" stroke={fill} strokeWidth="4" />
      <circle cx="32" cy="22" r="3" fill={fill} />
      <rect x="29" y="28" width="6" height="18" rx="3" fill={fill} />
    </>
  ),
  contacts: (fill) => (
    <>
      <path
        d="M22 18c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v28c0 2.2-1.8 4-4 4H26c-2.2 0-4-1.8-4-4V18z"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="28" y="44" width="8" height="4" rx="2" fill={fill} />
      <circle cx="32" cy="24" r="2.5" fill={fill} />
    </>
  ),
  account: (fill) => (
    <>
      <circle cx="32" cy="24" r="8" fill="none" stroke={fill} strokeWidth="4" />
      <path
        d="M16 50c2.8-8 9.2-12 16-12s13.2 4 16 12"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  ),
}

export function NavIcon({ name, className }: NavIconProps) {
  const gradientId = `nav-icon-gradient-${name}`

  return (
    <IconShell gradientId={gradientId} className={className}>
      {icons[name](FOX_ICON_FILL)}
    </IconShell>
  )
}
import type { ReactNode } from 'react'
import { useId } from 'react'
import { FOX_ICON_FILL } from '../constants/brand'
import { IconShell } from './IconShell'

export type AboutOfferingIconName = 'ready-pc' | 'custom-pc' | 'laptops'

const offeringIcons: Record<AboutOfferingIconName, (fill: string) => ReactNode> = {
  'ready-pc': (fill) => (
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
      <path
        d="M44 22h8v10a3 3 0 01-3 3h-5V22z"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M18 24l4 4 8-8"
        fill="none"
        stroke={fill}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  'custom-pc': (fill) => (
    <>
      <line x1="18" y1="24" x2="46" y2="24" stroke={fill} strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="24" r="4" fill={fill} />
      <line x1="18" y1="32" x2="46" y2="32" stroke={fill} strokeWidth="4" strokeLinecap="round" />
      <circle cx="26" cy="32" r="4" fill={fill} />
      <line x1="18" y1="40" x2="46" y2="40" stroke={fill} strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="40" r="4" fill={fill} />
      <path
        d="M22 48h20"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  ),
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
}

interface AboutOfferingIconProps {
  name: AboutOfferingIconName
  className?: string
}

export function AboutOfferingIcon({ name, className }: AboutOfferingIconProps) {
  const gradientId = useId().replace(/:/g, '')

  return (
    <IconShell gradientId={`about-offering-${name}-${gradientId}`} className={className}>
      {offeringIcons[name](FOX_ICON_FILL)}
    </IconShell>
  )
}

export function AboutAdvantageIcon({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#f8ce46] via-[#e18830] to-[#c83c21] text-[#0c1f33] shadow-[0_4px_14px_rgba(0,0,0,0.5)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
import { FOX_GRADIENT_STOPS } from '../constants/brand'

interface IconShellProps {
  gradientId: string
  className?: string
  children: React.ReactNode
}

export function IconShell({ gradientId, className, children }: IconShellProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="8%" y1="6%" x2="92%" y2="94%">
          {FOX_GRADIENT_STOPS.map(({ offset, color }) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${gradientId})`} />
      {children}
    </svg>
  )
}
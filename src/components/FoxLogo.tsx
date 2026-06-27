interface FoxLogoProps {
  className?: string
  variant?: 'full' | 'head'
}

export function FoxLogo({ className = '', variant = 'full' }: FoxLogoProps) {
  return (
    <img
      src={variant === 'head' ? '/fox-head.png' : '/fox-logo-gradient.png'}
      alt="Lisa Gaming"
      className={className}
      draggable={false}
    />
  )
}
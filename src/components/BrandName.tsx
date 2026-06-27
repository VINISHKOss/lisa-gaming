import { foxBrandOrangeTextClass, foxGradientTextClass } from '../constants/brand'

interface BrandNameProps {
  className?: string
  children?: string
  tone?: 'gradient' | 'orange'
}

export function BrandName({
  className = '',
  children = 'Lisa Gaming',
  tone = 'gradient',
}: BrandNameProps) {
  const toneClass = tone === 'orange' ? foxBrandOrangeTextClass : foxGradientTextClass

  return <span className={`${toneClass} ${className}`.trim()}>{children}</span>
}
import type { ReactNode } from 'react'

interface PageGutterProps {
  children: ReactNode
  className?: string
}

export function PageGutter({ children, className = '' }: PageGutterProps) {
  return (
    <div className={`page-gutter min-w-0 overflow-x-clip ${className}`.trim()}>
      {children}
    </div>
  )
}
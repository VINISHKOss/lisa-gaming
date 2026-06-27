interface HeaderProps {
  onMenuToggle: () => void
  title: string
}

export function Header({ onMenuToggle, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-fox-border bg-fox-black/80 px-4 py-4 backdrop-blur-md">
      <button
        type="button"
        onClick={onMenuToggle}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-fox-border bg-fox-card text-fox-yellow transition-colors hover:border-fox-yellow/50"
        aria-label="Открыть меню"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </header>
  )
}
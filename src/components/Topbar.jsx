import { Menu, Search, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ onOpenMobileMenu }) {
  const { user } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD'

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-canvas/90 px-4 backdrop-blur-md sm:px-6">
      {/* Izquierda: Botón menú móvil + Buscador (text-input spec) */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-[8px] p-2 text-ink-subtle hover:bg-surface-1 hover:text-ink lg:hidden cursor-pointer linear-focus-ring"
          aria-label="Abrir menú"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-tertiary" />
          <input
            type="text"
            placeholder="Filtrar vistas, comandos o endpoints..."
            className="w-full rounded-[8px] border border-hairline bg-surface-1 py-1.5 pl-8 pr-12 text-[14px] text-ink placeholder-ink-tertiary transition-colors hover:border-hairline-strong linear-focus-ring"
          />
          <kbd className="pointer-events-none hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center rounded-[4px] border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-tertiary">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Derecha: status-badge + Notificaciones + Perfil */}
      <div className="flex items-center gap-3">
        {/* Badge de estado (status-badge token from DESIGN.md) */}
        {user?.mode === 'demo' ? (
          <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-surface-2 border border-hairline px-2.5 py-0.5 text-[12px] leading-[1.4] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Modo Demo</span>
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-surface-2 border border-hairline px-2.5 py-0.5 text-[12px] leading-[1.4] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
            <span>Django JWT Activo</span>
          </span>
        )}

        {/* Botón de notificaciones (button-secondary / tertiary hybrid) */}
        <button
          className="relative rounded-[8px] border border-transparent p-2 text-ink-subtle hover:border-hairline hover:bg-surface-1 hover:text-ink transition-colors cursor-pointer linear-focus-ring"
          aria-label="Notificaciones"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        {/* Separador hairline */}
        <div className="hidden sm:block h-4 w-px bg-hairline" />

        {/* Usuario (Avatar circle {rounded.full} per DESIGN.md) */}
        <div className="flex items-center gap-2.5">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-medium text-ink leading-none">
              {user?.name || 'Administrador'}
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink-subtle leading-none">
              @{user?.username || 'admin'}
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline-strong bg-surface-2 font-mono text-[12px] font-medium text-ink">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}

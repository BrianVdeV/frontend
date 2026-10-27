import { Menu, Search, Bell, ShieldCheck, Sparkles } from 'lucide-react'
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
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      {/* Izquierda: Botón menú móvil + Buscador */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en el panel..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/15"
          />
        </div>
      </div>

      {/* Derecha: Estado de conexión + Notificaciones + Perfil */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Badge de estado (Demo vs Conectado a Django) */}
        {user?.mode === 'demo' ? (
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 border border-amber-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Modo Demo
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Django JWT Activo
          </span>
        )}

        {/* Botón de notificaciones */}
        <button
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        {/* Separador */}
        <div className="hidden sm:block h-6 w-px bg-slate-200" />

        {/* Usuario */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {user?.name || 'Administrador'}
            </p>
            <p className="mt-1 text-xs text-slate-500 leading-none">
              @{user?.username || 'admin'}
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-xs">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}

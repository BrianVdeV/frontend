import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Inicio', path: '/', icon: LayoutDashboard },
  { name: 'Proyectos', path: '/proyectos', icon: FolderKanban },
  { name: 'Usuarios', path: '/usuarios', icon: Users },
  { name: 'Reportes', path: '/reportes', icon: FileText },
  { name: 'Configuración', path: '/configuracion', icon: Settings },
]

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const { logout } = useAuth()

  return (
    <>
      {/* Overlay oscuro para móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-20' : 'w-64'}`}
      >
        {/* Cabecera / Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Layers className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold tracking-tight text-white">
                  DjangoPanel
                </span>
                <span className="text-xs text-slate-400">Admin Workspace</span>
              </div>
            )}
          </div>

          {/* Botón cerrar en móvil */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 space-y-1.5 px-3 py-5 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Menú Principal
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Pie del Sidebar (Colapsar + Cerrar Sesión) */}
        <div className="border-t border-slate-800 p-3 space-y-1.5">
          {/* Botón para colapsar en escritorio */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Contraer menú</span>
              </>
            )}
          </button>

          {/* Cerrar sesión */}
          <button
            onClick={logout}
            title={collapsed ? 'Cerrar sesión' : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

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
  { name: 'Inicio', path: '/', icon: LayoutDashboard, shortcut: 'G H' },
  { name: 'Proyectos', path: '/proyectos', icon: FolderKanban, shortcut: 'G P' },
  { name: 'Usuarios', path: '/usuarios', icon: Users, shortcut: 'G U' },
  { name: 'Reportes', path: '/reportes', icon: FileText, shortcut: 'G R' },
  { name: 'Configuración', path: '/configuracion', icon: Settings, shortcut: 'G S' },
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
      {/* Overlay oscuro para móvil ({colors.semantic-overlay}) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-semantic-overlay/80 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-canvas text-ink border-r border-hairline transition-all duration-200 ease-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-16' : 'w-60'}`}
      >
        {/* Cabecera / Brand Mark (56px height matching top-nav) */}
        <div className="flex h-14 items-center justify-between px-3.5 border-b border-hairline">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-primary text-on-primary">
              <Layers className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-[14px] font-medium tracking-[-0.2px] text-ink">
                  DjangoPanel
                </span>
                <span className="rounded-full bg-surface-2 border border-hairline px-2 py-0.5 font-mono text-[11px] text-ink-subtle">
                  v2.4
                </span>
              </div>
            )}
          </div>

          {/* Botón cerrar en móvil */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-[8px] p-1.5 text-ink-subtle hover:bg-surface-1 hover:text-ink lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 space-y-1 px-2.5 py-4 overflow-y-auto">
          {!collapsed && (
            <p className="px-2.5 pb-2 linear-eyebrow text-ink-tertiary uppercase">
              Workspace
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
                  `group flex items-center justify-between rounded-[8px] px-2.5 py-2 text-[14px] font-medium leading-[1.2] transition-colors ${
                    isActive
                      ? 'bg-surface-2 text-ink border border-hairline-strong/80 linear-panel-highlight'
                      : 'border border-transparent text-ink-subtle hover:bg-surface-1 hover:text-ink'
                  } ${collapsed ? 'justify-center px-0' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-primary'
                            : 'text-ink-subtle group-hover:text-ink'
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {!collapsed && (
                      <span className="font-mono text-[11px] text-ink-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.shortcut}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Pie del Sidebar (Colapsar + Cerrar Sesión) */}
        <div className="border-t border-hairline p-2.5 space-y-1">
          {/* Botón para colapsar en escritorio */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-between rounded-[8px] px-2.5 py-2 text-[13px] font-medium text-ink-subtle hover:bg-surface-1 hover:text-ink transition-colors cursor-pointer linear-focus-ring"
            title={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            {collapsed ? (
              <ChevronRight className="mx-auto h-4 w-4" />
            ) : (
              <>
                <span className="flex items-center gap-2.5">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Contraer panel</span>
                </span>
                <span className="font-mono text-[11px] text-ink-tertiary">[</span>
              </>
            )}
          </button>

          {/* Cerrar sesión */}
          <button
            onClick={logout}
            title={collapsed ? 'Cerrar sesión' : undefined}
            className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[14px] font-medium leading-[1.2] text-ink-subtle hover:bg-surface-1 hover:text-ink transition-colors cursor-pointer linear-focus-ring ${
              collapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0 text-ink-tertiary" />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

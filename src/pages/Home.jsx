import {
  Users,
  FolderKanban,
  Activity,
  CheckCircle2,
  Plus,
  Clock,
  Server,
  Terminal,
  ArrowUpRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const stats = [
  {
    id: 'MET-01',
    name: 'Usuarios Registrados',
    value: '1,248',
    change: '+12.5%',
    icon: Users,
    healthy: true,
  },
  {
    id: 'MET-02',
    name: 'Proyectos Activos',
    value: '34',
    change: '+4 este mes',
    icon: FolderKanban,
    healthy: true,
  },
  {
    id: 'MET-03',
    name: 'Peticiones API (Hoy)',
    value: '18.4k',
    change: '99.9% éxito',
    icon: Activity,
    healthy: true,
  },
  {
    id: 'MET-04',
    name: 'Tareas Completadas',
    value: '92%',
    change: '+3.2%',
    icon: CheckCircle2,
    healthy: false,
  },
]

const recentActivity = [
  {
    id: 'DJ-104',
    title: 'Nuevo usuario registrado en el sistema',
    user: 'carlos.mendez',
    time: 'Hace 10m',
    status: 'Completado',
    completed: true,
  },
  {
    id: 'DJ-103',
    title: 'Sincronización de modelos con base de datos PostgreSQL',
    user: 'sistema',
    time: 'Hace 45m',
    status: 'Completado',
    completed: true,
  },
  {
    id: 'DJ-102',
    title: 'Actualización de permisos en el grupo Administradores',
    user: 'admin',
    time: 'Hace 2h',
    status: 'En revisión',
    completed: false,
  },
  {
    id: 'DJ-101',
    title: 'Generación de reporte mensual de métricas REST',
    user: 'laura.gomez',
    time: 'Hace 5h',
    status: 'Completado',
    completed: true,
  },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-hairline pb-6">
        <div>
          <p className="linear-eyebrow text-ink-subtle uppercase mb-1.5">
            Resumen Operativo
          </p>
          <h1 className="linear-headline text-ink">
            Hola, {user?.name || 'Admin'}
          </h1>
          <p className="mt-1 text-[14px] text-ink-subtle">
             Supervisión técnica de servicios, modelos y telemetría de tu backend en Django.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* button-secondary spec */}
          <button className="inline-flex items-center gap-2 rounded-[8px] border border-hairline bg-surface-1 px-[14px] py-[8px] text-[14px] font-medium leading-[1.2] text-ink hover:bg-surface-2 hover:border-hairline-strong transition-colors cursor-pointer linear-focus-ring">
            <Terminal className="h-3.5 w-3.5 text-ink-subtle" />
            <span>Logs API</span>
          </button>

          {/* button-primary spec */}
          <button className="inline-flex items-center gap-1.5 rounded-[8px] bg-primary px-[14px] py-[8px] text-[14px] font-medium leading-[1.2] text-on-primary hover:bg-primary-hover active:bg-primary-focus transition-colors cursor-pointer linear-focus-ring">
            <Plus className="h-4 w-4" />
            <span>Nuevo Registro</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de métricas (feature-card spec: surface-1, rounded.lg 12px, padding 24px, 1px hairline) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className="group rounded-[12px] border border-hairline bg-surface-1 p-6 transition-colors hover:border-hairline-strong hover:bg-surface-2 linear-panel-highlight"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-hairline bg-surface-2 text-ink-muted group-hover:border-hairline-strong group-hover:text-ink transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[12px] text-ink-tertiary">
                    {item.id}
                  </span>
                </div>

                {/* status-badge spec */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 border border-hairline px-2 py-0.5 text-[12px] leading-[1.4] text-ink-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.healthy ? 'bg-semantic-success' : 'bg-primary'
                    }`}
                  />
                  {item.change}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-[28px] font-semibold tracking-[-0.6px] leading-[1.2] text-ink">
                  {item.value}
                </h3>
                <p className="mt-1 text-[14px] text-ink-subtle">
                  {item.name}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sección inferior: Panel de Actividad (product-screenshot-card 16px) + Estado Django */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Actividad Reciente (framed in surface-1 with rounded.xl 16px & 24px padding) */}
        <div className="lg:col-span-2 rounded-[16px] border border-hairline bg-surface-1 p-6 linear-panel-highlight">
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-2">
            <div>
              <h2 className="linear-card-title text-ink">
                Actividad Reciente
              </h2>
              <p className="mt-0.5 text-[14px] text-ink-subtle">
                Flujo de eventos y transacciones registradas en la plataforma
              </p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-[13px] font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer linear-focus-ring">
              <span>Ver historial</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Filas estilo changelog-row */}
          <div className="divide-y divide-hairline">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between py-4 first:pt-2 last:pb-0 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-surface-2 text-ink-subtle">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-ink-tertiary">
                        {item.id}
                      </span>
                      <p className="truncate text-[14px] font-medium text-ink">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-0.5 text-[12px] text-ink-subtle">
                      Ejecutado por{' '}
                      <span className="font-mono text-ink-muted">@{item.user}</span>{' '}
                      · {item.time}
                    </p>
                  </div>
                </div>

                {/* status-badge spec */}
                <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-[12px] leading-[1.4] text-ink-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.completed ? 'bg-semantic-success' : 'bg-primary'
                    }`}
                  />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del Backend Django (feature-card spec) */}
        <div className="rounded-[16px] border border-hairline bg-surface-1 p-6 flex flex-col justify-between linear-panel-highlight">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-hairline-strong bg-surface-2 text-ink">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-medium tracking-[-0.2px] text-ink">
                    Conexión con Django
                  </h2>
                  <p className="text-[12px] text-ink-subtle">
                    Configuración de API REST
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-surface-2 border border-hairline px-2 py-0.5 font-mono text-[11px] text-brand-secure">
                SimpleJWT
              </span>
            </div>

            <p className="text-[14px] text-ink-subtle leading-[1.5] mb-4">
              El proxy de Vite redirige las llamadas{' '}
              <code className="rounded-[4px] border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-ink">
                /api/*
              </code>{' '}
              hacia el servidor local en{' '}
              <code className="rounded-[4px] border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-ink-muted">
                127.0.0.1:8000
              </code>
              .
            </p>

            {/* Superficie nivel 2 (surface-2) para telemetría técnica */}
            <div className="space-y-2.5 rounded-[12px] border border-hairline bg-surface-2 p-4 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-ink-subtle">Endpoint Login</span>
                <span className="font-mono text-[12px] text-ink">
                  POST /api/token/
                </span>
              </div>
              <div className="h-px bg-hairline" />
              <div className="flex items-center justify-between">
                <span className="text-ink-subtle">Endpoint Refresh</span>
                <span className="font-mono text-[12px] text-ink">
                  /api/token/refresh/
                </span>
              </div>
              <div className="h-px bg-hairline" />
              <div className="flex items-center justify-between">
                <span className="text-ink-subtle">Estado de sesión</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      user?.mode === 'demo' ? 'bg-primary' : 'bg-semantic-success'
                    }`}
                  />
                  {user?.mode === 'demo' ? 'Simulada (Demo)' : 'JWT Activo'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-hairline text-[12px] text-ink-tertiary leading-[1.4]">
            Invoca{' '}
            <code className="font-mono text-ink-muted">apiFetch()</code> desde{' '}
            <code className="font-mono text-ink-muted">src/services/api.js</code>{' '}
            para consultar tus endpoints autenticados.
          </div>
        </div>
      </div>
    </div>
  )
}

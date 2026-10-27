import {
  Users,
  FolderKanban,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Server,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const stats = [
  {
    name: 'Usuarios Registrados',
    value: '1,248',
    change: '+12.5%',
    icon: Users,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    name: 'Proyectos Activos',
    value: '34',
    change: '+4 este mes',
    icon: FolderKanban,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'Peticiones API (Hoy)',
    value: '18.4k',
    change: '99.9% éxito',
    icon: Activity,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    name: 'Tareas Completadas',
    value: '92%',
    change: '+3.2%',
    icon: CheckCircle2,
    color: 'bg-amber-50 text-amber-600',
  },
]

const recentActivity = [
  {
    id: 1,
    title: 'Nuevo usuario registrado en el sistema',
    user: 'carlos.mendez',
    time: 'Hace 10 minutos',
    status: 'Completado',
  },
  {
    id: 2,
    title: 'Sincronización de modelos con base de datos PostgreSQL',
    user: 'sistema',
    time: 'Hace 45 minutos',
    status: 'Completado',
  },
  {
    id: 3,
    title: 'Actualización de permisos en el grupo Administradores',
    user: 'admin',
    time: 'Hace 2 horas',
    status: 'Revision',
  },
  {
    id: 4,
    title: 'Generación de reporte mensual de ventas',
    user: 'laura.gomez',
    time: 'Hace 5 horas',
    status: 'Completado',
  },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Hola, {user?.name || 'Admin'} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Aquí tienes un resumen general del estado de tu aplicación en Django.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-500 transition cursor-pointer">
            <span>Nuevo Registro</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {item.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-slate-900">{item.value}</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {item.name}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sección inferior: Actividad reciente + Guía rápida de conexión Django */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Actividad Reciente
              </h2>
              <p className="text-xs text-slate-500">
                Últimos eventos registrados en la plataforma
              </p>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Ver todo
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      Por <span className="font-medium text-slate-600">@{item.user}</span> • {item.time}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del Backend Django */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="rounded-xl bg-slate-900 p-2 text-white">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Conexión con Django
                </h2>
                <p className="text-xs text-slate-500">Configuración de API REST</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              El proxy de Vite está configurado para redirigir peticiones{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-indigo-600">
                /api/*
              </code>{' '}
              hacia{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-800">
                http://127.0.0.1:8000
              </code>
              .
            </p>

            <div className="space-y-2 rounded-xl bg-slate-50 p-3.5 text-xs border border-slate-200/70">
              <div className="flex justify-between">
                <span className="text-slate-500">Endpoint Login:</span>
                <span className="font-mono font-medium text-slate-800">
                  /api/token/
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Endpoint Refresh:</span>
                <span className="font-mono font-medium text-slate-800">
                  /api/token/refresh/
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sesión actual:</span>
                <span className="font-semibold text-indigo-600">
                  {user?.mode === 'demo' ? 'Simulada (Demo)' : 'JWT Real'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Usa <code className="text-slate-600 font-mono">apiFetch()</code> de{' '}
            <code className="text-slate-600 font-mono">src/services/api.js</code>{' '}
            para consultar tus vistas de Django.
          </div>
        </div>
      </div>
    </div>
  )
}

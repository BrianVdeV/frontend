import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Por favor ingresa tu nombre de usuario y contraseña.')
      return
    }

    setSubmitting(true)
    const result = await login(username.trim(), password)
    setSubmitting(false)

    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setError(result.error || 'Error al iniciar sesión.')
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Columna izquierda: Branding / Presentación (oculta en móvil) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-12 border-r border-slate-800/80">
        {/* Círculos decorativos de fondo */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 right-12 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

        {/* Logo superior */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Layers className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            DjangoPanel
          </span>
        </div>

        {/* Texto central */}
        <div className="relative z-10 max-w-lg space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300">
            Django REST Framework + React & Tailwind
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Gestiona tu plataforma de forma rápida y segura.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Interfaz moderna conectada mediante autenticación JWT con tu backend
            en Django. Administra usuarios, métricas y módulos desde un único panel.
          </p>
        </div>

        {/* Pie izquierdo */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Proyecto Django + React</span>
          <span>Autenticación SimpleJWT lista</span>
        </div>
      </div>

      {/* Columna derecha: Formulario de Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-slate-50 text-slate-900">
        <div className="w-full max-w-md space-y-8">
          {/* Logo visible solo en móvil */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">DjangoPanel</span>
          </div>

          {/* Encabezado del formulario */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Ingresa tus credenciales para acceder al panel de administración.
            </p>
          </div>

          {/* Alerta de error */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Usuario
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej. admin"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition focus:border-indigo-600 focus:outline-none focus:ring-3 focus:ring-indigo-600/15"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition focus:border-indigo-600 focus:outline-none focus:ring-3 focus:ring-indigo-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-3 focus:ring-indigo-600/30 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Iniciar sesión</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Nota informativa para desarrollo */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-2xs">
            <p className="font-semibold text-slate-800 mb-1">
              💡 Listo para pruebas y conexión con Django:
            </p>
            <p className="leading-relaxed">
              Al enviar el formulario se intentará autenticar en{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-indigo-700">
                POST /api/token/
              </code>
              . Si tu servidor de Django aún no está encendido, ingresarás
              automáticamente en <strong>Modo Demo</strong> para explorar el inicio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

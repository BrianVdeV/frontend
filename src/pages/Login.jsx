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
  Terminal,
  Check,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const previewRows = [
  {
    id: 'AUTH-01',
    label: 'Verificación de credenciales JWT (`/api/token/`)',
    latency: '14ms',
    active: true,
  },
  {
    id: 'SYNC-02',
    label: 'Sincronización de esquemas y permisos de usuario',
    latency: '28ms',
    active: true,
  },
  {
    id: 'GATE-03',
    label: 'Rotación automática de Refresh Token activa',
    latency: '8ms',
    active: true,
  },
]

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
    <div className="flex min-h-screen w-full bg-canvas text-ink">
      {/* Columna izquierda: Presentación estilo Linear (Sin gradientes atmosféricos, con panel UI en surface-1) */}
      <div className="relative hidden lg:flex lg:w-[54%] flex-col justify-between bg-canvas p-12 xl:p-16 border-r border-hairline">
        {/* Logo superior */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-on-primary">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-[16px] font-medium tracking-[-0.3px] text-ink">
              DjangoPanel
            </span>
          </div>
          <span className="rounded-full border border-hairline bg-surface-1 px-2.5 py-0.5 font-mono text-[12px] text-ink-subtle">
            REST + SimpleJWT
          </span>
        </div>

        {/* Bloque central: Tipografía Display + Product UI Screenshot Frame */}
        <div className="my-auto max-w-xl space-y-8 py-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2 px-3 py-1 text-[12px] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Arquitectura Django REST Framework + React</span>
            </div>

            {/* display-md / display-lg spec: weight 600, aggressive negative tracking */}
            <h1 className="text-[40px] xl:text-[48px] font-semibold tracking-[-1.6px] text-ink leading-[1.10]">
              Diseñado para administrar tu infraestructura sin fricción.
            </h1>

            {/* body-lg spec: 18px, weight 400, line-height 1.5, tracking -0.1px */}
            <p className="text-[18px] font-normal tracking-[-0.1px] text-ink-subtle leading-[1.5]">
              Controla usuarios, permisos y telemetría de tu backend desde una
              interfaz técnica de alta densidad conectada por tokens JWT.
            </p>
          </div>

          {/* Product UI Screenshot Card ({colors.surface-1}, rounded.xl 16px, padding 24px, 1px hairline) */}
          <div className="rounded-[16px] border border-hairline bg-surface-1 p-6 linear-panel-highlight">
            <div className="flex items-center justify-between border-b border-hairline pb-3.5 mb-3.5">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-ink-subtle" />
                <span className="font-mono text-[12px] text-ink-muted">
                  django-auth-pipeline.service
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 border border-hairline px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
                ONLINE
              </span>
            </div>

            <div className="space-y-2">
              {previewRows.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between rounded-[8px] border border-hairline bg-surface-2 px-3 py-2.5 text-[13px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-semantic-success/15 text-semantic-success">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="font-mono text-[12px] text-ink-tertiary">
                      {row.id}
                    </span>
                    <span className="truncate text-ink-muted">{row.label}</span>
                  </div>
                  <span className="ml-3 shrink-0 font-mono text-[11px] text-ink-tertiary">
                    {row.latency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie izquierdo */}
        <div className="flex items-center justify-between text-[12px] text-ink-tertiary">
          <span>© {new Date().getFullYear()} DjangoPanel System</span>
          <span className="font-mono">v2.4.0 · Linear Dark Spec</span>
        </div>
      </div>

      {/* Columna derecha: Formulario de Login sobre {colors.canvas} */}
      <div className="flex w-full lg:w-[46%] items-center justify-center p-6 sm:p-12 bg-canvas text-ink">
        <div className="w-full max-w-[400px] space-y-7">
          {/* Logo visible solo en móvil */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-on-primary">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-[16px] font-medium tracking-[-0.2px] text-ink">
              DjangoPanel
            </span>
          </div>

          {/* Encabezado del formulario (headline spec: 28px, weight 600, -0.6px) */}
          <div>
            <p className="linear-eyebrow text-ink-subtle uppercase mb-2">
              Autenticación
            </p>
            <h2 className="linear-headline text-ink">
              Iniciar sesión en tu cuenta
            </h2>
            <p className="mt-2 text-[14px] text-ink-subtle">
              Ingresa tus credenciales de Django para acceder al espacio de trabajo.
            </p>
          </div>

          {/* Alerta de error */}
          {error && (
            <div className="flex items-start gap-2.5 rounded-[8px] border border-hairline-strong bg-surface-2 p-3.5 text-[13px] text-ink">
              <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-[13px] font-medium text-ink-muted mb-1.5"
              >
                Usuario
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
                {/* text-input spec: surface-1, rounded.md 8px, padding 8px 12px */}
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-[8px] border border-hairline bg-surface-1 py-2 pl-9 pr-3 text-[16px] text-ink placeholder-ink-tertiary transition-colors hover:border-hairline-strong linear-focus-ring"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[13px] font-medium text-ink-muted"
                >
                  Contraseña
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => e.preventDefault()}
                  className="text-[12px] font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[8px] border border-hairline bg-surface-1 py-2 pl-9 pr-9 text-[16px] text-ink placeholder-ink-tertiary transition-colors hover:border-hairline-strong linear-focus-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-[4px] p-1 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
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

            {/* button-primary spec: primary (#5e6ad2), hover (#828fff), focus (#5e69d1), rounded.md 8px */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-[14px] py-2.5 text-[14px] font-medium leading-[1.2] text-on-primary transition-colors hover:bg-primary-hover active:bg-primary-focus disabled:opacity-50 cursor-pointer linear-focus-ring"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Continuar al panel</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Tarjeta informativa para desarrollo (feature-card spec: surface-1, rounded.lg 12px, hairline border) */}
          <div className="rounded-[12px] border border-hairline bg-surface-1 p-5 text-[13px] text-ink-subtle linear-panel-highlight">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-ink">
                Entorno de desarrollo híbrido
              </span>
              <span className="rounded-full bg-surface-2 border border-hairline px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                Auto-Fallback
              </span>
            </div>
            <p className="leading-[1.5]">
              Se enviará una petición a{' '}
              <code className="rounded-[4px] border border-hairline bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-ink">
                POST /api/token/
              </code>
              . Si el servidor de Django no está en ejecución, ingresarás
              automáticamente en <span className="text-ink font-medium">Modo Demo</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

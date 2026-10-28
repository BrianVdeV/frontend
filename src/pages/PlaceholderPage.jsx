import { Construction, Terminal } from 'lucide-react'

export default function PlaceholderPage({ title, code = 'MOD-00' }) {
  return (
    <div className="rounded-[16px] border border-hairline bg-surface-1 p-12 sm:p-16 text-center linear-panel-highlight">
      <div className="mx-auto max-w-md flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-[12px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{code} · Pendiente de endpoint</span>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-hairline-strong bg-surface-2 text-ink mb-5">
          <Construction className="h-5 w-5 text-primary" />
        </div>

        <h2 className="linear-card-title text-ink">{title}</h2>

        <p className="mt-2 text-[14px] text-ink-subtle leading-[1.5]">
          Esta vista está preparada dentro de la jerarquía de superficies para
          conectar tus serializadores y vistas de Django REST Framework.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-[8px] border border-hairline bg-surface-2 px-3.5 py-2 font-mono text-[12px] text-ink-muted">
          <Terminal className="h-3.5 w-3.5 text-ink-tertiary" />
          <span>GET /api/{title.toLowerCase().split(' ')[0]}/</span>
        </div>
      </div>
    </div>
  )
}

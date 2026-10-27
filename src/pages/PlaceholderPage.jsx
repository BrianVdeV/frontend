import { Construction } from 'lucide-react'

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
        <Construction className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Esta sección está lista para que conectes tus endpoints de Django REST
        Framework cuando los tengas disponibles.
      </p>
    </div>
  )
}

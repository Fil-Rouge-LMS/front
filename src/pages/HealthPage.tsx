import { useHealth, type HealthStatus } from '../hooks/useHealth'

const STATUS_LABELS: Record<HealthStatus, string> = {
  checking: 'Vérification en cours…',
  ok: 'Opérationnelle',
  error: 'Indisponible',
}

const STATUS_COLORS: Record<HealthStatus, string> = {
  checking: 'text-gray-700',
  ok: 'text-green-800',
  error: 'text-red-800',
}

export function HealthPage() {
  const { api, database } = useHealth()
  const isChecking = api === 'checking' || database === 'checking'

  const checks = [
    { label: 'API', status: api },
    { label: 'Base de données', status: database },
  ]

  return (
    <main className="mx-auto max-w-xl p-6 text-left">
      <h1 className="mb-4 text-2xl font-bold">État du service</h1>

      <dl role="status" className="space-y-2 text-lg">
        {checks.map(({ label, status }) => (
          <div key={label} className="flex justify-between gap-4">
            <dt>{label}</dt>
            <dd className={`font-semibold ${STATUS_COLORS[status]}`}>
              {STATUS_LABELS[status]}
            </dd>
          </div>
        ))}
      </dl>

      {isChecking && (
        <p className="mt-4 text-gray-700">
          Le serveur peut mettre environ une minute à répondre s'il était en
          veille.
        </p>
      )}
    </main>
  )
}

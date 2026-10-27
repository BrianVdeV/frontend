// URL base de tu API en Django (usa el proxy de Vite por defecto o VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Realiza una petición autenticada con JWT hacia Django REST Framework.
 * Incluye refresco automático de token si expira (401).
 */
export async function apiFetch(endpoint, options = {}) {
  const accessToken = localStorage.getItem('access_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Si el access_token expiró (401), intentamos refrescar con refresh_token
  if (response.status === 401 && localStorage.getItem('refresh_token')) {
    const refreshed = await refreshToken()
    if (refreshed) {
      const newAccessToken = localStorage.getItem('access_token')
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
    }
  }

  return response
}

/**
 * Solicita un nuevo access_token al endpoint de SimpleJWT (/api/token/refresh/)
 */
export async function refreshToken() {
  const refresh = localStorage.getItem('refresh_token')
  if (!refresh) return false

  try {
    const res = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })

    if (!res.ok) throw new Error('No se pudo refrescar el token')

    const data = await res.json()
    localStorage.setItem('access_token', data.access)
    return true
  } catch {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    return false
  }
}

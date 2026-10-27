import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user_data')
    const token = localStorage.getItem('access_token')

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.clear()
      }
    }
    setLoading(false)
  }, [])

  /**
   * Inicia sesión contra Django SimpleJWT (/api/token/).
   * Si el backend de Django aún no está encendido y useDemoFallback = true,
   * permite entrar en modo demostración para probar la interfaz.
   */
  const login = async (username, password, { useDemoFallback = true } = {}) => {
    try {
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)

        const userData = {
          username,
          name: username.charAt(0).toUpperCase() + username.slice(1),
          role: 'Administrador',
          mode: 'django-jwt',
        }
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }

      if (response.status === 401 || response.status === 400) {
        return {
          success: false,
          error: 'Credenciales inválidas. Verifica tu usuario y contraseña.',
        }
      }

      throw new Error('Backend no disponible')
    } catch {
      // Si el servidor de Django no está levantado aún, permitimos probar la UI en modo Demo
      if (useDemoFallback) {
        const demoUser = {
          username: username || 'admin',
          name: (username || 'Admin').charAt(0).toUpperCase() + (username || 'admin').slice(1),
          role: 'Modo Demo (Sin conexión a Django)',
          mode: 'demo',
        }
        localStorage.setItem('access_token', 'demo-jwt-access-token')
        localStorage.setItem('refresh_token', 'demo-jwt-refresh-token')
        localStorage.setItem('user_data', JSON.stringify(demoUser))
        setUser(demoUser)
        return { success: true, isDemo: true }
      }

      return {
        success: false,
        error: 'No se pudo conectar con el servidor de Django en http://127.0.0.1:8000',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

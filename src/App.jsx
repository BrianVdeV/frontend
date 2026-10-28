import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import DashboardLayout from './components/DashboardLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: Login */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          {/* Rutas privadas con Sidebar y Topbar */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route
              path="proyectos"
              element={<PlaceholderPage title="Módulo de Proyectos" code="PRJ-01" />}
            />
            <Route
              path="usuarios"
              element={<PlaceholderPage title="Gestión de Usuarios" code="USR-02" />}
            />
            <Route
              path="reportes"
              element={<PlaceholderPage title="Reportes y Estadísticas" code="REP-03" />}
            />
            <Route
              path="configuracion"
              element={<PlaceholderPage title="Configuración del Sistema" code="CFG-04" />}
            />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

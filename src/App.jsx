import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

import MainLayout from './layouts/MainLayout';

// Páginas públicas
import Login from './pages/Login';
import Register from './pages/Register';
import RecuperarPassword from './pages/RecuperarPassword';
import AjustesDummy from './pages/AjustesDummy.jsx';

// Páginas internas usuario
import Home from './pages/Home';
import Adoptar from './pages/Adopt';
import Ofrecer from './pages/Offer';
import Solicitudes from './pages/requests';
import Tienda from './pages/Store';
import SobreNosotros from './pages/About';
import Donar from './pages/Donate';

// Páginas admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAnimalesPage from './pages/admin/AdminAnimalesPage';
import AdminTiendaPage from './pages/admin/AdminTiendaPage.jsx';

// Wrapper para rutas admin
function AdminRoute({ element }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-gray-600">
        No tienes permisos de administrador.
      </div>
    );
  }
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas sin sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />

          {/* Rutas con layout + sidebar */}
          <Route element={<MainLayout />}>
            {/* redirección base admin */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Usuario */}
            <Route path="/" element={<Home />} />
            <Route path="/adoptar" element={<Adoptar />} />
            <Route path="/ofrecer" element={<Ofrecer />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/donar" element={<Donar />} />
            <Route path="/ajustes" element={<AjustesDummy />} />

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={<AdminRoute element={<AdminDashboardPage />} />}
            />
            <Route
              path="/admin/solicitudes"
              element={<AdminRoute element={<Solicitudes />} />}
            />
            <Route
              path="/admin/animales"
              element={<AdminRoute element={<AdminAnimalesPage />} />}
            />
            <Route
              path="/admin/tienda"
              element={<AdminRoute element={<AdminTiendaPage />} />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

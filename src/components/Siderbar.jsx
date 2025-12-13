import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';

const navLinkBase =
  'flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium transition-colors';
const navLinkInactive = 'text-gray-600 hover:bg-orange-50 hover:text-orange-600';
const navLinkActive = 'bg-orange-50 text-orange-600';

const Sidebar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const handleGoToProfile = () => {
    setUserMenuOpen(false);
    setProfileOpen(true);
  };

  return (
    <aside className="hidden md:flex md:flex-col w-72 bg-white border-r border-gray-200 h-screen overflow-hidden"> {/* <--- h-screen y overflow-hidden */}
      
      {/* Cabecera usuario / login - FIJA */}
      <div className="shrink-0 p-4 border-b border-gray-200"> {/* <--- flex-shrink-0 para que sea fijo */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(v => !v)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              {/* Avatar: imagen si hay, si no iniciales */}
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-semibold text-lg">
                  {(user?.nombre?.[0] || 'U').toUpperCase()}
                </div>
              )}

              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.nombre} {user?.apellido}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
              <span className="text-gray-400 text-xs">▼</span>
            </button>


            {/* Menú contextual usuario */}
            {userMenuOpen && (
              <div className="fixed top-2 left-65 ml-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                <button
                  onClick={handleGoToProfile}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl"
                >
                  <span><i className="fi fi-sr-user"></i> Perfil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                >
                  <span><i className="fi fi-sr-exit"></i> Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:text-orange-400 transition"
          >
            <span><i className="fi fi-sr-entrance"></i> Iniciar sesión</span>
          </button>
        )}
      </div>

      {/* Navegación - SCROLLEABLE */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {!isAdmin && (
          <>
            {/* Opciones de usuario normal */}
            <SidebarLink to="/adoptar" icon="fi fi-sr-paw" label="Adoptar" />
            <SidebarLink to="/ofrecer" icon="fi fi-sr-bone" label="Ofrecer" />
            <SidebarLink to="/solicitudes" icon="fi fi-sr-bell-notification-social-media" label="Solicitudes" />
            <SidebarLink to="/tienda" icon="fi fi-sr-basket-shopping-simple" label="Tienda" />
            
            <div className="border-b border-gray-200 my-2"></div>
            
            <SidebarLink to="/sobre-nosotros" icon="fi fi-sr-users" label="Sobre nosotros" />
            <SidebarLink to="/donar" icon="fi fi-ss-heart" label="Donar"/>
          </>
        )}

        {isAdmin && (
          <>
            {/* Opciones de admin */}
            <p className="px-4 mt-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Admin
            </p>
            <SidebarLink to="/admin/dashboard" icon="fi fi-sr-dashboard" label="Dashboard" />
            <SidebarLink to="/admin/solicitudes" icon="fi fi-sr-clipboard-list-check" label="Solicitudes" />
            <SidebarLink to="/admin/animales" icon="fi fi-sr-dog" label="Animales" />
            <SidebarLink to="/admin/tienda" icon="fi fi-sr-shop" label="Tienda" />
          </>
        )}

        <div className="border-t border-gray-200 my-2 t pb-35"></div>

        {/* Ajustes siempre visibles */}
        <SidebarLink to="/ajustes" icon="fi fi-sr-settings" label="Configuración"/>
      </nav>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)}/>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
    }
  >
    <span className={`text-lg ${icon}`} />
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;

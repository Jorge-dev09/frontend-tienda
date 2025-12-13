// src/layouts/MainLayout.jsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Siderbar';
import SettingsModal from '../components/SettingsModal';
import { Navigate } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSettingsOpen = location.pathname === '/ajustes';

  const handleCloseSettings = () => {
    // vuelve a la ruta anterior o a inicio
    navigate(-1);
  };


  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden"> {/* <--- h-screen y overflow-hidden */}
      
      {/* Sidebar fijo */}
      <Sidebar />
      
      {/* Contenedor del contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden"> {/* <--- overflow-hidden aquí también */}
        
        {/* Main scrolleable */}
        <main className="flex-1 overflow-y-auto"> {/* <--- overflow-y-auto solo aquí */}
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>

        {/* Modal de configuración controlado por la ruta */}
        <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
      </div>
    </div>
  );

  
};

export default MainLayout;

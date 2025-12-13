// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import userAPI from '../services/userAPI';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión al cargar la app
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Siempre pedimos el perfil más reciente al backend
        const res = await userAPI.getProfile();
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));

        // Opcional: cargar ajustes si tienes endpoint
        try {
          const settingsRes = await userAPI.getSettings?.();
          if (settingsRes) setSettings(settingsRes.data);
        } catch (err) {
          console.error('Error cargando ajustes al iniciar', err);
        }
      } catch (err) {
        console.error('Error reconstruyendo sesión', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    const { token } = response.data; // ignoramos 'usuario' si lo manda el login

    localStorage.setItem('token', token);

    // Pedir SIEMPRE el perfil completo actual al backend
    const meRes = await userAPI.getProfile();
    const perfil = meRes.data;

    localStorage.setItem('user', JSON.stringify(perfil));
    setUser(perfil);

    // opcional: cargar ajustes
    try {
      const settingsRes = await userAPI.getSettings();
      setSettings(settingsRes.data);
    } catch (err) {
      console.error('Error cargando ajustes tras login', err);
    }

    return { success: true };
  } catch (error) {
    console.error('Error en login', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al iniciar sesión',
    };
  }
};


const loginAdmin = async (credentials) => {
  try {
    const response = await authAPI.loginAdmin(credentials);
    const { token } = response.data;

    localStorage.setItem('token', token);

    const meRes = await userAPI.getProfile();
    const perfil = meRes.data;

    localStorage.setItem('user', JSON.stringify(perfil));
    setUser(perfil);

    return { success: true };
  } catch (error) {
    console.error('Error en login admin', error);
    return {
      success: false,
      error:
        error.response?.data?.error ||
        'Error al iniciar sesión como administrador',
    };
  }
};

const register = async (userData) => {
  try {
    const response = await authAPI.register(userData);
    const { token } = response.data;

    localStorage.setItem('token', token);

    const meRes = await userAPI.getProfile();
    const perfil = meRes.data;

    localStorage.setItem('user', JSON.stringify(perfil));
    setUser(perfil);

    return { success: true };
  } catch (error) {
    console.error('Error en registro', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al registrarse',
    };
  }
};


  const logout = () => {
    const keepSignedIn =
      localStorage.getItem('newlife_keep_signed_in') === 'true';

    // Siempre limpiamos el user del contexto y en local
    setUser(null);
    localStorage.removeItem('user');

    // Solo eliminamos el token si NO quiere mantener sesión
    if (!keepSignedIn) {
      localStorage.removeItem('token');
    }

    setSettings(null);
  };

  const value = {
    user,
    setUser,
    settings,
    setSettings,
    loading,
    login,
    loginAdmin,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.es_admin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

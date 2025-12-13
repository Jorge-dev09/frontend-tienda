import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginAdmin } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [tipoLogin, setTipoLogin] = useState('usuario');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 nuevo estado

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result =
        tipoLogin === 'admin'
          ? await loginAdmin(formData)
          : await login(formData);

          console.log('Resultado login:', result);

      if (result.success) {
        navigate(tipoLogin === 'admin' ? '/admin' : '/');
      } else {
        setError(result.error);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[650px]">
          {/* Formulario - Lado Izquierdo */}
          <motion.div
            className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo y Título */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                NewLife
              </h1>
              <p className="text-sm text-gray-500">
                {tipoLogin === 'admin'
                  ? 'Panel Administrativo'
                  : 'Bienvenido de nuevo'}
              </p>
            </div>

            {/* Pestañas de tipo de login */}
            <div className="flex gap-2 mb-5 bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => {
                  setTipoLogin('usuario');
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
                  tipoLogin === 'usuario'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Usuario
              </button>
              <button
                type="button"
                onClick={() => {
                  setTipoLogin('admin');
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm ${
                  tipoLogin === 'admin'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Administrador
              </button>
            </div>

            {/* Mensaje de error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2"
              >
                <span className="text-lg">⚠️</span>
                <span className="text-xs">{error}</span>
              </motion.div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none peer
                    border-slate-300 focus:border-orange-500
                    "
                />
                <label
                    className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                    "
                >
                    Email
                </label>
                </div>

              {/* Password con ojo pero sin icono a la izquierda */}
            <div>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    className="
                    w-full px-4 py-3 rounded-lg border-2
                    transition-all duration-200 text-sm bg-white
                    focus:outline-none pr-10 peer
                    border-slate-300 focus:border-orange-500
                    "
                />
                <label
                    className="
                    absolute left-4 -top-2 bg-white px-2 text-slate-500 font-medium text-xs
                    transition-all duration-200
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-placeholder-shown:bg-transparent
                    peer-focus:-top-2
                    peer-focus:bg-white
                    peer-focus:text-orange-600
                    peer-focus:font-semibold
                    peer-focus:text-xs
                    cursor-text
                    "
                >
                    Password
                </label>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4  text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-xl"
                >
                    <i
                    className={`fi ${
                        showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'
                    }`}
                    ></i>
                </button>
                </div>
            </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition">
                    Recordarme
                  </span>
                </label>
                <Link
                  to="/recuperar-password"
                  className="text-orange-600 hover:text-orange-700 font-medium transition"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  `Ingresar${tipoLogin === 'admin' ? ' como Admin' : ''}`
                )}
              </button>
            </form>

            {/* Link de registro */}
            {tipoLogin === 'usuario' && (
              <div className="mt-5 text-center">
                <p className="text-xs text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <Link
                    to="/register"
                    className="text-orange-500 hover:text-orange-600 font-semibold transition"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            )}

            {/* Volver al inicio */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-xs text-gray-500 hover:text-orange-600 transition inline-flex items-center gap-1"
              >
                ← Volver al inicio
              </Link>
            </div>
          </motion.div>

          {/* Imagen - Lado Derecho */}
          <motion.div
            className="hidden lg:flex lg:w-1/2 image-login items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/login.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center text-white z-10">
              <motion.div
                className="mb-4 text-7xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              ></motion.div>
              <h2 className="text-3xl font-bold mb-3">
                {tipoLogin === 'admin'
                  ? 'Gestiona NewLife'
                  : 'Dale una Nueva Vida'}
              </h2>
              <p className="text-base text-orange-50 max-w-sm mx-auto">
                {tipoLogin === 'admin'
                  ? 'Panel de administración para gestionar adopciones y productos'
                  : 'Únete a nuestra comunidad y ayuda a cambiar la vida de miles de mascotas'}
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

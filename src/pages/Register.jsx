import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[650px]">
          
          {/* Imagen - Lado Izquierdo */}
          <motion.div 
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/Register.png")',
                backgroundSize: '140%',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center text-white z-10">
              <motion.div 
                className="mb-4 text-7xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <h2 className="text-3xl font-bold mb-3">
                Únete a NewLife
              </h2>
              <p className="text-base text-orange-50 max-w-sm mx-auto">
                Crea tu cuenta y comienza a ayudar a mascotas a encontrar un hogar
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Formulario - Lado Derecho */}
          <motion.div 
            className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                NewLife
              </h1>
              <p className="text-sm text-gray-500">Crear cuenta nueva</p>
            </div>

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

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder=" "
                    required
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
                    Nombre
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder=" "
                    required
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
                    Apellido
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
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

              {/* Teléfono (opcional) */}
              <div className="relative">
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
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
                  Teléfono (opcional)
                </label>
              </div>

              {/* Contraseña */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
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
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-lg"
                >
                  <i
                    className={`fi ${
                      showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'
                    }`}
                  ></i>
                </button>
              </div>

              {/* Confirmar contraseña */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  required
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
                  Confirmar password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-lg"
                >
                  <i
                    className={`fi ${
                      showConfirmPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'
                    }`}
                  ></i>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-600 font-semibold transition"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>

            <div className="mt-3 text-center">
              <Link 
                to="/" 
                className="text-xs text-gray-500 hover:text-orange-600 transition inline-flex items-center gap-1"
              >
                ← Volver al inicio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

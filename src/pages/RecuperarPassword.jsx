import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';

export default function RecuperarPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: código, 3: nueva contraseña
  const [formData, setFormData] = useState({
    email: '',
    codigo: '',
    nuevaPassword: '',
    confirmarPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  // Paso 1: enviar email para generar y enviar código
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authAPI.recuperarPassword(formData.email);
      setSuccess('Se ha enviado un código a tu correo');
      setTimeout(() => {
        setStep(2);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Error al enviar el código. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Paso 2: verificar código en el backend
  const handleCodigoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.codigo.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);

    try {
      await authAPI.verificarCodigo(formData.email, formData.codigo);
      setSuccess('Código verificado correctamente');
      setTimeout(() => {
        setStep(3);
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Código inválido o expirado. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Paso 3: cambiar contraseña en el backend
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.nuevaPassword !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.nuevaPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await authAPI.cambiarPassword(formData.email, formData.nuevaPassword);
      setSuccess('Contraseña cambiada exitosamente');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Error al cambiar la contraseña. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicators = () => (
    <div className="flex justify-center gap-2 mb-6">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
        }`}
      >
        1
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
        }`}
      >
        2
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
          step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
        }`}
      >
        3
      </div>
    </div>
  );

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
                {step === 1 && 'Ingresa tu correo para recibir un código'}
                {step === 2 && 'Ingresa el código que recibiste'}
                {step === 3 && 'Crea una nueva contraseña'}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Recuperar Contraseña
            </h2>

            {/* Indicadores de paso */}
            {renderStepIndicators()}

            {/* Mensaje de éxito */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2"
              >
                <span className="text-lg">✓</span>
                <span className="text-xs">{success}</span>
              </motion.div>
            )}

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

            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border outline-0 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="tu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Continuar'}
                </button>
              </form>
            )}

            {/* Step 2: Código */}
            {step === 2 && (
              <form onSubmit={handleCodigoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Código (6 dígitos)
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                    maxLength="6"
                    className="w-full px-4 py-2.5 text-sm text-center tracking-widest outline-0 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="000000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verificando...' : 'Continuar'}
                </button>
              </form>
            )}

            {/* Step 3: Nueva Contraseña */}
            {step === 3 && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="nuevaPassword"
                      value={formData.nuevaPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 pr-10 text-sm bg-gray-50 border outline-0 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i
                        className={`fi ${
                          showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmarPassword"
                      value={formData.confirmarPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 pr-10 text-sm bg-gray-50 border outline-0 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i
                        className={`fi ${
                          showConfirmPassword
                            ? 'fi-sr-eye-crossed'
                            : 'fi-sr-eye'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
                </button>
              </form>
            )}

            {/* Link de login */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-600">
                ¿Recordaste tu contraseña?{' '}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-500 font-semibold transition"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>

            {/* Volver al inicio */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-xs text-gray-500 hover:text-orange-500 transition inline-flex items-center gap-1"
              >
                ← Volver al inicio
              </Link>
            </div>
          </motion.div>

          {/* Imagen - Lado Derecho */}
          <motion.div
            className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/recovery.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="relative text-center text-white z-10">
              <motion.div
                className="mb-4 text-7xl"
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
              </motion.div>
              <h2 className="text-3xl font-bold mb-3">Recupera tu Acceso</h2>
              <p className="text-base text-orange-50 max-w-sm mx-auto">
                Sigue los pasos para restablecer tu contraseña de forma segura
              </p>

              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

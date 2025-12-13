// src/pages/Donate.jsx
import { useState } from 'react';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [customMonthly, setCustomMonthly] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [donationType, setDonationType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Estados para Modal y Toast
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState({});

  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: ''
  });

  const impactOptions = [
    { amount: 50, impact: "Alimenta a 3 mascotas por una semana", icon: "fi-sr-bowl-chopsticks" },
    { amount: 100, impact: "Vacunas completas para 2 animales", icon: "fi-sr-syringe" },
    { amount: 200, impact: "Financia una esterilización", icon: "fi-sr-stethoscope" },
    { amount: 500, impact: "Rescate y rehabilitación completa", icon: "fi-sr-heart-pulse" }
  ];

  const handleSingleDonationAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleMonthlyAmount = (amount) => {
    setMonthlyAmount(amount);
    setCustomMonthly(amount.toString());
  };

  const handleContinue = (type) => {
    const amount = type === 'single' ? customAmount : customMonthly;
    if (amount && parseFloat(amount) > 0) {
      setDonationType(type);
      setShowPaymentForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage('Por favor ingresa un monto válido');
      setShowErrorToast(true);
    }
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!paymentData.name || !paymentData.email || !paymentData.cardNumber || 
        !paymentData.expiryDate || !paymentData.cvv) {
      setErrorMessage('Por favor completa todos los campos obligatorios');
      setShowErrorToast(true);
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      const amount = donationType === 'single' ? customAmount : customMonthly;
      const type = donationType === 'single' ? 'única' : 'mensual';
      
      // Guardar datos para el modal
      setSuccessData({
        name: paymentData.name,
        email: paymentData.email,
        amount: amount,
        type: type
      });
      
      // Mostrar modal de éxito
      setShowSuccessModal(true);
      
      // Resetear formulario
      setShowPaymentForm(false);
      setCustomAmount('');
      setCustomMonthly('');
      setSelectedAmount('');
      setMonthlyAmount('');
      setPaymentData({
        name: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        address: ''
      });
    }, 2000);
  };

  const handleBack = () => {
    setShowPaymentForm(false);
    setDonationType('');
  };

  if (showPaymentForm) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <i className="fi fi-sr-arrow-left"></i>
            <span>Volver</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                <i className="fi fi-sr-credit-card text-2xl"></i>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Información de pago
              </h1>
              <p className="text-slate-600">
                Donación {donationType === 'single' ? 'única' : 'mensual'} de{' '}
                <span className="font-bold text-orange-600">
                  ${donationType === 'single' ? customAmount : customMonthly}
                </span>
              </p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={paymentData.name}
                  onChange={handlePaymentDataChange}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={paymentData.email}
                  onChange={handlePaymentDataChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Información de tarjeta</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Número de tarjeta *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentDataChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Fecha de expiración *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentDataChange}
                      placeholder="MM/AA"
                      maxLength="5"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentDataChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Dirección de facturación
                </label>
                <input
                  type="text"
                  name="address"
                  value={paymentData.address}
                  onChange={handlePaymentDataChange}
                  placeholder="Calle, Ciudad, País"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Tipo de donación:</span>
                  <span className="font-semibold text-slate-900">
                    {donationType === 'single' ? 'Única' : 'Mensual'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-slate-900">Total:</span>
                  <span className="font-bold text-orange-600 text-2xl">
                    ${donationType === 'single' ? customAmount : customMonthly}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <i className="fi fi-sr-lock"></i>
                      Pagar ahora
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                <i className="fi fi-sr-shield-check text-emerald-600"></i> Pago 100% seguro y encriptado
              </p>

            </form>
          </div>
        </div>

        {/* Toast de error */}
        <Toast
          message={errorMessage}
          type="error"
          isVisible={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          duration={3000}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-50 to-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500 text-white mb-6">
            <i className="fi fi-sr-hand-holding-heart text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Tu donación salva vidas
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Cada aporte nos ayuda a rescatar, rehabilitar y encontrar hogares 
            amorosos para mascotas abandonadas. Sé parte del cambio.
          </p>
        </div>
      </section>

      {/* Opciones de Donación */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Elige cómo ayudar
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Donación Única */}
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-orange-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <i className="fi fi-sr-donate text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Donación única</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Haz una contribución única y marca la diferencia hoy mismo.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[50, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleSingleDonationAmount(amount)}
                    className={`py-3 px-4 border-2 rounded-xl font-semibold transition-all ${
                      selectedAmount === amount
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <input 
                type="number" 
                placeholder="Otro monto" 
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('');
                }}
                className="w-full py-3 px-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none mb-4 transition-colors"
              />
              
              <button 
                onClick={() => handleContinue('single')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
              >
                Continuar
              </button>
            </div>

            {/* Donación Recurrente */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MÁS IMPACTO
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                  <i className="fi fi-sr-calendar-heart text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Donación mensual</h3>
              </div>
              <p className="text-slate-700 mb-6">
                Conviértete en padrino y ayuda de manera continua. Cancela cuando quieras.
              </p>
              
              <div className="bg-white rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-600 mb-2">Selecciona tu aporte mensual:</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[20, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleMonthlyAmount(amount)}
                      className={`py-2 px-3 border-2 rounded-lg font-semibold transition-all text-sm ${
                        monthlyAmount === amount
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-orange-500 hover:border-orange-500 hover:text-white'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input 
                  type="number" 
                  placeholder="Otro monto mensual"
                  value={customMonthly}
                  onChange={(e) => {
                    setCustomMonthly(e.target.value);
                    setMonthlyAmount('');
                  }}
                  className="w-full py-2 px-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none text-sm transition-colors"
                />
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-2">Beneficios de padrinos:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <i className="fi fi-ss-check-circle text-orange-600 text-xs"></i>
                    Actualizaciones mensuales
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fi fi-ss-check-circle text-orange-600 text-xs"></i>
                    Certificado digital de padrino
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fi fi-ss-check-circle text-orange-600 text-xs"></i>
                    Reconocimiento en nuestra web
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => handleContinue('monthly')}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Ser padrino
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Impacto de cada monto */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Tu impacto en números
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Cada donación tiene un impacto directo y medible en la vida de nuestras mascotas.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactOptions.map((option) => (
              <div key={option.amount} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <i className={`${option.icon} text-emerald-600 text-2xl`}></i>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  ${option.amount}
                </div>
                <p className="text-sm text-slate-600">
                  {option.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo usamos los fondos */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Transparencia total
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Así distribuimos cada peso que donas:
          </p>

          <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-900">Cuidado veterinario</span>
                  <span className="font-bold text-slate-900">70%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{width: '70%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-900">Alimentación y cuidados</span>
                  <span className="font-bold text-slate-900">20%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{width: '20%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-900">Operación de plataforma</span>
                  <span className="font-bold text-slate-900">10%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-slate-500 h-full rounded-full transition-all duration-1000" style={{width: '10%'}}></div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center text-sm text-slate-500">
            <i className="fi fi-sr-shield-check text-emerald-600"></i> Organización registrada y verificada
          </div>
        </div>
      </section>

      {/* Historias de éxito */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Historias que inspiran
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-48 bg-linear-to-br from-orange-300 to-orange-400"></div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">Max</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Rescatado con una pata fracturada. Gracias a las donaciones, recibió cirugía 
                  y ahora corre feliz en su nuevo hogar.
                </p>
                <span className="text-xs font-semibold text-emerald-600">✓ Adoptado</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-48 bg-linear-to-br from-blue-300 to-blue-400"></div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">Luna</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Encontrada desnutrida en la calle. Con cuidados y alimentación adecuada, 
                  recuperó su salud y encontró familia.
                </p>
                <span className="text-xs font-semibold text-emerald-600">✓ Adoptada</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-48 bg-linear-to-br from-purple-300 to-purple-400"></div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">Coco</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Cachorro abandonado que necesitaba vacunas urgentes. Hoy es un perro 
                  sano y juguetón con una familia amorosa.
                </p>
                <span className="text-xs font-semibold text-emerald-600">✓ Adoptado</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Otras formas de ayudar */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Otras formas de ayudar
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <i className="fi fi-sr-users text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Voluntariado</h3>
              <p className="text-sm text-slate-600 mb-4">
                Dona tu tiempo y habilidades para ayudar a nuestras mascotas.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Más información →
              </button>
            </div>

            <div className="text-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <i className="fi fi-sr-box text-emerald-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Donar productos</h3>
              <p className="text-sm text-slate-600 mb-4">
                Comida, mantas, juguetes y más son siempre bienvenidos.
              </p>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
                Ver lista de necesidades →
              </button>
            </div>

            <div className="text-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <i className="fi fi-sr-share text-purple-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Difundir</h3>
              <p className="text-sm text-slate-600 mb-4">
                Comparte nuestras publicaciones y ayuda a más mascotas.
              </p>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                Compartir ahora →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ con animación suave */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Preguntas frecuentes
          </h2>

          <style>{`
            details {
              transition: all 0.3s ease;
            }
            details[open] summary {
              color: #f97316;
            }
            details summary {
              transition: color 0.2s ease;
            }
            details summary::-webkit-details-marker {
              display: none;
            }
            details summary::before {
              content: '+';
              font-size: 1.5rem;
              font-weight: bold;
              margin-right: 0.75rem;
              transition: transform 0.3s ease;
              display: inline-block;
            }
            details[open] summary::before {
              transform: rotate(45deg);
            }
            details > *:not(summary) {
              animation: slideDown 0.3s ease;
            }
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="space-y-4">
            
            <details className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:border-orange-300 transition-all">
              <summary className="font-semibold text-slate-900 cursor-pointer list-none">
                ¿Las donaciones son deducibles de impuestos?
              </summary>
              <p className="text-sm text-slate-600 mt-3 pl-8">
                Sí, NewLife es una organización registrada. Te enviaremos un recibo oficial 
                para que puedas incluir tu donación en tu declaración.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:border-orange-300 transition-all">
              <summary className="font-semibold text-slate-900 cursor-pointer list-none">
                ¿Puedo cancelar mi donación mensual?
              </summary>
              <p className="text-sm text-slate-600 mt-3 pl-8">
                Por supuesto. Puedes cancelar o modificar tu donación mensual en cualquier 
                momento desde tu panel de usuario o contactándonos directamente.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:border-orange-300 transition-all">
              <summary className="font-semibold text-slate-900 cursor-pointer list-none">
                ¿A dónde va exactamente mi dinero?
              </summary>
              <p className="text-sm text-slate-600 mt-3 pl-8">
                El 70% va a cuidado veterinario (cirugías, vacunas, tratamientos), 20% a 
                alimentación y cuidados diarios, y 10% a mantener la plataforma funcionando.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:border-orange-300 transition-all">
              <summary className="font-semibold text-slate-900 cursor-pointer list-none">
                ¿Qué métodos de pago aceptan?
              </summary>
              <p className="text-sm text-slate-600 mt-3 pl-8">
                Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias y 
                otros métodos locales. Todos los pagos son 100% seguros.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Cada donación cuenta
          </h2>
          <p className="text-slate-600 mb-8">
            No importa el monto, tu apoyo cambia vidas. Juntos podemos darle 
            una segunda oportunidad a cada mascota.
          </p>
        </div>
      </section>

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Pago exitoso!"
        type="success"
      >
        <div className="text-center py-4">
          <p className="text-slate-700 mb-4">
            Gracias <span className="font-bold">{successData.name}</span> por tu donación {successData.type} de{' '}
            <span className="font-bold text-orange-600 text-xl">${successData.amount}</span>
          </p>
          <p className="text-sm text-slate-600 mb-6">
            Recibirás un correo de confirmación en{' '}
            <span className="font-semibold">{successData.email}</span>
          </p>
          <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
            <p className="text-sm text-emerald-700 font-medium">
              🐾 Tu apoyo ayudará a cambiar la vida de muchas mascotas
            </p>
          </div>
        </div>
      </Modal>

      {/* Toast de error */}
      <Toast
        message={errorMessage}
        type="error"
        isVisible={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        duration={3000}
      />
    </div>
  );
}

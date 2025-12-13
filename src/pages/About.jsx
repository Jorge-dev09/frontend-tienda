// src/pages/About.jsx
export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-50 to-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500 text-white mb-6">
            <i className="fi fi-sr-heart text-3xl"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sobre NewLife
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Conectamos corazones con patitas. Nuestra misión es darle una segunda 
            oportunidad a cada mascota que busca un hogar lleno de amor.
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <i className="fi fi-sr-book-alt text-slate-700 text-xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Nuestra Historia</h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-slate-600 space-y-4">
            <p>
              NewLife nació en 2024 con un objetivo claro: facilitar el proceso de adopción 
              de mascotas y crear un puente entre animales que necesitan un hogar y familias 
              dispuestas a brindarles amor incondicional.
            </p>
            <p>
              Lo que comenzó como un proyecto pequeño se ha convertido en una plataforma 
              que ha ayudado a cientos de mascotas a encontrar su lugar en el mundo. 
              Cada adopción exitosa nos inspira a seguir adelante y mejorar continuamente 
              nuestros servicios.
            </p>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Misión */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <i className="fi fi-sr-target text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Misión</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Facilitar adopciones responsables, promover el bienestar animal y 
                crear una comunidad comprometida con el cuidado de mascotas.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                <i className="fi fi-sr-eye text-emerald-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visión</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ser la plataforma líder en adopción de mascotas, donde cada animal 
                encuentre un hogar amoroso y cada familia encuentre su compañero ideal.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                <i className="fi fi-sr-star text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Valores</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Responsabilidad, empatía, transparencia y compromiso con el bienestar 
                de cada animal que pasa por nuestra plataforma.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Nuestro Impacto
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="text-center p-6 rounded-2xl bg-slate-50">
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <p className="text-sm text-slate-600">Adopciones exitosas</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50">
              <div className="text-4xl font-bold text-slate-900 mb-2">1,200+</div>
              <p className="text-sm text-slate-600">Usuarios registrados</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50">
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <p className="text-sm text-slate-600">Refugios asociados</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50">
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <p className="text-sm text-slate-600">Atención y soporte</p>
            </div>

          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            Un grupo apasionado de amantes de los animales trabajando para hacer 
            del mundo un lugar mejor, una adopción a la vez.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Miembro 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-slate-600 to-slate-800 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Jorge Mendoza</h3>
              <p className="text-sm text-slate-500 mb-2">Fundador & CEO</p>
              <p className="text-xs text-slate-500">
                Veterinaria de corazón, emprendedora por pasión.
              </p>
            </div>

            {/* Miembro 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-blue-700 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                MS
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Juan Miguel</h3>
              <p className="text-sm text-slate-500 mb-2">Director de Operaciones</p>
              <p className="text-xs text-slate-500">
                Coordinando adopciones con amor y eficiencia.
              </p>
            </div>

            {/* Miembro 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                AL
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">José Miguel</h3>
              <p className="text-sm text-slate-500 mb-2">Administrador</p>
              <p className="text-xs text-slate-500">
                Construyendo una comunidad de amantes de animales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            ¿Listo para hacer la diferencia?
          </h2>
          <p className="text-slate-600 mb-8">
            Únete a nuestra comunidad y ayuda a darle una nueva vida a las mascotas 
            que más lo necesitan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Adoptar ahora
            </button>
            <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all">
              Contáctanos
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

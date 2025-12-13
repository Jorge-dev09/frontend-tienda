// src/components/Tienda/TiendaNavbar.jsx
const categorias = ['Todos', 'Alimento', 'Accesorios', 'Juguetes', 'Higiene', 'Salud', 'Otro'];
const especies = ['Todas', 'Perro', 'Gato', 'Otro'];

const TiendaNavbar = ({ filters, setFilters }) => {
  const handleCategoriaClick = (categoria) => {
    setFilters((prev) => ({ ...prev, categoria }));
  };

  const handleEspecieClick = (especie) => {
    setFilters((prev) => ({ ...prev, especie }));
  };

  return (
    <div className="mt-4 bg-white/90 backdrop-blur-md rounded-xl shadow border border-slate-100 px-3 py-3 space-y-3">
      {/* Fila 1: categorías (scroll horizontal en móvil) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
        {categorias.map((cat) => {
          const active = filters.categoria === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoriaClick(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                active
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Fila 2: especie + búsqueda + rango precio */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {/* Especie */}
        <div className="flex items-center gap-1 bg-slate-50 rounded-full px-2 py-1 w-fit">
          {especies.map((esp) => {
            const active = filters.especie === esp;
            return (
              <button
                key={esp}
                onClick={() => handleEspecieClick(esp)}
                className={`px-2 py-1 rounded-full text-[11px] font-medium transition ${
                  active
                    ? 'bg-white text-orange-500 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {esp}
              </button>
            );
          })}
        </div>

        {/* Búsqueda + precio */}
        <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end">
          <div className="relative">
            <i className="fi fi-rr-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
              placeholder="Buscar producto..."
              className="w-40 sm:w-52 pl-8 pr-3 py-1.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400 transition"
            />
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span>$</span>
            <input
              type="number"
              min="0"
              value={filters.precioMin}
              onChange={(e) => setFilters((prev) => ({ ...prev, precioMin: e.target.value }))}
              placeholder="Min"
              className="w-16 px-2 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-400/60 focus:border-orange-400 text-[11px]"
            />
            <span>-</span>
            <input
              type="number"
              min="0"
              value={filters.precioMax}
              onChange={(e) => setFilters((prev) => ({ ...prev, precioMax: e.target.value }))}
              placeholder="Max"
              className="w-16 px-2 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-400/60 focus:border-orange-400 text-[11px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaNavbar;

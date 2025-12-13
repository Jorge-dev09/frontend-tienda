// src/components/PetCard.jsx

export default function PetCard({ pet, onClick }) {

  return (
    <article
      className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-slate-100 hover:border-orange-400"
      onClick={onClick}
    >
      {/* Imagen cuadrada */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={pet.imagen_url || '/placeholder-pet.jpg'}
          alt={pet.nombre}
          className="w-full h-full object-cover"
        />
        {pet.esterilizado && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        )}
      </div>

      {/* Info compacta */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-900">{pet.nombre}</h2>
          <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 font-medium">
            {pet.especie}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{pet.edad_anos} años</span>
          <span>•</span>
          <span>{pet.tamanio}</span>
          <span>•</span>
          <span>{pet.genero}</span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">
          {pet.descripcion}
        </p>
      </div>
    </article>
  );
}

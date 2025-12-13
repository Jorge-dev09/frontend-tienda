// src/pages/TiendaPage.jsx
import { useEffect, useState } from 'react';
import tiendaAPI from '../services/tiendaAPI';
import TiendaNavbar from '../components/Tienda/TiendaNavbar';
import ProductoGrid from '../components/Tienda/ProductoGrid';
import CartDrawer from '../components/Tienda/CartDrawer';
import CheckoutModal from '../components/Tienda/CheckoutModal';


const TiendaPage = () => {
  const [filters, setFilters] = useState({
    categoria: 'Todos',
    especie: 'Todas',
    q: '',
    precioMin: '',
    precioMax: ''
  });
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({ items: [], subtotal: 0 });
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [loadingCarrito, setLoadingCarrito] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchProductos = async () => {
    setLoadingProductos(true);
    try {
      const params = {};
      if (filters.categoria !== 'Todos') params.categoria = filters.categoria;
      if (filters.especie !== 'Todas') params.especie = filters.especie;
      if (filters.q) params.q = filters.q;
      if (filters.precioMin) params.precio_min = filters.precioMin;
      if (filters.precioMax) params.precio_max = filters.precioMax;

      const res = await tiendaAPI.getProductos(params);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const fetchCarrito = async () => {
    setLoadingCarrito(true);
    try {
      const res = await tiendaAPI.getCarrito();
      setCarrito(res.data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoadingCarrito(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [filters]);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const handleAddToCart = async (id_producto) => {
    try {
      await tiendaAPI.addToCarrito(id_producto, 1);
      await fetchCarrito();
      setCartOpen(true);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const handleUpdateItem = async (id_carrito, cantidad) => {
    try {
      await tiendaAPI.updateCarritoItem(id_carrito, cantidad);
      await fetchCarrito();
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
    }
  };

  const handleRemoveItem = async (id_carrito) => {
    try {
      await tiendaAPI.removeCarritoItem(id_carrito);
      await fetchCarrito();
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const handleCheckoutConfirm = async (formData) => {
  try {
    setCheckoutLoading(true);

    // Simular un pequeño delay de pago
    await new Promise((res) => setTimeout(res, 800));

    await tiendaAPI.checkout({
      direccion_envio: `${formData.nombre}, ${formData.direccion}, ${formData.ciudad}, CP ${formData.codigoPostal}`,
      metodo_pago: formData.metodoPago
    });

    await fetchCarrito(); // vacía el carrito en UI

    setCheckoutOpen(false);
    setCartOpen(false);
    alert('Pago simulado exitosamente. Tu orden ha sido creada.');
  } catch (error) {
    console.error('Error en checkout:', error);
    alert('Ocurrió un error al procesar el pago simulado.');
  } finally {
    setCheckoutLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">🛍️ Tienda para tu mascota</h1>
            <p className="text-slate-500 text-sm">
              Juguetes, alimento y accesorios con diseño minimalista y envíos rápidos.
            </p>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-sm hover:bg-orange-600 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <i className="fi fi-sr-shopping-cart" />
            Carrito
            {carrito.items?.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-orange-500 text-xs font-bold">
                {carrito.items.length}
              </span>
            )}
          </button>
        </div>

        <TiendaNavbar filters={filters} setFilters={setFilters} />

        <div className="mt-6">
          <ProductoGrid
            productos={productos}
            loading={loadingProductos}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        carrito={carrito}
        loading={loadingCarrito}
        onUpdateItem={handleUpdateItem}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        subtotal={carrito.subtotal}
        onConfirm={handleCheckoutConfirm}
        loading={checkoutLoading}
      />
    </div>
  );
};

export default TiendaPage;

import React, { useEffect, useState } from 'react';
import { productosAPI } from '../services/api';
import './Catalogo.css';

function Catalogo({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productosAPI.obtenerTodos();
      console.log('Datos recibidos del API:', data);
      
      // El backend devuelve directamente el array
      setProductos(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos desde MongoDB: ' + (err.message || 'Desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (producto) => {
    if (onAddToCart) onAddToCart(producto);
    setToast(`¡${producto.nombre} añadida al carrito!`);
    setTimeout(() => setToast(''), 1800);
  };

  return (
    <section id="catalogo" className="container py-5">
      <h2 className="text-center mb-4">Nuestro Catálogo</h2>
      
      {loading && (
        <div className="text-center">
          <p>Cargando productos desde MongoDB...</p>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}
      
      {toast && (
        <div className="catalogo-toast">{toast}</div>
      )}
      
      <div className="" id="productos-lista">
        {productos.map(producto => (
          <div className="mb-4" key={producto._id}>
            <div className="card product-card h-100 shadow-sm">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <ul className="mb-2">
                  <li>Precio: <strong>${producto.precio.toLocaleString()}</strong></li>
                  <li>Stock: {producto.stock}</li>
                  <li><small className="text-muted">ID MongoDB: {producto._id}</small></li>
                </ul>
                <button
                  className="btn btn-warning mt-auto"
                  onClick={() => handleAddToCart(producto)}
                  disabled={producto.stock === 0}
                >
                  {producto.stock === 0 ? 'Sin stock' : 'Añadir al Carrito'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;

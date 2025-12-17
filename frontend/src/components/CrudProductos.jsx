import React, { useState, useEffect } from 'react';
import { productosAPI } from '../services/api';

function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar productos desde MongoDB
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productosAPI.obtenerTodos();
      // El backend devuelve directamente el array
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos desde MongoDB');
    } finally {
      setLoading(false);
    }
  };

  // Crear producto en MongoDB
  const handleNuevoChange = e => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    setError('');
    setMensaje('');
  };
  
  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.precio || !nuevo.stock || !nuevo.imagen) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    
    try {
      setLoading(true);
      await productosAPI.crear({
        ...nuevo,
        precio: Number(nuevo.precio),
        stock: Number(nuevo.stock)
      });
      setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
      setMensaje('✅ Producto agregado en MongoDB exitosamente.');
      await cargarProductos(); // Recargar lista
    } catch (err) {
      console.error('Error al agregar:', err);
      setError('Error al agregar producto en MongoDB');
    } finally {
      setLoading(false);
    }
  };

  // Editar producto en MongoDB
  const handleEditar = producto => {
    setEditando(producto);
    setMensaje('');
    setError('');
  };
  
  const handleEditChange = e => setEditando({ ...editando, [e.target.name]: e.target.value });
  
  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!editando.nombre || !editando.precio || !editando.stock || !editando.imagen) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    
    try {
      setLoading(true);
      await productosAPI.actualizar(editando._id, {
        ...editando,
        precio: Number(editando.precio),
        stock: Number(editando.stock)
      });
      setEditando(null);
      setMensaje('✅ Producto actualizado en MongoDB.');
      await cargarProductos(); // Recargar lista
    } catch (err) {
      console.error('Error al actualizar:', err);
      setError('Error al actualizar producto en MongoDB');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto de MongoDB
  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto de MongoDB?')) {
      try {
        setLoading(true);
        await productosAPI.eliminar(id);
        setMensaje('✅ Producto eliminado de MongoDB.');
        await cargarProductos(); // Recargar lista
      } catch (err) {
        console.error('Error al eliminar:', err);
        setError('Error al eliminar producto de MongoDB');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h3>🔥 Gestión de Productos en MongoDB</h3>
      <p className="text-muted">Los cambios se reflejan en tiempo real en la base de datos</p>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">⏳ Procesando operación en MongoDB...</div>}
      
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>ID MongoDB</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto._id}>
              <td><img src={producto.imagen} alt={producto.nombre} width={50} style={{borderRadius:'6px',border:'2px solid #f39c12'}} /></td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio.toLocaleString()}</td>
              <td>{producto.stock}</td>
              <td><code className="text-muted" style={{fontSize:'0.75rem'}}>{producto._id}</code></td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(producto)}>✏️ Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(producto._id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="mt-4">{editando ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h4>
      <form className="mb-4 row g-2" onSubmit={editando ? handleGuardar : handleAgregar}>
        <div className="col-md-3">
          <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={editando ? editando.nombre : nuevo.nombre} onChange={editando ? handleEditChange : handleNuevoChange} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" name="descripcion" placeholder="Descripción" value={editando ? editando.descripcion : nuevo.descripcion} onChange={editando ? handleEditChange : handleNuevoChange} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" name="precio" placeholder="Precio" value={editando ? editando.precio : nuevo.precio} onChange={editando ? handleEditChange : handleNuevoChange} required min={0} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" name="stock" placeholder="Stock" value={editando ? editando.stock : nuevo.stock} onChange={editando ? handleEditChange : handleNuevoChange} required min={0} />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" name="imagen" placeholder="/img/ejemplo.jpg" value={editando ? editando.imagen : nuevo.imagen} onChange={editando ? handleEditChange : handleNuevoChange} required />
        </div>
        <div className="col-12 mt-2">
          <button type="submit" className="btn btn-success me-2">{editando ? 'Guardar' : 'Agregar'}</button>
          {editando && <button type="button" className="btn btn-secondary" onClick={() => setEditando(null)}>Cancelar</button>}
        </div>
      </form>
    </div>
  );
}

export default CrudProductos;

import React, { useState, useEffect } from 'react';
import {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario
} from '../data/dataUsuarios';

function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({ run: '', nombre: '', apellidos: '', correo: '', tipo: 'Cliente' });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Cargar usuarios al montar el componente
  useEffect(() => {
    setUsuarios(getUsuarios());
  }, []);

  // Crear usuario
  const handleNuevoChange = e => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    setError('');
    setMensaje('');
  };
  const handleAgregar = e => {
    e.preventDefault();
    if (!nuevo.run || !nuevo.nombre || !nuevo.apellidos || !nuevo.correo) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if (usuarios.some(u => u.run === nuevo.run)) {
      setError('Ya existe un usuario con ese RUN.');
      return;
    }
    const nuevosUsuarios = addUsuario({ ...nuevo });
    setUsuarios(nuevosUsuarios);
    setNuevo({ run: '', nombre: '', apellidos: '', correo: '', tipo: 'Cliente' });
    setMensaje('Usuario agregado exitosamente.');
  };

  // Editar usuario
  const handleEditar = usuario => {
    setEditando(usuario);
    setMensaje('');
    setError('');
  };
  const handleEditChange = e => setEditando({ ...editando, [e.target.name]: e.target.value });
  const handleGuardar = e => {
    e.preventDefault();
    if (!editando.run || !editando.nombre || !editando.apellidos || !editando.correo) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    const nuevosUsuarios = updateUsuario(editando);
    setUsuarios(nuevosUsuarios);
    setEditando(null);
    setMensaje('Usuario actualizado.');
  };

  // Eliminar usuario
  const handleEliminar = id => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      const nuevosUsuarios = deleteUsuario(id);
      setUsuarios(nuevosUsuarios);
      setMensaje('Usuario eliminado.');
    }
  };

  return (
    <div>
      <h3>Listado de Usuarios</h3>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.run}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipo}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(usuario)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="mt-4">{editando ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h4>
      <form className="mb-4 row g-2" onSubmit={editando ? handleGuardar : handleAgregar}>
        <div className="col-md-2">
          <input type="text" className="form-control" name="run" placeholder="RUN" value={editando ? editando.run : nuevo.run} onChange={editando ? handleEditChange : handleNuevoChange} required minLength={7} maxLength={9} />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={editando ? editando.nombre : nuevo.nombre} onChange={editando ? handleEditChange : handleNuevoChange} required />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" name="apellidos" placeholder="Apellidos" value={editando ? editando.apellidos : nuevo.apellidos} onChange={editando ? handleEditChange : handleNuevoChange} required />
        </div>
        <div className="col-md-3">
          <input type="email" className="form-control" name="correo" placeholder="Correo" value={editando ? editando.correo : nuevo.correo} onChange={editando ? handleEditChange : handleNuevoChange} required />
        </div>
        <div className="col-md-2">
          <select className="form-select" name="tipo" value={editando ? editando.tipo : nuevo.tipo} onChange={editando ? handleEditChange : handleNuevoChange}>
            <option value="Cliente">Cliente</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="col-12 mt-2">
          <button type="submit" className="btn btn-success me-2">{editando ? 'Guardar' : 'Agregar'}</button>
          {editando && <button type="button" className="btn btn-secondary" onClick={() => setEditando(null)}>Cancelar</button>}
        </div>
      </form>
    </div>
  );
}

export default CrudUsuarios;

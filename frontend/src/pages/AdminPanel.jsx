import React, { useState, useEffect } from 'react';
import CrudProductos from '../components/CrudProductos';
import CrudUsuarios from '../components/CrudUsuarios';
import PreguntaAdmin from '../components/PreguntaAdmin';
import RespuestasPreguntaAdmin from '../components/RespuestasPreguntaAdmin';
import DashboardAdmin from '../components/DashboardAdmin';

const iconos = {
  dashboard: '📊',
  productos: '🛒',
  usuarios: '👤',
  descuentos: '💸',
  comentarios: '💬',
  pregunta: '❓',
};

export default function AdminPanel() {
  const [seccion, setSeccion] = useState('dashboard');
  const [descuentos, setDescuentos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  // Datos simulados para el dashboard
  const resumen = {
    ventasTotales: 120,
    masVendidos: [
      { nombre: 'Polera Metallica', cantidad: 35 },
      { nombre: 'Polera Iron Maiden', cantidad: 28 },
      { nombre: 'Polera AC/DC', cantidad: 19 },
    ],
  };
  const productos = [
    { nombre: 'Polera Metallica' },
    { nombre: 'Polera Iron Maiden' },
    { nombre: 'Polera AC/DC' },
  ];
  const usuarios = [
    { nombre: 'Admin' },
    { nombre: 'Usuario1' },
    { nombre: 'Usuario2' },
  ];
  const ventas = [
    { id: 1, fecha: '2025-10-20', total: 19990 },
    { id: 2, fecha: '2025-10-19', total: 14990 },
    { id: 3, fecha: '2025-10-18', total: 29990 },
  ];

  useEffect(() => {
    // Mostrar descuentos del usuario admin por defecto
    const adminEmail = 'admin@admin.com';
    const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
    setDescuentos(descuentosPorUsuario[adminEmail] || []);
    setComentarios(JSON.parse(localStorage.getItem('comentariosUsuario') || '[]'));
  }, []);

  const handleDeleteComentario = idx => {
    if (window.confirm('¿Eliminar este comentario?')) {
      const nuevos = comentarios.filter((_, i) => i !== idx);
      setComentarios(nuevos);
      localStorage.setItem('comentariosUsuario', JSON.stringify(nuevos));
    }
  };

  const handleDeleteDescuento = idx => {
    if (window.confirm('¿Eliminar este descuento?')) {
      const adminEmail = 'admin@admin.com';
      const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
      const nuevos = (descuentosPorUsuario[adminEmail] || []).filter((_, i) => i !== idx);
      descuentosPorUsuario[adminEmail] = nuevos;
      setDescuentos(nuevos);
      localStorage.setItem('descuentosPorUsuario', JSON.stringify(descuentosPorUsuario));
    }
  };

  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', color: '#f8f9fa', padding: '2rem 0' }}>
      <div className="container">
        <div className="mb-4 p-4 rounded shadow" style={{ background: '#18191a', border: '1px solid #333' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '2.2rem', letterSpacing: '1px', color: '#ffd700', marginBottom: '1.5rem', textShadow: '0 2px 8px #000' }}>
            Panel de Administración
          </h2>
          <nav className="mb-4 d-flex flex-wrap gap-2">
            <button className={`btn btn-${seccion === 'dashboard' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('dashboard')}>
              {iconos.dashboard} Dashboard
            </button>
            <button className={`btn btn-${seccion === 'productos' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('productos')}>
              {iconos.productos} Productos
            </button>
            <button className={`btn btn-${seccion === 'usuarios' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('usuarios')}>
              {iconos.usuarios} Usuarios
            </button>
            <button className={`btn btn-${seccion === 'descuentos' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('descuentos')}>
              {iconos.descuentos} Descuentos
            </button>
            <button className={`btn btn-${seccion === 'comentarios' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('comentarios')}>
              {iconos.comentarios} Comentarios
            </button>
            <button className={`btn btn-${seccion === 'pregunta' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('pregunta')}>
              📝 Pregunta del Día
            </button>
            <button className={`btn btn-${seccion === 'respuestas' ? 'warning' : 'outline-warning'} fw-bold`} onClick={() => setSeccion('respuestas')}>
              ⭐ Respuestas Debate
            </button>
          </nav>
          <div className="row g-4">
            {seccion === 'dashboard' && (
              <div className="col-12">
                <DashboardAdmin resumen={resumen} productos={productos} usuarios={usuarios} ventas={ventas} />
              </div>
            )}
            {seccion === 'productos' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Gestión de Productos</div>
                  <div className="card-body">
                    <CrudProductos />
                  </div>
                </div>
              </div>
            )}
            {seccion === 'usuarios' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Gestión de Usuarios</div>
                  <div className="card-body">
                    <CrudUsuarios />
                  </div>
                </div>
              </div>
            )}
            {seccion === 'descuentos' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Gestión de Descuentos</div>
                  <div className="card-body">
                    {descuentos.length === 0 ? <p>No hay descuentos registrados.</p> : (
                      <div className="table-responsive">
                        <table className="table table-striped table-dark table-bordered align-middle rounded">
                          <thead className="table-warning text-dark sticky-top">
                            <tr><th className="fw-bold">Descripción</th><th className="fw-bold">Fecha</th><th></th></tr>
                          </thead>
                          <tbody>
                            {descuentos.map((d, i) => (
                              <tr key={i}>
                                <td className="fw-bold">{d.descripcion}</td>
                                <td>{d.fecha}</td>
                                <td><button className="btn btn-sm btn-danger fw-bold" onClick={() => handleDeleteDescuento(i)}>Eliminar</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {seccion === 'comentarios' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Moderación de Comentarios</div>
                  <div className="card-body">
                    {comentarios.length === 0 ? <p>No hay comentarios registrados.</p> : (
                      <ul className="list-group list-group-flush">
                        {comentarios.map((c, i) => (
                          <li key={i} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-bottom border-warning">
                            <span><strong style={{ color: '#ffd700' }}>{c.usuario}</strong>: <span className="fw-bold">{c.texto}</span> <span className="text-muted" style={{fontSize:'0.9em'}}>{c.fecha}</span></span>
                            <button className="btn btn-sm btn-danger fw-bold" onClick={() => handleDeleteComentario(i)}>Eliminar</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
            {seccion === 'pregunta' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Pregunta del Día / Debate</div>
                  <div className="card-body">
                    <PreguntaAdmin />
                  </div>
                </div>
              </div>
            )}
            {seccion === 'respuestas' && (
              <div className="col-12">
                <div className="card bg-dark text-light shadow-lg border-warning">
                  <div className="card-header bg-warning text-dark fw-bold fs-5">Respuestas a la Pregunta del Día</div>
                  <div className="card-body">
                    <RespuestasPreguntaAdmin />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

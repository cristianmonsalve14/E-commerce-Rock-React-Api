import React, { useState, useEffect } from 'react';

export default function RespuestasPreguntaAdmin() {
  const [respuestas, setRespuestas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setRespuestas(JSON.parse(localStorage.getItem('respuestasPreguntaDia') || '[]'));
  }, []);

  const premiar = idx => {
    const r = respuestas[idx];
    if (!r || !r.correo) return;
    // Otorgar descuento al usuario de la mejor respuesta
    const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
    const prevD = descuentosPorUsuario[r.correo] || [];
    const desc = { descripcion: '¡Premio: Mejor respuesta en el debate! 30% OFF', fecha: new Date().toLocaleString(), usado: false };
    descuentosPorUsuario[r.correo] = [...prevD, desc];
    localStorage.setItem('descuentosPorUsuario', JSON.stringify(descuentosPorUsuario));
    setMensaje(`¡Descuento otorgado a ${r.nombre || r.correo}!`);
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <div>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {respuestas.length === 0 ? <p>No hay respuestas aún.</p> : (
        <ul className="list-group">
          {respuestas.map((r, i) => (
            <li key={i} className="list-group-item bg-dark text-light border-warning d-flex justify-content-between align-items-center">
              <span><strong>{r.nombre || r.correo}:</strong> {r.texto} <span style={{fontSize:'0.8em'}}>{r.fecha}</span></span>
              <button className="btn btn-success btn-sm fw-bold" onClick={() => premiar(i)}>Premiar con descuento</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

// Simulación de pregunta del día
const preguntaDelDia = {
  pregunta: '¿Cuál es tu banda de rock favorita y por qué?',
  fecha: '22/10/2025',
};

export default function PanelUsuario() {
  const { user } = useAuth();
  const [respuesta, setRespuesta] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [preguntaActual, setPreguntaActual] = useState('');
  const [premioDebate, setPremioDebate] = useState(false);

  useEffect(() => {
    // Cargar comentarios del usuario desde localStorage
    setComentarios(JSON.parse(localStorage.getItem('comentariosUsuario') || '[]'));
    // Cargar descuentos solo del usuario autenticado
    if (user?.email) {
      const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
      setDescuentos(descuentosPorUsuario[user.email] || []);
      const premios = (descuentosPorUsuario[user.email] || []).some(d => d.descripcion && d.descripcion.includes('Mejor respuesta'));
      setPremioDebate(premios);
    } else {
      setDescuentos([]);
    }
    setPreguntaActual(localStorage.getItem('preguntaDelDia') || '');
  }, [user]);

  const handleDebate = e => {
    e.preventDefault();
    if (respuesta.trim()) {
      const nueva = { texto: respuesta, fecha: new Date().toLocaleString(), correo: user?.correo, nombre: user?.nombre };
      setRespuestas([...respuestas, nueva]);
      setRespuesta('');
      // Guardar respuesta en localStorage global para admin
      const prevRespuestas = JSON.parse(localStorage.getItem('respuestasPreguntaDia') || '[]');
      localStorage.setItem('respuestasPreguntaDia', JSON.stringify([...prevRespuestas, nueva]));
      // Simular sorteo de descuento al responder debate
      if (Math.random() < 0.2 && user?.email) {
        const desc = { descripcion: '¡Ganaste un 20% de descuento por participar en el debate!', fecha: new Date().toLocaleString(), usado: false };
        const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
        const prevD = descuentosPorUsuario[user.email] || [];
        const nuevos = [...prevD, desc];
        descuentosPorUsuario[user.email] = nuevos;
        localStorage.setItem('descuentosPorUsuario', JSON.stringify(descuentosPorUsuario));
        setDescuentos(nuevos);
        alert('¡Felicidades! Has ganado un 20% de descuento por participar en el debate.');
      }
    }
  };

  const handleDeleteComentario = idx => {
    if (window.confirm('¿Estás seguro de que deseas borrar este comentario?')) {
      const nuevos = comentarios.filter((_, i) => i !== idx);
      setComentarios(nuevos);
      localStorage.setItem('comentariosUsuario', JSON.stringify(nuevos));
    }
  };

  const handleEditComentario = idx => {
    setEditIdx(idx);
    setEditText(comentarios[idx].texto);
  };

  const handleSaveEdit = idx => {
    const nuevos = comentarios.map((c, i) => i === idx ? { ...c, texto: editText } : c);
    setComentarios(nuevos);
    localStorage.setItem('comentariosUsuario', JSON.stringify(nuevos));
    setEditIdx(null);
    setEditText('');
  };

  const handleNuevoComentario = e => {
    e.preventDefault();
    if (nuevoComentario.trim()) {
      const nuevo = { usuario: user?.nombre || 'Anónimo', texto: nuevoComentario, fecha: new Date().toLocaleString() };
      const nuevos = [...comentarios, nuevo];
      setComentarios(nuevos);
      localStorage.setItem('comentariosUsuario', JSON.stringify(nuevos));
      setNuevoComentario('');
    }
  };

  return (
    <section>
      <h2>Mi Perfil</h2>
      <div><strong>Nombre:</strong> {user?.nombre}</div>
      <div><strong>Correo:</strong> {user?.correo}</div>
      <hr />
      <h3>Mis Comentarios en el Blog</h3>
      <form onSubmit={handleNuevoComentario} style={{marginBottom:'1em'}}>
        <textarea value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Nuevo comentario..." rows={2} style={{width:'100%'}} />
        <button type="submit" disabled={!nuevoComentario.trim()}>Crear comentario</button>
      </form>
      {comentarios.length === 0 ? <p>No has comentado aún.</p> : (
        <ul>{comentarios.map((c, i) => (
          <li key={i}>
            {editIdx === i ? (
              <>
                <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={2} style={{width:'100%'}} />
                <button onClick={() => handleSaveEdit(i)} disabled={!editText.trim()}>Guardar</button>
                <button onClick={() => setEditIdx(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {c.texto} <span style={{fontSize:'0.8em'}}>{c.fecha}</span>
                <button onClick={() => handleEditComentario(i)} style={{marginLeft:'1em'}}>Editar</button>
                <button onClick={() => handleDeleteComentario(i)} style={{marginLeft:'0.5em', color:'red'}}>Borrar</button>
              </>
            )}
          </li>
        ))}</ul>
      )}
      <hr />
      <h3>Pregunta del Día</h3>
      <div><strong>{preguntaActual}</strong></div>
      <form onSubmit={handleDebate} style={{marginTop:'1em'}}>
        <textarea value={respuesta} onChange={e => setRespuesta(e.target.value)} placeholder="Tu respuesta..." rows={2} style={{width:'100%'}} />
        <button type="submit" disabled={!respuesta.trim()}>Responder</button>
      </form>
      <ul>
        {respuestas.map((r, i) => <li key={i}>{r.texto} <span style={{fontSize:'0.8em'}}>{r.fecha}</span></li>)}
      </ul>
      {premioDebate && (
        <div className="alert alert-success" style={{fontWeight:'bold',fontSize:'1.1em'}}>¡Felicidades! Has ganado un descuento especial por la mejor respuesta en el debate.</div>
      )}
      <hr />
      <h3>Participación y Descuentos</h3>
      {descuentos.length === 0 ? <p>Aún no has ganado descuentos. ¡Sigue participando comentando en el blog y debates!</p> : (
        <ul>{descuentos.map((d, i) => <li key={i}>{d.descripcion} <span style={{fontSize:'0.8em'}}>{d.fecha}</span></li>)}</ul>
      )}
    </section>
  );
}

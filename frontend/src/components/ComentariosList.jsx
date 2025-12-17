import React from 'react';

export default function ComentariosList({ comentarios }) {
  if (!comentarios.length) return <p>Aún no hay comentarios. ¡Sé el primero en opinar!</p>;
  return (
    <ul>
      {comentarios.map((c, i) => (
        <li key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #444' }}>
          <strong>{c.usuario}</strong> <span style={{ fontSize: '0.8em', color: '#888' }}>{c.fecha}</span>
          <p>{c.texto}</p>
        </li>
      ))}
    </ul>
  );
}

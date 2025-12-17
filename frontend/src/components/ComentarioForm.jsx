import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function ComentarioForm({ onAdd }) {
  const [texto, setTexto] = useState('');
  const { user } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    if (texto.trim()) {
      const comentario = { usuario: user?.nombre || 'Anónimo', texto, fecha: new Date().toLocaleString() };
      onAdd(comentario);
      setTexto('');
      // Guardar comentario en localStorage para el panel de usuario
      const prev = JSON.parse(localStorage.getItem('comentariosUsuario') || '[]');
      localStorage.setItem('comentariosUsuario', JSON.stringify([...prev, comentario]));
      // Simular sorteo: 1 de cada 5 comentarios gana un descuento
      if (Math.random() < 0.2 && user?.email) {
        const desc = { descripcion: '¡Ganaste un 20% de descuento!', fecha: new Date().toLocaleString(), usado: false };
        // Obtener descuentos por usuario
        const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
        const email = user.email;
        const prevD = descuentosPorUsuario[email] || [];
        descuentosPorUsuario[email] = [...prevD, desc];
        localStorage.setItem('descuentosPorUsuario', JSON.stringify(descuentosPorUsuario));
        alert('¡Felicidades! Has ganado un 20% de descuento para tu próxima compra.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1rem 0' }}>
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe tu comentario..."
        rows={3}
        style={{ width: '100%' }}
      />
      <button type="submit" disabled={!texto.trim()}>
        Comentar
      </button>
    </form>
  );
}

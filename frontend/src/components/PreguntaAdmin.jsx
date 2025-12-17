import React, { useState, useEffect } from 'react';

export default function PreguntaAdmin() {
  const [pregunta, setPregunta] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const actual = localStorage.getItem('preguntaDelDia') || '';
    setPregunta(actual);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('preguntaDelDia', pregunta);
    setMensaje('¡Pregunta actualizada para todos los usuarios!');
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Escribe la pregunta del día o tema de debate:
        <textarea value={pregunta} onChange={e => setPregunta(e.target.value)} rows={3} style={{width:'100%'}} required />
      </label>
      <button className="btn btn-warning mt-2" type="submit">Guardar pregunta</button>
      {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}
    </form>
  );
}

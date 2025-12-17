import React, { useState } from 'react';

function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const errores = {};
    if (!form.nombre) errores.nombre = "El nombre es requerido";
    if (!form.correo) {
      errores.correo = "El correo es requerido";
    } else if (!/^[\w-.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(form.correo)) {
      errores.correo = "Correo no válido";
    }
    if (!form.mensaje) errores.mensaje = "El mensaje es requerido";
    return errores;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: undefined });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const val = validar();
    if (Object.keys(val).length === 0) {
      setEnviado(true);
      setForm({ nombre: '', correo: '', mensaje: '' });
    } else {
      setErrores(val);
    }
  };

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Contacto</h2>
      {enviado && <div className="alert alert-success">¡Mensaje enviado correctamente!</div>}
      <form className="mx-auto" style={{maxWidth: 500}} onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="contacto-nombre">Nombre</label>
          <input id="contacto-nombre" type="text" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} name="nombre" value={form.nombre} onChange={handleChange} maxLength={100} />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="contacto-correo">Correo</label>
          <input id="contacto-correo" type="email" className={`form-control ${errores.correo ? 'is-invalid' : ''}`} name="correo" value={form.correo} onChange={handleChange} maxLength={100} />
          {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="contacto-mensaje">Mensaje</label>
          <textarea id="contacto-mensaje" className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`} name="mensaje" value={form.mensaje} onChange={handleChange} maxLength={500} rows={4}></textarea>
          {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
        </div>
        <button type="submit" className="btn btn-warning">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;

import React, { useState } from 'react';
import './Registro.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [form, setForm] = useState({ 
    run: '', 
    nombre: '', 
    apellidos: '', 
    correo: '', 
    password: '' 
  });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registro } = useAuth();
  const navigate = useNavigate();

  const validar = () => {
    const errores = {};
    if (!form.run) {
      errores.run = "El RUN es requerido";
    } else if (!/^\d{7,8}-[\dkK]$/.test(form.run)) {
      errores.run = "Formato de RUN inválido (ej: 12345678-9)";
    }
    if (!form.nombre) errores.nombre = "El nombre es requerido";
    if (!form.apellidos) errores.apellidos = "Los apellidos son requeridos";
    if (!form.correo) {
      errores.correo = "El correo es requerido";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(form.correo)) {
      errores.correo = "Correo no válido";
    }
    if (!form.password) {
      errores.password = "La contraseña es requerida";
    } else if (form.password.length < 4) {
      errores.password = "La contraseña debe tener al menos 4 caracteres";
    }
    return errores;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = validar();
    
    if (Object.keys(val).length === 0) {
      setLoading(true);
      
      try {
        const result = await registro(form);
        
        if (result.success) {
          setEnviado(true);
          setForm({ run: '', nombre: '', apellidos: '', correo: '', password: '' });
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setErrores({ general: result.error || 'Error al registrar usuario' });
        }
      } catch {
        setErrores({ general: 'Error al conectar con el servidor' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrores(val);
    }
  };

  return (
    <section className="registro-section">
      <h2>Registro de Usuario</h2>
      {enviado && <div className="alert alert-success">¡Registro exitoso! Redirigiendo...</div>}
      {errores.general && <div className="alert alert-danger">{errores.general}</div>}
      <form className="registro-form" onSubmit={handleSubmit} noValidate>
        <label>
          RUN
          <input 
            type="text" 
            className={`form-control ${errores.run ? 'is-invalid' : ''}`} 
            name="run" 
            value={form.run} 
            onChange={handleChange} 
            placeholder="12345678-9" 
            maxLength={12} 
            required 
            disabled={loading}
          />
          {errores.run && <div className="invalid-feedback">{errores.run}</div>}
        </label>
        <label>
          Nombre
          <input 
            type="text" 
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            placeholder="Tu nombre" 
            maxLength={50} 
            required 
            disabled={loading}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </label>
        <label>
          Apellidos
          <input 
            type="text" 
            className={`form-control ${errores.apellidos ? 'is-invalid' : ''}`} 
            name="apellidos" 
            value={form.apellidos} 
            onChange={handleChange} 
            placeholder="Tus apellidos" 
            maxLength={100} 
            required 
            disabled={loading}
          />
          {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
        </label>
        <label>
          Correo
          <input 
            type="email" 
            className={`form-control ${errores.correo ? 'is-invalid' : ''}`} 
            name="correo" 
            value={form.correo} 
            onChange={handleChange} 
            placeholder="tu@email.com" 
            maxLength={100} 
            required 
            disabled={loading}
          />
          {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
        </label>
        <label>
          Contraseña
          <input 
            type="password" 
            className={`form-control ${errores.password ? 'is-invalid' : ''}`} 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            placeholder="Contraseña" 
            required 
            disabled={loading}
          />
          {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </label>
        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </section>
  );
}

export default Registro;

import React, { useState } from 'react';
import './Login.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    const val = {};
    if (!form.correo) val.correo = "El correo es requerido";
    if (!form.password) val.password = "La contraseña es requerida";
    
    if (Object.keys(val).length === 0) {
      setLoading(true);
      
      try {
        const result = await login(form.correo, form.password);
        
        if (result.success) {
          // Login exitoso
          if (result.usuario.tipo === 'Administrador') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          // Credenciales incorrectas
          setErrores({ general: result.error || 'Credenciales incorrectas' });
          setLoading(false);
        }
      } catch {
        setErrores({ general: 'Credenciales incorrectas' });
        setLoading(false);
      }
    } else {
      setErrores(val);
    }
  };

  return (
    <section className="login-section">
      <h2>Iniciar Sesión</h2>
      
      {errores.general && <div className="alert alert-danger">{errores.general}</div>}
      
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label>
          Correo
          <input 
            type="email" 
            className={`form-control ${errores.correo ? 'is-invalid' : ''}`} 
            name="correo" 
            value={form.correo} 
            onChange={handleChange} 
            placeholder="tu@email.com" 
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
        
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Usuario de prueba: ana@gmail.com / admin123
        </p>
      </form>
    </section>
  );
}

export default Login;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    
    if (usuarioGuardado && token) {
      setUser(JSON.parse(usuarioGuardado));
    }
    setLoading(false);
  }, []);

  const login = async (correo, password) => {
    try {
      console.log('AuthContext - Intentando login:', correo); // DEBUG
      const response = await authAPI.login({ correo, password });
      console.log('AuthContext - Respuesta del backend:', response); // DEBUG
      setUser(response.usuario);
      console.log('AuthContext - Usuario establecido:', response.usuario); // DEBUG
      return { success: true, usuario: response.usuario };
    } catch (error) {
      console.error('AuthContext - Error en login:', error); // DEBUG
      console.error('AuthContext - Error response:', error.response); // DEBUG
      return { 
        success: false, 
        error: error.response?.data?.mensaje || 'Error al iniciar sesión' 
      };
    }
  };

  const registro = async (userData) => {
    try {
      const response = await authAPI.registro(userData);
      setUser(response.usuario);
      return { success: true, usuario: response.usuario };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        error: error.response?.data?.mensaje || 'Error al registrar usuario' 
      };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    registro,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.tipo === 'Administrador'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

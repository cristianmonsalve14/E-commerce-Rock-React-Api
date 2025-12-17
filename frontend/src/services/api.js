import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:5000/api';

// Crear instancia de axios con configuración por defecto
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTENTICACIÓN ====================
export const authAPI = {
  // Registrar usuario
  registro: async (userData) => {
    const response = await api.post('/auth/registro', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  },

  // Obtener perfil
  perfil: async () => {
    const response = await api.get('/auth/perfil');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
};

// ==================== PRODUCTOS ====================
export const productosAPI = {
  // Obtener todos los productos
  obtenerTodos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  // Obtener producto por ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Crear producto (admin)
  crear: async (productoData) => {
    const response = await api.post('/productos', productoData);
    return response.data;
  },

  // Actualizar producto (admin)
  actualizar: async (id, productoData) => {
    const response = await api.put(`/productos/${id}`, productoData);
    return response.data;
  },

  // Eliminar producto (admin)
  eliminar: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};

// ==================== USUARIOS ====================
export const usuariosAPI = {
  // Obtener todos los usuarios (admin)
  obtenerTodos: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Obtener usuario por ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Actualizar usuario
  actualizar: async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario (admin)
  eliminar: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },

  // Agregar descuento (admin)
  agregarDescuento: async (id, descuentoData) => {
    const response = await api.post(`/usuarios/${id}/descuento`, descuentoData);
    return response.data;
  }
};

// ==================== PEDIDOS ====================
export const pedidosAPI = {
  // Crear pedido
  crear: async (pedidoData) => {
    const response = await api.post('/pedidos', pedidoData);
    return response.data;
  },

  // Obtener mis pedidos
  misPedidos: async () => {
    const response = await api.get('/pedidos/mis-pedidos');
    return response.data;
  },

  // Obtener todos los pedidos (admin)
  obtenerTodos: async () => {
    const response = await api.get('/pedidos');
    return response.data;
  },

  // Actualizar estado del pedido (admin)
  actualizarEstado: async (id, estado) => {
    const response = await api.put(`/pedidos/${id}/estado`, { estado });
    return response.data;
  }
};

// ==================== COMENTARIOS ====================
export const comentariosAPI = {
  // Obtener comentarios
  obtenerTodos: async () => {
    const response = await api.get('/comentarios');
    return response.data;
  },

  // Crear comentario
  crear: async (comentarioData) => {
    const response = await api.post('/comentarios', comentarioData);
    return response.data;
  },

  // Aprobar comentario (admin)
  aprobar: async (id) => {
    const response = await api.put(`/comentarios/${id}/aprobar`);
    return response.data;
  },

  // Eliminar comentario (admin)
  eliminar: async (id) => {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  }
};

export default api;

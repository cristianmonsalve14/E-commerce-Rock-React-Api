import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';

// Configurar variables de entorno
dotenv.config();

// Crear app de Express
const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🎸 API E-commerce Rock funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      pedidos: '/api/pedidos',
      comentarios: '/api/comentarios'
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/comentarios', comentarioRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Puerto
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}`);
});

export default app;

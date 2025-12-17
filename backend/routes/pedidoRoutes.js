import express from 'express';
import {
  crearPedido,
  obtenerMisPedidos,
  obtenerTodosPedidos,
  actualizarEstadoPedido
} from '../controllers/pedidoController.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Rutas para usuarios
router.post('/', crearPedido);
router.get('/mis-pedidos', obtenerMisPedidos);

// Rutas solo para admin
router.get('/', verificarAdmin, obtenerTodosPedidos);
router.put('/:id/estado', verificarAdmin, actualizarEstadoPedido);

export default router;

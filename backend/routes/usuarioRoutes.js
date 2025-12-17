import express from 'express';
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarDescuento
} from '../controllers/usuarioController.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas de usuarios requieren autenticación
router.use(verificarToken);

// Rutas que requieren permisos de admin
router.get('/', verificarAdmin, obtenerUsuarios);
router.delete('/:id', verificarAdmin, eliminarUsuario);
router.post('/:id/descuento', verificarAdmin, agregarDescuento);

// Rutas accesibles por el usuario autenticado
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);

export default router;

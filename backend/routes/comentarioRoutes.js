import express from 'express';
import {
  obtenerComentarios,
  crearComentario,
  aprobarComentario,
  eliminarComentario
} from '../controllers/comentarioController.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerComentarios);

// Rutas protegidas
router.post('/', verificarToken, crearComentario);

// Rutas solo admin
router.put('/:id/aprobar', verificarToken, verificarAdmin, aprobarComentario);
router.delete('/:id', verificarToken, verificarAdmin, eliminarComentario);

export default router;

import express from 'express';
import { registrarUsuario, loginUsuario, obtenerPerfil } from '../controllers/authController.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas protegidas
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;

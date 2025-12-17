import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware para verificar token JWT
export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token' });
  }

  try {
    // eslint-disable-next-line no-undef
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// Middleware para verificar si es administrador
export const verificarAdmin = (req, res, next) => {
  if (req.usuario.tipo !== 'Administrador') {
    return res.status(403).json({ 
      mensaje: 'Acceso denegado. Se requieren privilegios de administrador' 
    });
  }
  next();
};

import Comentario from '../models/Comentario.js';

// Obtener todos los comentarios (admin ve todos, usuarios solo aprobados)
export const obtenerComentarios = async (req, res) => {
  try {
    const filtro = req.usuario?.tipo === 'Administrador' 
      ? {} 
      : { aprobado: true };
    
    const comentarios = await Comentario.find(filtro)
      .populate('usuario', 'nombre apellidos')
      .sort({ createdAt: -1 });
    
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentarios', error: error.message });
  }
};

// Crear comentario
export const crearComentario = async (req, res) => {
  try {
    const { texto, puntuacion, tipo } = req.body;
    
    const nuevoComentario = await Comentario.create({
      usuario: req.usuario.id,
      nombreUsuario: req.usuario.nombre,
      texto,
      puntuacion,
      tipo: tipo || 'blog',
      aprobado: false
    });
    
    res.status(201).json({ 
      mensaje: 'Comentario enviado. Pendiente de aprobación', 
      comentario: nuevoComentario 
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear comentario', error: error.message });
  }
};

// Aprobar comentario (solo admin)
export const aprobarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndUpdate(
      req.params.id,
      { aprobado: true },
      { new: true }
    );
    
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }
    
    res.json({ mensaje: 'Comentario aprobado', comentario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aprobar comentario', error: error.message });
  }
};

// Eliminar comentario (solo admin)
export const eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.id);
    
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }
    
    res.json({ mensaje: 'Comentario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar comentario', error: error.message });
  }
};

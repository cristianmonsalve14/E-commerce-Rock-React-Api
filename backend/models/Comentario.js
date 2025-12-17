import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true,
    trim: true
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 5
  },
  aprobado: {
    type: Boolean,
    default: false
  },
  tipo: {
    type: String,
    enum: ['blog', 'producto', 'general'],
    default: 'blog'
  }
}, {
  timestamps: true
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

export default Comentario;

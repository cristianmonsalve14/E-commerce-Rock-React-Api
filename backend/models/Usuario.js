import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  run: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Cliente', 'Administrador'],
    default: 'Cliente'
  },
  historialCompras: [{
    fecha: { type: Date, default: Date.now },
    productos: [{
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      nombre: String,
      cantidad: Number,
      precio: Number
    }],
    total: Number
  }],
  puntos: {
    type: Number,
    default: 0
  },
  descuentos: [{
    codigo: String,
    porcentaje: Number,
    usado: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;

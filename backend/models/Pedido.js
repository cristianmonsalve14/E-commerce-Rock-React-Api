import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    nombre: String,
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precio: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  },
  direccionEnvio: {
    calle: String,
    ciudad: String,
    region: String,
    codigoPostal: String
  }
}, {
  timestamps: true
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;

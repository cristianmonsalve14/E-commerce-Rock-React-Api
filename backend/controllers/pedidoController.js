import Pedido from '../models/Pedido.js';
import Producto from '../models/Producto.js';
import Usuario from '../models/Usuario.js';

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { productos, direccionEnvio } = req.body;
    
    // Calcular total y verificar stock
    let total = 0;
    const productosConDetalles = [];
    
    for (const item of productos) {
      const producto = await Producto.findById(item.producto);
      
      if (!producto) {
        return res.status(404).json({ mensaje: `Producto ${item.producto} no encontrado` });
      }
      
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ 
          mensaje: `Stock insuficiente para ${producto.nombre}` 
        });
      }
      
      productosConDetalles.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precio: producto.precio
      });
      
      total += producto.precio * item.cantidad;
      
      // Actualizar stock
      producto.stock -= item.cantidad;
      await producto.save();
    }
    
    // Crear pedido
    const pedido = await Pedido.create({
      usuario: req.usuario.id,
      productos: productosConDetalles,
      total,
      direccionEnvio
    });
    
    // Actualizar historial de compras del usuario
    const usuario = await Usuario.findById(req.usuario.id);
    usuario.historialCompras.push({
      fecha: new Date(),
      productos: productosConDetalles,
      total
    });
    usuario.puntos += Math.floor(total / 1000); // 1 punto por cada $1000
    await usuario.save();
    
    res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear pedido', error: error.message });
  }
};

// Obtener pedidos del usuario autenticado
export const obtenerMisPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id })
      .populate('productos.producto')
      .sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos', error: error.message });
  }
};

// Obtener todos los pedidos (solo admin)
export const obtenerTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('usuario', 'nombre apellidos correo')
      .populate('productos.producto')
      .sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos', error: error.message });
  }
};

// Actualizar estado del pedido (solo admin)
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { estado } = req.body;
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    
    res.json({ mensaje: 'Estado actualizado', pedido });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar estado', error: error.message });
  }
};

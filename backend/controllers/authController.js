import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { run, nombre, apellidos, correo, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ $or: [{ correo }, { run }] });
    if (usuarioExiste) {
      return res.status(400).json({ 
        mensaje: 'El usuario ya existe con ese correo o RUN' 
      });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      run,
      nombre,
      apellidos,
      correo,
      password: passwordHash,
      tipo: 'Cliente'
    });

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario._id, tipo: nuevoUsuario.tipo },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: nuevoUsuario._id,
        run: nuevoUsuario.run,
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        correo: nuevoUsuario.correo,
        tipo: nuevoUsuario.tipo
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

// Login
export const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar password
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        run: usuario.run,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        tipo: usuario.tipo,
        puntos: usuario.puntos
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

// Obtener perfil del usuario autenticado
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
  }
};

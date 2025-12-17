import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Usuario from '../models/Usuario.js';
import Producto from '../models/Producto.js';

dotenv.config();

const productos = [
  {
    nombre: "Polera Deep Purple",
    descripcion: "Polera de rock de alta calidad con diseño exclusivo inspirado en Deep Purple.",
    precio: 15990,
    stock: 10,
    imagen: "/img/deep-purple.jpg",
    categoria: "Rock Clásico"
  },
  {
    nombre: "Polera Guns N' Roses",
    descripcion: "Polera con el icónico diseño de Guns N' Roses.",
    precio: 14990,
    stock: 8,
    imagen: "/img/guns-roses.jpg",
    categoria: "Hard Rock"
  },
  {
    nombre: "Polera Metallica",
    descripcion: "Polera negra con logo clásico de Metallica. ¡Ideal para fans del metal!",
    precio: 16990,
    stock: 12,
    imagen: "/img/metallica.jpg",
    categoria: "Metal"
  },
  {
    nombre: "Polera Iron Maiden",
    descripcion: "Polera con arte de Iron Maiden, perfecta para los amantes del heavy metal.",
    precio: 16490,
    stock: 9,
    imagen: "/img/iron-maiden.jpg",
    categoria: "Heavy Metal"
  },
  {
    nombre: "Polera Led Zeppelin",
    descripcion: "Polera con el legendario logo de Led Zeppelin. Estilo y rock clásico.",
    precio: 15490,
    stock: 7,
    imagen: "/img/led-zeppelin.jpg",
    categoria: "Rock Clásico"
  },
  {
    nombre: "Polera Red Hot Chili Peppers",
    descripcion: "Polera moderna con el logo de RHCP. Para fans del funk rock.",
    precio: 14990,
    stock: 11,
    imagen: "/img/red-hot-chili-peppers.jpg",
    categoria: "Funk Rock"
  },
  {
    nombre: "Polera AC/DC",
    descripcion: "Polera icónica de AC/DC con diseño clásico.",
    precio: 15990,
    stock: 15,
    imagen: "/img/acdc.jpg",
    categoria: "Hard Rock"
  },
  {
    nombre: "Polera Nirvana",
    descripcion: "Polera con el famoso logo de Nirvana.",
    precio: 14490,
    stock: 13,
    imagen: "/img/nirvana.jpg",
    categoria: "Grunge"
  }
];

const usuarios = [
  {
    run: "19011022K",
    nombre: "Juan",
    apellidos: "Pérez Soto",
    correo: "juan@duoc.cl",
    password: "123456",
    tipo: "Cliente",
    puntos: 50
  },
  {
    run: "20123456K",
    nombre: "Ana",
    apellidos: "Gómez Ruiz",
    correo: "ana@gmail.com",
    password: "admin123",
    tipo: "Administrador",
    puntos: 100
  },
  {
    run: "18765432K",
    nombre: "Carlos",
    apellidos: "Rodríguez López",
    correo: "carlos@rock.com",
    password: "rock2024",
    tipo: "Cliente",
    puntos: 25
  }
];

const seedDB = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    console.log('🗑️  Limpiando base de datos...');
    await Usuario.deleteMany({});
    await Producto.deleteMany({});

    console.log('👥 Creando usuarios...');
    // Hashear passwords y crear usuarios
    const usuariosConHash = await Promise.all(
      usuarios.map(async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(usuario.password, salt);
        return { ...usuario, password: passwordHash };
      })
    );
    await Usuario.insertMany(usuariosConHash);
    console.log(`✅ ${usuariosConHash.length} usuarios creados`);

    console.log('🎸 Creando productos...');
    await Producto.insertMany(productos);
    console.log(`✅ ${productos.length} productos creados`);

    console.log('');
    console.log('🎉 ¡Seed completado exitosamente!');
    console.log('');
    console.log('📝 Usuarios de prueba:');
    console.log('  Cliente: juan@duoc.cl / 123456');
    console.log('  Admin:   ana@gmail.com / admin123');
    console.log('  Cliente: carlos@rock.com / rock2024');
    console.log('');

    // eslint-disable-next-line no-undef
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar seed:', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

seedDB();

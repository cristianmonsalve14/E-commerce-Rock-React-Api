# Backend E-commerce Rock

API REST desarrollada con Node.js, Express y MongoDB para el e-commerce de poleras de rock.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ CRUD completo de productos
- ✅ Gestión de usuarios y roles (Cliente/Administrador)
- ✅ Sistema de pedidos
- ✅ Comentarios con moderación
- ✅ Historial de compras
- ✅ Sistema de puntos y descuentos

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🔧 Instalación

1. Navegar a la carpeta del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Editar el archivo `.env` con tus configuraciones:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce-rock
PORT=5000
JWT_SECRET=tu_clave_secreta_super_segura
NODE_ENV=development
```

## 🗄️ Poblar Base de Datos

Ejecutar el script de seed para crear usuarios y productos de prueba:
```bash
npm run seed
```

Esto creará:
- 8 productos de poleras de rock
- 3 usuarios (1 admin, 2 clientes)

**Usuarios de prueba:**
- Cliente: `juan@duoc.cl` / `123456`
- Admin: `ana@gmail.com` / `admin123`
- Cliente: `carlos@rock.com` / `rock2024`

## ▶️ Ejecución

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints de la API

### Autenticación (`/api/auth`)
- `POST /registro` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión
- `GET /perfil` - Obtener perfil (requiere token)

### Productos (`/api/productos`)
- `GET /` - Obtener todos los productos
- `GET /:id` - Obtener producto por ID
- `POST /` - Crear producto (solo admin)
- `PUT /:id` - Actualizar producto (solo admin)
- `DELETE /:id` - Eliminar producto (solo admin)

### Usuarios (`/api/usuarios`)
- `GET /` - Obtener todos los usuarios (solo admin)
- `GET /:id` - Obtener usuario por ID
- `PUT /:id` - Actualizar usuario
- `DELETE /:id` - Eliminar usuario (solo admin)
- `POST /:id/descuento` - Agregar descuento (solo admin)

### Pedidos (`/api/pedidos`)
- `POST /` - Crear pedido
- `GET /mis-pedidos` - Obtener mis pedidos
- `GET /` - Obtener todos los pedidos (solo admin)
- `PUT /:id/estado` - Actualizar estado (solo admin)

### Comentarios (`/api/comentarios`)
- `GET /` - Obtener comentarios aprobados
- `POST /` - Crear comentario
- `PUT /:id/aprobar` - Aprobar comentario (solo admin)
- `DELETE /:id` - Eliminar comentario (solo admin)

## 🔐 Autenticación

Las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## 🛠️ Tecnologías

- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno

## 📦 Estructura del Proyecto

```
backend/
├── config/
│   └── db.js           # Configuración de MongoDB
├── controllers/        # Lógica de negocio
│   ├── authController.js
│   ├── comentarioController.js
│   ├── pedidoController.js
│   ├── productoController.js
│   └── usuarioController.js
├── middleware/
│   └── auth.js         # Middleware de autenticación
├── models/             # Modelos de Mongoose
│   ├── Comentario.js
│   ├── Pedido.js
│   ├── Producto.js
│   └── Usuario.js
├── routes/             # Rutas de la API
│   ├── authRoutes.js
│   ├── comentarioRoutes.js
│   ├── pedidoRoutes.js
│   ├── productoRoutes.js
│   └── usuarioRoutes.js
├── seeds/
│   └── seed.js         # Script para poblar BD
├── .env                # Variables de entorno
├── .gitignore
├── package.json
├── README.md
└── server.js           # Punto de entrada
```

## 🧪 Pruebas con Postman

Importa la colección de Postman (si existe) o usa estos ejemplos:

### Registro
```json
POST http://localhost:5000/api/auth/registro
{
  "run": "12345678-9",
  "nombre": "Test",
  "apellidos": "Usuario",
  "correo": "test@test.com",
  "password": "123456"
}
```

### Login
```json
POST http://localhost:5000/api/auth/login
{
  "correo": "ana@gmail.com",
  "password": "admin123"
}
```

## 📝 Licencia

MIT

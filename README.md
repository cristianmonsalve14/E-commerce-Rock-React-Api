# 🎸 E-commerce Rock - Fullstack Application

Aplicación de e-commerce para venta de poleras de bandas de rock, desarrollada con React y Node.js.

---

## � Documentación del Proyecto

Este proyecto cuenta con documentación completa organizada en los siguientes archivos:

- **📖 README.md** (este archivo) - Vista general y referencia rápida
- **📋 [GUIA_USO.md](./GUIA_USO.md)** - Guía paso a paso para instalar e iniciar el proyecto
- **📊 [INFORME_FINAL.md](./INFORME_FINAL.md)** - Informe técnico completo del proyecto

> 💡 **¿Primera vez aquí?** Comienza leyendo **[GUIA_USO.md](./GUIA_USO.md)**

---

## �📁 Estructura del Proyecto

```
ecommerce-rock-react/
├── 📂 frontend/          # Aplicación React con Vite
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── services/    # Conexión con API
│   │   └── data/        # Datos y helpers
│   ├── public/
│   └── package.json
│
├── 📂 backend/           # API REST con Node.js y Express
│   ├── config/          # Configuración DB
│   ├── controllers/     # Lógica de negocio
│   ├── models/          # Modelos MongoDB
│   ├── routes/          # Rutas de la API
│   ├── middleware/      # Autenticación
│   ├── seeds/           # Datos iniciales
│   └── package.json
│
├── 📄 README.md         # Este archivo
├── � GUIA_USO.md       # Guía de instalación y uso
└── 📄 INFORME_FINAL.md  # Informe técnico completo
```

---

## ⚡ Inicio Rápido

### 1. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `backend/.env`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/ecommerce-rock
PORT=5000
JWT_SECRET=tu_secreto_super_seguro
```

### 3. Poblar Base de Datos

```bash
cd backend
npm run seed
```

### 4. Iniciar Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend: `http://localhost:5173`

> 📖 **Para instrucciones detalladas, consulta [GUIA_USO.md](./GUIA_USO.md)**

---

## 👥 Usuarios de Prueba

| Rol | Email | Password | Puntos | Descuento |
|-----|-------|----------|--------|-----------|
| **Admin** | ana@gmail.com | admin123 | 0 | 0% |
| **Cliente** | juan@duoc.cl | 123456 | 150 | 10% |
| **Cliente** | carlos@rock.com | rock2024 | 80 | 5% |

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 19.1.1 - Biblioteca UI
- **Vite** 7.1.11 - Build tool y dev server
- **React Router DOM** 7.9.4 - Enrutamiento SPA
- **Axios** - Cliente HTTP
- **CSS3** - Estilos personalizados

### Backend
- **Node.js** 18+ - Runtime de JavaScript
- **Express** 4.18.2 - Framework web
- **MongoDB Atlas** - Base de datos NoSQL
- **Mongoose** 8.0.3 - ODM para MongoDB
- **JWT** 9.0.2 - Autenticación
- **bcryptjs** 2.4.3 - Encriptación de contraseñas
- **CORS** 2.8.5 - Cross-origin requests

---

## � Características Principales

### 🔐 Autenticación
- ✅ Registro e inicio de sesión con JWT
- ✅ Roles: Cliente y Administrador
- ✅ Rutas protegidas con middleware
- ✅ Persistencia de sesión

### 🛒 E-commerce
- ✅ Catálogo de productos con búsqueda
- ✅ Carrito de compras interactivo
- ✅ Sistema de pedidos completo
- ✅ Gestión de stock automática

### 👤 Usuario
- ✅ Historial de compras
- ✅ Sistema de puntos
- ✅ Descuentos personalizados
- ✅ Perfil editable

### 👨‍💼 Administración
- ✅ CRUD de productos
- ✅ Gestión de usuarios
- ✅ Control de pedidos
- ✅ Moderación de comentarios
- ✅ Asignación de descuentos

---

## 📝 Scripts Disponibles

### Frontend (`frontend/`)
```bash
npm run dev       # Servidor de desarrollo (http://localhost:5173)
npm run build     # Compilar para producción
npm run preview   # Previsualizar build
npm test          # Ejecutar tests
```

### Backend (`backend/`)
```bash
npm run dev       # Servidor con nodemon (http://localhost:5000)
npm start         # Servidor en producción
npm run seed      # Poblar base de datos inicial
```

---

## 📚 Más Información

Para información detallada, consulta:

- **[GUIA_USO.md](./GUIA_USO.md)** - Instalación paso a paso y solución de problemas
- **[INFORME_FINAL.md](./INFORME_FINAL.md)** - Arquitectura completa, modelos de datos, API endpoints, y más

---

## 🎓 Información Académica

- **Institución**: Duoc UC
- **Asignatura**: Fullstack II
- **Semestre**: 4
- **Año**: 2025

## 📄 Licencia

Este proyecto es para fines educativos.

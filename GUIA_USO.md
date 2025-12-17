# 🚀 Guía de Inicio Rápido - E-commerce Rock

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** versión 18 o superior
- ✅ **npm** o **yarn**
- ✅ **Cuenta de MongoDB Atlas** (gratis)
- ✅ Editor de código (VS Code recomendado)

---

## 🔧 Instalación Inicial

### 1️⃣ Configurar Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install
```

### 2️⃣ Configurar Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/ecommerce-rock
PORT=5000
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
```

> 💡 **Tip**: Reemplaza `tu_usuario`, `tu_password` y el nombre del cluster con tus datos de MongoDB Atlas.

### 3️⃣ Poblar la Base de Datos

```bash
# Estando en la carpeta backend
npm run seed
```

Esto creará:
- ✅ 3 usuarios de prueba
- ✅ 8 productos iniciales

### 4️⃣ Configurar Frontend

```bash
# Navegar a la carpeta frontend
cd ../frontend

# Instalar dependencias
npm install
```

---

## ▶️ Iniciar el Proyecto

### Opción A: Dos Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend corriendo en: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend corriendo en: `http://localhost:5173`

### Opción B: Scripts Concurrentes (Opcional)

Puedes crear un script en la raíz del proyecto para iniciar ambos servidores simultáneamente usando `concurrently` o `npm-run-all`.

---

## 🔑 Credenciales de Acceso

### 👨‍💼 Cuenta de Administrador
- **Email**: `ana@gmail.com`
- **Password**: `admin123`
- **Permisos**: Acceso total, gestión de usuarios, productos, pedidos

### 👤 Cuenta de Cliente 1
- **Email**: `juan@duoc.cl`
- **Password**: `123456`
- **Puntos**: 150 puntos
- **Descuento**: 10%

### 👤 Cuenta de Cliente 2
- **Email**: `carlos@rock.com`
- **Password**: `rock2024`
- **Puntos**: 80 puntos
- **Descuento**: 5%

---

## 🧪 Verificar Instalación

### 1. Verificar Backend
Abre tu navegador o Postman y accede a:
```
http://localhost:5000/api/productos
```
Deberías ver un JSON con 8 productos.

### 2. Verificar Frontend
Abre tu navegador en:
```
http://localhost:5173
```
Deberías ver la página principal del e-commerce.

### 3. Probar Login
1. Haz clic en "Iniciar Sesión"
2. Ingresa las credenciales de admin o cliente
3. Deberías ser redirigido según tu rol

---

## 📱 Funcionalidades Disponibles

### Como Cliente
- ✅ Ver catálogo de productos
- ✅ Buscar y filtrar productos
- ✅ Agregar productos al carrito
- ✅ Realizar pedidos
- ✅ Ver historial de compras
- ✅ Ver puntos acumulados
- ✅ Aplicar descuentos
- ✅ Dejar comentarios en blog

### Como Administrador
- ✅ Todas las funciones de cliente
- ✅ Gestionar productos (Crear, Editar, Eliminar)
- ✅ Gestionar usuarios
- ✅ Ver todos los pedidos
- ✅ Cambiar estados de pedidos
- ✅ Aprobar/rechazar comentarios
- ✅ Asignar descuentos a usuarios

---

## 🛠️ Scripts Disponibles

### Backend (`backend/`)
```bash
npm run dev      # Iniciar servidor con nodemon (auto-reload)
npm start        # Iniciar servidor en producción
npm run seed     # Poblar base de datos con datos iniciales
```

### Frontend (`frontend/`)
```bash
npm run dev      # Iniciar servidor de desarrollo Vite
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm test         # Ejecutar tests unitarios
```

---

## ❓ Solución de Problemas Comunes

### Error: "Cannot connect to MongoDB"
- ✅ Verifica que tu IP esté en la whitelist de MongoDB Atlas
- ✅ Confirma que el connection string en `.env` sea correcto
- ✅ Verifica que tengas conexión a internet

### Error: "Port 5000 already in use"
- ✅ Cambia el puerto en `backend/.env` a otro (ej: 5001)
- ✅ Actualiza `frontend/src/services/api.js` con el nuevo puerto

### Error: "Module not found"
- ✅ Ejecuta `npm install` en la carpeta correspondiente
- ✅ Elimina `node_modules` y `package-lock.json`, luego reinstala

### Frontend no carga productos
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la consola del navegador para errores
- ✅ Confirma que la URL en `api.js` apunte a `http://localhost:5000`

---

## 📚 Documentación Adicional

- **README.md**: Documentación técnica completa
- **INFORME_FINAL.md**: Informe detallado del proyecto
- **backend/README.md**: Documentación específica del backend
- **backend/MONGODB_SETUP.md**: Guía de configuración de MongoDB

---

## 🎯 Próximos Pasos

1. ✅ **Explorar la aplicación** con las diferentes cuentas
2. ✅ **Probar todas las funcionalidades** (compras, admin, etc.)
3. ✅ **Revisar el código** para entender la arquitectura
4. ✅ **Modificar y personalizar** según tus necesidades
5. ✅ **Agregar nuevas funcionalidades** (ver INFORME_FINAL.md)

---

## 💡 Tips Útiles

- 🔄 El backend se reinicia automáticamente al guardar cambios (nodemon)
- ⚡ El frontend tiene Hot Module Replacement (HMR) con Vite
- 🔐 Los tokens JWT expiran en 24 horas por defecto
- 💾 La sesión persiste en localStorage
- 📊 Puedes ver la base de datos visualmente con MongoDB Compass

---

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en la consola del terminal
2. Verifica los errores en la consola del navegador (F12)
3. Consulta la documentación en los archivos .md
4. Revisa que todas las dependencias estén instaladas

---

**¡Listo para rockear! 🎸**

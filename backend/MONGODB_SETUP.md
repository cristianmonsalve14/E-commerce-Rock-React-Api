# 🗄️ Configurar MongoDB para el Proyecto

## Opción A: MongoDB Atlas (Cloud - Gratis) ⭐ RECOMENDADO

### Pasos:

1. **Crear cuenta gratuita en MongoDB Atlas:**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Regístrate con tu email o cuenta de Google

2. **Crear un Cluster:**
   - Selecciona "Create a FREE Shared Cluster"
   - Elige la región más cercana (ej: AWS - N. Virginia o São Paulo)
   - Haz clic en "Create Cluster"

3. **Configurar acceso:**
   - En "Security" > "Database Access":
     - Crea un usuario (ej: `admin`)
     - Guarda la contraseña que generes
   
   - En "Security" > "Network Access":
     - Haz clic en "Add IP Address"
     - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
     - Confirma

4. **Obtener Connection String:**
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia el connection string, se verá así:
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

5. **Actualizar archivo .env:**
   - Abre `backend/.env`
   - Reemplaza `<password>` con tu contraseña real
   - Cambia la línea MONGODB_URI:
     ```env
     MONGODB_URI=mongodb+srv://admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce-rock?retryWrites=true&w=majority
     ```

---

## Opción B: Instalar MongoDB Localmente

### Para Windows:

1. **Descargar MongoDB:**
   - Ve a: https://www.mongodb.com/try/download/community
   - Descarga "MongoDB Community Server" para Windows
   - Versión recomendada: 7.0 o superior

2. **Instalar:**
   - Ejecuta el instalador
   - Selecciona "Complete" installation
   - Marca "Install MongoDB as a Service"
   - Mantén la ruta por defecto: `C:\Program Files\MongoDB\Server\7.0\`

3. **Verificar instalación:**
   ```powershell
   mongod --version
   ```

4. **Iniciar servicio (si no inició automáticamente):**
   ```powershell
   net start MongoDB
   ```

5. **El archivo .env ya está configurado:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce-rock
   ```

---

## 🚀 Después de Configurar MongoDB

1. **Poblar la base de datos:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

3. **Verificar que funciona:**
   - Abre: http://localhost:5000
   - Deberías ver un JSON con información de la API

---

## ⚡ Recomendación

Si solo quieres probar el proyecto rápidamente, usa **MongoDB Atlas** (Opción A).
Es más rápido y no requiere instalación.

Si planeas desarrollar mucho sin internet, instala **MongoDB Local** (Opción B).

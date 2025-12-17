# 🚀 GUÍA DE ENDPOINTS PARA POSTMAN

Base URL: `http://localhost:5000/api`

---

## 🔐 AUTENTICACIÓN

### 1. Registro de Usuario
- **Método:** `POST`
- **URL:** `http://localhost:5000/api/auth/registro`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "run": "12345678-9",
  "nombre": "Pedro",
  "apellidos": "González",
  "correo": "pedro@test.com",
  "password": "123456"
}
```
- **Respuesta exitosa:**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "...",
    "run": "12345678-9",
    "nombre": "Pedro",
    "apellidos": "González",
    "correo": "pedro@test.com",
    "tipo": "Cliente"
  }
}
```

---

### 2. Login
- **Método:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "correo": "ana@gmail.com",
  "password": "admin123"
}
```
- **Respuesta exitosa:**
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "...",
    "nombre": "Ana",
    "tipo": "Administrador"
  }
}
```

---

### 3. Obtener Perfil (requiere token)
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/auth/perfil`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TU_TOKEN_AQUI`

---

## 📦 PRODUCTOS

### 4. Obtener todos los productos
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/productos`
- **Headers:** `Content-Type: application/json`
- **Respuesta:**
```json
[
  {
    "_id": "6942131cc18884d450cbc40a",
    "nombre": "Polera Deep Purple",
    "descripcion": "Polera de rock de alta calidad...",
    "precio": 15990,
    "stock": 10,
    "imagen": "/img/polera1.jpg",
    "activo": true
  }
]
```

---

### 5. Obtener producto por ID
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/productos/6942131cc18884d450cbc40a`
- **Headers:** `Content-Type: application/json`

---

### 6. Crear producto (requiere token de admin)
- **Método:** `POST`
- **URL:** `http://localhost:5000/api/productos`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`
- **Body (JSON):**
```json
{
  "nombre": "Polera AC/DC",
  "descripcion": "Polera negra con logo de AC/DC",
  "precio": 18990,
  "stock": 15,
  "imagen": "/img/polera-acdc.jpg"
}
```

---

### 7. Actualizar producto (requiere token de admin)
- **Método:** `PUT`
- **URL:** `http://localhost:5000/api/productos/ID_DEL_PRODUCTO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`
- **Body (JSON):**
```json
{
  "nombre": "Polera AC/DC ACTUALIZADA",
  "precio": 19990,
  "stock": 20
}
```

---

### 8. Eliminar producto (requiere token de admin)
- **Método:** `DELETE`
- **URL:** `http://localhost:5000/api/productos/ID_DEL_PRODUCTO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

## 👥 USUARIOS (requieren token de admin)

### 9. Obtener todos los usuarios
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/usuarios`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

### 10. Obtener usuario por ID
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/usuarios/ID_DEL_USUARIO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

### 11. Actualizar usuario
- **Método:** `PUT`
- **URL:** `http://localhost:5000/api/usuarios/ID_DEL_USUARIO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`
- **Body (JSON):**
```json
{
  "nombre": "Juan Carlos",
  "tipo": "Administrador"
}
```

---

### 12. Eliminar usuario
- **Método:** `DELETE`
- **URL:** `http://localhost:5000/api/usuarios/ID_DEL_USUARIO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

## 🛒 PEDIDOS

### 13. Crear pedido (requiere token)
- **Método:** `POST`
- **URL:** `http://localhost:5000/api/pedidos`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TU_TOKEN`
- **Body (JSON):**
```json
{
  "productos": [
    {
      "producto": "ID_PRODUCTO_1",
      "cantidad": 2,
      "precio": 15990
    },
    {
      "producto": "ID_PRODUCTO_2",
      "cantidad": 1,
      "precio": 18990
    }
  ],
  "total": 50970
}
```

---

### 14. Obtener mis pedidos (requiere token)
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/pedidos/mis-pedidos`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TU_TOKEN`

---

### 15. Obtener todos los pedidos (admin)
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/pedidos`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

## 💬 COMENTARIOS

### 16. Crear comentario (requiere token)
- **Método:** `POST`
- **URL:** `http://localhost:5000/api/comentarios`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TU_TOKEN`
- **Body (JSON):**
```json
{
  "contenido": "Excelente servicio, muy recomendado!"
}
```

---

### 17. Obtener comentarios aprobados
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/comentarios`
- **Headers:** `Content-Type: application/json`

---

### 18. Obtener todos los comentarios (admin)
- **Método:** `GET`
- **URL:** `http://localhost:5000/api/comentarios/admin`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

### 19. Aprobar comentario (admin)
- **Método:** `PUT`
- **URL:** `http://localhost:5000/api/comentarios/ID_COMENTARIO/aprobar`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

### 20. Eliminar comentario (admin)
- **Método:** `DELETE`
- **URL:** `http://localhost:5000/api/comentarios/ID_COMENTARIO`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer TOKEN_DE_ADMIN`

---

## 📝 CÓMO USAR EN POSTMAN

### Paso 1: Login y obtener token
1. Crea request POST a `/api/auth/login`
2. Usa credenciales de admin: `ana@gmail.com` / `admin123`
3. Copia el token de la respuesta

### Paso 2: Configurar Authorization
1. En Postman, pestaña "Authorization"
2. Type: "Bearer Token"
3. Pega el token copiado

### Paso 3: Probar endpoints
1. Prueba GET `/api/productos` (sin token)
2. Prueba POST `/api/productos` (con token de admin)
3. Prueba PUT y DELETE con IDs reales de MongoDB

---

## 🎯 USUARIOS DE PRUEBA

**Admin:**
- Correo: `ana@gmail.com`
- Password: `admin123`

**Clientes:**
- Correo: `juan@duoc.cl`
- Password: `123456`

- Correo: `carlos@rock.com`
- Password: `rock2024`

---

## ⚠️ NOTAS IMPORTANTES

1. **Token expira:** El JWT expira después de cierto tiempo
2. **CORS habilitado:** El backend acepta peticiones desde el frontend
3. **Validaciones:** El backend valida todos los datos antes de guardar
4. **IDs de MongoDB:** Usa IDs reales de tu base de datos

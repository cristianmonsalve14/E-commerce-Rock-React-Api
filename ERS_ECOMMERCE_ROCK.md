# 📋 ERS - Especificación de Requisitos de Software
## E-Commerce Rock - Sistema de Venta de Poleras

**Versión**: 1.0  
**Fecha**: Diciembre 17, 2025  
**Proyecto**: E-Commerce Rock Fullstack  
**Institución**: Duoc UC  
**Asignatura**: Fullstack II  
**Autor**: Cristian Budrovich

---

## 1. INTRODUCCIÓN

### 1.1 Propósito
Este documento especifica los requisitos funcionales y no funcionales del sistema **E-Commerce Rock**, una aplicación web fullstack para la venta de poleras de bandas de rock, desarrollada como proyecto académico para la asignatura Fullstack II.

### 1.2 Alcance
El sistema E-Commerce Rock permite:
- A los **clientes**: navegar por el catálogo, agregar productos al carrito, realizar compras y gestionar su perfil.
- A los **administradores**: gestionar productos, usuarios, pedidos y comentarios a través de un panel de administración.

### 1.3 Definiciones, Acrónimos y Abreviaciones
- **ERS**: Especificación de Requisitos de Software
- **CRUD**: Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar)
- **JWT**: JSON Web Token (autenticación basada en tokens)
- **API REST**: Interfaz de programación de aplicaciones basada en REST
- **SPA**: Single Page Application
- **ODM**: Object Document Mapper (Mongoose para MongoDB)

### 1.4 Referencias
- Documentación de React: https://react.dev
- Documentación de Node.js: https://nodejs.org
- Documentación de MongoDB: https://www.mongodb.com/docs
- Documentación de Express: https://expressjs.com

### 1.5 Visión General
Este documento está organizado en las siguientes secciones:
- Sección 2: Descripción general del sistema
- Sección 3: Requisitos funcionales
- Sección 4: Requisitos no funcionales
- Sección 5: Casos de uso
- Sección 6: Historias de usuario
- Sección 7: Modelo de datos

---

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto
E-Commerce Rock es una aplicación web fullstack independiente que consta de:
- **Frontend**: Aplicación React (SPA) que se ejecuta en el navegador del cliente
- **Backend**: API REST desarrollada en Node.js + Express
- **Base de Datos**: MongoDB Atlas (base de datos NoSQL en la nube)

### 2.2 Funciones del Producto
El sistema proporciona las siguientes funciones principales:

#### 2.2.1 Para Clientes
- Registro e inicio de sesión
- Navegación por catálogo de productos
- Visualización de detalles de productos
- Gestión de carrito de compras
- Realización de pedidos
- Visualización de historial de compras
- Sistema de puntos y descuentos
- Publicación de comentarios

#### 2.2.2 Para Administradores
- Todas las funciones de cliente
- CRUD completo de productos
- CRUD completo de usuarios
- Gestión de pedidos (visualización y actualización de estados)
- Aprobación/rechazo de comentarios
- Visualización de estadísticas (pendiente)

### 2.3 Características de los Usuarios

| Tipo de Usuario | Características | Conocimientos Técnicos |
|-----------------|-----------------|------------------------|
| **Cliente** | Usuario final que desea comprar poleras de bandas de rock | Básico (navegación web) |
| **Administrador** | Personal encargado de gestionar el inventario y pedidos | Intermedio (uso de panel administrativo) |
| **Desarrollador** | Mantiene y actualiza el sistema | Avanzado (React, Node.js, MongoDB) |

### 2.4 Restricciones
- El sistema requiere conexión a Internet para acceder a MongoDB Atlas
- El frontend debe ejecutarse en navegadores modernos (Chrome, Firefox, Edge, Safari)
- El backend requiere Node.js v18 o superior
- Los usuarios deben tener JavaScript habilitado en el navegador

### 2.5 Suposiciones y Dependencias
- MongoDB Atlas estará disponible en todo momento
- Los usuarios tienen acceso a navegadores web actualizados
- El servidor backend está disponible 24/7 (en producción)
- Las imágenes de productos están alojadas localmente o en CDN

---

## 3. REQUISITOS FUNCIONALES

### RF-001: Registro de Usuarios
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir a nuevos usuarios registrarse proporcionando sus datos personales.

**Entradas**:
- RUN (formato: 12345678-9)
- Nombre
- Apellidos
- Correo electrónico
- Contraseña

**Proceso**:
1. Validar formato de RUN chileno
2. Validar formato de correo electrónico
3. Verificar que el correo no esté registrado
4. Encriptar contraseña con bcrypt (10 salt rounds)
5. Crear usuario en MongoDB con rol "Cliente"

**Salidas**:
- Usuario creado exitosamente
- Mensaje de confirmación
- Redirección a página de login

**Criterios de aceptación**:
- ✅ RUN debe tener formato válido (ej: 12345678-9)
- ✅ Email debe ser único en el sistema
- ✅ Contraseña debe tener mínimo 4 caracteres
- ✅ Contraseña se almacena encriptada
- ✅ Usuario creado tiene rol "Cliente" por defecto

---

### RF-002: Inicio de Sesión
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir a usuarios registrados iniciar sesión.

**Entradas**:
- Correo electrónico
- Contraseña

**Proceso**:
1. Validar que los campos no estén vacíos
2. Buscar usuario por correo electrónico
3. Comparar contraseña con bcrypt
4. Generar JWT con id de usuario y rol
5. Devolver token al cliente

**Salidas**:
- Token JWT (válido por 24 horas)
- Datos del usuario (sin contraseña)
- Redirección según rol:
  - Admin → `/admin`
  - Cliente → `/`

**Criterios de aceptación**:
- ✅ Validar credenciales correctamente
- ✅ Token JWT incluye id y tipo de usuario
- ✅ Token expira en 24 horas
- ✅ Redirección automática según rol
- ✅ Mensaje de error si credenciales inválidas

---

### RF-003: Listar Productos (Catálogo)
**Prioridad**: Alta  
**Descripción**: El sistema debe mostrar todos los productos disponibles en el catálogo.

**Entradas**:
- Ninguna (endpoint público)

**Proceso**:
1. Consultar colección `productos` en MongoDB
2. Filtrar productos con `activo: true`
3. Devolver array de productos

**Salidas**:
- Lista de productos con:
  - ID de MongoDB
  - Nombre
  - Descripción
  - Precio
  - Stock
  - Categoría
  - Imagen

**Criterios de aceptación**:
- ✅ Mostrar solo productos activos
- ✅ Incluir información completa de cada producto
- ✅ Endpoint accesible sin autenticación
- ✅ Respuesta en formato JSON

---

### RF-004: Visualizar Detalle de Producto
**Prioridad**: Media  
**Descripción**: El sistema debe mostrar información detallada de un producto específico.

**Entradas**:
- ID del producto (MongoDB ObjectId)

**Proceso**:
1. Buscar producto por ID en MongoDB
2. Devolver datos completos del producto

**Salidas**:
- Producto encontrado con todos sus datos
- Error 404 si no existe

**Criterios de aceptación**:
- ✅ Mostrar toda la información del producto
- ✅ Manejar caso de producto no encontrado
- ✅ Incluir stock disponible

---

### RF-005: Agregar Producto al Carrito
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir a los usuarios agregar productos a su carrito de compras.

**Entradas**:
- Producto seleccionado
- Cantidad

**Proceso**:
1. Validar que el producto existe
2. Verificar stock disponible
3. Agregar al carrito (localStorage)
4. Mostrar notificación de confirmación

**Salidas**:
- Producto agregado al carrito
- Contador de carrito actualizado
- Toast notification

**Criterios de aceptación**:
- ✅ No permitir agregar si stock = 0
- ✅ Persistir carrito en localStorage
- ✅ Actualizar contador visual
- ✅ Mostrar mensaje de confirmación

---

### RF-006: Gestionar Carrito de Compras
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir visualizar, modificar y vaciar el carrito.

**Entradas**:
- Productos en carrito (desde localStorage)

**Proceso**:
1. Leer carrito desde localStorage
2. Mostrar productos con cantidades y subtotales
3. Calcular total del carrito
4. Permitir:
   - Incrementar cantidad
   - Decrementar cantidad
   - Eliminar producto
   - Vaciar carrito completo

**Salidas**:
- Lista de productos en carrito
- Total a pagar
- Carrito actualizado

**Criterios de aceptación**:
- ✅ Calcular total correctamente
- ✅ Actualizar localStorage al modificar carrito
- ✅ No permitir cantidades menores a 1
- ✅ Mostrar mensaje si carrito vacío

---

### RF-007: Crear Pedido
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir a usuarios autenticados realizar pedidos.

**Entradas**:
- Token JWT (autenticación)
- Lista de productos con cantidades
- Dirección de envío

**Proceso**:
1. Verificar autenticación del usuario
2. Validar stock de cada producto
3. Calcular total del pedido
4. Crear pedido en MongoDB
5. Actualizar stock de productos
6. Agregar puntos al usuario (10% del total)
7. Vaciar carrito

**Salidas**:
- Pedido creado con estado "Pendiente"
- Confirmación al usuario
- Carrito vacío

**Criterios de aceptación**:
- ✅ Solo usuarios autenticados pueden crear pedidos
- ✅ Validar stock antes de confirmar
- ✅ Reducir stock automáticamente
- ✅ Asignar puntos al usuario
- ✅ Estado inicial: "Pendiente"

---

### RF-008: CRUD de Productos (Administrador)
**Prioridad**: Alta  
**Descripción**: El sistema debe permitir a administradores gestionar productos.

#### RF-008.1: Crear Producto
**Entradas**:
- Token JWT (rol: Administrador)
- Nombre
- Descripción
- Precio
- Stock
- Categoría
- Imagen (URL)

**Proceso**:
1. Verificar autenticación y rol admin
2. Validar datos del producto
3. Crear producto en MongoDB
4. Devolver confirmación

**Salidas**:
- Producto creado en MongoDB
- Mensaje: "✅ Producto agregado en MongoDB exitosamente"

**Criterios de aceptación**:
- ✅ Solo administradores pueden crear productos
- ✅ Validar todos los campos requeridos
- ✅ Precio y stock deben ser números positivos
- ✅ Producto creado con `activo: true`

#### RF-008.2: Actualizar Producto
**Entradas**:
- Token JWT (rol: Administrador)
- ID del producto
- Datos a actualizar

**Proceso**:
1. Verificar autenticación y rol admin
2. Buscar producto por ID
3. Actualizar campos en MongoDB
4. Devolver confirmación

**Salidas**:
- Producto actualizado
- Mensaje: "✅ Producto actualizado en MongoDB exitosamente"

**Criterios de aceptación**:
- ✅ Solo administradores pueden actualizar
- ✅ Validar que el producto existe
- ✅ Actualizar fecha `updatedAt`

#### RF-008.3: Eliminar Producto
**Entradas**:
- Token JWT (rol: Administrador)
- ID del producto

**Proceso**:
1. Verificar autenticación y rol admin
2. Buscar producto por ID
3. Eliminar de MongoDB (eliminación física)
4. Devolver confirmación

**Salidas**:
- Producto eliminado
- Mensaje: "✅ Producto eliminado de MongoDB exitosamente"

**Criterios de aceptación**:
- ✅ Solo administradores pueden eliminar
- ✅ Confirmar antes de eliminar
- ✅ Manejar error si producto no existe

---

### RF-009: CRUD de Usuarios (Administrador)
**Prioridad**: Media  
**Descripción**: El sistema debe permitir a administradores gestionar usuarios.

**Funcionalidades**:
- Listar todos los usuarios
- Ver detalle de usuario
- Actualizar datos de usuario
- Eliminar usuario
- Cambiar rol de usuario (Cliente ↔ Administrador)

**Criterios de aceptación**:
- ✅ Solo administradores tienen acceso
- ✅ No se puede eliminar el propio usuario admin
- ✅ Las contraseñas no se muestran en las respuestas

---

### RF-010: Gestión de Pedidos (Administrador)
**Prioridad**: Media  
**Descripción**: El sistema debe permitir a administradores gestionar pedidos.

**Funcionalidades**:
- Listar todos los pedidos
- Ver detalle de pedido con productos
- Actualizar estado del pedido:
  - Pendiente → Procesando
  - Procesando → Enviado
  - Enviado → Entregado

**Criterios de aceptación**:
- ✅ Solo administradores pueden gestionar pedidos
- ✅ Mostrar información del usuario y productos
- ✅ Validar transiciones de estado

---

### RF-011: Sistema de Comentarios
**Prioridad**: Baja  
**Descripción**: El sistema debe permitir a usuarios publicar comentarios y a administradores aprobarlos.

#### RF-011.1: Crear Comentario
**Entradas**:
- Token JWT (usuario autenticado)
- Contenido del comentario

**Proceso**:
1. Verificar autenticación
2. Crear comentario con `aprobado: false`
3. Guardar en MongoDB

**Salidas**:
- Comentario creado (pendiente de aprobación)

#### RF-011.2: Aprobar Comentario
**Entradas**:
- Token JWT (rol: Administrador)
- ID del comentario

**Proceso**:
1. Verificar rol admin
2. Actualizar `aprobado: true`

**Salidas**:
- Comentario visible públicamente

**Criterios de aceptación**:
- ✅ Solo usuarios autenticados pueden comentar
- ✅ Solo administradores pueden aprobar
- ✅ Solo comentarios aprobados son visibles

---

### RF-012: Sistema de Puntos y Descuentos
**Prioridad**: Baja  
**Descripción**: El sistema debe asignar puntos a usuarios por sus compras.

**Proceso**:
- Por cada compra, el usuario recibe 10% del total en puntos
- Los puntos se acumulan en el perfil del usuario
- (Futuro) Los puntos pueden canjearse por descuentos

**Criterios de aceptación**:
- ✅ Puntos se asignan automáticamente al crear pedido
- ✅ Puntos se almacenan en el modelo Usuario

---

## 4. REQUISITOS NO FUNCIONALES

### RNF-001: Seguridad
**Descripción**: El sistema debe garantizar la seguridad de los datos de usuarios.

**Criterios**:
- ✅ Contraseñas encriptadas con bcrypt (10 salt rounds)
- ✅ Autenticación basada en JWT
- ✅ Tokens con expiración de 24 horas
- ✅ Validación de roles en cada endpoint protegido
- ✅ Variables sensibles en archivo .env (no versionado)
- ✅ CORS configurado correctamente
- ✅ Validación de datos en frontend y backend

---

### RNF-002: Rendimiento
**Descripción**: El sistema debe responder de manera eficiente.

**Criterios**:
- ✅ Tiempo de respuesta de API < 500ms (promedio)
- ✅ Carga inicial de SPA < 3 segundos
- ✅ MongoDB Atlas con índices en campos frecuentemente consultados
- ✅ Lazy loading de componentes React (futuro)

---

### RNF-003: Usabilidad
**Descripción**: El sistema debe ser fácil de usar.

**Criterios**:
- ✅ Interfaz intuitiva y moderna
- ✅ Mensajes de error claros y específicos
- ✅ Validaciones en tiempo real en formularios
- ✅ Notificaciones visuales (toasts) para acciones
- ✅ Diseño responsive (mobile, tablet, desktop)

---

### RNF-004: Compatibilidad
**Descripción**: El sistema debe funcionar en navegadores modernos.

**Navegadores soportados**:
- ✅ Google Chrome (últimas 2 versiones)
- ✅ Mozilla Firefox (últimas 2 versiones)
- ✅ Microsoft Edge (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)

**Requisitos técnicos**:
- JavaScript habilitado
- Cookies y localStorage habilitados
- Resolución mínima: 320px (mobile)

---

### RNF-005: Mantenibilidad
**Descripción**: El código debe ser mantenible y escalable.

**Criterios**:
- ✅ Código modular y organizado
- ✅ Separación de responsabilidades (MVC en backend)
- ✅ Componentes React reutilizables
- ✅ Documentación completa (4 archivos .md)
- ✅ Comentarios en código cuando sea necesario
- ✅ Estructura de carpetas clara

---

### RNF-006: Disponibilidad
**Descripción**: El sistema debe estar disponible.

**Criterios**:
- ✅ MongoDB Atlas con alta disponibilidad (cloud)
- ✅ Manejo de errores con mensajes apropiados
- ✅ Auto-reconexión a MongoDB en caso de pérdida de conexión

---

### RNF-007: Escalabilidad
**Descripción**: El sistema debe poder escalar.

**Criterios**:
- ✅ Arquitectura frontend-backend separada
- ✅ API REST stateless (JWT)
- ✅ MongoDB Atlas permite escalado horizontal
- ✅ Frontend puede servirse desde CDN

---

### RNF-008: Testing
**Descripción**: El sistema debe tener pruebas automatizadas.

**Criterios**:
- ✅ 23 tests unitarios en frontend (Jest + Testing Library)
- ✅ 100% de tests pasando
- ✅ Tests con mocks de API
- ✅ Validación manual de endpoints con Postman

---

## 5. CASOS DE USO

### CU-001: Cliente Realiza una Compra

**Actor Principal**: Cliente  
**Precondiciones**:
- El usuario está registrado
- Hay productos disponibles en stock

**Flujo Principal**:
1. Cliente navega al catálogo de productos
2. Cliente visualiza productos disponibles
3. Cliente selecciona un producto
4. Cliente hace clic en "Agregar al carrito"
5. Sistema muestra notificación de confirmación
6. Cliente continúa comprando o va al carrito
7. Cliente hace clic en "Ir al carrito"
8. Sistema muestra resumen del carrito con total
9. Cliente hace clic en "Finalizar compra"
10. Sistema solicita inicio de sesión (si no está logueado)
11. Cliente inicia sesión
12. Sistema crea pedido en MongoDB
13. Sistema reduce stock de productos
14. Sistema asigna puntos al usuario
15. Sistema vacía el carrito
16. Sistema muestra confirmación del pedido

**Flujos Alternativos**:
- **3a**: Producto sin stock
  - Sistema deshabilita botón "Agregar al carrito"
  - Muestra mensaje "Sin stock"

- **10a**: Usuario no registrado
  - Sistema redirige a página de registro
  - Usuario se registra y continúa

**Postcondiciones**:
- Pedido creado en base de datos
- Stock actualizado
- Puntos asignados al usuario
- Carrito vacío

---

### CU-002: Administrador Gestiona Productos

**Actor Principal**: Administrador  
**Precondiciones**:
- Usuario tiene rol "Administrador"
- Usuario está autenticado

**Flujo Principal**:
1. Admin inicia sesión
2. Sistema redirige a panel de administración
3. Admin navega a sección "Productos"
4. Sistema muestra lista de productos desde MongoDB
5. Admin selecciona acción:
   - **5a. Crear producto**:
     - Admin hace clic en "Agregar Producto"
     - Admin completa formulario
     - Sistema valida datos
     - Sistema crea producto en MongoDB
     - Sistema muestra "✅ Producto agregado en MongoDB exitosamente"
   
   - **5b. Editar producto**:
     - Admin hace clic en "Editar" en un producto
     - Sistema carga datos del producto
     - Admin modifica campos
     - Sistema valida datos
     - Sistema actualiza producto en MongoDB
     - Sistema muestra "✅ Producto actualizado en MongoDB exitosamente"
   
   - **5c. Eliminar producto**:
     - Admin hace clic en "Eliminar" en un producto
     - Sistema solicita confirmación
     - Admin confirma
     - Sistema elimina producto de MongoDB
     - Sistema muestra "✅ Producto eliminado de MongoDB exitosamente"

**Flujos Alternativos**:
- **4a**: No hay productos
  - Sistema muestra mensaje "No hay productos registrados"
  - Muestra botón "Agregar Producto"

**Postcondiciones**:
- Producto creado/actualizado/eliminado en MongoDB
- Cambios visibles inmediatamente en catálogo

---

### CU-003: Usuario Se Registra

**Actor Principal**: Usuario nuevo  
**Precondiciones**: Ninguna

**Flujo Principal**:
1. Usuario navega a página de registro
2. Sistema muestra formulario de registro
3. Usuario completa campos:
   - RUN
   - Nombre
   - Apellidos
   - Correo electrónico
   - Contraseña
4. Usuario hace clic en "Registrarse"
5. Sistema valida datos:
   - RUN formato chileno (12345678-9)
   - Email único y formato válido
   - Contraseña mínimo 4 caracteres
6. Sistema encripta contraseña con bcrypt
7. Sistema crea usuario en MongoDB con rol "Cliente"
8. Sistema muestra confirmación
9. Sistema redirige a página de login

**Flujos Alternativos**:
- **5a**: Email ya registrado
  - Sistema muestra "El correo ya está registrado"
  - Usuario debe usar otro correo

- **5b**: RUN formato inválido
  - Sistema muestra "Formato de RUN inválido (ej: 12345678-9)"
  - Usuario corrige formato

**Postcondiciones**:
- Usuario creado en base de datos
- Contraseña almacenada de forma segura (encriptada)

---

## 6. HISTORIAS DE USUARIO

### HU-001: Como cliente, quiero ver el catálogo de productos
**Descripción**: Como cliente, quiero ver todos los productos disponibles para elegir cuál comprar.

**Criterios de aceptación**:
- ✅ Puedo ver productos sin iniciar sesión
- ✅ Cada producto muestra: nombre, imagen, precio, stock
- ✅ Los productos se organizan en un grid responsive
- ✅ Solo se muestran productos activos

**Prioridad**: Alta  
**Estimación**: 3 puntos

---

### HU-002: Como cliente, quiero agregar productos al carrito
**Descripción**: Como cliente, quiero agregar productos a un carrito para comprarlos después.

**Criterios de aceptación**:
- ✅ Puedo agregar productos sin iniciar sesión
- ✅ Veo una notificación cuando agrego un producto
- ✅ El contador del carrito se actualiza
- ✅ Los productos persisten en el carrito (localStorage)

**Prioridad**: Alta  
**Estimación**: 5 puntos

---

### HU-003: Como cliente, quiero registrarme en el sistema
**Descripción**: Como cliente nuevo, quiero crear una cuenta para poder realizar compras.

**Criterios de aceptación**:
- ✅ Puedo ingresar mi RUN, nombre, apellidos, email y contraseña
- ✅ El sistema valida que mi email no esté registrado
- ✅ El sistema valida el formato del RUN chileno
- ✅ Recibo confirmación de registro exitoso

**Prioridad**: Alta  
**Estimación**: 5 puntos

---

### HU-004: Como cliente, quiero iniciar sesión
**Descripción**: Como cliente registrado, quiero iniciar sesión para acceder a mi cuenta.

**Criterios de aceptación**:
- ✅ Puedo ingresar mi email y contraseña
- ✅ El sistema me autentica y genera un token JWT
- ✅ Soy redirigido al catálogo después de iniciar sesión
- ✅ Mi sesión persiste aunque cierre el navegador

**Prioridad**: Alta  
**Estimación**: 3 puntos

---

### HU-005: Como administrador, quiero crear productos
**Descripción**: Como administrador, quiero agregar nuevos productos al catálogo.

**Criterios de aceptación**:
- ✅ Puedo acceder al panel de administración
- ✅ Puedo completar formulario con datos del producto
- ✅ El producto se guarda en MongoDB
- ✅ Veo mensaje de confirmación "Producto agregado exitosamente"
- ✅ El producto aparece inmediatamente en el catálogo

**Prioridad**: Alta  
**Estimación**: 5 puntos

---

### HU-006: Como administrador, quiero editar productos
**Descripción**: Como administrador, quiero modificar información de productos existentes.

**Criterios de aceptación**:
- ✅ Puedo seleccionar un producto para editar
- ✅ El formulario se carga con los datos actuales
- ✅ Puedo modificar cualquier campo
- ✅ Los cambios se guardan en MongoDB
- ✅ Veo mensaje de confirmación "Producto actualizado exitosamente"

**Prioridad**: Alta  
**Estimación**: 3 puntos

---

### HU-007: Como administrador, quiero eliminar productos
**Descripción**: Como administrador, quiero eliminar productos que ya no se venden.

**Criterios de aceptación**:
- ✅ Puedo hacer clic en "Eliminar" en un producto
- ✅ El sistema me pide confirmación antes de eliminar
- ✅ El producto se elimina de MongoDB
- ✅ Veo mensaje de confirmación "Producto eliminado exitosamente"
- ✅ El producto desaparece del catálogo inmediatamente

**Prioridad**: Alta  
**Estimación**: 2 puntos

---

### HU-008: Como cliente, quiero realizar un pedido
**Descripción**: Como cliente autenticado, quiero finalizar mi compra y crear un pedido.

**Criterios de aceptación**:
- ✅ Puedo ver el resumen de mi carrito
- ✅ Puedo confirmar mi pedido
- ✅ El sistema valida que haya stock suficiente
- ✅ El pedido se crea en la base de datos
- ✅ El stock se reduce automáticamente
- ✅ Recibo puntos por mi compra (10% del total)
- ✅ Mi carrito se vacía después del pedido

**Prioridad**: Alta  
**Estimación**: 8 puntos

---

### HU-009: Como cliente, quiero ver mis pedidos anteriores
**Descripción**: Como cliente autenticado, quiero ver mi historial de compras.

**Criterios de aceptación**:
- ✅ Puedo acceder a mi panel de usuario
- ✅ Veo lista de mis pedidos con fechas
- ✅ Veo el estado de cada pedido
- ✅ Veo los productos de cada pedido

**Prioridad**: Media  
**Estimación**: 5 puntos

---

### HU-010: Como usuario, quiero que la aplicación sea responsive
**Descripción**: Como usuario, quiero usar la aplicación desde mi celular, tablet o computador.

**Criterios de aceptación**:
- ✅ La aplicación se adapta a pantallas pequeñas (mobile)
- ✅ La aplicación se adapta a pantallas medianas (tablet)
- ✅ La aplicación se adapta a pantallas grandes (desktop)
- ✅ El menú se colapsa en dispositivos móviles
- ✅ El catálogo cambia de 3 columnas a 1 columna en móvil

**Prioridad**: Alta  
**Estimación**: 5 puntos

---

## 7. MODELO DE DATOS

### 7.1 Diagrama Entidad-Relación (Conceptual)

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│   USUARIO   │        │    PEDIDO    │        │  PRODUCTO   │
├─────────────┤        ├──────────────┤        ├─────────────┤
│ _id         │◄──────┤ usuario      │        │ _id         │
│ run         │        │ total        │        │ nombre      │
│ nombre      │        │ estado       │        │ descripcion │
│ apellidos   │        │ productos [ ]│────┐   │ precio      │
│ correo      │        │ createdAt    │    │   │ stock       │
│ password    │        └──────────────┘    │   │ categoria   │
│ tipo        │                            │   │ imagen      │
│ puntos      │                            │   │ activo      │
│ historial [ ]│                           └──►│ createdAt   │
└─────────────┘                                └─────────────┘
      │
      │
      ▼
┌──────────────┐
│  COMENTARIO  │
├──────────────┤
│ _id          │
│ usuario      │
│ contenido    │
│ aprobado     │
│ createdAt    │
└──────────────┘
```

### 7.2 Colecciones MongoDB

#### Colección: `usuarios`
```javascript
{
  "_id": ObjectId,
  "run": String (único, índice),
  "nombre": String,
  "apellidos": String,
  "correo": String (único, índice, lowercase),
  "password": String (hash bcrypt),
  "tipo": String (enum: ['Cliente', 'Administrador']),
  "puntos": Number (default: 0),
  "historialCompras": [
    {
      "fecha": Date,
      "productos": [
        {
          "productoId": ObjectId,
          "nombre": String,
          "cantidad": Number,
          "precio": Number
        }
      ],
      "total": Number
    }
  ],
  "descuentos": [
    {
      "porcentaje": Number,
      "fechaAsignacion": Date,
      "usado": Boolean
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

#### Colección: `productos`
```javascript
{
  "_id": ObjectId,
  "nombre": String (requerido),
  "descripcion": String (requerido),
  "precio": Number (requerido, mín: 0),
  "imagen": String,
  "stock": Number (default: 0, mín: 0),
  "categoria": String,
  "activo": Boolean (default: true),
  "createdAt": Date,
  "updatedAt": Date
}
```

#### Colección: `pedidos`
```javascript
{
  "_id": ObjectId,
  "usuario": ObjectId (ref: 'Usuario'),
  "productos": [
    {
      "producto": ObjectId (ref: 'Producto'),
      "cantidad": Number,
      "precio": Number
    }
  ],
  "total": Number (requerido),
  "estado": String (enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado']),
  "direccionEnvio": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

#### Colección: `comentarios`
```javascript
{
  "_id": ObjectId,
  "usuario": ObjectId (ref: 'Usuario'),
  "contenido": String (requerido),
  "aprobado": Boolean (default: false),
  "createdAt": Date,
  "updatedAt": Date
}
```

### 7.3 Índices
- `usuarios.correo` - Índice único
- `usuarios.run` - Índice único
- `productos.categoria` - Índice para filtrado rápido
- `pedidos.usuario` - Índice para consultas por usuario
- `comentarios.aprobado` - Índice para filtrado

---

## 8. INTERFACES DE USUARIO (Wireframes Conceptuales)

### 8.1 Página de Inicio (Home)
```
┌─────────────────────────────────────────────────┐
│  [Logo] E-Commerce Rock    [Catálogo] [Login]  │
├─────────────────────────────────────────────────┤
│                                                 │
│         BIENVENIDOS A E-COMMERCE ROCK          │
│         Las mejores poleras de rock            │
│              [Ver Catálogo]                    │
│                                                 │
├─────────────────────────────────────────────────┤
│  Footer: © 2025 E-Commerce Rock               │
└─────────────────────────────────────────────────┘
```

### 8.2 Catálogo de Productos
```
┌─────────────────────────────────────────────────┐
│  [Logo]    [Catálogo] [Carrito (2)] [Perfil]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  CATÁLOGO DE PRODUCTOS                         │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  [IMG]  │  │  [IMG]  │  │  [IMG]  │        │
│  │ Deep    │  │ Guns    │  │ Metal   │        │
│  │ Purple  │  │ N'Roses │  │ -lica   │        │
│  │$15,990  │  │$14,990  │  │$16,990  │        │
│  │[Agregar]│  │[Agregar]│  │[Agregar]│        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 8.3 Panel de Administración
```
┌─────────────────────────────────────────────────┐
│  [Logo]    [Panel Admin]          [Logout]    │
├─────────────────────────────────────────────────┤
│  GESTIÓN DE PRODUCTOS                          │
│  [+ Agregar Producto]                          │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ ID: 67...  │ Deep Purple │ $15,990 │ 10 │  │
│  │            [Editar] [Eliminar]           │  │
│  ├──────────────────────────────────────────┤  │
│  │ ID: 68...  │ Metallica   │ $16,990 │ 12 │  │
│  │            [Editar] [Eliminar]           │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 9. ARQUITECTURA DEL SISTEMA

### 9.1 Diagrama de Arquitectura

```
┌──────────────────────────────────────────────────────┐
│                    NAVEGADOR WEB                     │
│              (Chrome, Firefox, Edge, Safari)         │
└───────────────────────┬──────────────────────────────┘
                        │ HTTP/HTTPS
                        │ (puerto 5173 - dev)
┌───────────────────────▼──────────────────────────────┐
│              FRONTEND - REACT SPA                    │
│  ┌────────────────────────────────────────────────┐  │
│  │  Components │ Pages │ Services │ Context      │  │
│  │  Navbar, Catalogo, Login, Carrito, etc.       │  │
│  └────────────────────────────────────────────────┘  │
│                 Axios HTTP Client                    │
└───────────────────────┬──────────────────────────────┘
                        │ REST API
                        │ JWT en header Authorization
                        │ (puerto 5000)
┌───────────────────────▼──────────────────────────────┐
│            BACKEND - NODE.JS + EXPRESS               │
│  ┌────────────────────────────────────────────────┐  │
│  │ Routes │ Controllers │ Middleware │ Models    │  │
│  │ /api/auth, /api/productos, /api/pedidos, etc. │  │
│  └────────────────────────────────────────────────┘  │
│              Mongoose ODM                            │
└───────────────────────┬──────────────────────────────┘
                        │ MongoDB Protocol
                        │ (puerto 27017)
┌───────────────────────▼──────────────────────────────┐
│          BASE DE DATOS - MONGODB ATLAS               │
│  ┌────────────────────────────────────────────────┐  │
│  │ usuarios │ productos │ pedidos │ comentarios  │  │
│  │ Cluster0 - AWS São Paulo (sa-east-1)          │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 9.2 Flujo de Petición Típica

```
1. Usuario hace clic en "Agregar al Carrito"
   └─> Frontend (React): onClick handler

2. Frontend llama a productosAPI.obtenerPorId(id)
   └─> Axios interceptor agrega JWT al header

3. HTTP GET /api/productos/:id
   └─> Backend recibe petición

4. Middleware verificarToken()
   └─> Valida JWT (opcional para productos)

5. Controller: obtenerProductoPorId()
   └─> Mongoose: Producto.findById(id)

6. MongoDB Atlas consulta colección productos
   └─> Devuelve documento JSON

7. Controller devuelve JSON al frontend
   └─> { _id, nombre, precio, stock, ... }

8. Frontend actualiza estado con producto
   └─> Agrega al carrito (localStorage)

9. Frontend muestra toast notification
   └─> "✅ Producto agregado al carrito"
```

---

## 10. PLAN DE PRUEBAS

### 10.1 Pruebas Unitarias (Frontend)
- **Framework**: Jest 30.2.0 + Testing Library 16.3.0
- **Cobertura**: 14 suites, 23 tests
- **Estado**: ✅ 100% passing

**Componentes Testeados**:
- Login, Registro, Catalogo, Carrito
- Navbar, Footer, Hero
- ProtectedRoute, AdminPanel, PanelUsuario
- Blog, BlogPost, BlogAside

### 10.2 Pruebas de Integración (API)
- **Herramienta**: Postman
- **Cobertura**: 20 endpoints
- **Documentación**: ENDPOINTS_POSTMAN.md

**Endpoints Validados**:
- ✅ POST /api/auth/registro
- ✅ POST /api/auth/login
- ✅ GET /api/productos
- ✅ POST /api/productos (admin)
- ✅ PUT /api/productos/:id (admin)
- ✅ DELETE /api/productos/:id (admin)
- ✅ POST /api/pedidos
- ✅ GET /api/pedidos/mis-pedidos

### 10.3 Pruebas Manuales
- ✅ Flujo completo de compra
- ✅ CRUD de productos en UI
- ✅ Validaciones de formularios
- ✅ Responsividad en diferentes dispositivos
- ✅ Manejo de errores 401, 404, 500

---

## 11. GLOSARIO

| Término | Definición |
|---------|------------|
| **API REST** | Interfaz de programación de aplicaciones que sigue los principios REST |
| **bcrypt** | Algoritmo de hash para encriptar contraseñas |
| **CRUD** | Create, Read, Update, Delete (operaciones básicas de base de datos) |
| **JWT** | JSON Web Token, estándar para autenticación basada en tokens |
| **Middleware** | Función que se ejecuta entre la petición y la respuesta |
| **MongoDB Atlas** | Servicio de base de datos MongoDB en la nube |
| **Mongoose** | ODM (Object Document Mapper) para MongoDB en Node.js |
| **ODM** | Object Document Mapper, mapea objetos a documentos de BD |
| **React** | Biblioteca JavaScript para construir interfaces de usuario |
| **RUN** | Rol Único Nacional (identificador chileno) |
| **SPA** | Single Page Application, aplicación de una sola página |
| **Vite** | Build tool moderno para desarrollo frontend |

---

## 12. APROBACIONES

Este documento ERS ha sido revisado y aprobado por:

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| **Desarrollador** | Cristian Budrovich | 17/12/2025 | _________ |
| **Docente** | [Nombre Docente] | ___/___/2025 | _________ |

---

## 13. HISTORIAL DE CAMBIOS

| Versión | Fecha | Autor | Descripción |
|---------|-------|-------|-------------|
| 1.0 | 17/12/2025 | Cristian Budrovich | Documento inicial completo |

---

**Fin del Documento ERS**

**Total de Páginas**: 25  
**Total de Requisitos Funcionales**: 12  
**Total de Requisitos No Funcionales**: 8  
**Total de Casos de Uso**: 3  
**Total de Historias de Usuario**: 10

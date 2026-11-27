# Catálogo PERN

Proyecto académico desarrollado para la materia de Ingeniería de Software.

Consiste en una aplicación web para administrar un catálogo de productos mediante operaciones CRUD.

## Integrantes

- Javier: Backend y base de datos.
- Omar: Frontend con React.
- Natalia: Pruebas, documentación y seguimiento del proyecto.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- Neon Serverless
- Zod

### Frontend
- React
- Vite
- Axios

### Herramientas
- Git y GitHub
- GitHub Projects
- Postman
- Visual Studio Code

## Estructura del proyecto

catalogo-pern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   └── package.json
├── database/
│   └── schema.sql
└── README.md

## Funcionalidades implementadas

### HU01 - Consultar catálogo
Permite visualizar los productos registrados en la base de datos.

### HU02 - Registrar producto
Permite registrar nuevos productos indicando:
- Nombre.
- Precio.
- URL de imagen.

### HU03 - Editar producto
Permite modificar los datos de un producto existente.

### HU04 - Eliminar producto
Permite eliminar un producto mediante un botón de confirmación.

Después de realizar cualquiera de estas operaciones, el catálogo se actualiza automáticamente.

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/products | Consultar productos |
| POST | /api/products | Registrar producto |
| PUT | /api/products/:id | Actualizar producto |
| DELETE | /api/products/:id | Eliminar producto |

## Respuestas HTTP

La API utiliza los siguientes códigos:

- 200 OK: Consulta o actualización exitosa.
- 201 Created: Producto registrado correctamente.
- 204 No Content: Producto eliminado correctamente.
- 400 Bad Request: Datos inválidos.
- 404 Not Found: Producto inexistente.
- 500 Internal Server Error: Error interno del servidor.

## Configuración del proyecto

### Requisitos

- Node.js y npm.
- Acceso a una base de datos PostgreSQL en Neon.
- Git.

### 1. Clonar el repositorio

bash
git clone https://github.com/jababas/catalogo-pern.git
cd catalogo-pern


### 2. Configurar la base de datos

Crear una base de datos PostgreSQL en Neon.

Ejecutar el script:

text
database/schema.sql


### 3. Configurar el backend

Entrar a la carpeta:

bash
cd backend


Instalar dependencias:

bash
npm install


Crear un archivo .env utilizando .env.example como referencia:

env
DATABASE_URL=postgresql://usuario:password@host/neondb?sslmode=require
PORT=3000
CLIENT_ORIGIN=http://localhost:5173


Reemplazar DATABASE_URL con la cadena de conexión real de Neon.

Iniciar el servidor:

bash
npm run dev


La API estará disponible en:

http://localhost:3000/api/products

### 4. Configurar el frontend

Abrir otra terminal y entrar a:

bash
cd frontend


Instalar dependencias:

bash
npm install


Crear el archivo .env con:

env
VITE_API_URL=http://localhost:3000/api


Iniciar React:

bash
npm run dev


Abrir en el navegador:

http://localhost:5173

## Pruebas realizadas

Durante la segunda entrega se realizaron pruebas con Postman y React.

### Registro
- Registrar productos con datos válidos.
- Validar datos incorrectos.

### Edición
- Actualizar productos existentes.
- Intentar actualizar productos inexistentes.
- Validar precios, nombres y URL.

### Eliminación
- Eliminar un producto correctamente.
- Intentar eliminar nuevamente el mismo producto.
- Intentar eliminar un ID inexistente.
- Intentar eliminar un ID inválido.

### Pruebas de integración

Se comprobó desde la rama main que es posible:

1. Consultar productos.
2. Registrar un producto.
3. Editar el producto.
4. Eliminar el producto.

También se verificó la persistencia de los cambios en PostgreSQL mediante Neon.

## Metodología de trabajo

El proyecto se desarrolló mediante historias de usuario organizadas en GitHub Projects.

Cada integrante trabajó en ramas independientes y utilizó Pull Requests para integrar sus cambios.

Las modificaciones fueron revisadas por otro integrante antes de fusionarse con main.

## Estado del proyecto

- Entrega 1: Consulta del catálogo - Completada.
- Entrega 2: CRUD completo y probado - Completada.
- Entrega 3: Despliegue y cierre - Pendiente.
# Catálogo de Productos PERN

## Descripción del proyecto

Aplicación web desarrollada para la materia de Ingeniería de Software, Unidad 4.

El objetivo es implementar un catálogo de productos mediante la arquitectura PERN, utilizando PostgreSQL, Express, React y Node.js.

El proyecto se desarrolla mediante historias de usuario, trabajo colaborativo con Git y GitHub, revisiones cruzadas de código y pruebas funcionales.

## Tecnologías utilizadas

*Backend:*
- Node.js
- Express
- PostgreSQL
- Neon Serverless
- Dotenv
- CORS
- Helmet
- Morgan
- Nodemon

*Frontend:*
- React
- Vite
- Axios

*Herramientas:*
- Git y GitHub
- GitHub Projects
- Postman

## Estructura del proyecto

text
catalogo-pern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── products.controller.js
│   │   ├── routes/
│   │   │   └── products.routes.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── database/
│   └── schema.sql
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
└── README.md


## Configuración del proyecto

### 1. Clonar el repositorio

bash
git clone URL_DEL_REPOSITORIO
cd catalogo-pern


Sustituir URL_DEL_REPOSITORIO por la dirección real del repositorio en GitHub.

### 2. Preparar PostgreSQL en Neon

1. Crear un proyecto PostgreSQL en Neon.
2. Abrir el SQL Editor.
3. Ejecutar el contenido de database/schema.sql.
4. Comprobar los productos mediante:

sql
SELECT * FROM products;


### 3. Configurar el backend

Ingresar a la carpeta:

bash
cd backend


Instalar las dependencias:

bash
npm ci


Crear el archivo .env tomando como referencia .env.example.

Variables requeridas:

env
DATABASE_URL="postgresql://usuario:password@host/neondb?sslmode=require"
PORT=3000
CLIENT_ORIGIN=http://localhost:5173


Sustituir DATABASE_URL por una cadena de conexión válida de Neon.

Iniciar el servidor:

bash
npm run dev


La API estará disponible en:

http://localhost:3000

### 4. Configurar el frontend

Abrir una segunda terminal e ingresar a la carpeta frontend:

bash
cd frontend
npm ci


Crear el archivo .env a partir de .env.example:

env
VITE_API_URL=http://localhost:3000/api


Iniciar React:

bash
npm run dev


Abrir la dirección indicada por Vite, normalmente:

http://localhost:5173

## Jornada 1 — HU01: Consultar catálogo

*Historia de usuario:* Como visitante, quiero ver los productos disponibles para conocer su nombre, precio e imagen.

### Funcionalidad implementada

- Consulta de productos almacenados en PostgreSQL.
- Endpoint GET /api/products.
- Presentación del catálogo desde React.
- Visualización de nombre, precio e imagen.
- Manejo de estados de carga, catálogo vacío y error de conexión.

### Endpoint disponible

*GET /api/products*

Respuesta de ejemplo:

json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Teclado mecánico",
      "price": "899.00",
      "image": "https://picsum.photos/seed/teclado/400/300"
    }
  ]
}


### Pruebas realizadas

| Caso | Resultado esperado | Estado |
|---|---|---|
| Consultar dos productos | HTTP 200 y dos productos | Aprobado |
| Consultar tabla vacía | HTTP 200 y data: [] | Aprobado |
| Mostrar productos en React | Dos productos visibles | Aprobado |
| Mostrar catálogo vacío en React | Mensaje de catálogo vacío | Aprobado |

Las pruebas de API se realizaron manualmente utilizando Postman.

*Pruebas automatizadas:* Pendientes de incorporar en la Jornada 2 mediante Jest y Supertest.

## Organización del equipo

- Javier: base de datos y backend.
- Omar: frontend React.
- Natalia: GitHub Projects, pruebas, documentación y evidencias.

El desarrollo se realizó mediante ramas independientes y Pull Requests con revisión cruzada.

## Próximas jornadas

- HU02: Registrar productos.
- HU03: Editar productos.
- HU04: Eliminar productos.
- HU05: Publicar el catálogo.
- INV01: Diseñar el acceso por roles.
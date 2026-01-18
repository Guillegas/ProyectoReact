# Proyecto de Literatura - Práctica Desarrollo Interfaces

Este proyecto cumple con los requisitos de la Práctica UD2 (MUI, MDBootstrap, CRUD, Paginación).

## Partes del Proyecto

1. **Backend (`ProyectoNodeJs_Guille`)**: API REST (Node.js + Express + MySQL).
2. **Frontend (`ProyectoReact_Guille`)**: SPA (React + Vite + MUI + MDBootstrap).

## Instalación y Puesta en Marcha

### 1. Base de Datos

**IMPORTANTE**: Se ha modificado el esquema de la base de datos.

1. Abre tu gestor de MySQL (phpMyAdmin, Workbench, etc.).
2. Importa el archivo `ProyectoNodeJs_Guille/src/database/literatura.sql`.
   - Este archivo crea la base de datos `literatura` y las tablas `autores` y `libros`.

### 2. Backend

```bash
cd ProyectoNodeJs_Guille
npm install
npm start
```

El servidor escuchará en `http://localhost:3000`.

### 3. Frontend

```bash
cd ../ProyectoReact_Guille
npm install --legacy-peer-deps
npm run dev
```

## Funcionalidades

- **Landing Page**: Carrusel de imágenes (MDBootstrap).
- **Libros**:
  - Cards con imagen.
  - Paginación (10 por página).
  - Buscador filtrado por título/autor.
  - CRUD (Crear, Editar, Borrar) en ventanas modales.
- **Autores**:
  - Listado con DataGrid (MUI).
  - CRUD completo.
- **Configuración**:
  - Cambio de Tema (Claro/Oscuro) en la barra de navegación.


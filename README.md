# 📚 Proyecto Gestión de Biblioteca - React + Node.js

Aplicación Full-Stack para gestión de biblioteca con React (Frontend), Node.js + Express (Backend) y MySQL.

---

## 📋 Descripción

Sistema CRUD completo para gestionar autores y libros con:

- Gestión de autores y libros (crear, listar, editar, eliminar)
- Filtros parametrizados (autores por año, libros por páginas)
- Interfaz moderna con Material-UI y MDB React UI Kit
- API RESTful con archivos `.rest` para pruebas

---

## 🏗️ Estructura del Proyecto

```
ProyectoReact_Node/
├── ProyectoNodeJs_Guille/    # Backend - Node.js + Express + MySQL (Puerto 3000)
├── ProyectoReact_Guille/     # Frontend - React + Vite (Puerto 5173)
└── README.md
```

**Backend**: Express.js, Sequelize ORM, MySQL, CORS

**Frontend**: React 19, Vite, React Router DOM, Material-UI, Bootstrap, Axios

---

## � Instalación Rápida

### 1. Configurar Base de Datos MySQL

Ejecutar el siguiente código SQL para crear la base de datos, el usuario y las tablas:

```sql
-- Crear base de datos y usuario
CREATE DATABASE IF NOT EXISTS literatura;
CREATE USER IF NOT EXISTS 'proyecto_guille'@'localhost' IDENTIFIED BY 'proyecto_guille';
GRANT ALL PRIVILEGES ON literatura.* TO 'proyecto_guille'@'localhost';
FLUSH PRIVILEGES;

-- Usar la base de datos
USE literatura;

-- Crear tabla autores
CREATE TABLE `autores` (
  `id_autor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_autor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear tabla libros
CREATE TABLE `libros` (
  `id_libro` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `editorial` varchar(100) DEFAULT NULL,
  `anyo_publicacion` int DEFAULT NULL,
  `paginas` int DEFAULT NULL,
  `precio` decimal(6,2) DEFAULT NULL,
  `id_autor` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_libro`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `idx_autor` (`id_autor`),
  CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id_autor`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

> **Nota**: También puedes importar el archivo SQL incluido: `mysql -u proyecto_guille -pproyecto_guille literatura < ProyectoNodeJs_Guille/src/sql/literatura.sql`

## ▶️ Ejecutar el Proyecto

**Terminal 1 - Backend**:

```bash
cd ProyectoNodeJs_Guille
npm run dev
```

Debe mostrar: `Servidor corriendo en http://localhost:3000`

**Terminal 2 - Frontend**:

```bash
cd ProyectoReact_Guille
npm run dev
```

Debe mostrar: `Local: http://localhost:5173/`

**Acceder a la aplicación**: http://localhost:5173

---

## 📱 Funcionalidades Frontend

- **Landing Page**: Página de inicio
- **Menú Autores**: Lista (cards), Tabla (DataGrid), Filtro por año
- **Menú Libros**: Lista (cards), Tabla (DataGrid), Filtro por páginas
- **CRUD completo**: Crear, editar y eliminar desde la interfaz

---

## 🔧 Configuración Avanzada

### Cambiar Credenciales de BD

Editar `ProyectoNodeJs_Guille/src/config/config.js` o crear `.env`:

```env
DB_HOST=localhost
DB_USER=proyecto_guille
DB_PASSWORD=proyecto_guille
DB_NAME=literatura
DB_PORT=3306
PORT=3000
```

### Cambiar Puertos

- **Backend**: Modificar `PORT` en `config.js` (default: 3000)
- **Frontend**: Modificar `server.port` en `vite.config.js` (default: 5173)

---

## 👨‍💻 Autor

Guillermo García

---

## ✅ Checklist de Instalación

- [ ] MySQL ejecutándose con BD `literatura` y usuario `proyecto_guille`
- [ ] Backend instalado y ejecutándose en `localhost:3000`
- [ ] Frontend instalado y ejecutándose en `localhost:5173`
- [ ] Navegador abierto en `http://localhost:5173`

¡Listo para usar! 🎉

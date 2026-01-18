# API Gestión de Libros y Autores

Proyecto Backend en Node.js para la gestión de una biblioteca.

### Enlace al repositorio de GitHub

https://github.com/Guillegas/ProyectoNodeJs.git

## Guía

### 1. Clonar el repositorio

Abra la terminal donde desee guardar el proyecto y ejecute:

```bash
git clone https://github.com/Guillegas/ProyectoNodeJs.git
cd ProyectoNodeJs
```

### 2. Configuración de Base de Datos (MySQL)

El proyecto está configurado para usar los siguientes credenciales.

**Credenciales por defecto:**

- **Base de datos:** `literatura`
- **Usuario:** `proyecto_guille`
- **Contraseña:** `proyecto_guille`
- **Host:** `localhost`

#### Crear Usuario y Base de Datos

Ejecute el siguiente script SQL en MySQL para crear el usuario y la bd, despues ejecuta el archivo .sql en la terminal de esta base de datos si lo hubiera.

```sql
CREATE DATABASE IF NOT EXISTS literatura;
CREATE USER IF NOT EXISTS 'proyecto_guille'@'localhost' IDENTIFIED BY 'proyecto_guille';
GRANT ALL PRIVILEGES ON literatura.* TO 'proyecto_guille'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Ejecutar el Proyecto

```bash
npm install
npm run dev
```

El servidor iniciará en **http://localhost:3000**

---

## Endpoints

1.  Vaya a la carpeta `src/request`.
2.  Abra el archivo `author_api.rest` o `book_api.rest`.
3.  Verá un pequeño texto que dice **"Send Request"** encima de cada URL.
4.  Pulse ahí para ejecutar la prueba y ver la respuesta a la derecha.

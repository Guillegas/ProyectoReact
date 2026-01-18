-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 14-01-2026 a las 19:59:02
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `literatura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id_autor` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id_autor`, `nombre`, `nacionalidad`, `fecha_nacimiento`, `activo`) VALUES
(1, 'Gabriel García Márquez (Actualizado)', 'Colombiana', '1927-03-06', 1),
(2, 'Miguel de Cervantes', 'Española', '1547-09-29', 1),
(4, 'Isabel Allende', 'Chilena', '1942-08-02', 1),
(5, 'Mario Vargas Llosa', 'Peruana', '1936-03-28', 1),
(6, 'Federico García Lorca', 'Española', '1898-06-05', 0),
(7, 'Julio Cortázar', 'Argentina', '1914-08-26', 1),
(8, 'Pablo Neruda', 'Chilena', '1904-07-12', 0),
(9, 'Carmen Laforet', 'Española', '1921-09-06', 0),
(10, 'Rosa Montero', 'Española', '1951-01-03', 1),
(12, 'Marco Aurelio', 'Griega', '1745-11-10', 0),
(13, 'Alan Fernández Diosdado', 'Israelita', '2006-10-08', 1),
(14, 'Guillermo Jiménez Martínez', 'Catalán', '2006-07-07', 1),
(15, 'Francisco Bonilla Varo', 'Indio', '2006-09-09', 1),
(16, 'Miguel Rodríguez Casado', 'Mongola', '2006-11-11', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id_libro` int NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `editorial` varchar(100) DEFAULT NULL,
  `anyo_publicacion` int DEFAULT NULL,
  `paginas` int DEFAULT NULL,
  `precio` decimal(6,2) DEFAULT NULL,
  `id_autor` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id_libro`, `titulo`, `isbn`, `editorial`, `anyo_publicacion`, `paginas`, `precio`, `id_autor`, `imagen`) VALUES
(1, 'Cien años de soledad', '9788437604938', 'Sudamericana', 1967, 471, 25.50, 1, 'https://m.media-amazon.com/images/I/81AW0L0sgpL.jpg'),
(2, 'El amor en los tiempos del cólera', '9788437608097', 'Mondadori', 1985, 348, 19.90, 1, 'https://imagedelivery.net/QDkyDSqaJI1JEO0MqH_3SQ/0026c365-df5f-4d61-663e-f9528d371700/default'),
(3, 'Don Quijote de la Mancha', '9788467026613', 'Espasa', 1605, 1200, 35.00, 2, 'https://m.media-amazon.com/images/I/91CIwR3QU1L._UF1000,1000_QL80_.jpg'),
(4, 'Rayuela', '9788437605812', 'Cátedra', 1963, 634, 24.50, 7, 'https://m.media-amazon.com/images/I/913qsYmTdmL.jpg'),
(5, 'La casa de los espíritus', '9788401330139', 'Plaza & Janés', 1982, 455, 21.90, 4, 'https://imagessl8.casadellibro.com/a/l/s5/98/9788401352898.webp'),
(6, 'El libro troll', '9788490628343', 'Seix Barral', 1969, 712, 28.90, 5, 'https://m.media-amazon.com/images/I/61opTUlQsDL.jpg'),
(8, 'Veinte poemas de amor', '9788478444920', 'Cátedra', 1924, 96, 10.90, 8, 'https://www.alianzaeditorial.es/imagenes/blog/9788411483414-veinte-poemas-de-amor-y-una-cancion-desesperada.jpg'),
(10, 'Así es la puta vida', '9788433920564', 'Seix Barral', 1997, 320, 20.90, 10, 'https://www.abacus.coop/on/demandware.static/-/Sites-AbacusMaster/default/dw77564234/images/large/1413575.14.jpg'),
(15, 'Meditaciones de Marco Aurelio', '1234567654567', 'Editorial ejemplo guille holahola', 1790, 88, 19.99, 12, 'https://m.media-amazon.com/images/I/61iMxtIaXqL.jpg'),
(16, 'Los pollos primos', '686868688868', 'YouPlanet', 2017, 101, 20.99, 6, 'https://m.media-amazon.com/images/I/A1TGD6BH3cL._AC_UF1000,1000_QL80_.jpg'),
(17, 'cant hurt me', '1212121212', 'holaholaeditorial', 2018, 999, 34.99, 4, 'https://m.media-amazon.com/images/I/81VpFFpZTtL._UF1000,1000_QL80_.jpg'),
(18, 'pinocho', '5656565656565', 'nose', 1995, 77, 7.00, 12, 'https://www.elindependiente.com/wp-content/uploads/2023/07/9788420452548-430x660.jpg'),
(19, 'El hobbit', '1717171717171', 'ejemploooooo', 1979, 3978, 50.00, 5, 'https://i.pinimg.com/736x/c0/7f/03/c07f0335aab7d6b4d32d90ab7ba9e7d5.jpg'),
(20, 'hola carlos ponme un 10 :)', '10101010', 'hnosmachado', 2025, 99, 1.99, 8, 'https://ih1.redbubble.net/image.1223172300.4732/flat,750x,075,f-pad,750x1000,f8f8f8.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libro`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `idx_autor` (`id_autor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id_autor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libro` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id_autor`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

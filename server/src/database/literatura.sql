-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 24-12-2025 a las 11:37:52
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
  `nombre_completo` varchar(150) NOT NULL,
  `nacionalidad` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_fallecimiento` date DEFAULT NULL,
  `biografia` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id_autor`, `nombre_completo`, `nacionalidad`, `fecha_nacimiento`, `fecha_fallecimiento`, `biografia`) VALUES
(1, 'Gabriel García Márquez', 'Colombia', '1927-03-06', '2014-04-17', 'Premio Nobel de Literatura 1982. Maestro del realismo mágico.'),
(2, 'Miguel de Cervantes', 'España', '1547-09-29', '1616-04-22', 'Autor del Quijote, padre de la novela moderna.'),
(3, 'Jorge Luis Borges', 'Argentina', '1899-08-24', '1986-06-14', 'Creador del concepto de laberintos literarios.'),
(4, 'Isabel Allende', 'Chile', '1942-08-02', NULL, 'Famosa por La Casa de los Espíritus.'),
(5, 'Mario Vargas Llosa', 'Perú', '1936-03-28', NULL, 'Premio Nobel de Literatura 2010.'),
(6, 'Federico García Lorca', 'España', '1898-06-05', '1936-08-19', 'Poeta y dramaturgo de la Generación del 27.'),
(7, 'Julio Cortázar', 'Argentina', '1914-08-26', '1984-02-12', 'Autor de Rayuela, innovador de la novela.'),
(8, 'Pablo Neruda', 'Chile', '1904-07-12', '1973-09-23', 'Premio Nobel de Literatura 1971.'),
(9, 'Carmen Laforet', 'España', '1921-09-06', '2004-02-06', 'Autora de Nada, nadaísmo español.'),
(10, 'Rosa Montero', 'España', '1951-01-10', NULL, 'Periodista y novelista contemporánea.');

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
  `id_autor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id_libro`, `titulo`, `isbn`, `editorial`, `anyo_publicacion`, `paginas`, `precio`, `id_autor`) VALUES
(1, 'Cien años de soledad', '9788437604938', 'Sudamericana', 1967, 471, 22.90, 1),
(2, 'El amor en los tiempos del cólera', '9788437608097', 'Mondadori', 1985, 348, 19.90, 1),
(3, 'Don Quijote de la Mancha', '9788467026613', 'Espasa', 1605, 1200, 35.00, 2),
(4, 'Rayuela', '9788437605812', 'Cátedra', 1963, 634, 24.50, 7),
(5, 'La casa de los espíritus', '9788401330139', 'Plaza & Janés', 1982, 455, 21.90, 4),
(6, 'Conversación en la Catedral', '9788490628343', 'Seix Barral', 1969, 712, 28.90, 5),
(7, 'Bodas de sangre', '9788437619758', 'Cátedra', 1933, 128, 12.50, 6),
(8, 'Veinte poemas de amor', '9788478444920', 'Cátedra', 1924, 96, 10.90, 8),
(9, 'Nada', '9788437619529', 'Destino', 1945, 287, 17.50, 9),
(10, 'La hija del caníbal', '9788433920564', 'Seix Barral', 1997, 320, 20.90, 10);

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
  MODIFY `id_autor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libro` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2026 a las 03:25:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ptp_group`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `descripcion` text NOT NULL DEFAULT 'Sin descripción',
  `direccion` varchar(255) NOT NULL,
  `modalidad` text NOT NULL,
  `horario` varchar(100) NOT NULL,
  `salario` varchar(100) DEFAULT NULL,
  `requisitos` text DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Activa',
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_cierre` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`id`, `titulo`, `puesto`, `descripcion`, `direccion`, `modalidad`, `horario`, `salario`, `requisitos`, `estado`, `fecha`, `fecha_cierre`) VALUES
(1, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(2, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(3, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(4, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(5, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(6, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(7, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(8, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(9, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(10, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(11, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(12, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00'),
(24, 'QUEQUE', 'QUEQUE', 'QUEQUE', 'QUEQUE', 'hibrido', 'lunes, martes, miercoles, jueves, viernes de 11:11 a 22:22', '676767 MENSUALES', 'COMER QUEQUE', 'Activa', '2026-11-16 07:55:52', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulacion`
--

CREATE TABLE `postulacion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL,
  `estado` text NOT NULL DEFAULT 'Pendiente',
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `postulacion`
--

INSERT INTO `postulacion` (`id`, `id_usuario`, `id_oferta`, `estado`, `fecha`) VALUES
(34, 25, 1, 'Aceptado', '2026-11-16 23:19:28'),
(35, 25, 2, 'Rechazado', '2026-11-16 23:19:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `estado_academico` varchar(100) NOT NULL DEFAULT '''estudiante''',
  `curriculum` text NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `codigo_recuperacion` varchar(6) DEFAULT NULL,
  `codigo_expiracion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `telefono`, `password`, `estado_academico`, `curriculum`, `admin`, `codigo_recuperacion`, `codigo_expiracion`) VALUES
(10, 'Juan Perez', 'juan@gmail.com', '091234567', '123', 'Egresado', 'https://example.com/curriculum.pdf', 0, NULL, NULL),
(13, 'Ezequiel Lema', 'ezeze@gmail.com', '421421213', '123', 'Egresado', 'https://example.com/prueba.pdf', 0, NULL, NULL),
(14, 'prueba', 'sadadacsdass@gmail.com', '45354353', '123', 'Egresado', '', 0, NULL, NULL),
(15, 'pruebita', 'pruebita@gmail.com', '123123123', 'A1234567890.', 'estudiante', '', 0, NULL, NULL),
(19, 'probando', 'probando@gmail.com', '010101010', '$2y$10$nHx1o9fj9xAq9OQTSX2b8ewPss8kWKTMocc8/rfWXUnlCj92GdnU2', 'egresado', '', 0, NULL, NULL),
(21, 'admin', 'admin@gmail.com', '010101010', '$2y$10$Ve1AmSY0CCuovhjF6A.FLeF.IojyjFLONMfFS5h7w0z2I978gJfs6', '', '', 1, NULL, NULL),
(25, 'engre', 'engregm@gmail.com', '0101010101', '$2y$10$NFckMuL.cMtI9WAFMmiVqOS.u6hsvS76mNhsaYxcTnohDr9P2fkTO', 'Estudiante', 'http://queso.com', 0, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_oferta` (`id_oferta`),
  ADD KEY `postulacion_ibfk_1` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`id_oferta`) REFERENCES `oferta` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

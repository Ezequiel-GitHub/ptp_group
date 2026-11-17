-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2026 a las 09:01:44
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
  `descripcion` text NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `modalidad` text NOT NULL,
  `horario` varchar(100) NOT NULL,
  `salario` int(100) NOT NULL,
  `requisitos` text NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Activa',
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_cierre` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`id`, `titulo`, `puesto`, `descripcion`, `direccion`, `modalidad`, `horario`, `salario`, `requisitos`, `estado`, `fecha`, `fecha_cierre`) VALUES
(56, 'Operario de carga y descarga', 'Operario portuario', 'Realizar tareas de carga y descarga de mercadería y colaborar con el equipo de operaciones.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 06:00 a 14:00', 55000, 'Experiencia en carga y descarga, buena condición física y disponibilidad horaria.', 'Activa', '2026-11-17 04:57:30', '2026-12-17 04:57:30'),
(57, 'Administrativo de operaciones', 'Administrativo', 'Gestionar documentación, registrar movimientos de mercadería y coordinar información.', 'Puerto de Nueva Palmira, Colonia', 'híbrido', 'lunes, martes, miercoles, jueves, viernes, 08:00 a 16:00', 62000, 'Manejo de herramientas informáticas y conocimientos administrativos.', 'Activa', '2026-11-17 04:57:30', '2026-12-12 04:57:30'),
(58, 'Chofer de transporte pesado', 'Chofer', 'Transportar mercadería desde y hacia las instalaciones portuarias.', 'Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 07:00 a 15:00', 78000, 'Libreta de conducir correspondiente y experiencia en transporte pesado.', 'Activa', '2026-11-17 04:57:30', '2026-12-07 04:57:30'),
(59, 'Técnico en mantenimiento industrial', 'Técnico de mantenimiento', 'Realizar mantenimiento preventivo y correctivo de maquinaria y equipos industriales.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 09:00 a 17:00', 95000, 'Formación técnica en electricidad o mecánica industrial.', 'Activa', '2026-11-17 04:57:30', '2026-12-22 04:57:30'),
(60, 'Analista de logística', 'Analista logístico', 'Planificar movimientos de mercadería, controlar inventarios y optimizar procesos logísticos.', 'Nueva Palmira, Colonia', 'híbrido', 'lunes, martes, miercoles, jueves, viernes, 09:00 a 17:00', 85000, 'Formación en logística o administración y manejo de Excel.', 'Activa', '2026-11-17 04:57:30', '2026-12-17 04:57:30'),
(61, 'Sereno de instalaciones', 'Sereno', 'Vigilar las instalaciones, controlar accesos y registrar novedades durante el turno.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 22:00 a 06:00', 48000, 'Responsabilidad, atención al detalle y disponibilidad nocturna.', 'Activa', '2026-11-17 04:57:30', '2026-12-02 04:57:30'),
(62, 'Supervisor de operaciones portuarias', 'Supervisor', 'Coordinar equipos de trabajo y supervisar operaciones de carga y descarga.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 06:00 a 14:00', 120000, 'Experiencia en operaciones portuarias y liderazgo de equipos.', 'Activa', '2026-11-17 04:57:30', '2026-12-27 04:57:30'),
(63, 'Auxiliar de limpieza', 'Auxiliar de servicios', 'Realizar tareas de limpieza y mantenimiento general de oficinas e instalaciones.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 07:00 a 15:00', 42000, 'Experiencia en limpieza, responsabilidad y capacidad para trabajar en equipo.', 'Activa', '2026-11-17 04:57:30', '2026-12-07 04:57:30'),
(64, 'Asistente de recursos humanos', 'Asistente de RRHH', 'Colaborar en procesos de selección, gestión de documentación y control de asistencia.', 'Nueva Palmira, Colonia', 'remoto', 'lunes, martes, miercoles, jueves, viernes, 08:00 a 16:00', 68000, 'Formación en recursos humanos o administración.', 'Activa', '2026-11-17 04:57:30', '2026-12-17 04:57:30'),
(65, 'Operador de maquinaria portuaria', 'Operador de maquinaria', 'Operar maquinaria utilizada en las operaciones portuarias y cumplir protocolos de seguridad.', 'Puerto de Nueva Palmira, Colonia', 'presencial', 'lunes, martes, miercoles, jueves, viernes, 11:00 a 20:00', 105000, 'Experiencia en operación de maquinaria pesada y conocimientos de seguridad industrial.', 'Activa', '2026-11-17 04:57:30', '2027-01-01 04:57:30');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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

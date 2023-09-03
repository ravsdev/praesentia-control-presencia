-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2023 a las 21:09:20
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `praesentia`
--
DROP DATABASE IF EXISTS `praesentia`;
CREATE DATABASE IF NOT EXISTS `praesentia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `praesentia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidents`
--

DROP TABLE IF EXISTS `incidents`;
CREATE TABLE IF NOT EXISTS `incidents` (
  `id_incident` int(11) NOT NULL AUTO_INCREMENT,
  `description_incident` varchar(300) NOT NULL,
  `record_begin_incident` datetime NOT NULL,
  `record_end_incident` datetime NOT NULL,
  `id_record` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_incident`),
  UNIQUE KEY `id_record` (`id_record`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `records`
--

DROP TABLE IF EXISTS `records`;
CREATE TABLE IF NOT EXISTS `records` (
  `id_record` int(11) NOT NULL AUTO_INCREMENT,
  `begin_record` datetime DEFAULT NULL,
  `end_record` datetime DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_record`),
  KEY `FK_id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `name_role` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_role`, `name_role`) VALUES
(1, 'admin'),
(2, 'supervisor'),
(3, 'empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name_user` varchar(100) NOT NULL,
  `last_name_user` varchar(100) NOT NULL,
  `dni_user` varchar(50) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(200) NOT NULL,
  `created_user` datetime NOT NULL DEFAULT current_timestamp(),
  `active_user` tinyint(1) DEFAULT 1,
  `role_user` int(11) DEFAULT 3,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_user` (`email_user`),
  UNIQUE KEY `dni_user` (`dni_user`),
  KEY `role_user` (`role_user`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `last_name_user`, `dni_user`, `email_user`, `password_user`, `active_user`, `role_user`) VALUES
(1, 'Administrador', 'Principal', '12000000A', 'admin@praesentia.org', '$2y$10$D2vfQ6epfH8/JNp4eT35decTJm4/sAXOE6wPSZS2ValjvabCiyHaO', 1, 1),
(2, 'Felipe', 'Gomez', '12345678B', 'felipe@praesentia.org', '$2y$10$Ooz7HiDrZaXfqkb3VPXzeO75nYVoW.TWjUFClYtAa3fdJUj9l/LEu', 1, 2),
(3, 'Raul', 'Perez', '02145631A', 'raul@praesentia.org', '$2y$10$NoZ2f/ddRVtkwq4gl0Ns5OyZiwK9SqmViTLIQc/biYuINt8VFeSbq', 1, 3);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`id_record`) REFERENCES `records` (`id_record`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incidents_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `records`
--
ALTER TABLE `records`
  ADD CONSTRAINT `records_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_user`) REFERENCES `roles` (`id_role`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2025 a las 15:01:11
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
-- Base de datos: `rivanimal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animal`
--

CREATE TABLE `animal` (
  `id_animal` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `clase` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `identificador` int(11) NOT NULL,
  `tamaño` varchar(15) NOT NULL,
  `situacion` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_entrada` date NOT NULL,
  `nivel` int(11) NOT NULL,
  `peso` float NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `comportamiento` varchar(255) NOT NULL,
  `ppp` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animal`
--

INSERT INTO `animal` (`id_animal`, `nombre`, `clase`, `raza`, `sexo`, `identificador`, `tamaño`, `situacion`, `fecha_nacimiento`, `fecha_entrada`, `nivel`, `peso`, `descripcion`, `foto`, `comportamiento`, `ppp`) VALUES
(1, 'Ohana', 'perro', 'Mestizo Pastor Alemán', 'hembra', 6547, 'mediano', 'refugio', '2021-07-01', '2023-09-12', 2, 0, '', '../imagenes/Ohana1.jpg', '', 0),
(2, 'Gante', 'perro', 'Mestizo Pastor Alemán', 'macho', 6608, 'mediano', 'refugio', '2021-08-01', '2023-11-04', 3, 0, '', '../imagenes/Gante.jpg', '', 0),
(3, 'Frozen', 'perro', 'Mestizo', 'hembra', 7058, 'mediano', 'refugio', '2017-12-01', '2024-12-28', 1, 0, '', '../imagenes/Frozen.jpg', '', 0),
(4, 'Guada', 'perro', 'Dogo Argentino', 'hembra', 7003, 'mediano', 'refugio', '2021-07-01', '2024-11-20', 1, 0, '', '../imagenes/Guada.jpg', '', 0),
(5, 'Cartoon', 'perro', 'Mestizo', 'macho', 5734, 'mediano', 'refugio', '2020-06-01', '2022-05-22', 3, 0, '', '../imagenes/Cartoon.jpg', '', 0),
(6, 'Kelan', 'perro', 'Mestizo', 'macho', 4388, 'mediano', 'refugio', '2019-09-01', '2020-05-27', 5, 0, '', '../imagenes/Kellan.jpg', '', 0),
(7, 'GATASTROFE', 'gato', 'Común europeo', 'hembra', 7091, 'mediano', 'refugio', '2024-04-01', '2025-03-11', 0, 0, '', '../imagenes/GATASTROFE.jpg', '', 0),
(8, 'Ethernal', 'perro', 'Mestizo pitbull', 'macho', 6040, 'mediano', 'refugio', '2021-04-01', '2023-02-01', 3, 0, '', '../imagenes/Ethernal.jpg', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chenil`
--

CREATE TABLE `chenil` (
  `id_chenil` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `guillotina` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chenil_animal`
--

CREATE TABLE `chenil_animal` (
  `id_chenil_animal` int(11) NOT NULL,
  `animal` int(11) NOT NULL,
  `chenil` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `codigo`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_diario`
--

CREATE TABLE `reporte_diario` (
  `id_reporte_diario` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `rol` varchar(30) DEFAULT NULL,
  `fecha` date NOT NULL,
  `horario` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reporte_diario`
--

INSERT INTO `reporte_diario` (`id_reporte_diario`, `usuario`, `rol`, `fecha`, `horario`) VALUES
(1, 1, 'voluntario', '2025-04-04', 'TARDE'),
(2, 21, 'voluntario', '2025-04-04', 'TARDE'),
(3, 21, 'voluntario', '2025-04-04', 'MAÑANA'),
(4, 21, 'voluntario', '2025-04-07', 'MAÑANA'),
(5, 22, 'voluntario', '2025-04-15', 'MAÑANA'),
(6, 23, 'voluntario', '2025-04-15', 'MAÑANA'),
(7, 24, 'voluntario', '2025-04-14', 'TARDE'),
(8, 1, 'voluntario', '2025-04-16', 'MAÑANA'),
(9, 1, 'voluntario', '2025-04-17', 'MAÑANA'),
(10, 1, 'voluntario', '2025-04-18', 'MAÑANA'),
(11, 1, 'voluntario', '2025-04-19', 'MAÑANA'),
(12, 1, 'voluntario', '2025-04-20', 'MAÑANA'),
(13, 1, 'voluntario', '2025-04-15', 'MAÑANA'),
(14, 1, 'voluntario', '2025-04-15', 'MAÑANA'),
(15, 1, 'voluntario', '2025-04-15', 'MAÑANA'),
(16, 1, 'voluntario', '2025-04-15', 'MAÑANA'),
(17, 1, 'voluntario', '2025-04-21', 'MAÑANA'),
(19, 1, 'voluntario', '2025-04-22', 'MAÑANA'),
(21, 1, 'voluntario', '2025-04-23', 'MAÑANA'),
(22, 26, 'voluntario', '2025-04-19', 'MAÑANA'),
(24, 26, 'voluntario', '2025-04-20', 'MAÑANA'),
(25, 26, 'voluntario', '2025-02-16', 'TARDE'),
(26, 26, 'voluntario', '2025-02-21', 'TARDE'),
(27, 26, 'voluntario', '2025-02-26', 'MAÑANA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_gatos`
--

CREATE TABLE `reporte_gatos` (
  `id_rep_gatos` int(11) NOT NULL,
  `reporte_diario` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `gato` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_hora_inicio` datetime NOT NULL,
  `fecha_hora_fin` datetime NOT NULL,
  `caca_nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_paseo`
--

CREATE TABLE `reporte_paseo` (
  `id_paseo` int(11) NOT NULL,
  `animal` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `reporte_diario` int(11) NOT NULL,
  `fecha_hora_inicio` datetime NOT NULL,
  `fecha_hora_fin` datetime NOT NULL,
  `descripcion` text NOT NULL,
  `caca_nivel` int(11) NOT NULL,
  `ubicaciones` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reporte_paseo`
--

INSERT INTO `reporte_paseo` (`id_paseo`, `animal`, `usuario`, `reporte_diario`, `fecha_hora_inicio`, `fecha_hora_fin`, `descripcion`, `caca_nivel`, `ubicaciones`) VALUES
(1, 3, 1, 1, '2025-04-04 17:30:16', '2025-04-04 18:15:16', 'Paseo bien, tranquilo', 4, 'RAYUELA'),
(2, 5, 22, 5, '2025-04-15 10:30:20', '2025-04-15 11:00:20', 'entró a chenil, visto y salimos. Hago sobredosificacion según salimos, y damos una vuelta, exige comida, pero seguimos caminando, llegamos a música y hacemos estabilización, bene, olfato y EYG', 3, 'FUERA'),
(3, 1, 23, 6, '2025-04-15 10:30:57', '2025-04-15 11:15:57', 'Estabilización bien, vestirla sin problemas. \nPaseo tranquilo y olfato por la casa de la música y la zona 2. Caca 5.\nMe han acompañado Maggie y Luis hasta la casa de la música para que Maggie y Ohana se conociesen.', 5, 'MUSICA,ZONA 2'),
(4, 2, 24, 7, '2025-04-14 17:05:56', '2025-04-14 17:20:56', 'Visto bien con el likimat, cuando termina salimos. Mira hacia la calle pero finalmente tira hacia el pipican. Estamos 10min, muy bien a su rollo olfateando. Vamos a salir a la calle y cuando estamos a la altura de la recepción se escucha un ruido fuerte.', 0, 'FUERA'),
(5, 8, 26, 22, '2025-04-19 10:30:25', '2025-04-19 11:00:25', 'me recibe saltarín, lo visto y salimos. En música hace sus croquetas y bebe en la fuente. A la altura de rayuela ve un perro pequeño y detona. Se le pasa al rato y hace croquetas en rayuela, después en el ayuntamiento jugamos a saltar obstáculos y ración de mimos. De ahí a CIPAR fue tranquilo.', 0, 'MÚSICA,RAYUELA,AYUNTAMIENTO'),
(6, 8, 26, 24, '2025-04-20 10:30:25', '2025-04-20 11:00:25', 'entro y tenía la manta fuera. Lo visto y salimos. Fue un buen paseo, tiró como siempre pero sin volverse loco. Hizo muchas croquetas y muchos minutos. En el ayuntamiento justamos a saltar y a correr. Se quedó tranquilo en el chenil.', 0, 'AYUNTAMIENTO'),
(7, 8, 26, 25, '2025-02-16 17:00:07', '2025-02-16 17:30:07', 'quedó con @Davidbm para trabajar lo vinculación de cartoon y eternal.  La verdad que fue muy bien. Los 2 tranquilos y momento de juego que lo cortamos antes de que alguno se pasara de la raya. Incluso eternal se ponía a hacer coquetas al lado de cartoon y luego cartoon le dio besos en el bozal. Después nos separamos y fuimos al ayuntamiento,  fue tranquilo el resto del paseo.\r\n', 0, 'MÚSICA,AYUNTAMIENTO'),
(8, 8, 26, 26, '2025-02-21 17:00:37', '2025-02-21 17:30:37', 'lo visto y vamos a montarco. Fue muy bien, haciendo croquetas en música y en los césped de montarco. Hizo mucho olfato.\r\nA la vuelta vimos a su archienemigo NEO que pese a que @~Paloma se cambió de acera, se puso a tirar como loco hacia ellos, no llegó a detonar y en música vimos a Panther con @~Begoña y más de lo mismo.  A mitad de los campos de fútbol se calmo y lo dejé tranquilo en el chenil.\r\n', 0, 'MONTARCO,MÚSICA'),
(9, 8, 26, 27, '2025-02-26 10:00:29', '2025-02-26 10:30:29', 'lo visto y salimos, fuimos a montarco. Vimos un par de perros se pone muy tenso, pero no detona. Hace sus croquetas en el césped y mimos.\r\n', 0, 'MONTARCO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_tarea`
--

CREATE TABLE `reporte_tarea` (
  `id_tarea` int(11) NOT NULL,
  `reporte_diario` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_hora_inicio` datetime NOT NULL,
  `fecha_hora_fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tratamiento`
--

CREATE TABLE `tratamiento` (
  `id_tratamiento` int(11) NOT NULL,
  `animal` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `peso_kg` float NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tratamiento`
--

INSERT INTO `tratamiento` (`id_tratamiento`, `animal`, `descripcion`, `fecha`, `tipo`, `peso_kg`, `activo`) VALUES
(1, 1, 'PRUEBA Dar de comer pienso adulto', '2025-04-15', 'alimentacion', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(25) NOT NULL,
  `apellido2` varchar(25) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre_usuario` varchar(25) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `dni` varchar(15) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `licenciaPPP` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido1`, `apellido2`, `contrasena`, `nombre_usuario`, `roles`, `dni`, `telefono`, `email`, `direccion`, `foto`, `licenciaPPP`) VALUES
(1, 'David', 'Barroso', 'Martínez', '$2y$10$QEp08A5mh3lf85vK0up7HeoGETSguPiTukpNLp8TGp/Mqae6Wh.HS', 'davidbm', 'admin,voluntario,gespad,educadora', '02779755k', '619309675', 'david.barrosomartinez@gmail.com', 'C/Obelix nº71', '', 0),
(21, 'David', 'Barroso', 'Martinez', '$2y$10$LgpLREvVIRJichCGGprF2OjT7nE1a/7so/aOt5sPph2FJG6bMIzmG', 'davidbm2', 'voluntario', '02779756k', '619309676', 'davidbm424@gmail.com', 'C\\Obelix nº71', '', 0),
(22, 'Silvia', 'Educadora', 's', '$2y$10$ZaZumz/./ur80wvheKkomOmC55gfx9JrpozJNQpA0taPaK94N2YZm', 'Sil', 'admin,voluntario,educadora', '000000001A', '630001417', 'silviaeducadora@gmail.com', 'C/sin nombre', '', 0),
(23, 'Carlos', 'Delgado', 's', '$2y$10$79vqt2zKh8uBlfCU6EzLeujqi71lXqtM88omToAvvQAnMw0aeX5aq', 'CarlosDelgado', 'voluntario', '000000002A', '628860758', 'carlosdelgado@gmail.com', 'C/sin nombre', '', 0),
(24, 'Elena', 's', 's', '$2y$10$XYtfi5q3KZxpr/hFBjgds..ulhWHV1lu4re5/zX7tqe6nZPAaRcTe', 'Elena1', 'voluntario', '000000003A', '665364659', 'elena1@gmail.com', 'C/sin nombre', '', 0),
(26, 'Luis', 'na', 'na', '$2y$10$v.CBttYCvbC.SCezAXUKuO8.kSRpjFylhCibLdJ7D5DWcsZrH5GMW', 'Luis1', 'voluntario', '000000005A', '661449896', 'luis@gmail.com', 'na', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id_animal`),
  ADD UNIQUE KEY `id` (`identificador`);

--
-- Indices de la tabla `chenil`
--
ALTER TABLE `chenil`
  ADD PRIMARY KEY (`id_chenil`);

--
-- Indices de la tabla `chenil_animal`
--
ALTER TABLE `chenil_animal`
  ADD PRIMARY KEY (`id_chenil_animal`),
  ADD KEY `animal` (`animal`),
  ADD KEY `chenil` (`chenil`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `reporte_diario`
--
ALTER TABLE `reporte_diario`
  ADD PRIMARY KEY (`id_reporte_diario`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `reporte_gatos`
--
ALTER TABLE `reporte_gatos`
  ADD PRIMARY KEY (`id_rep_gatos`),
  ADD KEY `reporte_diario` (`reporte_diario`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `gato` (`gato`);

--
-- Indices de la tabla `reporte_paseo`
--
ALTER TABLE `reporte_paseo`
  ADD PRIMARY KEY (`id_paseo`),
  ADD KEY `animal` (`animal`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `reporte_diario` (`reporte_diario`);

--
-- Indices de la tabla `reporte_tarea`
--
ALTER TABLE `reporte_tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `reporte_diario` (`reporte_diario`);

--
-- Indices de la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  ADD PRIMARY KEY (`id_tratamiento`),
  ADD KEY `animal` (`animal`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animal`
--
ALTER TABLE `animal`
  MODIFY `id_animal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `chenil`
--
ALTER TABLE `chenil`
  MODIFY `id_chenil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chenil_animal`
--
ALTER TABLE `chenil_animal`
  MODIFY `id_chenil_animal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte_diario`
--
ALTER TABLE `reporte_diario`
  MODIFY `id_reporte_diario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `reporte_gatos`
--
ALTER TABLE `reporte_gatos`
  MODIFY `id_rep_gatos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte_paseo`
--
ALTER TABLE `reporte_paseo`
  MODIFY `id_paseo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `reporte_tarea`
--
ALTER TABLE `reporte_tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  MODIFY `id_tratamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chenil_animal`
--
ALTER TABLE `chenil_animal`
  ADD CONSTRAINT `chenil_animal_ibfk_1` FOREIGN KEY (`animal`) REFERENCES `animal` (`id_animal`),
  ADD CONSTRAINT `chenil_animal_ibfk_2` FOREIGN KEY (`chenil`) REFERENCES `chenil` (`id_chenil`);

--
-- Filtros para la tabla `estado`
--
ALTER TABLE `estado`
  ADD CONSTRAINT `FK_estado_animal` FOREIGN KEY (`id_estado`) REFERENCES `animal` (`id_animal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte_diario`
--
ALTER TABLE `reporte_diario`
  ADD CONSTRAINT `reporte_diario_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `reporte_gatos`
--
ALTER TABLE `reporte_gatos`
  ADD CONSTRAINT `reporte_gatos_ibfk_1` FOREIGN KEY (`reporte_diario`) REFERENCES `reporte_diario` (`id_reporte_diario`),
  ADD CONSTRAINT `reporte_gatos_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `reporte_gatos_ibfk_3` FOREIGN KEY (`gato`) REFERENCES `animal` (`id_animal`);

--
-- Filtros para la tabla `reporte_paseo`
--
ALTER TABLE `reporte_paseo`
  ADD CONSTRAINT `reporte_paseo_ibfk_1` FOREIGN KEY (`animal`) REFERENCES `animal` (`id_animal`),
  ADD CONSTRAINT `reporte_paseo_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `reporte_paseo_ibfk_3` FOREIGN KEY (`reporte_diario`) REFERENCES `reporte_diario` (`id_reporte_diario`);

--
-- Filtros para la tabla `reporte_tarea`
--
ALTER TABLE `reporte_tarea`
  ADD CONSTRAINT `reporte_tarea_ibfk_1` FOREIGN KEY (`reporte_diario`) REFERENCES `reporte_diario` (`id_reporte_diario`);

--
-- Filtros para la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  ADD CONSTRAINT `tratamiento_ibfk_1` FOREIGN KEY (`animal`) REFERENCES `animal` (`id_animal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

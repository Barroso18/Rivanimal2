-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 12:34:19
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
  `raza` varchar(100) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `identificador` int(11) NOT NULL,
  `tamaño` varchar(15) NOT NULL,
  `situacion` varchar(50) NOT NULL,
  `disponibilidad` text NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_entrada` date NOT NULL,
  `nivel` int(11) NOT NULL,
  `peso` float NOT NULL,
  `descripcion` text NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `comportamiento` text NOT NULL,
  `socializacion` text NOT NULL,
  `ppp` tinyint(4) NOT NULL,
  `localidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animal`
--

INSERT INTO `animal` (`id_animal`, `nombre`, `clase`, `raza`, `sexo`, `identificador`, `tamaño`, `situacion`, `disponibilidad`, `fecha_nacimiento`, `fecha_entrada`, `nivel`, `peso`, `descripcion`, `foto`, `comportamiento`, `socializacion`, `ppp`, `localidad`) VALUES
(1, 'Ohana', 'perro', 'Mestizo Pastor Alemán', 'hembra', 6547, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2021-07-01', '2023-09-12', 2, 3, 'OHANA es una linda perra, le está costando adaptarse a su nueva situación. \r\nPasea bastante bien, necesita de una familia responsable, con ganas de trabajar con una perrita que necesita generar un poco de vínculo, pero que te enamorará en cuanto la veas.', '../imagenes/A_Ohana_P.jpg', 'Pasea bastante bien,', 'Con algunos perros puede tener alguna conducta no amistosa, pero necesita más confianza en sí misma. Con los voluntarios se muestra receptiva, amigable, cariñosa…', 0, 'RIVAS-VACIAMADRID'),
(2, 'Gante', 'perro', 'Mestizo Pastor Alemán', 'macho', 6608, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2021-08-01', '2023-11-04', 3, 1, 'GANTE es un mestizo de Pastor alemán, como otros muchos abandonos el animal se encuentra desubicado, estresado... no entiende porque la que fue su familia ahora no lo quiere.\r\nSe muestra alerta ante cualquier estímulo, ante algunos de sus compañeros en cheniles.\r\nSus paseos de momento son enérgicos, en cuanto tenga rutinas y se vaya adaptando seguro que rebajara el estrés.\r\nNecesita una familia que entienda su situación y tuviera mucha paciencia en los primeros momentos\r\nQuieres adoptarlo??', '../imagenes/A_Gante_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(3, 'Frozen', 'perro', 'Mestizo', 'hembra', 7058, 'mediano', 'Casa acogida', 'Adopción', '2017-12-01', '2024-12-28', 1, 1, 'Frozen también es otro de los abandonos de esta Navidad del 2024, recogida el día antes de Nochebuena. Según la llevamos al Centro le vimos que en la parte del ano tenía una herida bastante fea, inmediatamente la llevamos al veterinario y según nos dijeron podría haber sido provocado por el mordisco de otro perro y que la tenía hacia tiempo, por lo que no queremos ni pensar el dolor que ha podido pasar. Bueno ahora ya esta cuidada, medicada y haciéndole sus curas diarias.\r\nY a pesar de todo esto se muestra muy cariñosa, busca contacto siempre para que la acaricies, es tranquila.\r\n\r\nDale la oportunidad de conocer el amor y el respeto.', '../imagenes/A_Frozen_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(4, 'Guada', 'perro', 'Dogo Argentino', 'hembra', 7003, 'mediano', 'Casa acogida', 'Adopción', '2021-07-01', '2024-11-20', 1, 0, '', '../imagenes/A_Guada_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(5, 'Cartoon', 'perro', 'Mestizo', 'macho', 5734, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2020-06-01', '2022-05-22', 3, 0, 'Cartoon llego al centro con una situación bastante complicada en cuanto al acercamiento y contacto con las personas, no queria ni vernos, se sentía mal, incómodo, defraudado lo que le permitia mostrar picos de estrés que ocasionaba poco control de la mordida.\r\nPor su actitud ante el árnes, collar y correa observamos que el perro no había paseado nunca o por lo menos utilizado estas herramientas, por lo que tuvimos que empezar de cero para primero acercarnos nosotros como personas y posteriormente ir positivizando las herramientas\r\nActualmente seguimos trabajando el ganarnos su confianza ante el respeto y la compañía, darle herramientas para que pueda ir gestionando la mordida y apoyarle en sus pequeños avances que para él son muy grandes.\r\nEn los pequeños momentos que consigue estar algo más tranquilo le encanta que le acaricies muy despacito.\r\nCartoon necesita una familia de referencia que le acompañe en sus necesidades a través del respeto y la empatía.', '../imagenes/A_Cartoon_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(6, 'Kelan', 'perro', 'Mestizo', 'macho', 4388, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2019-09-01', '2020-05-27', 5, 0, 'Aunque es un perro joven la vida no le ha tratado bien, y su estancia en el chenil tampoco la gestiona adecuadamente, por ello además del estres añadido por vivir donde vive es un perro con miedo a los ruidos fuertes, a los movimientos bruscos y sobre todo a las personas por su mala experiencia.\r\nCon ayuda de tod@s los profesionales y voluntari@s va avanzando poquito a poquito, necesitando la confianza y seguridad que en su día la perdío con su vivencia, por ello seguimos una terapia en la que acercándonos diariamente a saludarle y respetando su espacio, le permite ir descubriendo que hay personas estupendas y que están dispuestas a ayudarle. Kellan en cuanto coge confianza, le encanta que le des mimitos, que le lleves a pasear y que le acompañes en el chenil. Sus paseos suelen ser en horas que hay poca gente y se le pasea hasta el momento por su zona de confort, le gusta montar en coche.\r\nLe encanta relacionarse con otros perros, jugar y se comunica súper bien con ellos.\r\nKellan necesita una familia que le de su confianza, le RESPETE y le ofrezca tiempo en su aprendizaje. También sería importante que la familia viviera en entorno de campo donde los ruidos y el bullicio de gente no estuviera presente en su vida diaria.', '../imagenes/A_Kellan_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(7, 'GATASTROFE', 'gato', 'Común europeo', 'hembra', 7091, 'mediano', 'Adoptado', 'Adoptado', '2024-04-01', '2025-03-11', 1, 2, 'GATASTROFE, una preciosa gatita de pelo largo, super buena y cariñosa. Nos dieron aviso porque creían que era paralitica, en realidad tenía una fractura de cadera que tuvimos que operar de urgencia, pero ya está feliz y recuperada. Es una gata amorosa, no para de restregarse y ronronear y se lleva bien con otros gatos.', '../imagenes/A_GATASTROFE_G.jpg', '', '', 0, 'MADRID'),
(8, 'Ethernal', 'perro', 'Mestizo pitbull', 'macho', 6040, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2021-04-01', '2023-02-01', 3, 0, '', '../imagenes/A_Ethernal_P.jpg', '', '', 1, 'RIVAS-VACIAMADRID'),
(13, 'Wasabi', 'perro', 'Pitbull', 'hembra', 5750, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2020-12-01', '2022-05-30', 4, 1, 'Esta pequeña fue recogida al lado de un parque canino. Su estado físico era bastante llamativo y triste, llena de laceraciones por todo su cuerpo, en la cabeza, patas, abdomen… y el estado de desnutrición que tenía era bastante visible pesaba 12,4 kg\r\nNos dijeron que cuando la vieron estaba comiendo hojas, arena… nos podíamos imaginar el hambre que estaba pasando. Bueno pues ahora todo eso ya se ha acabado.\r\nYa recuperada fisicamente, es una perra joven, muy alegre, con mucha energía y ganas de investigar el mundo. Debido a su pasado tiene ciertos miedos que se trabajan proporcionandola confianza y calma, ahí es cuando sale lo mejor de ella y te demuestra todo el amor que tiene para dar.\r\nEstá en proceso de adaptación. ¿Quieres darla una oportunidad?', '../imagenes/A_Wasabi_P.jpg', 'Rompe Mantas', '', 1, 'RIVAS-VACIAMADRID'),
(19, 'Pachi', 'perro', 'Pachón Navarro', 'macho', 6947, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2019-06-01', '2024-10-01', 2, 3, 'Su nombre y su nariz ya dan muestra de su principal cualidad: como buen pachón navarro es un rastreador nato. Durante sus paseos se relaja oliendo cada metro cuadrado de césped. ¿A qué huele...? Él ya está allí. ¿Salchichas para hacer olfato? No se le escapará ni una.', '../imagenes/A_Pachi_P.jpg', 'En la calle. Por su necesidad exploratoria necesita una familia que sepa manejar una correa larga, preferiblemente 5-10 metros, pues Pachi es de paso ligero. Y si a la familia le gusta el campo será el \'match\' perfecto, porque a la larga será donde más disfrutéis todos.', 'Es un perro muy noble al que le encanta el contacto humano... ¡y comer! Le gustará estar cerca de ti y recibir mimos, muchos mimos. ', 0, ''),
(20, 'Ajo', 'perro', 'Mestizo', 'macho', 7101, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2023-08-01', '2025-03-28', 2, 15, 'no lo he pasado muy bien en el pasado, pero nada que con amor, paciencia y un poco de trabajo por parte de los humanos, que no pueda mejorar!', '../imagenes/A_Ajo_P.jpg', '', ' soy muy cariñoso y bueno con humanos, con perros me cuesta un poquito más porque soy inseguro y tengo miedo', 0, ''),
(21, 'Rayo', 'gato', 'Común europeo', 'macho', 2109, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2015-04-28', '2016-01-17', 1, 2, 'RAYO es un gatito blanco y atigrado de 9 meses. RAYO fue encontrado desorientado en la calle en una fría noche de diciembre por una pareja que decidió llevárselo a casa para intentarle darle una nueva vida. RAYO es un gatito cariñoso y tranquilo. Busca una familia que sepa darles las atenciones que se merece.', '../imagenes/A_Rayo_G.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(22, 'Yoshi', 'perro', 'Bull Terrier', 'macho', 4878, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2017-03-01', '2020-11-10', 2, 2, 'Yosi es un bulterrier de casi 8 años, de los cuales van hacer 5 que lleva en un chenil. Necesita personas que sepan gestionarlo ya que aunque es un perro alegre y simpático, que le encantan las salchichas y se pone muy feliz cuando ve a los voluntarios buscando sus mimos y comiéndoles a besos en ciertos momentos muestra algún comportamiento que hay que saber gestionar.\r\n\r\nLe encanta revolcarse en cualquier sitio, arena, césped, hojas… y cómo buen bulterrier es muy cabezón y necesita su espacio.\r\nNo le gusta que otros machos le invadan demasiado o sean bruscos con él, tanto personas como perros, lo normal. Es algo independiente y va a lo suyo. Necesita un hogar tranquilo, sin otros animales y que le den su espacio.\r\n\r\n¿Quieres hacer crecer tu familia con este bombón?\r\nSi quieres y crees que puedes darle esa oportunidad que otros no han sabido darle, contacta con nosotros', '../imagenes/A_Yoshi_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(23, 'Yin', 'gato', 'Común Europeo', 'macho', 2434, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2016-03-25', '2016-06-01', 1, 2, 'YIN es un gatito negro muy juguetón y activo, al que les encanta perseguir a los gatos y a los perros de la casa de acogida. En cuanto te vea, no para de buscarte para estar en tu compañía y hacerte la croqueta.', '../imagenes/A_Yin_G.jpg', '', '', 0, 'MADRID'),
(24, 'Zip', 'gato', 'Común Europeo', 'macho', 2242, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2015-08-15', '2016-05-29', 1, 2, 'ZIP es un joven rubito un poco asustadizo. Cuando era pequeño, lo encontraron en la calle con su hermanito, pero él se quedó un poco más tímido y necesita alguien que le de su tiempo para que coja confianza.', '../imagenes/A_Zip_G.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(25, 'Amur', 'perro', 'Mestizo', 'macho', 6158, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2020-09-01', '2022-12-16', 3, 2, 'Amur es un perro que poco a poco ha empezado a cambiar algo su comportamiento desde que llegó. Cuando fue recogido se mostraba asustado, cauto y no le gustaba que estuviéramos cerca de él. Y aunque todavía no se muestra seguro cuando ve personas, está empezando a cambiar un poquito, sobre todo con las personas que todos los días le cuidan, limpian y dan de comer. Ha debido pasar por muchas penalidades ya que por ejemplo con la comida tiene protección de recursos.\r\nNecesita que todos esos traumas que pueda tener de su pasado, vayan cambiando por ella lo mejor es que esté con alguien que entienda de estos comportamientos.\r\nSi crees que puedes darle esa seguridad y hacerle confiar en las personas contacta con nosotros', '../imagenes/A_Amur_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID'),
(26, 'Wifi', 'perro', 'Mestizo Border Collie', 'macho', 6746, 'mediano', 'Refugio', 'Apadrinar,Acogida,Adopción', '2022-02-01', '2024-02-19', 4, 2, 'WIFI es un perrete que llegó con mucho miedo a las personas. Cuando pasas por su chenil o se queda bloqueado en una esquina o te ladra para intentar ahuyentarte. Detrás de esos comportamientos no hay más que mucho miedo...\r\n\r\nCon paciencia y mucho cariño algunos de los miembros de rivanimal han conseguido ir ganándose su confianza y se muestra ya muy amigable con ellos. Sale de paseo y se deja poner el arnés por esos que pertenecen a su \"club de confianza\"\r\n\r\nWIFI necesita una persona que vea más allá de su belleza y sea capaz de dedicarle el tiempo y paciencia que necesita.', '../imagenes/A_Wifi_P.jpg', '', '', 0, 'RIVAS-VACIAMADRID');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chenil`
--

CREATE TABLE `chenil` (
  `id_chenil` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `guillotina` tinyint(1) NOT NULL,
  `reja` tinyint(1) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chenil`
--

INSERT INTO `chenil` (`id_chenil`, `numero`, `guillotina`, `reja`, `activo`, `descripcion`) VALUES
(1, 1, 0, 0, 1, ''),
(2, 2, 0, 0, 1, ''),
(3, 3, 0, 0, 1, ''),
(4, 4, 0, 0, 1, ''),
(5, 5, 0, 0, 1, ''),
(6, 6, 0, 0, 1, ''),
(7, 7, 0, 0, 1, ''),
(8, 8, 0, 0, 1, ''),
(9, 9, 0, 0, 1, ''),
(10, 10, 0, 0, 1, ''),
(11, 11, 0, 0, 1, ''),
(12, 12, 0, 0, 1, ''),
(13, 13, 0, 1, 1, ''),
(14, 14, 0, 0, 1, ''),
(15, 15, 0, 0, 1, ''),
(16, 16, 0, 0, 1, ''),
(17, 17, 0, 0, 1, ''),
(18, 18, 0, 0, 1, ''),
(19, 19, 0, 0, 1, ''),
(20, 20, 0, 0, 1, ''),
(21, 21, 0, 0, 1, ''),
(22, 22, 0, 0, 1, ''),
(23, 23, 0, 0, 1, ''),
(24, 24, 0, 0, 1, ''),
(25, 25, 1, 0, 1, ''),
(26, 26, 1, 0, 1, ''),
(27, 27, 1, 0, 1, ''),
(28, 28, 1, 0, 1, ''),
(29, 29, 0, 0, 0, 'Desactivado por tener a River al lado'),
(30, 30, 0, 0, 1, ''),
(31, 31, 0, 0, 1, ''),
(32, 32, 0, 0, 1, ''),
(33, 33, 0, 0, 0, ''),
(34, 34, 0, 0, 1, ''),
(35, 35, 0, 0, 1, ''),
(36, 36, 0, 0, 0, ''),
(37, 37, 0, 0, 0, ''),
(38, 38, 0, 0, 0, ''),
(39, 39, 0, 0, 1, ''),
(40, 40, 0, 0, 1, ''),
(41, 41, 0, 0, 1, 'Baño 1'),
(42, 42, 0, 0, 1, 'Baño 2'),
(43, 43, 0, 0, 1, 'Baño 3');

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

--
-- Volcado de datos para la tabla `chenil_animal`
--

INSERT INTO `chenil_animal` (`id_chenil_animal`, `animal`, `chenil`, `activo`) VALUES
(1, 22, 1, 1),
(2, 2, 2, 1),
(3, 19, 7, 1),
(4, 1, 9, 1),
(5, 5, 18, 1),
(6, 6, 40, 1),
(7, 8, 22, 1),
(8, 8, 22, 1),
(9, 13, 6, 1),
(10, 25, 15, 1),
(18, 26, 16, 1);

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
-- Estructura de tabla para la tabla `raza_animal`
--

CREATE TABLE `raza_animal` (
  `id_raza` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `clase` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `raza_animal`
--

INSERT INTO `raza_animal` (`id_raza`, `nombre`, `clase`) VALUES
(43, 'Mestizo Pitbull', 'perro'),
(44, 'Mestizo Labrador', 'perro'),
(45, 'Mestizo Pastor Alemán', 'perro'),
(46, 'Mestizo', 'perro'),
(47, 'Dogo Argentino', 'perro'),
(48, 'Mestizo Shih Tzu', 'perro'),
(49, 'Pachón Navarro', 'perro'),
(50, 'Mestizo Border Collie', 'perro'),
(51, 'Pitbull', 'perro'),
(52, 'Pastor Belga Malinois', 'perro'),
(53, 'American Stafford', 'perro'),
(54, 'Staffordshire Bull Terrier', 'perro'),
(55, 'Galgo', 'perro'),
(56, 'Mastin', 'perro'),
(57, 'Mestizo American Stafford', 'perro'),
(58, 'Bull Terrier', 'perro'),
(59, 'Alano', 'perro'),
(60, 'Mestizo Bretón', 'perro'),
(61, 'Golden Retriever', 'perro'),
(62, 'Beagle', 'perro'),
(63, 'Boxer', 'perro'),
(64, 'Yorkshire Terrier', 'perro'),
(65, 'Chihuahua', 'perro'),
(66, 'Cocker Spaniel', 'perro'),
(67, 'Doberman', 'perro'),
(68, 'Schnauzer', 'perro'),
(69, 'Pug', 'perro'),
(70, 'Shiba Inu', 'perro'),
(71, 'Border Collie', 'perro'),
(72, 'Bichón Maltés', 'perro'),
(73, 'Akita Inu', 'perro'),
(74, 'Samoyedo', 'perro'),
(75, 'Husky Siberiano', 'perro'),
(76, 'West Highland White Terrier', 'perro'),
(77, 'Fox Terrier', 'perro'),
(78, 'Setter Irlandés', 'perro'),
(79, 'Dálmata', 'perro'),
(80, 'San Bernardo', 'perro'),
(81, 'Teckel (Dachshund)', 'perro'),
(82, 'Pomerania', 'perro'),
(83, 'Boston Terrier', 'perro'),
(84, 'Común Europeo', 'gato'),
(85, 'Siamés', 'gato'),
(86, 'Persa', 'gato'),
(87, 'Maine Coon', 'gato'),
(88, 'Ragdoll', 'gato'),
(89, 'Sphynx', 'gato'),
(90, 'British Shorthair', 'gato'),
(91, 'Bengalí', 'gato'),
(92, 'Azul Ruso', 'gato'),
(93, 'Bosque de Noruega', 'gato'),
(94, 'Abisinio', 'gato'),
(95, 'Scottish Fold', 'gato'),
(96, 'Angora Turco', 'gato'),
(97, 'Burmés', 'gato'),
(98, 'Chartreux', 'gato'),
(99, 'Devon Rex', 'gato'),
(100, 'Oriental', 'gato'),
(101, 'Manx', 'gato'),
(102, 'Exótico de pelo corto', 'gato'),
(103, 'Himalayo', 'gato'),
(104, 'Somali', 'gato'),
(105, 'Gato Mestizo', 'gato');

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
(27, 26, 'voluntario', '2025-02-26', 'MAÑANA'),
(29, 1, 'voluntario', '2025-05-10', 'MAÑANA'),
(56, 27, 'voluntario', '2025-05-20', 'MAÑANA'),
(57, 1, 'voluntario', '2025-05-20', 'TARDE'),
(58, 36, 'voluntario', '2025-05-21', 'TARDE');

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

--
-- Volcado de datos para la tabla `reporte_gatos`
--

INSERT INTO `reporte_gatos` (`id_rep_gatos`, `reporte_diario`, `usuario`, `gato`, `descripcion`, `fecha_hora_inicio`, `fecha_hora_fin`, `caca_nivel`) VALUES
(1, 21, 1, 7, '', '2025-04-23 10:00:29', '2025-04-23 10:30:29', 2);

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
(9, 8, 26, 27, '2025-02-26 10:00:29', '2025-02-26 10:30:29', 'lo visto y salimos, fuimos a montarco. Vimos un par de perros se pone muy tenso, pero no detona. Hace sus croquetas en el césped y mimos.\r\n', 0, 'MONTARCO'),
(34, 1, 36, 58, '2025-05-21 17:00:00', '2025-05-21 17:30:00', 'También nerviosa, mordiendo arnés y ladrando porque hay barullo fuera. Sale como loca y ya fuera buen paseo, vamos a música, un poco de olfato, vuelta por rayuela, allí juega un poco pero hace mucho calor u se cansa rápido. Vemos primero una perra a lo lejos, la mira pero doy tiempo y gestiona bien, se da la vuelta. Luego vemos a Víctor con Zeus en el césped, igual, al quedarse mirando, me espero y se vuelve un par de veces hacia mí, la premio pero no se le va el foco, aunque no detona. Al final me la llevo y tengo que tirar de ella para que avance. Vuelta bien, entra en chenil bastante tranquila. Reviso espigas, hago mimos.\r\n', 0, 'RAYUELA,CASA MÚSICA'),
(35, 19, 36, 58, '2025-05-21 17:30:00', '2025-05-21 18:00:00', 'Me saluda muy contento con su mordedor, le pongo bien el arnés y sale como un toro, casi se estampa contra la valla. Paseo en su línea, intentando arrancarme el brazo 😅, olfateando todo mucho. Estamos un poco por música y gradas, me pasea por el parking y se bloquea un par de veces. Volvemos más tranquilo pero al ir llegando vuelve a tirar más, sobretodo dentro del CIPAR hacia su chenil. Tiene la cena y se pone a engullirla.\r\n', 0, 'CASA MÚSICA'),
(36, 20, 36, 58, '2025-05-21 18:30:00', '2025-05-21 19:00:00', 'Cierro a Amur. Ajo como loco en Chenil, me cuesta poner el arnés porque no para de saltar y ladrar a los vecinos. Salimos y como pipican está ocupado salimos a música y rayuela. Paseo en su línea, marcando todo mucho, rascando el suelo y gruñendo, y tirando de correa, cacas 5 y 6. Se pone a hacer croquetas como loco y se le suelta el enganche de la correa al arnés, no entiendo cómo, pero  suerte me he dado cuenta antes de que se levantara y se lo he vuelto a poner. A la vuelta un poco más tranquilo, pero tira cuando llegamos a CIPAR. Reviso cuerpo para quitar espigas, tiro unos pocos premios para que busque.\r\n', 5, 'RAYUELA,CASA MÚSICA'),
(38, 1, 1, 57, '2025-05-20 17:22:00', '2025-05-20 18:22:00', 'test', 2, 'MONTARCO');

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
(2, 13, 'Pienso Hipoalergénico', '2025-05-11', 'alimentacion', 0, 1),
(3, 13, 'Puesto Collar antiparasitario', '2023-06-03', 'veterinario', 0, 1),
(4, 13, 'Puesta Pipeta antiparasitario', '2023-06-13', 'veterinario', 0, 1),
(5, 19, 'Pienso Struvite', '2025-05-22', 'alimentacion', 0, 1),
(6, 1, 'Pienso Adulto y lata', '2025-05-22', 'alimentacion', 0, 1),
(7, 8, 'MAÑANA 1 Deprax 100 mg', '2025-05-22', 'veterinario', 0, 1),
(8, 8, 'Pienso Struvite', '2025-05-22', 'alimentacion', 0, 1);

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
(1, 'David', 'Barroso', 'Martínez', '$2y$10$QEp08A5mh3lf85vK0up7HeoGETSguPiTukpNLp8TGp/Mqae6Wh.HS', 'davidbm', 'admin,voluntario,gespad,educadora', '000000001A', '000000001', 'david.barrosomartinez@gmail.com', 'sin nombre', '../imagenes/U_davidbm.jpg', 0),
(21, 'David', 'Barroso', 'Martinez', '$2y$10$LgpLREvVIRJichCGGprF2OjT7nE1a/7so/aOt5sPph2FJG6bMIzmG', 'davidbm2', 'voluntario', '000000002k', '000000002', 'davidbm424@gmail.com', 'sin nombre', '', 0),
(22, 'Silvia', 'Educadora', 's', '$2y$10$ZaZumz/./ur80wvheKkomOmC55gfx9JrpozJNQpA0taPaK94N2YZm', 'Sil', 'admin,voluntario,educadora', '000000003A', '000000003', 'silviaeducadora@gmail.com', 'C/sin nombre', '', 0),
(23, 'Carlos', 'Delgado', 's', '$2y$10$79vqt2zKh8uBlfCU6EzLeujqi71lXqtM88omToAvvQAnMw0aeX5aq', 'CarlosDelgado', 'voluntario', '000000004A', '000000004', 'carlosdelgado@gmail.com', 'C/sin nombre', '', 0),
(24, 'Elena', 's', 's', '$2y$10$XYtfi5q3KZxpr/hFBjgds..ulhWHV1lu4re5/zX7tqe6nZPAaRcTe', 'Elena1', 'voluntario', '000000005A', '000000005', 'elena1@gmail.com', 'C/sin nombre', '', 0),
(26, 'Luis', 'na', 'na', '$2y$10$v.CBttYCvbC.SCezAXUKuO8.kSRpjFylhCibLdJ7D5DWcsZrH5GMW', 'Luis1', 'voluntario', '000000006A', '000000006', 'luis@gmail.com', 'na', '', 1),
(27, 'María', 'Manzanero', 'Gilsanz', '$2y$10$LtL..IkEia6/eF/NgMpxs.lmlh8H6kXXV8KH5xCidCa1rEObGnO7y', 'mariamg', 'admin,voluntario,gespad,educadora', '000000007A', '000000007', 'maria@gmail.com', 'C/sin nombre', '', 0),
(35, 'David', 'Barroso', 'Martínez', '$2y$10$zFBf5U.otzUOZGR0MnMCSek8qTzNztUTxszCcH6IuQq5wAPMhCEAe', 'davidbm3', 'admin,voluntario,gespad,educadora,padrino', '000000010A', '000000010', 'david.barrosomartinez4@gmail.com', 'C/sin nombre', '', 1),
(36, 'Laura', 'J', 'na', '$2y$10$6K1p9.O1DaBx7IBjscie2u5vHF2MRetu6Fp2dFN9NMeY5yiE25oaS', 'Lauraj', 'voluntario', '000000011A', '000000011', 'lauraj@gmail.com', 'sin nombre', '', 0);

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
-- Indices de la tabla `raza_animal`
--
ALTER TABLE `raza_animal`
  ADD PRIMARY KEY (`id_raza`),
  ADD UNIQUE KEY `nombre` (`nombre`);

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
  MODIFY `id_animal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `chenil`
--
ALTER TABLE `chenil`
  MODIFY `id_chenil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `chenil_animal`
--
ALTER TABLE `chenil_animal`
  MODIFY `id_chenil_animal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `raza_animal`
--
ALTER TABLE `raza_animal`
  MODIFY `id_raza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `reporte_diario`
--
ALTER TABLE `reporte_diario`
  MODIFY `id_reporte_diario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `reporte_gatos`
--
ALTER TABLE `reporte_gatos`
  MODIFY `id_rep_gatos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reporte_paseo`
--
ALTER TABLE `reporte_paseo`
  MODIFY `id_paseo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `reporte_tarea`
--
ALTER TABLE `reporte_tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  MODIFY `id_tratamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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

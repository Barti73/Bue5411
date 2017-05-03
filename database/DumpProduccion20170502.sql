-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 02, 2017 at 09:48 PM
-- Server version: 10.0.27-MariaDB-cll-lve
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codigoco_codigo5411`
--

-- --------------------------------------------------------

--
-- Table structure for table `noticia`
--

CREATE TABLE `noticia` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `texto` text NOT NULL,
  `posicion` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `noticia`
--

INSERT INTO `noticia` (`id`, `id_usuario`, `titulo`, `texto`, `posicion`, `fecha`, `imagen`, `estado`) VALUES
(100, 2, 'La libertad de comunicar', '<p>Un diario digital con informaci&oacute;n de la Ciudad de Buenos Aires. Sin prejuicios, atinada y antinada, aunque no la nada misma, poco solemne, picante y fundamentalmente libre, democr&aacute;tica.</p>\r\n<p>Con nuestros propios tiempos de edici&oacute;n, sin locuras informativas pero con cierta locura de bohemios perdidos, de cronistas callejeros y de malabaristas de la vida. Periodismo independiente y dependiente de nosotros mismos.</p>\r\n<p>C&oacute;digo5411, formalmente presentado. Buenos d&iacute;as, buenas tardes, buenas noches, Buenos Aires.</p>', 5, '2017-04-04 18:27:49', 'noticia_J953Q7781L_1600x900.jpg', 2),
(101, 2, 'El chorro del Senado', '<p>Amado Boudou dej&oacute; una catarata de nombramientos en la c&aacute;mara alta cuando a fines de 2015 dej&oacute; su cargo como Vicepresidente. Ahora cambi&oacute; el chorro, el agua fluye a otros ritmos, pero el PRO mete contratos a lo pavote.</p>\r\n<p>En realidad, para ser justos, el encargado de dibujar, truchar y quedarse con parte de esos contratos &ldquo;es el Secretario Administrativo del Senando, el michetista Helio Rebot&rdquo;, relata uno de los empleados que se qued&oacute; afuera de esa movida.</p>\r\n<p>&iquest;Pero qui&eacute;n es Rebot?. El tipo viene de ronda de la legislatura. En &eacute;poca de N&eacute;stor coqueteaba con el kirchnerismo y dio una vuelta de campana cuando enjuiciaron al Jefe de Gobierno, An&iacute;bal Ibarra por la masacre de Croma&ntilde;&oacute;n. El voto de Rebot fue decisivo en la Legislatura para voltear a Ibarra.</p>\r\n<p>M&aacute;s tarde se convirti&oacute; de a poco en uno de los hombres de confianza de Gabriela Michetti y despu&eacute;s que ella perdi&oacute; la interna en la ciudad contra Horacio Rodr&iacute;guez Larreta, opt&oacute; por el silencio.</p>\r\n<p>Cuando Michetti lleg&oacute; como Vicepresidenta de la Naci&oacute;n al Senado le encarg&oacute; a Rebot que iniciara una auditoria de dos mil contratos que el pillo de Boudou hab&iacute;a dejados firmados y vigentes. En ese revoleo el hombre acomod&oacute; alguno de sus tantos.</p>\r\n<p>&ldquo;Esa modalidad -cuenta uno de sus ex empleados- ya la practicaba en la legislatura. Ahora debe tener unos 50 contratos escondidos entre apellidos de los primos, sobrinos, su mujer y amigos, que le dejan una parte. En 50 contratos puede estar haciendo un palo por mes&rdquo;. Pesos, aclara, por las dudas. &iquest;Y la revoluci&oacute;n &eacute;tica de Michetti?.</p>', 3, '2017-04-04 18:27:28', 'noticia_Y4ODXOKDW9_1600x900.jpg', 2),
(102, 2, 'Una Tomada de pelo K', '<p>El ex Ministro de Trabajo de la Naci&oacute;n, ahora Diputado de la Ciudad, present&oacute; un solo proyecto en 2017. En su iniciativa est&aacute; preocupado por &ldquo;el estado edilicio&rdquo; de una escuela.</p>\r\n<p>M&aacute;s all&aacute; de sus leg&iacute;timos reclamos por el establecimiento &ldquo;M&aacute;ximo Sab&aacute; Victoria&rdquo; del barrio V&eacute;lez Sarfield, parece que la tarea legislativa de Carlos Tomada es escasa.</p>\r\n<p>Tal vez su justificativo sea que preside el bloque principal del Frente para la Victoria, m&aacute;s all&aacute; que el kirchnerismo all&iacute; est&aacute; dividido en otros espacios. Tomada podr&aacute; decir que tiene reuni&oacute;n ac&aacute; o all&aacute;, pero poco argumento para acreditar una labor legislativa intensa.</p>', 3, '2017-04-03 19:41:16', 'noticia_17L37LE36V_1600x900.jpg', 2),
(103, 2, 'Legislatura, confirmado, el Miércoles laburan', '<p>El traspaso de diversas &aacute;reas de la justicia nacional a la ciudad es el tema principal de la agenda legislativa de esta semana. &iquest;Diego Santilli, el vicejefe a cargo del parlamento porte&ntilde;o, mandar&aacute; gaseosas a cada banca con la plata del presupuesto?. C&oacute;digo5411, por unanimidad, prefiere Campari con naranja.</p>\r\n<p>La sesi&oacute;n fue suspendida el jueves &uacute;ltimo por el deceso del ex legislador macrista Enzo Pagani pero parece que los muchachos y chicas de Per&uacute; 160 seguir&aacute;n de recogimiento unas semanas m&aacute;s. Despu&eacute;s de la sesi&oacute;n de esta semana, no habr&aacute; reuniones hasta fin de mes.</p>\r\n<p>Juzgados penales y de relaciones del consumo son los fueros judiciales que la naci&oacute;n traspasara al &aacute;mbito local. La sesi&oacute;n tempranera fue convocada para las 11 de la ma&ntilde;ana del pr&oacute;ximo Mi&eacute;rcoles.</p>\r\n<p>En realidad en la sede de la legislatura aseguran que no ser&iacute;a del todo conveniente hacer la sesi&oacute;n el 6, el d&iacute;a en que la CGT convoc&oacute; a un paro general.</p>', 4, '2017-04-03 19:42:41', 'noticia_6PL3W57DJR_1600x900.jpg', 2),
(104, 2, 'Los delirios millonarios de Télam', '<p>Adem&aacute;s de una espantosa gesti&oacute;n period&iacute;stica iniciada en Diciembre de 2015, cuando asumi&oacute; Mauricio Macri como Presidente de la Naci&oacute;n, la conducci&oacute;n de la Agencia Nacional de Noticias compra equipos de televisi&oacute;n por un mill&oacute;n de d&oacute;lares. En tiempos de Netflix y Youtube, es evidente que nos toman por boludos.</p>\r\n<p>El responsable de los medios del Estado , el empresario hotelero Hern&aacute;n Lombardi, puso al frente de T&eacute;lam a un veterano cronista de televisi&oacute;n. &iquest;Antecedentes?. Rodolfo Pous&aacute;, titular de la agencia de noticias, es el resposable de los 200 rajes en ese mismo lugar en &eacute;pocas de la Alianza. Por entonces Pous&aacute; era amigo personal del Presidente de la Naci&oacute;n, Fernando de la R&uacute;a. Ahh, s&iacute;, el mismo De la R&uacute;a.</p>\r\n<p>Ahora macrista, Pous&aacute; se queja todos los d&iacute;as que &ldquo;La C&aacute;mpora&rdquo; le maneja la empresa. Por otro lado, un ex delegado gremial se&ntilde;ala que el m&aacute;ximo responsable de T&eacute;lam se puso a comprar equipos de televisi&oacute;n valuados en un mill&oacute;n de d&oacute;lares. S&iacute;, un palo verde. &iquest;Para qu&eacute;?. El tipo quiere convertir parte de la agencia de noticias en un canal de televisi&oacute;n. &iquest;Y canal 7 para qu&eacute; est&aacute;?. &iquest;Lombardi querr&aacute; cerrarlo y concentrar todos los medios del estado en un solo espacio?.</p>\r\n<p>Pero como si esto fuera poco, el tipo tambi&eacute;n quiere desarrollar &ldquo;T&eacute;lam radio&rdquo; y armar un mega estudio para emitir programaci&oacute;n propia con una inversi&oacute;n que las mismas autoridades se niegan a informar.</p>\r\n<p>En Casa de Gobierno se hacen los sotas. Pero un asesor de muchos a&ntilde;os del Presidente es sincero. &ldquo;Macri no le da bola a los medios del Estado&rdquo;, dice.</p>', 5, '2017-04-03 22:42:55', 'noticia_4ZP89MX3MK_1600x900.jpg', 2),
(105, 2, 'Los piquetes de Larreta I', '<p>Disculp&aacute; las molestias, dice un cartel. &ldquo;La puta que te pari&oacute;&rdquo;, se esfuerza en gritar por la ventana de su auto un muchacho trabado por el tr&aacute;nsito.</p>\r\n<p>Adem&aacute;s de los cortes de calles por las protestas sociales el gobierno de la ciudad te suma m&aacute;s problemas. Ejemplos, ejemplos y ejemplos. Malas noticias, ning&uacute;n GPS podr&aacute; ayudarte.</p>\r\n<p>El recorrido completo entre Paseo Col&oacute;n y Alem por el bajo es una odisea. Vallas, pozos, desv&iacute;os y falta de se&ntilde;ales. De noche, en varios lugares, falta luz.</p>\r\n<p>De d&iacute;a, en horario pico el recorrido entre Paseo Col&oacute;n e Independencia hasta Alem y el Sheraton dura una hora, con los santos de tu lado. De noche es un tren fantasma por el peligro que representa la falta de se&ntilde;ales viales. En esa zona se construye el &ldquo;Metrob&uacute;s del bajo&rdquo;.</p>', 2, '2017-04-05 18:39:54', 'noticia_JRE8MRM3Y2_1600x900.jpg', 2),
(106, 2, 'Losteau, Losteau, Losteau el Coti que te Carrió', '<p>El ex embajador Argentino en EEUU y ex Ministro de Econom&Iacute;a de Cristina Fern&aacute;ndez va a ser candidato. &iquest;en qu&eacute; lista?. Con Mart&iacute;n Losteau nunca se sabe.</p>\r\n<p>Uhhh, entender a ciertos pol&iacute;ticos es incre&iacute;ble. En principio integrar&iacute;a una lista de candidatos a diputados nacionales por la Capital Federal, por la UCR o por otra coalici&oacute;n.</p>\r\n<p>La &uacute;nica forma en que Losteau aceptar&iacute;a ocupar un segundo lugar, es s&iacute; Elisa Carri&oacute; encabeza esa n&oacute;mina. Si no, minga, &eacute;l ir&iacute;a primero para competir contra los candidatos del PRO en las elecciones generales de Octubre. En la Ciudad de Buenos Aires la Alianza &ldquo;Cambiemos&rdquo; no est&aacute; constitu&iacute;da.</p>\r\n<p>Enrique &ldquo;Coti&rdquo; Nosiglia, uno de los asesores de Losteau, le est&aacute; contando las costillas a Rodr&iacute;guez Larreta y esperar&aacute; todav&iacute;a unas semanas para decidir qu&eacute; hacen. Tambi&eacute;n, por detr&aacute;s del ex embajador, otro personaje de su confianza se mueve entre tinieblas. Emiliano Yacobitti, &eacute;mulo del Coti, recomienda ir s&oacute;lo para posicionarlo como Jefe de Gobierno 2019.</p>', 2, '2017-04-04 17:28:54', 'noticia_W96D2ZB3ZX_1600x900.jpg', 2),
(107, 2, 'Colón, Colón que grande sos', '<p>El monumento al navegante genov&eacute;s sigue tirado en pedazos frente al Aeroparque. Una tapia impide ver las interminables obras de reconstrucci&oacute;n del monumento.</p>\r\n<p>&ldquo;Puesta en valor&rdquo; dice el cartel en costanera. La obra construida originalmente en m&aacute;rmol de carrara por un escultor italiano, fue desalojada en 2015 de las cercan&iacute;as de la Casa Rosada por el gobierno de Cristina Fern&aacute;ndez.</p>\r\n<p>En el gobierno de la ciudad nadie responde. Nadie sabe un corno de cuando se terminar&aacute; el monumento. &iquest;Antes de las elecciones?. &ldquo;Puede ser&rdquo;, responde un empleado sin mucho inter&eacute;s.</p>\r\n<p>Especialistas de la Universidad Nacional de La Plata, que trabajan en el armado del monumento, reconocen que muchas partes est&aacute;n deterioradas.</p>', 4, '2017-04-05 18:37:59', 'noticia_ME73VB58KL_1600x900.jpg', 2),
(108, 2, 'Santacruceños porteños', '<p>Dos dirigentes patag&oacute;nicos se mudan a la Ciudad de Buenos Aires para postularse como candidatos en las pr&oacute;ximas elecciones. Dios los cr&iacute;a y el viento los amontona.</p>\r\n<p>H&eacute;ctor Di Tulio fue diputado nacional por Santa Cruz en 1991 y se hizo famoso por llevar un ping&uuml;ino al recinto de sesiones para denunciar a las empresas petroleras. Ahora se presentar&aacute; en las primarias de la Uni&oacute;n C&iacute;vica Radical por la lista roja.</p>\r\n<p>Por su lado, Miriam Quiroga, la ex secretaria &iacute;ntima del ex Presidente de la Naci&oacute;n, N&eacute;stor Kirchner conversa con el diputado salte&ntilde;o Alfredo Olmedo. El legislador norte&ntilde;o propone reestablecer la colimba y defiende a Donald Trump.</p>\r\n<p>Quiroga se&ntilde;ala que todav&iacute;a no hay definiciones sobre si ser&aacute; candidata a diputada nacional o legisladora por la ciudad.</p>', 3, '2017-04-06 13:55:21', 'noticia_R5G8YPV8Q1_1600x900.jpg', 2),
(109, 2, 'Preguntas en un día de paro', '<p>&iquest;Por qu&eacute; no llega la plata a las comunas porte&ntilde;as?. &iquest;Cu&aacute;nto gast&oacute; Rodr&iacute;guez Larreta en los carnavales de 2017?. &iquest;Qu&eacute; pasa con los comedores escolares?. &iquest;Qu&eacute; pasa en el canal de la ciudad?. &iquest;El chino del PRO labura?.</p>\r\n<p>&iquest;El legislador Carlos Tomada est&aacute; enojado?. &iquest;Qui&eacute;nes son los candidatos por el kirchnerismo en la Ciudad de Buenos Aires?.</p>', 2, '2017-04-06 13:45:10', NULL, 2),
(110, 2, 'Una mina de plata', '<p>En las oficinas de Diego Santilli dicen que &ldquo;es una boluda&rdquo;. La legisladora del PRO, Claudia Calciano parece centrar sus preocupaciones parlamentarias en los peones rurales. Heyyyy , heyyy, heyyy, en la Ciudad de Buenos Aires estamos.</p>\r\n<p>En lo que va de 2017 la representante del PRO no present&oacute; un solo proyecto de ley. Muchas adhesiones y declaraciones, eso s&iacute;.</p>\r\n<p>Como antecedente acad&eacute;mico importante registra que estudi&oacute; en la legendaria universidad de La Sorbona, en Par&iacute;s. &iquest;Habr&aacute; estado en el revolucionario Mayo franc&eacute;s?.</p>\r\n<p>La imaginaci&oacute;n al poder. Calciano lleg&oacute; a su banca en reemplazo de Iv&aacute;n Petrella y de la mano del gremialista de los trabajadores rurales, Ger&oacute;nimo &ldquo;Momo&rdquo; Venegas.</p>', 5, '2017-04-07 18:45:39', 'noticia_ZBP3GKY8OG_1600x900.jpg', 2),
(111, 2, 'Barrios de pie', '<p>A las puteadas. Un grupo de comunas porte&ntilde;as apunta contra el Jefe de Gabinete, Felipe Miguel por el atraso en el env&iacute;o de partidas. &iquest;Por qu&eacute; la guita no aparece?.</p>\r\n<p>Uno de los voceros de las comunas afectadas es el legislador Roberto Quatromanno, del barrio de Mataderos y fan&aacute;tico de la pizza de &ldquo;El Cedr&oacute;n&rdquo;.</p>\r\n<p>Quatromanno tiene como referente al actual Ministro de Seguridad Bonaerense, Cristian Ritondo y cerca suyo afirman que esa cercan&iacute;a pol&iacute;tica es una de las razones del ninguneo de parte del Jefe de Gabinete.</p>\r\n<p>Los ritondistas se esfuerzan por no pegarle al Jefe de Gobierno, Horacio Rodr&igrave;guez Larreta. Pero sottovoce lo se&ntilde;alan como el responsable de la situaci&oacute;n.</p>\r\n<p>Algunas de las partidas ya fueron enviadas, aunque falta plata para obras, pagos a proveedores y gastos para eventos culturales.</p>\r\n<p>Las comunas en pie de rebeli&oacute;n son la 9 (Liniers, Mataderos), la 10 (Floresta, Villa Luro), la 8 (Soldatti, Lugano) y la comuna 11 (Devoto, Villa del Parque).</p>', 2, '2017-04-10 15:03:53', 'noticia_J9E8PXV3N5_1600x900.jpg', 2),
(112, 2, 'Las prioridades de Hernán Lombardi', '<p>El asunto es en serio. Lo tiraron a ver que onda. &iquest;por orden del presidente Macri?. El gobierno intentar&aacute; cambiarle el nombre al CCK. Parece que no tienen un carajo que hacer.</p>\r\n<p>Lombardi, titular del multimedios del estado, no lo desminti&oacute;. En realidad, puso cara de perro distra&iacute;do y no fue contundente con las explicaciones.</p>\r\n<p>En las redes sociales, donde s&iacute; Lombardi tiene influencia, corrieron el nombre del m&uacute;sico Gustavo Ceratti para reemplazar al de N&eacute;stor Kirchner en el gigante edificio del bajo.</p>\r\n<p>Fuentes cercanas al radicalismo dijeron que en caso que se cambie el nombre pedir&aacute;n que el centro cultural se llame &ldquo;Presidente Ra&uacute;l Alfons&iacute;n&rdquo;. Y argumentan que el primer presidente de la recuperaci&oacute;n democr&aacute;tica desapareci&oacute; f&iacute;sicamente un a&ntilde;o antes que Kirchner.</p>\r\n<p>Lombardi explicit&oacute; que hay una ley en aprobaci&oacute;n para que s&oacute;lo veinte a&ntilde;os despu&eacute;s de que una persona fallezca reci&eacute;n pueda figurar su nombre en alg&uacute;n monumento p&uacute;blico o v&iacute;a de tr&aacute;nsito. O sea, seg&uacute;n la &oacute;ptica del oficialismo, ni Kirchner, ni Alfons&iacute;n.</p>', 2, '2017-04-07 18:44:59', NULL, 2),
(113, 2, 'Protocolo violento', '<p>Los maestros, o un sector gremial de ellos, instalaba una carpa en el congreso. La respuesta oficial fue desalojar el lugar a los palazos.</p>\r\n<p>La consecuencia de la represi&oacute;n es un paro nacional para el mi&eacute;rcoles santo. &iquest;D&oacute;nde estaba el Ministro de Seguridad de la Ciudad, Mart&iacute;n Ocampo a esa hora del domingo?. En Buenos Aires llov&iacute;a.</p>\r\n<p>En el seno del gobierno nacional hay posiciones divididas.</p>\r\n<p>Por un lado, los que despu&eacute;s del desalojo en la panamericana , el d&iacute;a del paro de la CGT, apoyan la aplicaci&oacute;n a rajatabla del protocolo antipiquete.</p>\r\n<p>Por otro, los que destacan que primero hay que medir la magnitud de cada protesta, despu&eacute;s dialogar y finalmente disuadir.</p>\r\n<p>En las horas posteriores a los incidentes, Ocampo se puso mudo. Los maestros aseguran que ten&iacute;an autorizaci&oacute;n para ocupar esa parte c&eacute;ntrica del espacio p&uacute;blico.</p>', 3, '2017-04-11 17:39:24', 'noticia_ZN78ZPR3RO_1600x900.jpg', 2),
(114, 2, 'La careta del PRO', '<p>Un 30 por ciento de pobreza. Pero el Jefe de Gobierno, Horacio Rodr&iacute;guez Larreta se patin&oacute; cien millones de pesos en organizar los carnavales porte&ntilde;os de este 2017.</p>\r\n<p>En 18 barrios el Gobierno de la Ciudad cort&oacute; calles, mont&oacute; escenarios y equipos de sonido, instal&oacute; puestos de chorip&aacute;n y contrat&oacute; murgas y comparsas.</p>\r\n<p>Cada una de esas locaciones le cost&oacute; a los contribuyentes de la Capital Federal cerca de un mill&oacute;n y medio de pesos por fin de semana de Febrero. Unos cien mil d&oacute;lares por barrio.</p>\r\n<p>Los n&uacute;meros puestos a lo largo de todo el mes, inclu&iacute;do el feriado largo, suman cerca de cien millones de pesos.</p>\r\n<p>Las contrataciones art&iacute;sticas son un tema aparte. El ministerio de cultura de la ciudad no quiere dar a conocer los gastos p&uacute;blicamente.</p>\r\n<p>El Ministro de Cultura de la ciudad, Angel Malher est&aacute; en silencio. Seguramente tendr&aacute; verg&uuml;enza por la calidad de los espect&aacute;culos callejeros. Est&aacute; claro, Mahler es el mismo que, junto con Pepe Cibr&iacute;an, mont&oacute; obras de la calidad de &ldquo;Dr&aacute;cula, el musical&rdquo;.</p>', 3, '2017-04-12 19:53:38', 'noticia_WVZ3OQ9D9B_1600x900.jpg', 2),
(115, 2, 'Santilli, teléfono', '<p>Celulares para todos y todas. El vicejefe de gobierno tira la legislatura por la ventana. Dispuso que cada diputado puede tener un equipo gratis con uso ilimitado de llamadas. Y wassapp, por supuesto.</p>\r\n<p>Diego Santilli no para. El vicejefe notific&oacute; a los legisladores que les proporcionar&aacute; un &ldquo;Samsgung Galaxy s8&rdquo; sin cargo.</p>\r\n<p>Uno de sus funcionarios envi&oacute; una nota para informar de ese obsequio a los diputados. &ldquo;En comodato&rdquo;, dice el escrito. O sea, te lo prestamos hasta que el modelo sea viejo.</p>\r\n<p>La notificaci&oacute;n est&aacute; firmada por Miguel Marsili, encargado de compras de la Legislatura de la Ciudad de Buenos Aires. Unas doce lucas por cabeza, un peso mas un peso menos.</p>', 2, '2017-04-17 15:59:48', 'noticia_LRJ3E7184O_1600x900.jpg', 2),
(116, 2, 'Un quilombo gordo', '<p>Elisa Carri&oacute; dice una cosa p&uacute;blicamente. Pero entre sus &iacute;ntimos asegura que ser&aacute; candidata en la Capital Federal. En el PRO est&aacute;n tan desconcertados como Mirtha Legrand arriba de un bondi.</p>\r\n<p>El fin de semana santa varios referentes de Cambiemos analizaron los pasos electorales para Octubre.</p>\r\n<p>El primer punto fue la caprichosa decisi&oacute;n de Mart&iacute;n Losteau de volver de Washington antes de tiempo. &iquest;C&oacute;mo hacer para contrarrestar las pretensiones del ex embajador en EEUU?.</p>\r\n<p>La &uacute;nica respuesta que encontraron es promover a Carri&oacute; como candidata a diputada nacional por la Ciudad de Buenos Aires.</p>\r\n<p>&ldquo;La &uacute;nica opci&oacute;n que aceptar&iacute;a Mart&iacute;n (Losteau) para bajarse o ir como segundo es que Lilita vaya en una lista&rdquo;, dice resignando un vocero radical, cercano al espacio ECO, el sector que, entre otros, dirigen desde las sombras Enrique &ldquo;Coti&rdquo; Nosiglia y Emiliano Yacobitti.</p>\r\n<p>El otro problema del oficialismo porte&ntilde;o es ver si aceptan armar la coalici&oacute;n &ldquo;Cambiemos&rdquo;. En el &aacute;mbito de la ciudad la alianza no pudo presentarse junta en las elecciones de 2015. Cada uno, radicales, macristas y la Coalici&oacute;n C&iacute;vica, se presentaron separadamente.</p>\r\n<p>Carri&oacute; aspiraba a ser postulante a senadora nacional por la provincia de Buenos Aires. Se entusiasmaba en competir con la renovadora massista, Margarita Stolbizer y eventualmente con la ex Presidenta de la Naci&oacute;n, Cristina Fern&aacute;ndez.</p>', 1, '2017-04-17 16:06:05', 'noticia_R793JVR3X6_1600x900.jpg', 2),
(117, 2, 'Marcelo Tinelli no se come una', '<p>Deprimido, decepcionado, traicionado y estresado. Los estados de Marcelo Tinelli se agravan por una circunstancia m&aacute;s. El Presidente de su amado San Lorenzo, Mat&iacute;as Lammens juega sus cartas para ser candidato del PRO.</p>\r\n<p>El joven jefe azulgrana fue tentado varias veces para postularse en la ciudad. En su entorno afirman que si no es candidato a diputado en las elecciones de este a&ntilde;o trabajar&iacute;a para ser Jefe de Gobierno en 2019.</p>\r\n<p>La noticia le cay&oacute; a Tinelli como una patada asesina de un defensor de Boca Juniors. Es que justamente el Presidente del club de la ribera, Daniel Angelici fue uno de quienes dialog&oacute; sobre candidaturas con Lammens.</p>\r\n<p>Los dos dirigentes principales del club de Boedo ya tuvieron algunas discusiones subidas de tono. Por el f&uacute;tbol y por la pol&iacute;tica.&nbsp;Marcelo Tinelli tiene una bronca especial con el Presidente de la Naci&oacute;n, Mauricio Macri. Lo culpa de su frustrada pretensi&oacute;n de ser el jefe m&aacute;ximo del f&uacute;tbol argentino.</p>\r\n<p>En cambio a Macri la figura de Lammens le cae muy bien, afirman voceros de Casa de Gobierno. De todas formas el Presidente de San Lorenzo asegura que es un hombre independiente desde el punto&nbsp;de vista pol&iacute;tico.</p>', 2, '2017-04-19 16:19:27', 'noticia_4KE857K3M9_1600x900.jpg', 2),
(118, 2, 'La izquierda sólo piensa en eso', '<p>Myriam Bregman y Marcelo Ramal son las dos cartas que jugar&aacute; el Frente de Izquierda y de los Trabajadores (FIT) en la Ciudad de Buenos Aires. &iquest;Unidos o desorganizados?.</p>\r\n<p>La idea de uno de sus principales referentes es que presenten una sola boleta en las PASO, las elecciones primarias de Agosto pr&oacute;ximo. De esa manera podr&iacute;an ahorrar recursos y energ&iacute;as para concentrarse en la elecci&oacute;n general de Octubre.</p>\r\n<p>La apuesta incluye a Bregman, abogada y ex candidata a Vicepresidente de la Naci&oacute;n, como candidata, en primer o segundo t&eacute;rmino en la lista de legisladores porte&ntilde;os. Reconocen que la mujer, adem&aacute;s de su militancia, tiene un punto alto en la forma de comunicar sus pol&iacute;ticas.</p>\r\n<p>Ramal, del ri&ntilde;on duro del Partido Obrero, tambi&eacute;n tiene muy buena aceptaci&oacute;n entre sus camaradas. Actualmente es legislador por la ciudad.</p>\r\n<p>&iquest;Y qu&eacute; papel jugar&aacute; el legendario Jorge Altamira?. Muy cerca suyo afirman que est&aacute; trabajando para unificar posiciones en el FIT, un conglomerado de partidos socialistas y de extracci&oacute;n trotskista. &iquest;Ser&aacute; candidato?. Por ahora Altamira, mira.</p>', 4, '2017-04-26 17:01:46', 'noticia_9M63BBX3V7_1600x900.jpg', 1),
(121, 2, 'Tango con gomina', '<p>La legislatura de la ciudad est&aacute; de homenaje. El viernes 21 de Abril recordar&aacute;n al &ldquo;Glostora Tango Club&rdquo;, un m&iacute;tico programa de radio de la d&eacute;cada del 40.</p>\r\n<p>El recordatorio ser&aacute; en la sede parlamentaria, Per&uacute; 160 a partir de las 6 de la tarde. All&iacute; la orquesta t&iacute;pica De Angelis ejecutar&aacute; tangos t&iacute;picos de ese ciclo.</p>\r\n<p>El 1&ordm; de Abril de 1946, comenz&oacute; a emitirse por &ldquo;Radio El Mundo y la Cadena Azul y Blanca de Emisoras Argentinas&rdquo;, &ldquo;El Glostora Tango Club&rdquo;, de lunes a viernes, en el horario de 20 a 20.15 horas</p>\r\n<p>Glostora fue una gomina brillantina para fijar y peinar los pelos de los hombres de esa &eacute;poca. &ldquo;Los muchachos de antes no usaban gomina, los de ahora se peinan con Glostora&rdquo;, dec&iacute;a una de las frases sobre el producto.</p>', 1, '2017-04-20 22:05:03', 'noticia_NBY36Z7352_1600x900.jpg', 2),
(122, 2, 'El boleto radical', '<p>Mart&iacute;n Losteau y Elisa Carri&oacute; agrandaron la grieta. La UCR porte&ntilde;a est&aacute; rota. Todo sea por una candidatura.</p>\r\n<p>Los operadores del ex embajador en Washington pusieron primera pero ni corta ni perezosa la reina de Comodoro Py sali&oacute; con los tapones de punta para neutralizar las intenciones de un sector del radicalismo. &iquest;C&oacute;mo arma cada bando sus estrategias?.</p>\r\n<p>Del lado de Losteau afirman que, si bien no integran el espacio Cambiemos, tienen intenciones de conversar con el macrismo para conformar la lista de diputados nacionales por la Capital para los comicios que vienen.</p>\r\n<p>Tambi&eacute;n avanzan hasta el 2019. Los hombres de Enrique &ldquo;Coti&rdquo; Nosiglia, la guardia de infanter&iacute;a de Losteau, dicen, que en realidad, lo que quieren es posicionar a su candidato para la elecci&oacute;n de Jefe de Gobierno que tendr&aacute; lugar en dos a&ntilde;os.</p>\r\n<p>Por lo bajo afirman que en el peor de los casos, si no hay acuerdos, la lista radical nosiglista podr&iacute;a ocupar el segundo lugar detr&aacute;s de Carri&oacute; cuando los porte&ntilde;os voten en Octubre.</p>\r\n<p>Desde el sector que comanda Horacio Rodr&iacute;guez Larreta son tajantes. &ldquo;La candidata es Carri&oacute; con la boleta que sea, que se jodan por p&iacute;caros&rdquo;, sostienen cuando hablan de la jugada anticipada del sector contrario.</p>\r\n<p>Elisa Carri&oacute; confirm&oacute; que se postular&aacute;, aline&oacute; a varios dirigentes de su lado como los radicales Jes&uacute;s Rodr&iacute;guez, Facundo Su&aacute;rez Lastra y Ernesto Sanz y no descart&oacute; la conformaci&oacute;n de &ldquo;Cambiemos&rdquo; en territorio porte&ntilde;o, uno de los pocos distritos donde la alianza a&uacute;n no est&aacute; estructurada.</p>', 4, '2017-04-24 18:26:30', 'noticia_LMY8NR9DQR_1600x900.jpg', 2),
(123, 2, 'El ejército rojo de Mauricio Macri', '<p>Yuan Jiang Ping se llama. Los amigos del once le dicen Fernando. Es el diputado de origen chino que logr&oacute; una banca por el PRO en 2015 en el &aacute;mbito de la ciudad. &iquest;Su laburo legislativo?, bien, gracias.</p>\r\n<p>Como antecedente para acceder a un lugar en la lista de candidatos, Yuan exhibe importantes relaciones entre las comunidades. Aport&oacute;, aseguran, fondos para la campa&ntilde;a presidencial de Mauricio Macri.</p>\r\n<p>En el barrio chino de Belgrano lo consideran un falso influyente. &Eacute;l se atribuye la gesti&oacute;n del inmenso arco de la calle Arribe&ntilde;os. En el plano empresarial es importador y due&ntilde;o de un hotel. Eso s&iacute;, dice los que lo conocen, es simp&aacute;tico y entrador.</p>\r\n<p>El chino del PRO, con dificultades para hablar espa&ntilde;ol a pesar que hace a&ntilde;os que est&aacute; radicado en la Argentina, present&oacute; once proyectos en el transcurso de 2017, ninguno con car&aacute;cter de ley.</p>\r\n<p>La m&aacute;s importante de todas esas iniciativas parece un cuento de pel&iacute;cula. &ldquo;Disp&oacute;nese la colocaci&oacute;n de una placa en conmemoraci&oacute;n al 15 aniversario de la inauguraci&oacute;n de la floralis gen&eacute;rica&rdquo;. Chan.</p>', 2, '2017-04-26 17:01:21', 'noticia_9253RYG8W7_1600x900.jpg', 2),
(124, 2, 'El capo de la cana, adentroooooooo', '<p>La ciudad sin Jefe de Polic&iacute;a. Tres meses atr&aacute;s, Jos&eacute; Potocar asum&iacute;a la batuta de esa mezcla rara de federales y metropolitanos. Ahora qued&oacute; detenido acusado de corrupto.</p>\r\n<p>Dentro de las filas policiales porte&ntilde;as afirman que el asunto responde a una interna, a un pase de facturas. Que esperaron un tiempo prudencial para dar a conocer los negocios del flamante comisionado O\'Hara porte&ntilde;o. Potocar asumi&oacute; en diciembre y dispuso cambios en las 54 comisar&iacute;as de la ciudad de Buenos Aires. Ahhhhhh, &iquest;s&iacute; ?, le dijeron y lo llenaron de antiguas carpetas. Pedidos de protecci&oacute;n a prostitutas, dealers y comerciantes de zona de Belgrano y Nu&ntilde;ez.</p>\r\n<p>El Ministro de Seguridad de la Ciudad, Mart&iacute;n Ocampo, con la mejor cara que tiene, dijo lo de siempre. Que la justicia investigue y que bla,bla,bla.</p>\r\n<p>Desde la legislatura local atacaron. El Frente para la Victoria quiere saber de que se trata y pidi&oacute; la presencia de Ocampo para que d&eacute; explicaciones. Adem&aacute;s los muchachos opositores quieren que el futuro jefe sea un civil.</p>', 5, '2017-04-28 16:12:44', 'noticia_J953QG7D1L_1600x900.jpg', 1),
(125, 2, 'Los artistas de Rodríguez Larreta', '<p>El programa de subsidios al arte y la cultura de la ciudad es una verg&uuml;enza al cuadrado, una tocada de orto al cubo. Adem&aacute;s de esconder los n&uacute;meros, el Gobierno porte&ntilde;o banca pasajes a Eslovenia, videos, libros y revistas, entre otras excentricidades.</p>\r\n<p>En la lista de los proyectos aprobados en 2015 no figuran los montos ni los nombres reales de los favorecidos por el Fondo Metropolitano de la Cultura.</p>\r\n<p>En la comisi&oacute;n de cultura de la Legislatura porte&ntilde;a quedaron sorprendidos. Uno de sus encargados, de todas formas, adem&aacute;s de se&ntilde;alar que es un tema del Poder Ejecutivo, se comprometi&oacute; a averiguar el monto y la ejecuci&oacute;n de las partidas.</p>\r\n<p>El misterio de la cantidad de dinero que se otorga al desarrollo cultural en la ciudad podr&iacute;a ser resuelto con la presencia del Ministro de Cultura, Angel Malher en la legislatura para que explique la cuesti&oacute;n.</p>\r\n<p>La planilla que figura en la p&aacute;gina web oficial destaca que el objetivo del programa es la &ldquo;promoci&oacute;n de la cultura de la ciudad de Buenos Aires a nivel nacional e internacional&rdquo;.</p>\r\n<p>Por ejemplo, promocionan &ldquo;creaci&oacute;n de obras y versiones para ensambles instrumentales de Costa Rica y M&eacute;xico&rdquo;. Adem&aacute;s figura la producci&oacute;n y edici&oacute;n de revistas en la planilla de 2015, el gobierno de la ciudad tambi&eacute;n pag&oacute; la &ldquo;producci&oacute;n y grabaci&oacute;n del video single free&rdquo;, textual, textual.</p>', 1, '2017-04-26 16:59:50', 'noticia_Y4ODXKK8W9_1600x900.jpg', 2),
(126, 2, 'El botón de Trump', '<p>Apenas hablaron de Venezuela.Nada de los limones.? De qu&eacute; corno hablaron los Presidentes en Washington?.</p>\r\n<p>Macri destac&oacute; la importancia de que la Argentina y Estados Unidos construyan \"un v&iacute;nculo fuerte\".&nbsp;</p>\r\n<p>El presidente Mauricio Macri sostuvo hoy que la reuni&oacute;n que mantuvo con el presidente Donald Trump en la Casa Blanca fue \"maravillosa, un encuentro incre&iacute;ble\" y consider&oacute; que est&aacute;n dadas las condiciones para que la Argentina y los Estados Unidos construyan \"un v&iacute;nculo fuerte\".</p>', 3, '2017-04-28 16:14:04', 'noticia_17L37QED6V_1600x900.jpg', 1),
(127, 2, 'PJ, en pelotas y a los gritossss', '<p>Como Tarz&aacute;n, las estrategias del peronismo porte&ntilde;o no encuentran candidatos. &iquest;Felipe Sol&aacute;, Mariano Recalde, Gustavo Vera?. Un paisano de cada pueblo que no le para el alma a nadie.</p>\r\n<p>El titular del PJ capital, el sindicalista Victor Santa Mar&iacute;a prometi&oacute; internas, pero, por ahora, nada de nada. Y adem&aacute;s tantea posibles postulantes en un distrito donde Elisa Carri&oacute; con su candidatura confirmada lidera las encuestas para las elecciones de Octubre. Para las PASO todo es un misterio.</p>\r\n<p>Un grupo de peronistas de la ciudad se entusiasm&oacute; con la posibilidad que el ex massista Felipe Sol&aacute; encabece la lista de diputados nacionales. Pero el ex gobernador fue tajante porque prefiere pelear en la provincia de Buenos Aires.</p>\r\n<p>Mariano Recalde, ex candidato a Jefe de Gobierno, es el &uacute;nico camporista con simpat&iacute;as en las estructuras pol&iacute;ticas tradicionales. Pero alguno de los referentes del PJ porte&ntilde;o asegura que no suma votos.</p>\r\n<p>&iquest;Y Gustavo Vera, el amigo del Papa Francisco?. Lo tienen como una alternativa pero no muestran mucho entusiasmo con el actual legislador de la ciudad.</p>\r\n<p>El &uacute;ltimo Jueves, en una reuni&oacute;n en San Telmo, un encuestador de larga trayectoria analiz&oacute; las posibilidades electorales. En esa reuni&oacute;n los participantes coincidieron en que la gran batalla ser&aacute; en la provincia de Buenos Aires. Salvo un milagro creen que en la Capital Federal est&aacute;n perdidos.</p>\r\n<p>La otra pregunta es si Santa Mar&iacute;a lograr&aacute; juntar todos los sectores de la di&aacute;spora peronista capitalina. Si no logra ese cometido tambi&eacute;n se presentar&aacute;n listas separadas de candidatos a legisladores a nivel local.</p>', 2, '2017-05-02 15:52:40', 'noticia_6PL3WY7DJR_1600x900.jpg', 1),
(129, 2, 'Piquete policial', '<p>Una marcha que no tiene antecedentes. Los familiares de Jos&eacute; Potocar, el Jefe de Polic&iacute;a de la ciudad detenido, se concentrar&aacute;n ma&ntilde;ana en Tribunales.</p>\r\n<p>Seg&uacute;n la convocatoria pedir&aacute;n justicia y la liberaci&oacute;n del Comisario encarcelado la semana pasada. El fiscal, Jos&eacute; Mar&iacute;a Campagnoli lo acusa por hechos de corrupci&oacute;n.</p>\r\n<p>La imputaci&oacute;n involucra a Potocar en negocios paralelos de la polic&iacute;a en los barrios de Nu&ntilde;ez y Belgrano. Prostituci&oacute;n, extorsi&oacute;n a comerciantes de la zona y disposici&oacute;n de los lugares de estacionamiento libres.</p>\r\n<p>La marcha esta citada para las 18,30 del pr&oacute;ximo mi&eacute;rcoles 3 de mayo, en la puerta de la sede del Palacio de Justicia, en Talcahuano al 500.</p>', 1, '2017-05-02 15:52:08', 'noticia_JRE8MBMDY2_1600x900.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `noticia_log`
--

CREATE TABLE `noticia_log` (
  `id` int(11) NOT NULL,
  `id_noticia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `texto` text NOT NULL,
  `posicion` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `operacion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parametros_configuracion`
--

CREATE TABLE `parametros_configuracion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `valor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL COMMENT 'Clave primaria.',
  `nombre` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL COMMENT 'Nombre del usuario',
  `password` varchar(50) NOT NULL,
  `perfil` int(11) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `username`, `password`, `perfil`, `activo`) VALUES
(1, 'Administrador', 'admin', 'a65b48f2020c48a010280a4467eb5d32', 1, 1),
(2, 'L.A.S', 'LAS', 'a65b48f2020c48a010280a4467eb5d32', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `noticia`
--
ALTER TABLE `noticia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_reference_1` (`id_usuario`);

--
-- Indexes for table `noticia_log`
--
ALTER TABLE `noticia_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_reference_2` (`id_noticia`),
  ADD KEY `FK_reference_3` (`id_usuario`);

--
-- Indexes for table `parametros_configuracion`
--
ALTER TABLE `parametros_configuracion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `noticia`
--
ALTER TABLE `noticia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `noticia_log`
--
ALTER TABLE `noticia_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `parametros_configuracion`
--
ALTER TABLE `parametros_configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria.', AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `noticia`
--
ALTER TABLE `noticia`
  ADD CONSTRAINT `FK_reference_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `noticia_log`
--
ALTER TABLE `noticia_log`
  ADD CONSTRAINT `FK_reference_2` FOREIGN KEY (`id_noticia`) REFERENCES `noticia` (`id`),
  ADD CONSTRAINT `FK_reference_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

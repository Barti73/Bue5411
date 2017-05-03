/*
SQLyog Enterprise - MySQL GUI v8.1 
MySQL - 5.6.17 : Database - codigo5411
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`codigo5411` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `codigo5411`;

/*Table structure for table `noticia` */

DROP TABLE IF EXISTS `noticia`;

CREATE TABLE `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `texto` text NOT NULL,
  `posicion` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reference_1` (`id_usuario`),
  CONSTRAINT `FK_reference_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `noticia` */

insert  into `noticia`(id,id_usuario,titulo,texto,posicion,fecha,imagen,estado) values (100,2,'La libertad de comunicar','<p>Un diario digital con informaci&oacute;n de la Ciudad de Buenos Aires. Sin prejuicios, atinada y antinada, aunque no la nada misma, poco solemne, picante y fundamentalmente libre, democr&aacute;tica.</p>\r\n<p>Con nuestros propios tiempos de edici&oacute;n, sin locuras informativas pero con cierta locura de bohemios perdidos, de cronistas callejeros y de malabaristas de la vida. Periodismo independiente y dependiente de nosotros mismos.</p>\r\n<p>C&oacute;digo5411, formalmente presentado. Buenos d&iacute;as, buenas tardes, buenas noches, Buenos Aires.</p>',1,'2017-04-03 19:45:54','noticia_J953Q7781L_1600x900.jpg',1),(101,2,'El chorro del Senado','<p>Amado Boudou dej&oacute; una catarata de nombramientos en la c&aacute;mara alta cuando a fines de 2015 dej&oacute; su cargo como Vicepresidente. Ahora cambi&oacute; el chorro, el agua fluye a otros ritmos, pero el PRO mete contratos a lo pavote.</p>\r\n<p>En realidad, para ser justos, el encargado de dibujar, truchar y quedarse con parte de esos contratos &ldquo;es el Secretario Administrativo del Senando, el michetista Helio Rebot&rdquo;, relata uno de los empleados que se qued&oacute; afuera de esa movida.</p>\r\n<p>&iquest;Pero qui&eacute;n es Rebot?. El tipo viene de ronda de la legislatura. En &eacute;poca de N&eacute;stor coqueteaba con el kirchnerismo y dio una vuelta de campana cuando enjuiciaron al Jefe de Gobierno, An&iacute;bal Ibarra por la masacre de Croma&ntilde;&oacute;n. El voto de Rebot fue decisivo en la Legislatura para voltear a Ibarra.</p>\r\n<p>M&aacute;s tarde se convirti&oacute; de a poco en uno de los hombres de confianza de Gabriela Michetti y despu&eacute;s que ella perdi&oacute; la interna en la ciudad contra Horacio Rodr&iacute;guez Larreta, opt&oacute; por el silencio.</p>\r\n<p>Cuando Michetti lleg&oacute; como Vicepresidenta de la Naci&oacute;n al Senado le encarg&oacute; a Rebot que iniciara una auditoria de dos mil contratos que el pillo de Boudou hab&iacute;a dejados firmados y vigentes. En ese revoleo el hombre acomod&oacute; alguno de sus tantos.</p>\r\n<p>&ldquo;Esa modalidad -cuenta uno de sus ex empleados- ya la practicaba en la legislatura. Ahora debe tener unos 50 contratos escondidos entre apellidos de los primos, sobrinos, su mujer y amigos, que le dejan una parte. En 50 contratos puede estar haciendo un palo por mes&rdquo;. Pesos, aclara, por las dudas. &iquest;Y la revoluci&oacute;n &eacute;tica de Michetti?.</p>',2,'2017-04-03 19:45:28','noticia_Y4ODXOKDW9_1600x900.jpg',1),(102,2,'Una Tomada de pelo K','<p>El ex Ministro de Trabajo de la Naci&oacute;n, ahora Diputado de la Ciudad, present&oacute; un solo proyecto en 2017. En su iniciativa est&aacute; preocupado por &ldquo;el estado edilicio&rdquo; de una escuela.</p>\r\n<p>M&aacute;s all&aacute; de sus leg&iacute;timos reclamos por el establecimiento &ldquo;M&aacute;ximo Sab&aacute; Victoria&rdquo; del barrio V&eacute;lez Sarfield, parece que la tarea legislativa de Carlos Tomada es escasa.</p>\r\n<p>Tal vez su justificativo sea que preside el bloque principal del Frente para la Victoria, m&aacute;s all&aacute; que el kirchnerismo all&iacute; est&aacute; dividido en otros espacios. Tomada podr&aacute; decir que tiene reuni&oacute;n ac&aacute; o all&aacute;, pero poco argumento para acreditar una labor legislativa intensa.</p>',3,'2017-04-03 19:41:16','noticia_17L37LE36V_1600x900.jpg',1),(103,2,'Legislatura, confirmado, el Miércoles laburan','<p>El traspaso de diversas &aacute;reas de la justicia nacional a la ciudad es el tema principal de la agenda legislativa de esta semana. &iquest;Diego Santilli, el vicejefe a cargo del parlamento porte&ntilde;o, mandar&aacute; gaseosas a cada banca con la plata del presupuesto?. C&oacute;digo5411, por unanimidad, prefiere Campari con naranja.</p>\r\n<p>La sesi&oacute;n fue suspendida el jueves &uacute;ltimo por el deceso del ex legislador macrista Enzo Pagani pero parece que los muchachos y chicas de Per&uacute; 160 seguir&aacute;n de recogimiento unas semanas m&aacute;s. Despu&eacute;s de la sesi&oacute;n de esta semana, no habr&aacute; reuniones hasta fin de mes.</p>\r\n<p>Juzgados penales y de relaciones del consumo son los fueros judiciales que la naci&oacute;n traspasara al &aacute;mbito local. La sesi&oacute;n tempranera fue convocada para las 11 de la ma&ntilde;ana del pr&oacute;ximo Mi&eacute;rcoles.</p>\r\n<p>En realidad en la sede de la legislatura aseguran que no ser&iacute;a del todo conveniente hacer la sesi&oacute;n el 6, el d&iacute;a en que la CGT convoc&oacute; a un paro general.</p>',4,'2017-04-03 19:42:41','noticia_6PL3W57DJR_1600x900.jpg',1),(104,2,'Los delirios millonarios de Télam','<p>Adem&aacute;s de una espantosa gesti&oacute;n period&iacute;stica iniciada en Diciembre de 2015, cuando asumi&oacute; Mauricio Macri como Presidente de la Naci&oacute;n, la conducci&oacute;n de la Agencia Nacional de Noticias compra equipos de televisi&oacute;n por un mill&oacute;n de d&oacute;lares. En tiempos de Netflix y Youtube, es evidente que nos toman por boludos.</p>\r\n<p>El responsable de los medios del Estado , el empresario hotelero Hern&aacute;n Lombardi, puso al frente de T&eacute;lam a un veterano cronista de televisi&oacute;n. &iquest;Antecedentes?. Rodolfo Pous&aacute;, titular de la agencia de noticias, es el resposable de los 200 rajes en ese mismo lugar en &eacute;pocas de la Alianza. Por entonces Pous&aacute; era amigo personal del Presidente de la Naci&oacute;n, Fernando de la R&uacute;a. Ahh, s&iacute;, el mismo De la R&uacute;a.</p>\r\n<p>Ahora macrista, Pous&aacute; se queja todos los d&iacute;as que &ldquo;La C&aacute;mpora&rdquo; le maneja la empresa. Y adem&aacute;s, se&ntilde;ala que un ex delegado gremial, se puso a comprar equipos de televisi&oacute;n valuados en un mill&oacute;n de d&oacute;lares. S&iacute;, un palo verde. &iquest;Para qu&eacute;?. El tipo quiere convertir parte de la agencia de noticias en un canal de televisi&oacute;n. &iquest;Y canal 7 para qu&eacute; est&aacute;?. &iquest;Lombardi querr&aacute; cerrarlo y concentrar todos los medios del estado en un solo espacio?.</p>\r\n<p>Pero como si esto fuera poco, el tipo tambi&eacute;n quiere desarrollar &ldquo;T&eacute;lam radio&rdquo; y armar un mega estudio para emitir programaci&oacute;n propia con una inversi&oacute;n que las mismas autoridades se niegan a informar.</p>\r\n<p>En Casa de Gobierno se hacen los sotas. Pero un asesor de muchos a&ntilde;os del Presidente es sincero. &ldquo;Macri no le da bola a los medios del Estado&rdquo;, dice.</p>',5,'2017-04-03 19:39:58','noticia_4ZP89MX3MK_1600x900.jpg',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

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

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria.',
  `nombre` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL COMMENT 'Nombre del usuario',
  `password` varchar(50) NOT NULL,
  `perfil` int(11) NOT NULL,
  `activo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(id,nombre,username,password,perfil,activo) values (1,'Administrador','admin','a65b48f2020c48a010280a4467eb5d32',1,1),(2,'L.A.S','las','a65b48f2020c48a010280a4467eb5d32',1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

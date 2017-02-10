/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     06/02/2017 22:16:39                          */
/*==============================================================*/


drop table if exists noticia;

drop table if exists noticia_log;

drop table if exists parametros_configuracion;

drop table if exists usuario;

/*==============================================================*/
/* Table: noticia                                               */
/*==============================================================*/
create table noticia
(
   id                   int not null auto_increment,
   id_usuario           int not null,
   titulo               varchar(100) not null,
   texto                varchar(3000) not null,
   posicion             int not null,
   fecha                datetime not null,
   estado               int not null,
   primary key (id)
)
ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: noticia_log                                           */
/*==============================================================*/
create table noticia_log
(
   id                   int not null auto_increment,
   id_noticia           int not null,
   id_usuario           int not null,
   titulo               varchar(100) not null,
   texto                varchar(600) not null,
   posicion             int not null,
   fecha                datetime not null,
   estado               int not null,
   operacion            varchar(30) not null,
   primary key (id)
)
ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: parametros_configuracion                              */
/*==============================================================*/
create table parametros_configuracion
(
   id                   int not null auto_increment,
   nombre               varchar(50) not null,
   valor                text not null,
   primary key (id)
)
ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: usuario                                               */
/*==============================================================*/
create table usuario
(
   id                   int not null auto_increment comment 'Clave primaria.',
   nombre               varchar(100) character set utf8 not null,
   username             varchar(50) character set utf8 not null comment 'Nombre del usuario',
   password             varchar(50) character set utf8 not null,
   perfil               int not null,
   activo               int not null,
   primary key (id)
)
ENGINE=InnoDB DEFAULT CHARSET=UTF8;

alter table noticia add constraint FK_reference_1 foreign key (id_usuario)
      references usuario (id) on delete restrict on update restrict;

alter table noticia_log add constraint FK_reference_2 foreign key (id_noticia)
      references noticia (id) on delete restrict on update restrict;

alter table noticia_log add constraint FK_reference_3 foreign key (id_usuario)
      references usuario (id) on delete restrict on update restrict;


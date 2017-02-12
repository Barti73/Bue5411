

/* ************************* */
/* **** Tabla [usuario] **** */
/* ************************* */
insert into usuario (id, nombre, username, password, perfil, activo) values (1, 'Administrador', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, 1);
insert into usuario (id, nombre, username, password, perfil, activo) values (2, 'Nombre1 Apellido1', 'user1', '21232f297a57a5a743894a0e4a801fc3', 2, 1);
insert into usuario (id, nombre, username, password, perfil, activo) values (3, 'Nombre2 Apellido2', 'user2', '21232f297a57a5a743894a0e4a801fc3', 2, 1);


/* ************************* */
/* **** Tabla [noticia] **** */
/* ************************* */
insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(1,
2,
'Noticia Titular 1',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
1,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(2,
3,
'Noticia Titular 2',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
2,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(3,
2,
'Noticia Titular 3',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
3,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(4,
3,
'Noticia Titular 4',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
4,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(5,
2,
'Noticia Titular 5',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
5,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(6,
2,
'Noticia Titular 6',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(7,
2,
'Noticia Titular 7',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(8,
2,
'Noticia Titular 8',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(9,
2,
'Noticia Titular 9',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1);

insert into noticia (id, id_usuario, titulo, texto, posicion, fecha, imagen, estado) values
(10,
2,
'Noticia Titular 10',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1);


/* ***************************** */
/* **** Tabla [noticia_log] **** */
/* ***************************** */
insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(1,
1,
2,
'Noticia Titular 1',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
1,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(2,
2,
3,
'Noticia Titular 2',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
2,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(3,
3,
2,
'Noticia Titular 3',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
3,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(4,
4,
3,
'Noticia Titular 4',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
4,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(5,
5,
2,
'Noticia Titular 5',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
5,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(6,
6,
2,
'Noticia Titular 6',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(7,
7,
2,
'Noticia Titular 7',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(8,
8,
2,
'Noticia Titular 8',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(9,
9,
2,
'Noticia Titular 9',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1,
'Insert');

insert into noticia_log (id, id_noticia, id_usuario, titulo, texto, posicion, fecha, imagen, estado, operacion) values
(10,
10,
2,
'Noticia Titular 10',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum non orci interdum cursus. Donec et condimentum nisl, nec interdum velit. Integer in mauris in arcu suscipit pharetra. Etiam ac blandit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus pulvinar est, at accumsan justo aliquam a. Nullam vulputate purus vel diam sodales hendrerit. Etiam tristique lobortis turpis, auctor efficitur erat dignissim ut. Donec vel mi dictum, ullamcorper risus non, pretium urna.

Cras in nisl faucibus, bibendum augue vitae, ornare sapien. Sed ultricies fermentum malesuada. Maecenas at ante quis lorem blandit auctor. Suspendisse potenti. Mauris placerat enim in lorem pretium, fringilla facilisis risus eleifend. Donec dui dolor, fermentum sit amet nulla id, eleifend dictum nisl. Donec diam est, faucibus vitae rhoncus quis, tincidunt et nulla. Aliquam non tristique ipsum, vel fermentum tortor. Nullam vitae aliquet ante. Pellentesque posuere auctor ligula, in volutpat nibh porta eu. Proin fermentum orci et eros vulputate, nec dictum nulla feugiat.

Donec mattis, massa vitae luctus aliquet, orci dolor commodo lectus, et eleifend nisi mi sed lorem. Donec luctus odio id justo lacinia, vitae auctor quam mattis. Nullam congue urna dui. Phasellus varius ligula velit, eu pharetra tellus condimentum auctor. Nam vulputate ultricies diam, a faucibus enim ultricies at. Nulla faucibus scelerisque urna, vel egestas erat rhoncus vitae. Nam malesuada risus nibh, a scelerisque velit lobortis eget. Nullam luctus lacinia ligula. In hac habitasse platea dictumst. Proin molestie sagittis diam, vitae hendrerit libero viverra non. Nunc sodales erat tortor, eu rutrum neque tempor eu.',
0,
now(),
null,
1,
'Insert');


<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Controller\BL\Backend\LoginBL;

class UserBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_USER = 'SALT_USER';
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }
    
    public function getUserIdHashed($userId)
    {
        return $this->fx->encodeHash($userId, self::SALT_USER);
    }
    
    public function getUserIdFromHashed($userIdHashed)
    {
        return $this->fx->decodeHash($userIdHashed, self::SALT_USER);
    }
    
    public function getUserEntity($userId)
    {
        return $this->em->getRepository('AppBundle:Usuario')->find($userId);
    }
    
    public function getUsuarios($radioValue)
    {
        $rep = $this->em->getRepository('AppBundle:Usuario');
        $query = $rep->createQueryBuilder('u')
            ->where('u.activo = :radio or :radio = \'-1\'')
            ->orderBy('u.nombre', 'ASC')
            ->setParameter('radio', $radioValue)
            ->getQuery();
        $res = $query->getResult();
        //Procesamos para devolver array y customizar la respuesta
        $usuarios = array();
        foreach ($res as $usuario)
        {
            $tmp = $this->getUsuarioPreparedData($usuario);
            $usuarios[] = $tmp;
        }
        return $usuarios;
    }

    public function getUsuarioById($usuarioId)
    {
        $usuario = $this->em->getRepository('AppBundle:Usuario')->find($usuarioId);
        return $this->getUsuarioPreparedData($usuario);
    }
    
    public function getUsuarioByNombre($nombre)
    {
        $usuario = $this->em->getRepository('AppBundle:Usuario')->findByNombre($nombre);
        return $usuario;
    }
    
    public function getUsuarioByUsername($username)
    {
        $usuario = $this->em->getRepository('AppBundle:Usuario')->findByUsername($username);
        return $usuario;
    }
    
    public function getUsuarioPreparedData($usuario)
    {
        if (!$usuario) { return false; }
        $activo = ($usuario->getActivo() == 1) ? 'visible' : 'hidden';
        $perfilUser = ($usuario->getPerfil() == 1) ? 'Administrador' : 'Usuario';
        $dataUsuario = array('id' => $usuario->getId(),
                             'nombre' => $usuario->getNombre(),
                             'username' => $usuario->getUsername(),
                             'password' => $usuario->getPassword(),
                             'perfil' => $usuario->getPerfil(),
                             'perfilNombre' => $perfilUser,
                             'activo' => $usuario->getActivo(),
                             'visibleGrid' => $activo,
                             'hashedId' => $this->getUsuarioIdHashed($usuario->getId()),
                             'extra' => 'block');
        return $dataUsuario;
    }
    
    public function setUserPassword($arrayData)
    {
//        $arrayData = array('userId' => $this->get('session')->get('userId'),
//                           'userName' => $this->get('session')->get('userName'),
//                           'passwordOld' => $data["passwordOld"],
//                           'passwordNew' => $data["passwordNew"],
//                           'passwordReNew' => $data["passwordReNew"]);
        //Validaciones 
        //Usuario existe...
        $arrayUser = array('txtUser' => $arrayData["userName"],
                           'txtPass' => $arrayData["passwordOld"]);
        $loginBL = new LoginBL($this->container);
        $userExiste = $loginBL->validateUser($arrayUser);
        if (!$userExiste) { return 'Usuario o contraseña incorrecta.'; }
        //Pass coinciden
        if ($arrayData["passwordNew"] != $arrayData["passwordReNew"]) { return 'Las contraseñas no coinciden.'; }
        
        //Todo bien...save
        $user = $this->getUserEntity($arrayData["userId"]);
        $user->setPassword(md5($arrayData["passwordNew"]));
        $this->em->flush();
        return 'ok';
    }
    
    public function insert($nombre, $username, $password, $perfil, $activo)
    {
        //Validamos que no exista el rut o la huella
        $existeNombre = $this->getUsuarioByNombre($nombre);
        $existeUsername = $this->getUsuarioByUsername($username);
        if ($existeNombre || $existeUsername) { return false; }
        
        $usuario = new Usuario();
        $usuario->setNombre($nombre);
        $usuario->setUsername($username);
        $usuario->setPassword(md5($password));
        $usuario->setPerfil($perfil);
        $usuario->setActivo($activo);

        $this->em->persist($usuario);
        $this->em->flush();
        return $usuario->getId();
    }
    
    public function update($usuarioId, $nombre, $username, $password, $perfil, $activo)
    {
        //Validamos que no exista el nombre o el username para otro usuario
        $existeNombre = $this->em->getRepository('AppBundle:Usuario')->createQueryBuilder('u')
                ->where('u.id <> :usuarioId')
                ->andwhere('u.nombre = :nombre')
                ->setParameter('usuarioId', $usuarioId)
                ->setParameter('nombre', $nombre)
                ->getQuery()
                ->setMaxResults(1)->getOneOrNullResult();
        $existeUsername = $this->em->getRepository('AppBundle:Usuario')->createQueryBuilder('u')
                ->where('u.id <> :usuarioId')
                ->andwhere('u.username = :username')
                ->setParameter('usuarioId', $usuarioId)
                ->setParameter('username', $username)
                ->getQuery()
                ->setMaxResults(1)->getOneOrNullResult();
        if ($existeNombre || $existeUsername) { return false; }
        
        $usuario = $this->getUsuario($usuarioId);
        $usuario->setNombre($nombre);
        $usuario->setUsername($username);
        if ($password)
        {
            $usuario->setPassword(md5($password));
        }
        $usuario->setPerfil($perfil);
        $usuario->setActivo($activo);
        $this->em->flush();
        return true;
    }
            

}

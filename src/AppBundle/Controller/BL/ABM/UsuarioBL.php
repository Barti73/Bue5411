<?php

namespace AppBundle\Controller\BL\ABM;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Usuario;
use AppBundle\Constants\HeroGymConstants;
use AppBundle\Functions\PHPFunctions;


class UsuarioBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    const SALT_USUARIO = 'SALT_USUARIO';
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }
    
    public function getUsuarioIdHashed($usuarioId)
    {
        return $this->fx->encodeHash($usuarioId, self::SALT_USUARIO);
    }
    
    public function getUsuarioIdFromHashed($hashedUsuarioId)
    {
        return $this->fx->decodeHash($hashedUsuarioId, self::SALT_USUARIO);
    }
    
    public function getUsuario($usuarioId)
    {
        return $this->em->getRepository('AppBundle:Usuario')->find($usuarioId);
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

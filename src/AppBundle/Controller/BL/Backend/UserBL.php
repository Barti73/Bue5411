<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Entity\Usuario;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Controller\BL\Backend\LoginBL;
use AppBundle\Controller\BL\Common\CommonBL;
use AppBundle\Constants\Codigo5411Constants;

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

    public function getFullUsers()
    {
        $users =  $this->em->getRepository('AppBundle:Usuario')->findAll();
        return $users;
    }
    
    public function getGridPage($arrayData)
    {
        $selectedPage = $arrayData["pageNumber"];
        //BL's
        $commonBL = new CommonBL($this->container);
        
        $recordsPerPage = $commonBL->getResultsPerPage();
        $offset = ($selectedPage == 1) ? 0 : ($selectedPage - 1) * $recordsPerPage ;

        $users = $this->em->getRepository('AppBundle:Usuario')->createQueryBuilder('u')
                        ->orderBy('u.username', 'asc')
                        ->setFirstResult($offset)
                        ->setMaxResults($recordsPerPage)
                        ->getQuery()
                        ->getResult();
        
        $arrayResponse = array();
        foreach ($users as $user)
        {
            $arrayResponse[] = $this->getUserData($user);
        }
        
        return $arrayResponse;
    }
    
    public function getCountNews()
    {
        $commonBL = new CommonBL($this->container);
        
        $users = $this->getFullUsers();
        $countUsers = $commonBL->getPaginatorPageCount(count($users));
        return $countUsers;
    }

    public function getUsuario($arrayData)
    {
        $response = array();
        
        $userIdHashed = $arrayData["userIdHashed"];
        
        if (!$userIdHashed) //Nuevo Usuario
        {
            $userData = $this->getUserData(null);
            $response = array('titulo' => 'Crear Nuevo Usuario',
                              'class' => '',
                              'userData' => $userData,
                              'operacion' => 'insert');
        }
        else //Editar Usuario
        {
            $userId = $this->getUserIdFromHashed($userIdHashed);
            $user = $this->getUserEntity($userId);
            $userData = $this->getUserData($user);

            $response = array('titulo' => 'Editar Usuario',
                              'class' => 'active',
                              'userData' => $userData,
                              'operacion' => 'update');
        }
        return $response;
    }

    public function getUserData($user)
    {
        $response = array('id' => '',
                          'hashedId' => '',
                          'username' => '',
                          'nombre' => '',
                          'perfil' => '2',
                          'perfilTexto' => 'Usuario',
                          'estado' => '1',
                          'estadoTexto' => 'Activo');

        if ($user)
        {
            $perfilTexto = ($user->getPerfil() == 1) ? 'Administrador' : 'Usuario';
            $estadoTexto = ($user->getActivo() == 1) ? 'Activo' : 'No Activo';
            $response = array('id' => $user->getId(),
                              'hashedId' => $this->getUserIdHashed($user->getId()),
                              'username' => $user->getUsername(),
                              'nombre' => $user->getNombre(),
                              'perfil' => $user->getPerfil(),
                              'perfilTexto' => $perfilTexto,
                              'estado' => $user->getActivo(),
                              'estadoTexto' => $estadoTexto);
            
        }
        return $response;
    }
    
    public function saveUser($arrayData)
    {
        $userIdHashed = $arrayData["userIdHashed"];
        $userUsername = $arrayData["userUsername"];
        $userNombre = $arrayData["userNombre"];
        $userPerfil = $arrayData["userPerfil"];
        $userEstado = $arrayData["userEstado"];
        
        if (!$userIdHashed) //Insert
        {
            $userPassword = Codigo5411Constants::PASSWORD_NEW_USER;
            $response = $this->insert($userNombre, $userUsername, $userPassword, $userPerfil, $userEstado);
        }
        else
        {
            $userId = $this->getUserIdFromHashed($userIdHashed);
            $response = $this->update($userId, $userNombre, $userUsername, $userPerfil, $userEstado);
        }
        
        return $response;
        
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
        $existeUsername = $this->em->getRepository('AppBundle:Usuario')->findOneByUsername($username);
        if ($existeUsername) { return 'El usuario ya existe.'; }
        
        $usuario = new Usuario();
        $usuario->setNombre($nombre);
        $usuario->setUsername($username);
        $usuario->setPassword(md5($password));
        $usuario->setPerfil($perfil);
        $usuario->setActivo($activo);

        $this->em->persist($usuario);
        $this->em->flush();
        return 'ok';
    }
    
    public function update($usuarioId, $nombre, $username, $perfil, $activo)
    {
        //Validamos que no exista el username para otro usuario
        $existeUsername = $this->em->getRepository('AppBundle:Usuario')->createQueryBuilder('u')
                ->where('u.id <> :usuarioId')
                ->andwhere('u.username = :username')
                ->setParameter('usuarioId', $usuarioId)
                ->setParameter('username', $username)
                ->getQuery()
                ->setMaxResults(1)->getOneOrNullResult();
        if ($existeUsername) { return 'El usuario ya existe.'; }
        
        $usuario = $this->getUserEntity($usuarioId);
        $usuario->setNombre($nombre);
        $usuario->setUsername($username);
        $usuario->setPerfil($perfil);
        $usuario->setActivo($activo);
        $this->em->flush();
        return 'ok';
    }
            

}

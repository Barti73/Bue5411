<?php

namespace AppBundle\Controller\BL\Main;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;


class LoginBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    public function __construct($entityManager)
    {
        $this->em = $entityManager;
        $this->fx = new PHPFunctions();
    }
    
    public function validateUser($txtUser, $txtPass)
    {
        $arrayUser = array();
        $txtPass = md5($txtPass);
        $user =  $this->em->getRepository('AppBundle:Usuario')->findOneBy(array('username' => $txtUser, 'password' => $txtPass));
        if ($user)
        {
            $userId = $user->getId();
            $userNombre = $user->getNombre();
            $userName = $user->getUsername();
            $userPerfil = $user->getPerfil();
            $arrayUser = array(
                                'userId' => $userId,
                                'userNombre' => $userNombre,
                                'userName' => $userName,
                                'userPerfil' => $userPerfil
                              );
        }
        return $arrayUser;
    }
    
}

<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;

class LoginBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }

    public function getUrlAjax()
    {
        $arrayUrlAjax = array('UrlLogin' => Codigo5411Constants::URL_SITE.Codigo5411Constants::URL_LOGIN,
                              'UrlNews' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlAjaxLoginCheck' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_LOGIN_CHECK);
        return $arrayUrlAjax;
    }
    
    public function validateUser($arrayData)
    {
        $arrayUser = array();

        $txtUser = $arrayData["txtUser"];
        $txtPass = md5($arrayData["txtPass"]);

        $user =  $this->em->getRepository('AppBundle:Usuario')->findOneBy(array('username' => $txtUser, 'password' => $txtPass));
        if ($user)
        {
            $userId = $user->getId();
            $userNombre = $user->getNombre();
            $userName = $user->getUsername();
            $userPerfil = $user->getPerfil();
            $arrayUser = array('userId' => $userId,
                               'userNombre' => $userNombre,
                               'userName' => $userName,
                               'userPerfil' => $userPerfil);
        }
        return $arrayUser;
    }
    
}

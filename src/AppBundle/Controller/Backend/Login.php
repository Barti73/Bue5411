<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\LoginBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Login extends Controller
{
    var $bl;
    
    public function __construct()
    {
        
    }
    
    public function mainConstructor()
    {
        $this->bl = new LoginBL($this->container);
        $this->get('session')->remove('userId');
        $this->get('session')->remove('userNombre');
        $this->get('session')->remove('userName');
        $this->get('session')->remove('userPerfil');
    }
    
    /**
     * @Route("/Backend")
     */
    public function indexAction(Request $request)
    {
        return $this->Login($request);
    }

    /**
     * @Route("/Backend/Login")
     */
    public function Login(Request $request)
    {
        $this->mainConstructor();
        
        $arrayUrlAjax = $this->bl->getUrlAjax();
        
        return $this->render('Backend/login.html.twig', array('arrayUrlAjax' => $arrayUrlAjax));
    }
    
    /**
     * @Route("/Backend/Login/ajaxLoginCheck")
     */
    public function ajaxLoginCheck(Request $request)
    {
        $this->mainConstructor();
        
        $arrayData = $request->request->get('value');

        $user = $this->bl->validateUser($arrayData);

        if ($user)
        {
            $session = $request->getSession();
            $session->set('userId', $user['userId']);
            $session->set('userNombre', $user['userNombre']);
            $session->set('userName', $user['userName']);
            $session->set('userPerfil', $user['userPerfil']);
            $response = '1';
        }
        else
        {
            $request->getSession()->invalidate(1);
            $response = '0';
        }
        return new response($response);
    }
    
    
    
}

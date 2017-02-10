<?php

namespace AppBundle\Controller\Backend\Login;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Main\LoginBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Constants\Bue54Constants;

class LoginRender extends Controller
{
    var $bl;
    
    public function __construct()
    {

    }

    /**
     * @Route("/Main/{method}/{notExists}")
     */
    public function mainConstructor(Request $request, $method, $notExists = null)
    {
        $this->bl = new LoginBL($this->container);
        
        return $this->$method($request, $notExists);
    }
    
    public function testMethod()
    {
        return new Response(var_dump("TEST LoginRender"));
    }
    
    public function Login($request, $notExists)
    {
        $this->get('session')->remove('userId');
        $this->get('session')->remove('userNombre');
        $this->get('session')->remove('userName');
        $this->get('session')->remove('userPerfil');
        
        $formAction = Bue54Constants::URL_SITE.Bue54Constants::REDIRECT_LOGIN_CHECK;
        return $this->render('Backend/Login/login.html.twig', array('formAction' => $formAction,
                                                                    'notExists' => $notExists));
    }
//    
//    public function LoginCheck($request, $notExists = null)
//    {
//        $txtUser = $request->request->get('txtUser');
//        $txtPass = $request->request->get('txtPass');
//
//        $response = $this->bl->validateUser($txtUser, $txtPass);
//        //return new response(var_dump($response));
//        if ($response)
//        {
//            $session = $request->getSession();
//            $session->set('userId', $response['userId']);
//            $session->set('userNombre', $response['userNombre']);
//            $session->set('userName', $response['userName']);
//            $session->set('userPerfil', $response['userPerfil']);
//            return $this->redirect(HeroGymConstants::URL_SITE.HeroGymConstants::REDIRECT_CONTROL_ACCESO);
//        }
//        else
//        {
//            $request->getSession()->invalidate(1);
//            $notExists = "1";
//            return $this->Login($request, $notExists);
//        }
//    }
    
    
}

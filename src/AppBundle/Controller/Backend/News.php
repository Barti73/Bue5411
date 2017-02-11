<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\NewsBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Constants\Bue5411Constants;

class News extends Controller
{
    var $bl;
    
    public function __construct()
    {
        
    }

    /**
     * @Route("/Backend/News")
     */
    public function NewsIndex(Request $request)
    {
        $this->bl = new NewsBL($this->container);
        
        return $this->render('Backend/NEWS.html.twig', array());
    }
    
//    public function mainConstructor(Request $request, $method = null, $notExists = null)
//    {
//        
//        
//        if (!$method) { $method = 'Login'; }
//        return $this->$method($request, $notExists);
//    }
    
//    public function testMethod()
//    {
//        return new Response(var_dump("TEST LoginRender"));
//    }
    
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

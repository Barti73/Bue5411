<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\UserBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class User extends Controller
{
    var $bl;
    
    public function __construct()
    {
        
    }
    
    public function mainConstructor()
    {
        $this->bl = new UserBL($this->container);
        $validSession = ($this->get('session')->get('userId') == null) ? 0 : 1;
        return $validSession;
    }

    /**
     * @Route("/Backend/User/ajaxPopupEditPassOpen")
     */
    public function ajaxPopupEditPassOpen(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        return $this->render('Backend/user_pass_edit.ajax.html.twig', array());
    }
    
    /**
     * @Route("/Backend/User/ajaxPopupEditPassSave")
     */
    public function ajaxPopupEditPassSave(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }

        //Data Usuario
        $data = $request->request->get('value');
        
        //Save Pass
        $arrayData = array('userId' => $this->get('session')->get('userId'),
                           'userName' => $this->get('session')->get('userName'),
                           'passwordOld' => $data["passwordOld"],
                           'passwordNew' => $data["passwordNew"],
                           'passwordReNew' => $data["passwordReNew"]);
        $response = $this->bl->setUserPassword($arrayData);
                
        return new response($response);
    }

    
}

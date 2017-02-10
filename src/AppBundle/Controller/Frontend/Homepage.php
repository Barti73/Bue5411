<?php

namespace AppBundle\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Constants\Bue54Constants;

class Homepage extends Controller
{
    var $bl;
    
    public function __construct()
    {

    }

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->Home($request);
    }
    
    /**
     * @Route("/{method}")
     */
    public function mainConstructor(Request $request, $method)
    {
        //$this->bl = new LoginBL($this->container);
        if (!$method) { $method = 'Home'; }
        return $this->$method($request);
    }
    
    public function testMethod()
    {
        return new Response(var_dump("TEST Homepage"));
    }
    
    public function Home($request)
    {
        return $this->render('Frontend/portal.html.twig', array());
    }
    
}

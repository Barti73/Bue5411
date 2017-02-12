<?php

namespace AppBundle\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Constants\Codigo5411Constants;

class Home extends Controller
{
    var $bl;
    
    public function __construct()
    {
    }

    /**
     * @Route("/", name="homepage")
     */
    public function Home(Request $request)
    {
        $linkHome = Codigo5411Constants::URL_SITE;
        return $this->render('Frontend/portal.html.twig', array('linkHome' => $linkHome));
    }
}

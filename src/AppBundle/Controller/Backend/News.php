<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\NewsBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class News extends Controller
{
    var $bl;
    
    public function __construct()
    {
        
    }
    
    public function mainConstructor()
    {
        $this->bl = new NewsBL($this->container);
        $validSession = ($this->get('session')->get('userId') == null) ? 0 : 1;
        return $validSession;
    }

    /**
     * @Route("/Backend/News")
     */
    public function NewsIndex(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        //URLs
        $arrayUrlAjax = $this->bl->getUrlAjax();
        //Count
        $pageCount = $this->bl->getCountNews();
        
        return $this->render('Backend/news.html.twig', array('pageCount' => $pageCount,
                                                             'arrayUrlAjax' => $arrayUrlAjax));
    }
    
    /**
     * @Route("/Backend/News/ajaxPopupNews")
     */
    public function ajaxPopupNews(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        return $this->render('Backend/news_popup.ajax.html.twig', array());
    }
    
    /**
     * @Route("/Backend/News/ajaxGridNewsPage")
     */
    public function ajaxGridNewsPage(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $arrayData = $request->request->get('value');
        
        $noticias = $this->bl->getGridPage($arrayData);
        
        return $this->render('Backend/news_grid.ajax.html.twig', array('noticias' => $noticias));
    }
    
}

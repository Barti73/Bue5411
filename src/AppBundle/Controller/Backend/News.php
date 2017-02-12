<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\NewsBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Constants\Codigo5411Constants;

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
        
        $arrayUrlAjax = $this->bl->getUrlAjax();
        $linkHome = Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS;

        //Count
        $pageCount = $this->bl->getCountNews();
        
        return $this->render('Backend/news.html.twig', array('linkHome' => $linkHome,
                                                             'pageCount' => $pageCount,
                                                             'arrayUrlAjax' => $arrayUrlAjax));
    }
    
    /**
     * @Route("/Backend/News/ajaxPopupNews")
     */
    public function ajaxPopupNews(Request $request)
    {
        $this->bl = new NewsBL($this->container);
        
        
        return $this->render('Backend/news_popup.ajax.html.twig', array());
    }
    
    /**
     * @Route("/Backend/News/ajaxGridNewsPage")
     */
    public function ajaxGridNewsPage(Request $request)
    {
        $this->bl = new NewsBL($this->container);
        
        $arrayData = $request->request->get('value');
        
        $noticias = $this->bl->getGridPage($arrayData);
        
        return $this->render('Backend/news_grid.ajax.html.twig', array('noticias' => $noticias));
    }
    
}

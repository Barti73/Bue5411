<?php

namespace AppBundle\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Controller\BL\Frontend\HomeBL;
use AppBundle\Controller\BL\Common\CommonBL;

class Home extends Controller
{
    var $bl;
    
    public function __construct()
    {
        
    }

    public function mainConstructor()
    {
        $this->bl = new HomeBL($this->container);
    }

    
    /**
     * @Route("/")
     */
    public function Home(Request $request)
    {
        $this->mainConstructor();
        
        //URLs
        $commonBL = new CommonBL($this->container);
        $arrayUrlAjax = $commonBL->getUrlAjax();
        
        //Noticias
        $arrayNews = $this->bl->getPortalNews();
        //return new response(var_dump($arrayNews));
        
        return $this->render('Frontend/portal.html.twig', array('news' => $arrayNews,
                                                                'arrayUrlAjax' => $arrayUrlAjax));
    }
    
    /**
     * @Route("/OtrasNoticias")
     */
    public function OtrasNoticias(Request $request)
    {
        $this->mainConstructor();

        //URLs
        $commonBL = new CommonBL($this->container);
        $arrayUrlAjax = $commonBL->getUrlAjax();
        //Count
        $search = '';
        $pageCount = $this->bl->getCountOtherNews($search);
        
        return $this->render('Frontend/other_news.html.twig', array('pageCount' => $pageCount,
                                                                    'arrayUrlAjax' => $arrayUrlAjax));
    }

    /**
     * @Route("/Frontend/OtrasNoticias/ajaxGridPaginator")
     */
    public function ajaxGridPaginator(Request $request)
    {
        $this->mainConstructor();
        
        $arrayData = $request->request->get('value');
        $search = $arrayData["txtSearch"];
        $pageCount = $this->bl->getCountOtherNews($search);
        
        return new response($pageCount);
    }
    
    /**
     * @Route("/Frontend/OtrasNoticias/ajaxGridOtherNewsPage")
     */
    public function ajaxGridOtherNewsPage(Request $request)
    {
        $this->mainConstructor();
        
        $arrayData = $request->request->get('value');
        
        $otherNews = $this->bl->getOtherNewsGridPage($arrayData);
        //return new response(var_dump($otherNews));
        
        return $this->render('Frontend/other_news_grid.ajax.html.twig', array('otherNews' => $otherNews));
    }
    
    /**
     * @Route("/Frontend/News/ajaxPopupPortalNewsView")
     */
    public function ajaxPopupPortalNewsView(Request $request)
    {
        $this->mainConstructor();
        
        $arrayData = $request->request->get('value');
        $newsIdHashed = $arrayData["newsIdHashed"];
        //Data noticia
        $popupData = $this->bl->getPopupNews($newsIdHashed);
        //return new response(var_dump($popupData));
                
        return $this->render('Common/news_popup_view.ajax.html.twig', array('popupData' => $popupData,
                                                                            'backend' => 0));
    }
    
    
}

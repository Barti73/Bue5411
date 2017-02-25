<?php

namespace AppBundle\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\BL\Backend\NewsBL;
use AppBundle\Controller\BL\Common\CommonBL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class News extends Controller
{
    var $bl;
    var $container;
    
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
        $commonBL = new CommonBL($this->container);
        $arrayUrlAjax = $commonBL->getUrlAjax();
        //Count
        $pageCount = $this->bl->getCountNews();
        
        return $this->render('Backend/news.html.twig', array('pageCount' => $pageCount,
                                                             'arrayUrlAjax' => $arrayUrlAjax));
    }

    /**
     * @Route("/Backend/News/ajaxPopupNewsView")
     */
    public function ajaxPopupNewsView(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $arrayData = $request->request->get('value');
        //Data noticia
        $popupData = $this->bl->getNoticia($arrayData);
                
        return $this->render('Common/news_popup_view.ajax.html.twig', array('popupData' => $popupData));
    }
    
    /**
     * @Route("/Backend/News/ajaxPopupNewsAddEdit")
     */
    public function ajaxPopupNewsAddEdit(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $arrayData = $request->request->get('value');
        
        $popupData = $this->bl->getNoticia($arrayData);
                
        return $this->render('Backend/news_popup_add_edit.ajax.html.twig', array('popupData' => $popupData));
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
    
    /**
     * @Route("/Backend/News/ajaxSaveNews")
     */
    public function ajaxSaveNews(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $noticiaIdHashed = $request->request->get('noticiaIdHashed');
        $titulo = $request->request->get('titulo');
        $texto = $request->request->get('texto');
        $posicion = $request->request->get('posicion');
        $blackWhite = $request->request->get('blackWhite');
        $fileObject = $request->files->get('fileImage');
        
        $arrayData = array('noticiaIdHashed' => $noticiaIdHashed,
                           'titulo' => $titulo,
                           'texto' => $texto,
                           'posicion' => $posicion,
                           'blackWhite' => $blackWhite);
        
        $response = $this->bl->saveNews($arrayData, $fileObject);
        return new Response(var_dump($response));
    }
    
    /**
     * @Route("/Backend/News/ajaxPublishNews")
     */
    public function ajaxPublishNews(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $arrayData = $request->request->get('value');
        $response = $this->bl->publishNews($arrayData);
        return new Response(var_dump($response));
    }
    
    /**
     * @Route("/Backend/News/ajaxDeleteNews")
     */
    public function ajaxDeleteNews(Request $request)
    {
        $validSession = $this->mainConstructor();
        if (!$validSession) { return $this->redirect($this->bl->getUrlLogin()); }
        
        $arrayData = $request->request->get('value');
        $response = $this->bl->deleteNews($arrayData);
        return new Response(var_dump($response));
    }
    
}

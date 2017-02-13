<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;
use AppBundle\Controller\BL\Common\CommonBL;
use AppBundle\Controller\BL\Common\NoticiaBL;

class NewsBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;

    const newsSalt = "newsSalt";
    protected $container;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }

    public function getUrlLogin()
    {
        return Codigo5411Constants::URL_SITE.Codigo5411Constants::URL_LOGIN;
    }
    
    public function getUrlAjax()
    {
        $arrayUrlAjax = array('UrlAjaxPopup' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS,
                              'UrlAjaxGetGridPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_PAGE,
                              'UrlHome' => Codigo5411Constants::URL_SITE.Codigo5411Constants::MENU_NEWS,
                              'UrlLogin' => $this->getUrlLogin());
        return $arrayUrlAjax;
    }
    
    public function getFullNews()
    {
        $noticias =  $this->em->getRepository('AppBundle:Noticia')->findAll();
        return $noticias;
    }
    
    public function getCountNews()
    {
        $commonBL = new CommonBL($this->container);
        
        $noticias = $this->getFullNews();
        $countNews = $commonBL->getPaginatorPageCount(count($noticias));
        return $countNews;
    }
    
    public function getGridPage($arrayData)
    {
        $selectedPage = $arrayData["pageNumber"];
        //BL's
        $commonBL = new CommonBL($this->container);
        $noticiaBL = new NoticiaBL($this->container);
        
        $recordsPerPage = $commonBL->getResultsPerPage();
        $offset = ($selectedPage == 1) ? 0 : ($selectedPage - 1) * $recordsPerPage ;

        $noticias = $this->em->getRepository('AppBundle:Noticia')->createQueryBuilder('n')
                            ->innerJoin('AppBundle:Usuario', 'u', 'WITH', 'n.idUsuario = u.id')
                            ->orderBy('n.fecha', 'desc')
                            ->setFirstResult($offset)
                            ->setMaxResults($recordsPerPage)
                            ->getQuery()
                            ->getResult();
        
        $arrayResponse = array();
        foreach ($noticias as $noticia)
        {
            $arrayResponse[] = $noticiaBL->getNoticiaData($noticia);
        }
        
        return $arrayResponse;
    }
    
    public function getNoticiaPopup($arrayData)
    {
        $response = array();
        //BL
        $noticiaBL = new NoticiaBL($this->container);
        
        $noticiaIdHashed = $arrayData["noticiaIdHashed"];
        
        if (!$noticiaIdHashed) //Nueva Noticia
        {
            $noticiaData = $noticiaBL->getNoticiaData(null);
            $response = array('titulo' => 'Cargar Nueva Noticia',
                              'class' => '',
                              'noticiaData' => $noticiaData,
                              'operacion' => 'insert');
        }
        else //Editar Noticia
        {
            $noticiaId = $noticiaBL->getNoticiaIdFromHashed($noticiaIdHashed);
            $noticia = $this->em->getRepository('AppBundle:Noticia')->find($noticiaId);
            $noticiaData = $noticiaBL->getNoticiaData($noticia);

            $response = array('titulo' => 'Editar Noticia',
                              'class' => 'active',
                              'noticiaData' => $noticiaData,
                              'operacion' => 'update');
        }
        return $response;
    }
            
}

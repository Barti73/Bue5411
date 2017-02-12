<?php

namespace AppBundle\Controller\BL\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;
use AppBundle\Controller\BL\Common\CommonBL;

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

    public function getNewsIdHashed($noticiaId)
    {
        return $this->fx->encodeHash($noticiaId, self::newsSalt, 10);
    }
            
    public function getNewsIdFromHashed($noticiaIdHashed)
    {
        return $this->fx->decodeHash($noticiaIdHashed, self::newsSalt, 10);
    }
    
    public function getUrlAjax()
    {
        $arrayUrlAjax = array('UrlAjaxPopup' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_POPUP_NEWS,
                              'UrlAjaxGetGridPage' => Codigo5411Constants::URL_SITE.Codigo5411Constants::AJAX_GRID_PAGE);
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
        
        $commonBL = new CommonBL($this->container);
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
            $textoShort = substr($noticia->getTexto(), 0, 300)."...";
            $arrayResponse[] = array('hashedId' => $this->getNewsIdHashed($noticia->getId()),
                                     'fecha' => $noticia->getFecha()->format('d/m/Y H:i'),
                                     'titulo' => $noticia->getTitulo(),
                                     'texto' => $noticia->getTexto(),
                                     'textoShort' => $textoShort,
                                     'posicion' => $noticia->getPosicion(),
                                     'autor' => $noticia->getIdUsuario()->getNombre(),
                                     'estado' => $noticia->getEstado());
        }
        
        return $arrayResponse;
    }
            
    
}

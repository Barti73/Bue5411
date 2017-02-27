<?php

namespace AppBundle\Controller\BL\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;
use AppBundle\Controller\BL\Common\CommonBL;
use AppBundle\Controller\BL\Common\NoticiaBL;

class HomeBL extends Controller
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    protected $noticiaBL;

    protected $container;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
        $this->noticiaBL = new NoticiaBL($this->container);
    }
    
    public function getPortalNews()
    {
        $arrayNews = array();
        $portalNews = $this->em->getRepository('AppBundle:Noticia')->createQueryBuilder('n')
                ->where('n.estado = 1') /* Publicadas */
                ->orderBy('n.posicion', 'asc')
                ->getQuery()
                ->getResult();
        foreach ($portalNews as $news)
        {
            $arrayNews[] = $this->noticiaBL->getNoticiaData($news);
        }
        return $arrayNews;
    }
    
    public function getFullOtherNews($search)
    {
        $otherNews = $this->em->getRepository('AppBundle:Noticia')->createQueryBuilder('n')
                        ->where('n.estado = 2') /* No Publicadas */
                        ->andWhere('n.titulo like :search or n.texto like :search')
                        ->orderBy('n.fecha', 'desc')
                        ->setParameter('search', '%'.$search.'%')
                        ->orderBy('n.fecha', 'desc')
                        ->getQuery()
                        ->getResult();
        return $otherNews;
    }
    
    public function getPopupNews($newsIdHashed)
    {
        $newsId = $this->noticiaBL->getNoticiaIdFromHashed($newsIdHashed);
        $news = $this->em->getRepository('AppBundle:Noticia')->find($newsId);
        $newsData = $this->noticiaBL->getNoticiaData($news);
        $response = array('noticiaData' => $newsData);
        return $response;
    }
    
    public function getCountOtherNews($search)
    {
        $commonBL = new CommonBL($this->container);
        
        $otherNews = $this->getFullOtherNews($search);
        $countNews = $commonBL->getPaginatorOtherNewsPageCount(count($otherNews));
        return $countNews;
    }

    public function getOtherNewsGridPage($arrayData)
    {
        $selectedPage = $arrayData["pageNumber"];
        $search = $arrayData["txtSearch"];
        //BL's
        $commonBL = new CommonBL($this->container);
        
        $recordsPerPage = $commonBL->getResultsOtherNewsPerPage();
        $offset = ($selectedPage == 1) ? 0 : ($selectedPage - 1) * $recordsPerPage ;

        $otherNews = $this->em->getRepository('AppBundle:Noticia')->createQueryBuilder('n')
                            ->where('n.estado = 2') /* No Publicadas */
                            ->andWhere('n.titulo like :search or n.texto like :search')
                            ->orderBy('n.fecha', 'desc')
                            ->setParameter('search', '%'.$search.'%')
                            ->setFirstResult($offset)
                            ->setMaxResults($recordsPerPage)
                            ->getQuery()
                            ->getResult();
        $arrayResponse = array();
        foreach ($otherNews as $news)
        {
            $arrayResponse[] = $this->noticiaBL->getNoticiaData($news);
        }
        return $arrayResponse;
    }
    
    
}

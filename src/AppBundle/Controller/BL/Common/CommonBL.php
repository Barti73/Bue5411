<?php

namespace AppBundle\Controller\BL\Common;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use AppBundle\Functions\PHPFunctions;
use AppBundle\Constants\Codigo5411Constants;

class CommonBL
{
    /**
     *
     * @var EntityManager 
     */
    protected $em;
    protected $fx;
    
    public function __construct($container)
    {
        $this->em = $container->get('doctrine.orm.entity_manager');
        $this->container = $container;
        $this->fx = new PHPFunctions();
    }
    
    public function getResultsPerPage()
    {
        return Codigo5411Constants::PAGINATOR_RESULTS_PER_PAGE;
    }

    public function getPaginatorPageCount($gridCount)
    {
        $pageCount = ceil($gridCount / $this->getResultsPerPage());
        return $pageCount;
    }
    
    public function getParametro($nombre)
    {
        return $this->em->getRepository('AppBundle:ParametrosConfiguracion')->findOneByNombre($nombre)->getValor();
    }
    
    
}